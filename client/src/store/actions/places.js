import axios from '../../axios-api';
import {CREATE_PLACE_SUCCESS, FETCH_ONE_PLACE_SUCCESS, FETCH_PLACES_SUCCESS} from "./actionTypes";
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
export const fetchOnePlaceSuccess = (place) => {
    return {type: FETCH_ONE_PLACE_SUCCESS, place}
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