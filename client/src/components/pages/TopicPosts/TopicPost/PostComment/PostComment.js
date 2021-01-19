import React, { useState } from 'react';

import TopicServices from '../../../../../services/topic-services/TopicServices';
import AuthServices from '../../../../../services/auth-service/AuthService';

import IsAuth from '../../../../auxiliary/IsAuth';

const PostComment = ({comment, addSubCommentHendler}) => {

    const [commentOnComment, setCommentOnComment] = useState({ comment: "" });
    const [subComment, setSubComment] = useState(null);
    // add comment on comment
    
    const submit = (e) => {
        e.preventDefault();
        addSubCommentHendler(comment._id, commentOnComment.comment);
        
    }
    
    let subComments = comment.comment.comments
    
    // start from here, refacto comments, add remove functionality...
    return (
        <div className="container">
            <h6>{comment.user.name}</h6>
            <p>{comment.comment.text}</p>
            {
                subComments.length > 0 && subComments.map(subComment =>  <div key={subComment._id} className="container px-5">
                                                                            <h6>{subComment.user.name}</h6>
                                                                            <p>{subComment.comment.text}</p>
                                                                        </div> ) 
            }
            <div className="container"></div>
            <IsAuth>
                <div className="container">
                    <div className="input-group">
                        <input onChange={(e) => setCommentOnComment({...commentOnComment, [e.target.name]: e.target.value} )} value={commentOnComment.comment} name="comment" type="text" className="form-control" placeholder="Comment on comment"/>
                        <div className="input-group-append">
                            <button onClick={submit} className="btn btn-outline-success" type="button" id="button-addon2">Comment</button>
                        </div>
                    </div>
                </div>
            </IsAuth>
            <div className="divider"></div>
        </div>
    )
}

export default PostComment
