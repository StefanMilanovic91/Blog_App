import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';

// components
import IsAuth from '../../../auxiliary/IsAuth';
import NotAuth from '../../../auxiliary/NotAuth';
import IsAuthor from '../../../auxiliary/IsAuthor';
import Alert from '../../../layout/Alert/Alert';
import PostComment from './PostComment/PostComment';

// actions
import { addComment, updateLike, removePost } from '../../../../store/actions/postActions';

//icons
import unlikeIconSrc from '../../../../assets/icons/unlike.png'
import likeIconSrc from '../../../../assets/icons/like.jpg'

const TopicPost = ({ userID, post, alert }) => {

    const [comment, setComment] = useState({ comment: "" });
    const [postID, setPostID] = useState(null);
    const [likesShow, setLikesShow] = useState(false);
    
    const userLiked = useRef(false);// checkout bag on how is on liked list, try with useRef...
    
    const dispatch = useDispatch()

    useEffect(() => {
        
        post.likes.forEach(like => {
            if (userID === like.author.id) {
                userLiked.current = true;
            } else {
                userLiked.current = false;
            }
            
        });
        console.log( 'test');
        console.log(userLiked);
    }, [])

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
                                    //userLiked = userID === like.author.id;
                                    return <p key={like._id} className="mb-1 mt-1">{like.author.name}</p>
                                })
                            }
                        </div>
                    </div>
                    <IsAuth>
                        <div onClick={(e) => { e.preventDefault(); dispatch(updateLike(post._id)); }} className="Posts__like-btn">
                            {
                                userLiked.current ? <><img src={likeIconSrc} className="Posts__like-icon" alt="" /><span>'Like'</span></> :
                                                    <><img src={unlikeIconSrc} className="Posts__like-icon" alt="" /><span>'Unlike'</span></>
                            }
                        </div>
                    </IsAuth>
                    <IsAuthor contentAuthorID={post.author.id} >
                        <a onClick={(e) => { e.preventDefault(); dispatch(removePost(post._id)) }} className="ml-5" href="/#" title="Delete Post"><img src="https://icon-library.net//images/delete-icon-png-16x16/delete-icon-png-16x16-21.jpg" width="20" alt="Delete post" /></a>
                    </IsAuthor>
                </div>
                <div className="card-body">
                    <div className="container">
                        <div className="divider"></div>
                    </div>

                    {
                        post.comments !== null &&
                        post.comments.length > 0 &&
                        post.comments.map(comment => <PostComment
                                                        setPostID={setPostID}
                                                        postId={post._id}
                                                        comment={comment}
                                                        subCmnts={comment.comment}
                                                        key={comment._id}
                                                    />)
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
                                    <button onClick={(e) => { e.preventDefault(); dispatch(addComment(post._id, comment.comment, setComment, setPostID)) }} className="btn btn-outline-success" type="button" id="button-addon2">Comment</button>
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

export default connect(mapStateToProps)(TopicPost)
