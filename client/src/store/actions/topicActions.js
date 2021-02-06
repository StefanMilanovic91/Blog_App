import * as actionTypes from '../types';

import TopicServices from '../../services/topic-services/TopicServices';
import AuthServices from '../../services/auth-service/AuthService';

import { setAlert } from '../actions/alertActions';
import { logOutUser } from '../actions/authActions';

export const setTopics = () => dispatch => {

    TopicServices.getAllTopics().then(res => res.data).then(data => {
        
        // set topics to store
        dispatch({
            type: actionTypes.SET_TOPICS,
            payload: data.topics
        });

    }).catch(err => {
        let errors = err.response.data.errors
        if (errors) {
            dispatch(setAlert({ msg: err.response.data.errors[0].msg, class: 'danger' }));
        } else {
            window.location.reload(); 
        }
    })

    
};

export const setNewTopic = (newTopic, setTypedTopic) => dispatch => {

    dispatch(startLoading());
    let token = AuthServices.getLocalData();

    if (token) {

        TopicServices.addTopic({ title: newTopic.title }, token).then(res => res.data).then(data => {
            
            // clear input
            setTypedTopic({ title: "" });

            // update topics
            dispatch({
                type: actionTypes.SET_NEW_TOPIC,
                payload: data.topic
            });

            dispatch(setAlert({msg: data.msg, class: "success"}));
    
            dispatch(endLoading());
        }).catch(err => {
            dispatch(endLoading());
            let errors = err.response.data.errors
            if(errors){
                dispatch(setAlert({ msg: errors[0].msg, class: 'danger' }));
            }
    
        });
    } else {
        dispatch(logOutUser());
    }

    
};

export const startLoading = () => dispatch => {
    dispatch({
        type: actionTypes.START_LOADING
    });
};

export const endLoading = () => dispatch => {
    dispatch({
        type: actionTypes.END_LOADING
    });
};