import AuthServices from '../../../services/auth-service/AuthService';
import TopicServices from '../../../services/topic-services/TopicServices';

// add new post
export const addNewPostHendler = (e, newPost, id, setLocalAlert, startPostLoading, endPostLoading, setNewPost, setTypedPost, setAlert) => {
    e.preventDefault();
    setLocalAlert(null);
    startPostLoading();

    let token = AuthServices.getLocalData();

    if (token) {

        TopicServices.addNewPost(newPost, token, id).then(res => res.data).then(data => {
            endPostLoading();
            // add new post to store
            setNewPost(data.newPost);
            // clear input
            setTypedPost({ post: "" });
        }).catch(err => {
            endPostLoading();
            let errors = err.response.data.errors;
            if (errors) {
                setAlert({ msg: errors[0].msg, class: 'danger' });
            }
        });
    }
    
    
};


// remove post 
export const removePostHendler = (id, removePost, setAlert) => {
    let token = AuthServices.getLocalData();
    
    if (token) {
        TopicServices.removePost(id, token).then(res => res.data).then(data => {
            // remove post from store
            removePost(id);
            // alert message
            setAlert({ msg: data.msg, class: 'success' });
            
        }).catch(err => {
            let errors = err.response.data.errors;
            if (errors) {
                setAlert({ msg: errors[0].msg, class: 'danger' });
            };
        });
    }
}

// like/unlike post hendler

export const updateLikeHendler = (e, postID, updateLike, setAlert) => {
    e.preventDefault();
    let token = AuthServices.getLocalData();


    if (token !== null) {
        TopicServices.likeUnlike(postID, token).then(res => res.data).then(data => {

            //add like to store
            updateLike(postID, data);

        }).catch(err => {
            let errors = err.response.data.errors;
            if (errors) {
                setAlert({ msg: errors[0].msg, class: 'danger' });
            }
        });
    }
    
}