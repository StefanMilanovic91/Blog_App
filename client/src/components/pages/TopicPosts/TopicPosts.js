import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import TopicServices from '../../../services/topic-services/TopicServices';

import Alert from '../../layout/Alert/Alert';
import TopicPost from './TopicPost/TopicPost';
import IsAuth from '../../auxiliary/IsAuth';

import { endPostLoading, setPosts, startPostLoading, setNewPost } from '../../../store/actions/postActions';
import { setAlert } from '../../../store/actions/alertActions';

import { addNewPostHendler } from '../../auxiliary/Hendlers/post-hendlers';


const TopicPosts = ({setPosts, setNewPost, posts, postLoading, startPostLoading, endPostLoading, setAlert, alert}) => {

    const { title, id } = useParams();
    const history = useHistory();
    const [newPost, setTypedPost] = useState({ post: "" });
    const [localAlert, setLocalAlert] = useState(null)
    

    useEffect(() => {

        startPostLoading()
        setLocalAlert(null);

        // get all Posts by topic id 
        TopicServices.getPostsByTopicId(id).then(res => res.data).then(data => {

            setPosts(data.posts);

            if(data.posts.length < 1) {
                setLocalAlert({ msg: 'Posts not found.', class: 'danger' });
            }
            endPostLoading();
                
        }).catch(err => {
            let errors = err.response.response.errors;
            if (errors) {
                setAlert({ msg: errors[0].msg, class: 'danger' });
            }
            setTimeout(() => history.push('/'), 3000);
            endPostLoading();
        });
       
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
                            posts.map(post => <TopicPost comments={post.comments} post={post} key={post._id} />) :
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
                                <button onClick={(e) => addNewPostHendler(e, newPost, id, setLocalAlert, startPostLoading, endPostLoading, setNewPost, setTypedPost, setAlert)} className="btn btn-info d-block mr-auto">ADD POST</button>
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
        posts: state.postReducer.posts,
        postLoading: state.postReducer.loading,
        alert: state.alertReducer.alert
    }
}

export default connect(mapStateToProps, { setPosts, setNewPost, startPostLoading, endPostLoading, setAlert })(TopicPosts)
