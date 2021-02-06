import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import Alert from '../../layout/Alert/Alert';
import TopicPost from './TopicPost/TopicPost';
import IsAuth from '../../auxiliary/IsAuth';

import { setPosts, setNewPost } from '../../../store/actions/postActions';



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

        setLocalAlert(null);
        
        // get all posts by topic id
        dispatch(setPosts(true, id, setLocalAlert, history));       
       
    // eslint-disable-next-line
    }, []);


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
                                <button onClick={(e) => { e.preventDefault();  dispatch(setNewPost(newPost, id, setTypedPost, setLocalAlert)) }} className="btn btn-info d-block mr-auto">ADD POST</button>
                            </div>
                        </div>
                    </div>
                </IsAuth>
                

            </div>
        </div>
    )
};

export default TopicPosts
