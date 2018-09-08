import React, {Component} from 'react';
import {Button, Col, Form, FormGroup} from "react-bootstrap";
import FormElement from "../UI/Form/FormElement";
import {connect} from "react-redux";
import {createPlace} from "../../store/actions/places";

class PlaceForm extends Component {
    state = {
        title: '',
        description: '',
        image: '',

    };

    submitFormHandler = event => {
        event.preventDefault();
        const formData = new FormData();
        for (let key in this.state) {
            formData.append(key, this.state[key])
        }
        this.props.createPlace(formData);
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        });
    };


    render() {
        return (
            <Form horizontal onSubmit={this.submitFormHandler}>

                <FormElement
                    propertyName="title"
                    title="Place title"
                    type="text"
                    value={this.state.title}
                    changeHandler={this.inputChangeHandler}
                    required
                />
                <FormElement
                    propertyName="description"
                    title="Place description"
                    type="textarea"
                    value={this.state.description}
                    changeHandler={this.inputChangeHandler}
                    required
                />

                <FormElement
                    propertyName="image"
                    title="Place image"
                    type="file"
                    changeHandler={this.fileChangeHandler}
                />
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button bsStyle="primary" type="submit">Save</Button>
                    </Col>
                </FormGroup>
            </Form>
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

const mapDispatchToProps = dispatch => ({
        createPlace: placeData =>  dispatch(createPlace(placeData))
    }
);
export default connect(mapStateToProps, mapDispatchToProps)(PlaceForm);
