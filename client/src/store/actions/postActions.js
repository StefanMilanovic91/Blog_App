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

export const addComment = (postID, comment) => dispatch => {
    dispatch({
        type: actionTypes.ADD_COMMENT,
        payload: {
            postID, comment
        }
    });
};

export const addSubComment = (postID, commentID, comment) => dispatch => {
    
    dispatch({
        type: actionTypes.ADD_SUB_COMMENT,
        payload: {
            postID, commentID, comment
        }
    });
};

export const removeComment = (postID, commentID) => dispatch => {
    dispatch({
        type: actionTypes.REMOVE_COMMENT,
        payload: {
            postID,
            commentID
        }
    });
};

export const removeSubComment = (postID, commentID, subCommentID) => dispatch => {
    dispatch({
        type: actionTypes.REMOVE_SUB_COMMENT,
        payload: {
            postID,
            commentID,
            subCommentID
        }
    });
};

export const updateLike = (postID, data) => dispatch => {
    
    dispatch({
        type: actionTypes.UPDATE_LIKE,
        payload: {
            postID, data
        }
    });
};

export const startPostLoading = () => dispatch => {
    dispatch({
        type: actionTypes.START_LOADING
    });
};

export const endPostLoading = () => dispatch => {
    dispatch({
        type: actionTypes.END_LOADING
    });
};


