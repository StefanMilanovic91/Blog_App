import * as actionTypes from '../types';

export const setTopics = (data) => dispatch => {
    dispatch({
        type: actionTypes.SET_TOPICS,
        payload: data
    });
};