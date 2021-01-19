import * as actionTypes from '../types';

export const setPosts = (posts) => dispatch => {
    dispatch({
        type: actionTypes.SET_POSTS,
        payload: posts
    });
};

export const setNewPost = (post) => dispatch => {
    dispatch({
        type: actionTypes.SET_NEW_POST,
        payload: post
    });
};

export const removePost = (id) => dispatch => {
    dispatch({
        type: actionTypes.REMOVE_POST,
        payload: id
    });
};

export const startPostLoading = () => dispatch => {
    dispatch({
        type: actionTypes.START_POST_LOADING
    });
};

export const endPostLoading = () => dispatch => {
    dispatch({
        type: actionTypes.END_POST_LOADING
    });
};


