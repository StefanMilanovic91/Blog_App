
import AuthServices from '../../../services/auth-service/AuthService';
import TopicServices from '../../../services/topic-services/TopicServices';


// add comment
export const addCommentHendler = (e, id, comment, setComment, addComment, setAlert, setPostID) => {

    e.preventDefault();
     
    let body = { id, comment }
    let token = AuthServices.getLocalData();

    if (token !== null) {
        TopicServices.addComment(body, token).then(res => res.data).then(data => {
            // input for comment
            setComment({ comment: "" });

            // add comment to store
            addComment(id, data.comment);

        }).catch(err => {
            let errors = err.response.data.errors;

            if (errors) {
                setPostID(err.response.data.post_id);
                setAlert({ msg: errors[0].msg, class: 'danger' });
                setTimeout(() => setPostID(null), 3000);
            }

        });
    }

};


// add sub comment hendler
export const addSubCommentHendler = (e, postID, commentId, comment, addSubComment, setCommentOnComment, setAlert, setPostID) => {
    e.preventDefault();
    setCommentOnComment({ comment: "" });

    let token = AuthServices.getLocalData();
    let body = {
        postId: postID,
        commentId,
        comment
    }

    if (token !== null) {
        TopicServices.addCommentOnComment(body, token).then(res => res.data).then(data => {
            // add sub comment to store
            addSubComment(postID, commentId, data.newSubComment);

        }).catch(err => {

            let errors = err.response.data.errors;

            if (errors) {
                setPostID(err.response.data.post_id);
                setAlert({ msg: errors[0].msg, class: 'danger' });
                setTimeout(() => setPostID(null), 3000);
            }

        })
    }

};

// remove comment
export const removeCommentHendler = (e, postID, commentID, removeComment, setAlert) => {
    e.preventDefault();

    let token = AuthServices.getLocalData();
    if (token !== null)
        TopicServices.removeComment(postID, commentID, token).then(res => res.data).then(data => {

            // remove comment from store
            removeComment(postID, commentID);

        }).catch(err => {

            let errors = err.response.data.errors;
            if (errors) {
                setAlert({ msg: errors[0].msg, class: 'danger' });
            }
        })

};


// remove sub comment hendler
export const removeSubCommentHendler = (e, postID, commentID, subCommentID, removeSubComment, setAlert) => {
    e.preventDefault();
    let token = AuthServices.getLocalData();

    if (token !== null) {
        TopicServices.removeSubComment(postID, commentID, subCommentID, token).then(res => res.data).then(data => {

            removeSubComment(postID, commentID, subCommentID, token);
        }).catch(err => {
            let errors = err.response.data.errors;
            if (errors) {
                setAlert({ msg: errors[0].msg, class: 'danger' });
            } 
        });

    }
}