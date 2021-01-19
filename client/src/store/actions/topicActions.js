import * as actionTypes from '../types';

export const setTopics = (data) => dispatch => {
    dispatch({
        type: actionTypes.SET_TOPICS,
        payload: data
    });
};

export const setNewTopic = (data) => dispatch => {
    dispatch({
        type: actionTypes.SET_NEW_TOPIC,
        payload: data
    });
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