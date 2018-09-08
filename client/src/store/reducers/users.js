import {
    FETCH_ONE_USER_SUCCESS,
    FETCH_USERS_FAILURE,
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS, LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS
} from "../actions/actionTypes";


const initialState = {
    registerError: null,
    loginError: null,
    user: null,
    token: null,
    oneUser: null,
    users: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_SUCCESS:
            return {...state, registerError: null};
        case REGISTER_USER_FAILURE:
            return {...state, registerError: action.error};
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.user, token: action.token, loginError: null};
        case LOGIN_USER_FAILURE:
            return {...state, loginError: action.error};
        case LOGOUT_USER:
            return {...state, user: null};
        case FETCH_USERS_FAILURE:
            return {...state, error: action.error};
        case FETCH_ONE_USER_SUCCESS:
            return {...state, oneUser: action.user};
        default:
            return state;
    }
};

export default reducer;