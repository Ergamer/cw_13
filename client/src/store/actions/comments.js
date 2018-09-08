import axios from '../../axios-api';
import {ADD_COMMENT_SUCCESS} from "./actionTypes";
import {getOnePlace} from "./places";




export const addCommentSuccess = () => {
    return {type: ADD_COMMENT_SUCCESS};
};

export const  addComment = (commentData) => {
    return dispatch => {
        axios.post('/comments', commentData).then(
            response => {
                dispatch(addCommentSuccess());
                dispatch(getOnePlace());
            }
        )
    }
};