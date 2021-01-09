import * as actionTypes from '../types';

export const setAlert = (alert) => dispatch => {
    dispatch({
        type: actionTypes.SET_ALERT,
        payload: alert
    })

    setTimeout(() => { 
        dispatch({
            type: actionTypes.REMOVE_ALERT
        })
    }, 3000);
};

