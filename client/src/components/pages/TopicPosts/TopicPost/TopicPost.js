import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import IsAuth from '../../../auxiliary/IsAuth';
import NotAuth from '../../../auxiliary/NotAuth';
import Alert from '../../../layout/Alert/Alert';
import PostComment from './PostComment/PostComment';

import AuthServices from '../../../../services/auth-service/AuthService';
import TopicServices from '../../../../services/topic-services/TopicServices';

import { setAlert } from '../../../../store/actions/alertActions';


const TopicPost = ({post, setAlert, alert, user_id, removePostHendler }) => {

    const [comment, setComment] = useState({ comment: "" });
    //const [alert, setAlertMsg] = useState(null);
    const [postID, setPostID] = useState(null);
    const [comments, setComments] = useState(null);


    useEffect(() => {
        if (post.comments.length > 0) {
            setComments(post.comments);
        } else if (post.comments.length === 0) {
            //setComments(<p className="mb-0 text-muted">No comments yet</p>);
        }
        
    }, [])

    const submit = (e) => {
        e.preventDefault();
        addCommentHendler(post._id, comment.comment);
    };

    // add comment
    const addCommentHendler = (id, comment) => {
        let body = { id, comment }
        let token = AuthServices.getLocalData();

        if (token !== null) {
            TopicServices.addComment(body, token).then(res => res.data).then(data => {
                if (data.comments.length > 0) {
                    setComments(data.comments);
                }else if (data.comments.length === 0) {
                    //setComments(<p className="mb-0 text-muted">No comments yet</p>);
                }
            }).catch(err => {
                let errors = err.response.data.errors;
                
                if (errors) {
                    setPostID(err.response.data.post_id);
                    setAlert({ msg: errors[0].msg, class: 'danger' });
                    setTimeout(() => setPostID(null) , 3000);
                }
                
            });
        }
        
    }

    // add sub comment hendler
    const addSubCommentHendler = (commentId, comment) => {
            
            let token = AuthServices.getLocalData();
            let body = {
                postId: post._id,
                commentId,
                comment
            }

            if (token !== null) {
                TopicServices.addCommentOnComment(body, token).then(res => res.data).then(data => {
                    setComments(data.comments);
                }).catch(err => {
                    {
                        /*let errors = err.response.data.errors;
                    
                        if (errors) {
                            setPostID(err.response.data.post_id);
                            setAlert({ msg: errors[0].msg, class: 'danger' });
                            setTimeout(() => setPostID(null) , 3000);
                        } */
                    }
                })
            }
            
    }

    // remove post

    const removePost = (e) => {
        e.preventDefault();

        removePostHendler(post._id);
    }

    return (
        <div className="col-12 mb-5  px-0">
            <div className="card">
                <div className="card-header d-flex">
                    {post.post}
                    { user_id === post.author.id && <a onClick={removePost} className="ml-auto" href="https://icon-library.net/icon/delete-icon-png-16x16-21.html" title="Delete Icon Png 16X16 #270781"><img src="https://icon-library.net//images/delete-icon-png-16x16/delete-icon-png-16x16-21.jpg" width="20" /></a>}
                </div>
                <div className="card-body">
                    {
                        comments !== null && comments.length > 0 && comments.map(comment => {
                            return <PostComment addSubCommentHendler={addSubCommentHendler} postId={post._id} comment={comment} key={comment._id} />
                        })
                    }
                </div>
                <div className="card-footer">
                    <div className="container">
                        <NotAuth>
                            <p className="mb-0 text-muted">Log In to add a comment.</p>
                        </NotAuth>
                        <IsAuth>
                            <div className="input-group">
                                <input onChange={(e) => setComment({...comment, [e.target.name]: e.target.value} )} value={comment.comment} name="comment" type="text" className="form-control" placeholder="Comment on post"/>
                                <div className="input-group-append">
                                    <button onClick={submit} className="btn btn-outline-success" type="button" id="button-addon2">Comment</button>
                                </div>
                            </div>
                        </IsAuth>
                    </div>
                </div>
            </div>
            { postID === post._id ? <Alert alert={alert}/> : null }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        alert: state.alertReducer.alert,
        user_id: state.authReducer.user !== null && state.authReducer.user.id
    }
}

export default connect(mapStateToProps, { setAlert })(TopicPost)
