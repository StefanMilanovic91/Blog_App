import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import TopicServices from '../../../services/topic-services/TopicServices';
import AuthServices from '../../../services/auth-service/AuthService';

import Alert from '../../layout/Alert/Alert';
import TopicPost from './TopicPost/TopicPost';
import IsAuth from '../../auxiliary/IsAuth';

import { endPostLoading, setPosts, startPostLoading, setNewPost, removePost } from '../../../store/actions/postActions';
import { setAlert } from '../../../store/actions/alertActions';


const TopicPosts = ({setPosts, setNewPost, posts, postLoading, startPostLoading, endPostLoading, setAlert, alert, removePost}) => {

    const { title, id } = useParams();
    const history = useHistory();
    const [newPost, setTypedPost] = useState({post: ""});
    

    useEffect(() => {
        startPostLoading();
        setPosts(null);

        // get all Posts by topic id 
        TopicServices.getPostsByTopicId(id).then(res => res.data).then(data => {

            endPostLoading();
            if (data.posts.length > 0) {
                setPosts(data.posts);
            } else {
                setAlert({ msg: 'Posts not found.', class: 'danger' });
            }
                
        }).catch(err => {
            endPostLoading()
            let errors = err.response.response.errors;
            if (errors) {
                setAlert({ msg: err.response.data.errors[0].msg, class: 'danger' });
            }
            setTimeout(() => history.push('/'), 3000);
        });
       

    }, []);

    
    // submit new post

    const submitPost = (e) => {
        e.preventDefault(); 
        startPostLoading();
        let token = AuthServices.getLocalData();

        if (token) {

            TopicServices.addNewPost(newPost, token, id).then(res => res.data).then(data => {
                endPostLoading();
                // add new post to store
                setNewPost(data.newPost);
    
            }).catch(err => {
                endPostLoading();
                let errors = err.response.data.errors;
                
                if (errors) {
                    setAlert({ msg: err.response.data.errors[0].msg, class: 'danger' });
                    setTimeout(() => history.push('/'), 3000);
                }
            });
        }
        
        
    }

    // remove post 

    const removePostHendler = (id) => {
        let token = AuthServices.getLocalData();
        
        if (token) {
            TopicServices.removePost(id, token).then(res => res.data).then(data => {
                
                removePost(id);
            }).catch(err => {
                let errors = err.response.data.errors;
                if (errors) {
                    setAlert({ msg: err.response.data.errors[0].msg, class: 'danger' });
                };
            });
        }
    }

    return (
        <div className="Page">
            <div className="container">
                <div className="row">
                    <h1 className="display-4 py-5 mb-5">Topic / {title}</h1>
                </div>
                <div className="row justify-content-center">
                    {
                        posts !== null ?
                            posts.map(post => <TopicPost removePostHendler={removePostHendler} post={post} key={post._id} />) :
                            postLoading && <div className="lds-dual-ring-big"></div>
                    }
                </div>

                
                <Alert alert={alert} />

                <IsAuth>
                    <div className="Posts__add-new-post">
                        <div className="row mt-5 mb-3">
                            <h3 className="ml-3">Add New Post</h3>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-8">
                                <div className="form-group">
                                    <textarea rows="5" onChange={(e) => setTypedPost({ ...newPost, [e.target.name]: e.target.value })} value={newPost.content} type="text" className="form-control" placeholder="Text of the New Post" name="post"></textarea>
                                </div>
                                <button onClick={submitPost} className="btn btn-info d-block mr-auto">ADD POST</button>
                            </div>
                        </div>
                    </div>
                </IsAuth>
                

            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.isAuthenticated,
        loading: state.authReducer.loading,
        posts: state.postReducer.posts,
        postLoading: state.postReducer.loading,
        alert: state.alertReducer.alert
    }
}

export default connect(mapStateToProps, { setPosts, setNewPost, startPostLoading, endPostLoading, setAlert, removePost })(TopicPosts)
