import axios from '../../axios-api';
import {push} from 'react-router-redux';
import {NotificationManager} from 'react-notifications';
import {
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS, LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS, TOGGLE_MODAL_LOGIN
} from "./actionTypes";

const registerUserSuccess = () => {
    return {type: REGISTER_USER_SUCCESS};
};

const registerUserFailure = error => {
    return {type: REGISTER_USER_FAILURE, error};
};

export const registerUser = userData => {
    return dispatch => {
        return axios.post('/users', userData).then(
            response => {
                dispatch(registerUserSuccess());
                dispatch(push('/'));
                NotificationManager.success('Success', 'Registration successful');
            },
            error => {
                dispatch(registerUserFailure(error.response));
            }
        );
    };
};

const loginUserSuccess = (user, token) => {
    return {type: LOGIN_USER_SUCCESS, user, token};
};

const loginUserFailure = error => {
    return {type: LOGIN_USER_FAILURE, error};
};

export const loginUser = userData => {
    return dispatch => {
        return axios.post('/users/sessions', userData).then(
            response => {
                dispatch(loginUserSuccess(response.data.user, response.data.token));
                dispatch(push('/'));
                NotificationManager.success('Success', response.data.message);
            },
            error => {
                const errorObj = error.response ? error.response.data : {error: 'No internet'};
                dispatch(loginUserFailure(errorObj));
            }
        )
    }
};

export const toggleModalLogin = () => {
    return (dispatch) => {
        dispatch(toggleModal());
    };
};

export const toggleModal = () => {
    return {type: TOGGLE_MODAL_LOGIN};
};


export const logoutUser = () => {
    return (dispatch) => {
        axios.delete('/users/sessions').then(
            response => {
                dispatch({type: LOGOUT_USER});
                dispatch(push('/'));
                NotificationManager.success('Success', 'Logout successful');
            }, error => {
                NotificationManager.error('Error', 'Could not logout');
            }
        );
    }
};
export const logoutExpiredUser = () => {
    return dispatch => {
        dispatch({type: LOGOUT_USER});
        dispatch(push('/login'));
        NotificationManager.error('Error', 'Your session has expired, please login again');
    }
};