import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Col, Form, FormGroup, Panel} from "react-bootstrap";
import FormElement from "../UI/Form/FormElement";
import "./OnePlace.css";
import {addComment} from "../../store/actions/comments";
import {getOnePlace} from "../../store/actions/places";


class OnePlace extends Component {

    componentDidMount () {
        this.props.getOnePlace(this.props.match.params.id);

    };

    state = {
        text: '',
        anotherImage: ''
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    submitCommentHandler = (event) => {
        event.preventDefault();
        this.props.addComment();
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        });
    };

    submitAnotherImageFormHandler = () => {

    };

    render () {
        return (
            <Panel>
                {this.props.place ?
                    <Panel.Body>
                        <h1>Cocktail</h1>
                        <div className="one-place-title">
                            <img src={'http://localhost:8000/uploads/' + this.props.place.image} alt=""/>
                            <h2>{this.props.place.title}</h2>
                            <p>{this.props.place.description}</p>
                        </div>
                        <div>
                            <p>{this.props.text}</p>
                        </div>
                        <Form className="comment" horizontal onSubmit={this.submitCommentHandler}>
                            <p style={{fontWeight: 'bold'}}>Add review</p>
                            <textarea
                                name="text"
                                value={this.state.text}
                                onChange={this.inputChangeHandler}
                                required
                                style={{width:'70%'}}
                            />
                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button bsStyle="primary" type="submit">Save</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                        <Form horizontal onSubmit={this.submitAnotherImageFormHandler}>
                            <FormElement
                                propertyName="image"
                                title="Another image"
                                type="file"
                                changeHandler={this.fileChangeHandler}
                            />
                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button bsStyle="primary" type="submit">Upload</Button>
                                </Col>
                            </FormGroup>
                        </Form>
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
        place: state.places.place,
        comments: state.comments.comments
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getOnePlace: (id) => dispatch(getOnePlace(id)),
        addComment: (id) => dispatch(addComment(id)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(OnePlace);