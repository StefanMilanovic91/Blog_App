import * as actionTypes from '../types';

import AuthServices from '../../services/auth-service/AuthService';
import TopicServices from '../../services/topic-services/TopicServices';

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

    let token = AuthServices.getLocalData();
        
    if (token) {
        TopicServices.removePost(id, token).then(res => res.data).then(data => {
            // remove post from store
            dispatch({
                type: actionTypes.REMOVE_POST,
                payload: id
            });
            // alert message
            dispatch({
                type: actionTypes.SET_ALERT,
                payload: { msg: data.msg, class: 'success' }
            });
            //remove alert msg
            setTimeout(() => { 
                dispatch({
                    type: actionTypes.REMOVE_ALERT
                })
            }, 3000);
            
        }).catch(err => {
            let errors = err.response.data.errors;
            if (errors) {
                dispatch({
                    type: actionTypes.SET_ALERT,
                    payload: { msg: errors[0].msg, class: 'success' }
                });
            };
        });
    } else {
        dispatch({
            type: actionTypes.LOGOUT_USER
        });
    }

    
};

export const addComment = (id, comment, setComment, setPostID) => dispatch => {

    let body = { id, comment }
    let token = AuthServices.getLocalData();

    if (token !== null) {
        TopicServices.addComment(body, token).then(res => res.data).then(data => {
            
            // input for comment
            setComment({ comment: "" });
            // add comment to store
            dispatch({
                type: actionTypes.ADD_COMMENT,
                payload: {
                    id,
                    comment: data.comment
                }
            });

        }).catch(err => {
            let errors = err.response.data.errors;

            if (errors) {
                setPostID(err.response.data.post_id);
                dispatch({
                    type: actionTypes.SET_ALERT,
                    payload: { msg: errors[0].msg, class: 'danger' }
                });
                setTimeout(() => setPostID(null), 3000);
            }

        })

    } else {
        dispatch({
            type: actionTypes.LOGOUT_USER
        });
    }
    
};

export const addSubComment = (postID, commentID, comment, setCommentOnComment, setPostID) => dispatch => {
    
    

    let token = AuthServices.getLocalData();
    let body = {
        postId: postID,
        commentId: commentID,
        comment
    }

    if (token !== null) {
        TopicServices.addCommentOnComment(body, token).then(res => res.data).then(data => {

            // add sub comment to store
            dispatch({
                type: actionTypes.ADD_SUB_COMMENT,
                payload: {
                    postID, commentID, comment: data.newSubComment
                }
            });

            // clear input
            setCommentOnComment({ comment: "" });

        }).catch(err => {

            let errors = err.response.data.errors;
            if (errors) {
                setPostID(err.response.data.post_id);
                dispatch({
                    type: actionTypes.SET_ALERT,
                    payload: { msg: errors[0].msg, class: 'danger' }
                });
                setTimeout(() => setPostID(null), 3000);
            }

        })
    } else {
        dispatch({
            type: actionTypes.LOGOUT_USER
        });
    }

    
};

export const removeComment = (postID, commentID) => dispatch => {

    let token = AuthServices.getLocalData();
    if (token !== null){
        TopicServices.removeComment(postID, commentID, token).then(res => res.data).then(data => {

            // remove comment from store
            dispatch({
                type: actionTypes.REMOVE_COMMENT,
                payload: {
                    postID,
                    commentID
                }
            });

        }).catch(err => {

            let errors = err.response.data.errors;
            if (errors) {
                dispatch({
                    type: actionTypes.SET_ALERT,
                    payload: { msg: errors[0].msg, class: 'danger' }
                });
            }
        })
    } else {
        dispatch({
            type: actionTypes.LOGOUT_USER
        });
    }
    
};

export const removeSubComment = (postID, commentID, subCommentID) => dispatch => {

    let token = AuthServices.getLocalData();

    if (token !== null) {
        TopicServices.removeSubComment(postID, commentID, subCommentID, token).then(res => res.data).then(data => {

            // remove sub comment from store 
            dispatch({
                type: actionTypes.REMOVE_SUB_COMMENT,
                payload: {
                    postID,
                    commentID,
                    subCommentID
                }
            });

        }).catch(err => {
            let errors = err.response.data.errors;
            if (errors) {
                dispatch({
                    type: actionTypes.SET_ALERT,
                    payload: { msg: errors[0].msg, class: 'danger' }
                });
            } 
        });

    }

    
};

export const updateLike = (postID) => dispatch => {
    
    let token = AuthServices.getLocalData();

    if (token !== null) {
        TopicServices.likeUnlike(postID, token).then(res => res.data).then(data => {

            //add like to store
            dispatch({
                type: actionTypes.UPDATE_LIKE,
                payload: {
                    postID, data
                }
            });

        }).catch(err => {
            let errors = err.response.data.errors;
            if (errors) {
                dispatch({
                    type: actionTypes.SET_ALERT,
                    payload: { msg: errors[0].msg, class: 'danger' }
                });
            }
        });
    } else {
        dispatch({
            type: actionTypes.LOGOUT_USER
        })
    }

    
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


