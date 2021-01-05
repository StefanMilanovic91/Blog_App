import * as actionTypes from '../types';

export const registerUser = (data) => dispatch => {
    dispatch({
        type: actionTypes.REGISTER_USER,
        payload: data
    });
}