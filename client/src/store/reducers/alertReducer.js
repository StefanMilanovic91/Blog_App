import * as actionTypes from '../types';

const initState = {
    alert: null
}

const setAlert = (state, payload) => {
    return {
        ...state,
        alert: {
            msg: payload.msg,
            class: payload.class
        }
    }
}

const removeAlert = (state) => {
    return {
        ...state,
        alert: null
    }
}

const alertReducer = (state = initState, action) => {

    const { type, payload } = action;


    switch (type) {
        case actionTypes.SET_ALERT:
            return setAlert(state, payload);
        case actionTypes.REMOVE_ALERT:
            return removeAlert(state);
    
        default: return state;
    }


};

export default alertReducer;

