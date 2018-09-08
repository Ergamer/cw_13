import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel} from "react-bootstrap";
import {getOnePlace} from "../../store/actions/places";
import './OneCocktail.css';


class OnePlace extends Component{
    componentDidMount () {
        this.props.getOnePlace(this.props.match.params.id);

    }

    render () {
        return (
            <Panel>
                {this.props.place ?
                    <Panel.Body>
                        <h1>Cocktail</h1>
                        <div>
                            <img src={'http://localhost:8000/uploads/' + this.props.place.image} alt=""/>
                            <h2>{this.props.place.title}</h2>
                            <p>{this.props.place.description}</p>
                        </div>
                    </Panel.Body>: null
                }
            </Panel>

        );
    }

}

const mapStateToProps = state => {
    return {
        places: state.places.places,
        users: state.users.user,
        place: state.places.place
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getOnePlace: (id) => dispatch(getOnePlace(id)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(OnePlace);