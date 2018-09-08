import axios from '../../axios-api';
import {CHANGE_PLACE_RATE, CREATE_PLACE_SUCCESS, FETCH_ONE_PLACE_SUCCESS, FETCH_PLACES_SUCCESS} from "./actionTypes";
import {push} from "react-router-redux";




export const createPlaceSuccess = () => {
    return {type: CREATE_PLACE_SUCCESS};
};

export const  createPlace = (placeData) => {
    return dispatch => {
        axios.post('/places', placeData).then(
            response => {
                dispatch(createPlaceSuccess());
                dispatch(push('/places'));
            }
        )
    }
};

export const fetchPlacesSuccess = places => {
    return {type: FETCH_PLACES_SUCCESS, places};
};

export const fetchPlaces = () => {
    return dispatch => {
        return axios.get('/places').then(
            response => dispatch(fetchPlacesSuccess(response.data))
        )
    };
};
export const fetchOnePlaceSuccess = (currentPlace) => {
    return {type: FETCH_ONE_PLACE_SUCCESS, currentPlace}
};

export const getOnePlace = (id) => {
    return dispatch => {
        return axios.get('/places/' + id).then(
            response => {
                return dispatch(fetchOnePlaceSuccess(response.data))
            }
        )
    }
};

export const submitPlaceRating = (id, rate) => {
    return {type: CHANGE_PLACE_RATE, id, rate};
};