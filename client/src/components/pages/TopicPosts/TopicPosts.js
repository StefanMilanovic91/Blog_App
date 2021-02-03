import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import TopicServices from '../../../services/topic-services/TopicServices';
import AuthServices from '../../../services/auth-service/AuthService';

import Alert from '../../layout/Alert/Alert';
import TopicPost from './TopicPost/TopicPost';
import IsAuth from '../../auxiliary/IsAuth';

import { endPostLoading, setPosts, startPostLoading, setNewPost } from '../../../store/actions/postActions';
import { setAlert } from '../../../store/actions/alertActions';



const TopicPosts = () => {


    const { title, id } = useParams();
    const history = useHistory();
    const [newPost, setTypedPost] = useState({ post: "" });
    const [localAlert, setLocalAlert] = useState(null)
    
    const posts = useSelector(state => state.postReducer.posts);
    const postLoading = useSelector(state => state.postReducer.loading)
    const alert = useSelector(state => state.alertReducer.alert)

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(startPostLoading());
        setLocalAlert(null);

        // get all Posts by topic id 
        TopicServices.getPostsByTopicId(id).then(res => res.data).then(data => {

            dispatch(setPosts(data.posts));

            if(data.posts.length < 1) {
                setLocalAlert({ msg: 'Posts not found.', class: 'danger' });
            }
            dispatch(endPostLoading());
                
        }).catch(err => {
            let errors = err.response.response.errors;
            if (errors) {
                dispatch(setAlert({ msg: errors[0].msg, class: 'danger' }));
            }
            setTimeout(() => history.push('/'), 3000);
            dispatch(endPostLoading());
        });
       
    // eslint-disable-next-line
    }, []);


    const addNewPostHendler = (e, newPost) => {
    
        e.preventDefault();
        setLocalAlert(null);
        dispatch(startPostLoading());
    
        let token = AuthServices.getLocalData();
    
        if (token) {
    
            TopicServices.addNewPost(newPost, token, id).then(res => res.data).then(data => {
                dispatch(endPostLoading());
                // add new post to store
                dispatch(setNewPost(data.newPost));
                // clear input
                setTypedPost({ post: "" });
            }).catch(err => {
                dispatch(endPostLoading());
                let errors = err.response.data.errors;
                if (errors) {
                    dispatch(setAlert({ msg: errors[0].msg, class: 'danger' }));
                }
            });
        }
        
        
    };

    return (
        <div className="Posts Page">
            <div className="container">
                <div className="row">
                    <h1 className="display-4 py-5 mb-5">Topic / {title}</h1>
                </div>
                <div className="row justify-content-center">
                    {
                        posts !== null ?
                            posts.map(post => <TopicPost post={post} key={post._id} />) :
                            !postLoading && <div className="lds-dual-ring-big"></div>
                    }
                    { postLoading && <div className="lds-dual-ring-big"></div> }
                </div>

                
                <Alert alert={alert} />
                { localAlert && <Alert alert={localAlert} /> }
                
                <IsAuth>
                    <div className="Posts__add-new-post">
                        <div className="row mt-5 mb-3">
                            <h3 className="ml-3">Add New Post</h3>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-8">
                                <div className="form-group">
                                    <textarea rows="5" onChange={(e) => setTypedPost({ ...newPost, [e.target.name]: e.target.value })} value={newPost.post} type="text" className="form-control" placeholder="Text of the New Post" name="post"></textarea>
                                </div>
                                <button onClick={(e) => addNewPostHendler(e, newPost)} className="btn btn-info d-block mr-auto">ADD POST</button>
                            </div>
                        </div>
                    </div>
                </IsAuth>
                

            </div>
        </div>
    )
};

export default connect(null, { setNewPost, setAlert })(TopicPosts)
