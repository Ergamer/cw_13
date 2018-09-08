import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Button, PageHeader} from "react-bootstrap";
import {Link} from "react-router-dom";

import {fetchPlaces} from "../../store/actions/places";
import OnePlaceList from '../../components/OnePlaceList/OnePlaceList';

class AllPlaces extends Component {
    componentDidMount() {
        this.props.fetchPlaces();
    }
    render() {
        return (
            <Fragment>
                <PageHeader>
                    Places
                    {this.props.user && this.props.user.role === 'admin' &&
                    <Link to="/places/new">
                        <Button bsStyle="primary" className="pull-right">
                            Add place
                        </Button>
                    </Link>
                    }
                </PageHeader>

                {this.props.places.map(place => (
                    <OnePlaceList
                        key={place._id}
                        id={place._id}
                        title={place.title}
                        description={place.description}
                        image={place.image}
                    />
                ))}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        places: state.places.places,
        place: state.places.place,
        user: state.users.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPlaces: () => dispatch(fetchPlaces())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPlaces);