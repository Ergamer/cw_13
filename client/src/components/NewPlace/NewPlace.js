import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {PageHeader} from "react-bootstrap";
import PlaceForm from "../../components/PlaceForm/PlaceForm";
import {createPlace} from "../../store/actions/places";



class NewPlace extends Component {


    createPlace = (placeData, token) => {
        this.props.placeCreated(placeData, token);
    };

    render() {
        console.log('asdfafsd');
        return (
            <Fragment>
                <PageHeader>New place</PageHeader>
                <PlaceForm
                    onSubmit={this.createPlace}
                    user={this.props.users}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
        placeCreated: (placeData, token) =>  dispatch(createPlace(placeData, token))
    }
);

const mapStateToProps = state => ({
    users: state.users.user
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPlace);