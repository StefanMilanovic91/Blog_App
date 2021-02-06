import * as actionTypes from '../types';

import AuthServices from '../../services/auth-service/AuthService';

import { setAlert } from '../actions/alertActions';

export const registerUser = (formData, history, setLoading) => dispatch => {

    setLoading(true);
        
    AuthServices.register(formData).then(res => res.data).then(data => {
        setLoading(false);
        dispatch(setAlert({ msg: data.msg, class: 'success' }));
        setTimeout(() => history.push('/login'), 3000);
        
        
    }).catch(error => {
        let errors = error.response.data.errors
        if (errors) {
            dispatch(setAlert({ msg: errors[0].msg, class: 'danger' }));
        }
        setLoading(false);
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