import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel} from "react-bootstrap";
import {getOnePlace} from "../../store/actions/places";


class OnePlace extends Component{
    componentDidMount () {
        this.props.getOnePlace(this.props.match.params.id);

    }

    state = {
      comment: ''
    };

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
                        <div>
                            <p style={{marginTop: '50px', fontWeight: 'bold'}}>Add review</p>
                            <textarea
                                name="description"
                                type="text"
                                value={this.state.comments}
                                onChange={this.inputChangeHandler}
                                required
                                style={{width:'70%'}}
                            />
                        </div>
                        <div>
                            <p> Upload new photo</p>
                            <input type="file"/>
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