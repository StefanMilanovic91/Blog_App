import * as actionTypes from '../types';

export const registerUser = (data) => dispatch => {
    dispatch({
        type: actionTypes.REGISTER_USER,
        payload: data
    });
};

export const logInUser = (data) => dispatch => {
    dispatch({
        type: actionTypes.LOGIN_USER,
        payload: data
    })
}

export const logOutUser = () => dispatch => {
    dispatch({
        type: actionTypes.LOGOUT_USER
    });
}

export const endOfAuthLoading = () => dispatch => {
    dispatch({
        type: actionTypes.END_OF_AUTH_LOADING
    })
}