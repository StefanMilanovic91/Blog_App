import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import TopicServices from '../../../services/topic-services/TopicServices';
import AuthServices from '../../../services/auth-service/AuthService';

import Alert from '../../layout/Alert/Alert';

const TopicPosts = ({topics}) => {

    const { title, id } = useParams();
    const history = useHistory();
    const [newPost, setNewPost] = useState({post: ""});
    const [loader, setLoader] = useState(false);
    const [alert, setAlert] = useState(null);
    

    useEffect(() => {
        // fetch all topic posts from server or from the store
// nastavi posle dodavanja posta
        if (topics !== null && topics.length > 0) {
            let tpc = topics.filter(topic => {
                if (topic._id === id) return topic;
            });

            } else {
                TopicServices.getTopicById(id).then(res => res.data).then(data => {
                    console.log(data);
    
                    // ubaci manuelno postove i prikazi ih
                }).catch(err => {
                    console.log(err.response.data);
                    history.push('/');
                })
            }

    }, []);

    // submit new post

    const submitPost = (e) => {
        e.preventDefault(); 
        let token = AuthServices.getLocalData();
        TopicServices.addNewPost(newPost, token, id).then(res => res.data).then(data => {
            console.log(data);
        }).catch(err => {
            if (err.response) {
                console.log(err.response.data.errors);
                setAlert({ msg: err.response.data.errors[0].msg, class: 'danger' });
                setTimeout(() => setAlert(null), 3000);
            }
        });
        // nastavi odavde, posalji novi post na server na odgovarajucu rutu
    }

    return (
        <div className="Page">
            <div className="container">
                <div className="row">
                    <h1 className="display-4 py-5 mb-5">Topic / {title}</h1>
                </div>
                <div className="row">
                    
                </div>

                
                    <Alert alert={alert} />

                    <div className="TopicPosts__add-new-post">
                        <div className="row mt-5 mb-3">
                            <h3 className="ml-3">Add New Post</h3>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-8">
                                <div className="form-group">
                                    <textarea rows="5" onChange={(e) => setNewPost({ ...newPost, [e.target.name]: e.target.value })} value={newPost.content} type="text" className="form-control" placeholder="Text of the New Post" name="post"></textarea>
                                </div>
                                <button onClick={submitPost} className="btn btn-info d-block mr-auto">ADD POST</button>
                            </div>
                        </div>
                    </div>

            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        topics: state.topicReducer.topics.length > 0 && state.topicReducer.topics
    }
}

export default connect(mapStateToProps)(TopicPosts)
