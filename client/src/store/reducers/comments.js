import {ADD_COMMENT_SUCCESS} from "../actions/actionTypes";

const initialState = {
    comment: {},
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT_SUCCESS:
            return {...state, comment: action.comment};
        default:
            return state;
    }
};

export default reducer;