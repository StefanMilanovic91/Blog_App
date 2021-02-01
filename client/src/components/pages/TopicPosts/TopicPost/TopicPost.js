import React, { useState } from 'react';
import { connect } from 'react-redux';

// components
import IsAuth from '../../../auxiliary/IsAuth';
import NotAuth from '../../../auxiliary/NotAuth';
import IsAuthor from '../../../auxiliary/IsAuthor';
import Alert from '../../../layout/Alert/Alert';
import PostComment from './PostComment/PostComment';

// actions
import { setAlert } from '../../../../store/actions/alertActions';
import { addComment, updateLike, removePost } from '../../../../store/actions/postActions';

// hendlers
import { addCommentHendler } from '../../../auxiliary/Hendlers/comment-hendlers';
import { removePostHendler, updateLikeHendler } from '../../../auxiliary/Hendlers/post-hendlers';

//icons
import unlikeIconSrc from '../../../../assets/icons/unlike.png'
import likeIconSrc from '../../../../assets/icons/like.jpg'

const TopicPost = ({ userID, post, comments, setAlert, alert, addComment, updateLike, removePost }) => {
    
    const [comment, setComment] = useState({ comment: "" });
    const [postID, setPostID] = useState(null);
    const [likesShow, setLikesShow] = useState(false);
    let userLiked = false;

    
    return (
        <div className="col-12 mb-5  px-0">
            <div className="card">
                <div className="card-header d-flex align-items-center">
                    {post.post}
                    <div onClick={() => setLikesShow(!likesShow)} className="Posts__likes-holder">
                        <img src={likeIconSrc} className="Posts__like-icon" alt="likes" />
                        <span className="badge badge-info ml-1">{post.likes.length}</span>
                        <div className={ likesShow ? "Posts__likes Posts__likes-show" : "Posts__likes" }>
                            {
                                post.likes.map(like => {
                                    userLiked = userID === like.author.id;
                                    return <p key={like._id} className="mb-1 mt-1">{like.author.name}</p>
                                })
                            }
                        </div>
                    </div>
                    <IsAuth>
                        <div onClick={(e) => updateLikeHendler(e, post._id, updateLike, setAlert)} className="Posts__like-btn">
                            <img src={ !userLiked ? likeIconSrc : unlikeIconSrc} className="Posts__like-icon" alt="" />{ !userLiked ? 'Like' : 'Unlike'}
                        </div>
                    </IsAuth>
                    <IsAuthor contentAuthorID={post.author.id} >
                        <a onClick={() => removePostHendler(post._id, removePost, setAlert)} className="ml-5" href="/#" title="Delete Post"><img src="https://icon-library.net//images/delete-icon-png-16x16/delete-icon-png-16x16-21.jpg" width="20" alt="Delete post" /></a>
                    </IsAuthor>
                </div>
                <div className="card-body">
                    <div className="container">
                        <div className="divider"></div>
                    </div>

                    {
                        comments !== null && comments.length > 0 && comments.map(comment => {

                            return <PostComment
                                setPostID={setPostID}
                                postId={post._id}
                                comment={comment}
                                key={comment._id}
                            />
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
                                <input onChange={(e) => setComment({ ...comment, [e.target.name]: e.target.value })} value={comment.comment} name="comment" type="text" className="form-control" placeholder="Comment on post" />
                                <div className="input-group-append">
                                    <button onClick={(e) => addCommentHendler(e, post._id, comment.comment, setComment, addComment, setAlert, setPostID)} className="btn btn-outline-success" type="button" id="button-addon2">Comment</button>
                                </div>
                            </div>
                        </IsAuth>
                    </div>
                </div>
            </div>
            { postID === post._id && <Alert alert={alert} />}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        alert: state.alertReducer.alert,
        userID: state.authReducer.user !== null && state.authReducer.user.id 
    }
}

export default connect(mapStateToProps, { setAlert, addComment, updateLike, removePost })(TopicPost)
