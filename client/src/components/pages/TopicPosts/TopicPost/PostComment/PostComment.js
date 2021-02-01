import React, { useState } from 'react';
import { connect } from 'react-redux';

import IsAuth from '../../../../auxiliary/IsAuth';
import IsAuthor from '../../../../auxiliary/IsAuthor';

import { addSubComment, removeComment, removeSubComment } from '../../../../../store/actions/postActions';
import { setAlert } from '../../../../../store/actions/alertActions';

import { addSubCommentHendler, removeCommentHendler, removeSubCommentHendler } from '../../../../auxiliary/Hendlers/comment-hendlers';

const PostComment = ({ comment, setPostID, postId, removeComment, removeSubComment, addSubComment, setAlert }) => {

    const [commentOnComment, setCommentOnComment] = useState({ comment: "" });
    const subComments = comment.comment.comments;


    return (
        <div className="container">
            <div className="d-flex">
                <div className="comment-holder">
                    <h6>{comment.author.name}</h6>
                    <p>{comment.comment.text}</p>
                </div>
                <IsAuth>
                    <IsAuthor contentAuthorID={comment.author.id}>
                        <a onClick={(e) => removeCommentHendler(e, postId, comment._id, removeComment, setAlert) } href="/#" className="ml-auto"><img src="https://icon-library.net//images/delete-icon-png-16x16/delete-icon-png-16x16-21.jpg" width="20" alt="Delete comment" /></a>
                    </IsAuthor>
                </IsAuth>
            </div>
            {
                subComments.length > 0 && subComments.map(subComment => <div key={subComment._id} className="container ml-3">

                    <div className="d-flex flex-column pl-5">
                        <div className="divider pl-5"></div>
                        <div className="d-flex">
                            <div className="comment-holder">
                                <h6>{subComment.author.name}</h6>
                                <p>{subComment.comment.text}</p>
                            </div>
                                <IsAuth>
                                    <IsAuthor contentAuthorID={subComment.author.id} >
                                        <a onClick={(e) => removeSubCommentHendler(e, postId, comment._id, subComment._id, removeSubComment, setAlert)} href="/#" className="ml-auto"><img src="https://icon-library.net//images/delete-icon-png-16x16/delete-icon-png-16x16-21.jpg" width="20" alt="Delete sub comment" /></a>
                                    </IsAuthor>
                                </IsAuth>
                            </div>

                    </div>
                </div>)
            }

            <IsAuth>
                <div className="container pl-5 pr-0">
                    <div className="pl-4">
                        <div className="divider pl-5"></div>
                        <div className="input-group">
                            <input onChange={(e) => setCommentOnComment({ ...commentOnComment, [e.target.name]: e.target.value })} value={commentOnComment.comment} name="comment" type="text" className="form-control" placeholder="Add sub comment on comment" />
                            <div className="input-group-append">
                                <button onClick={(e) => addSubCommentHendler(e, postId, comment._id, commentOnComment.comment, addSubComment, setCommentOnComment, setAlert, setPostID)} className="btn btn-outline-success" type="button" id="button-addon2">Comment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </IsAuth>
            <div className="divider"></div>
        </div>
    )
}


export default connect(null, { addSubComment, removeComment, setAlert, removeSubComment })(PostComment)
