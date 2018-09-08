import React, {Component} from 'react';
import {Button, Col, Form, FormGroup} from "react-bootstrap";
import FormElement from "../UI/Form/FormElement";
import {connect} from "react-redux";
import {getOnePlace} from "../../store/actions/places";

class PlaceForm extends Component {
  state = {
    title: '',
    description: '',
    images: [],

  };

  submitFormHandler = event => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(this.state).forEach(key => {
      if(key === 'ingredients') {
          formData.append(key, JSON.stringify(this.state[key]));
      } else {
          formData.append(key, this.state[key]);
      }

    });

    console.log(this.props.user.token)

    this.props.onSubmit(formData, this.props.user.token);
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  addIngredient = () => {
    let ingredients = [...this.state.ingredients];
    ingredients.push({name: '', amount: ''});
    this.setState({ingredients: ingredients});
  };

  removeIngredients = (id) => {
    this.setState((prevState) => {
      let ingredients = [...prevState.ingredients];
      ingredients.splice(id, 1);
      return {ingredients: ingredients}
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

const mapDispatchToProps = dispatch => {
    return {
        getOnePlace: (id) => dispatch(getOnePlace(id)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(PlaceForm);
