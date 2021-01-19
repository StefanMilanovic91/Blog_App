import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import TopicServices from '../../../services/topic-services/TopicServices';
import AuthService from '../../../services/auth-service/AuthService';
import IsAuth from '../../auxiliary/IsAuth';
import NotAuth from '../../auxiliary/NotAuth';

import Topic from './Topic/Topic';
import Alert from '../../layout/Alert/Alert';

import { setTopics, setNewTopic, startLoading, endLoading } from '../../../store/actions/topicActions';
import { setAlert } from '../../../store/actions/alertActions';


const Topics = ({name, topics, setTopics, setAlert, alert, topicsLoading, setNewTopic, startLoading }) => {

    
    const [newTopic, setTypedTopic] = useState({ title: "" });
    
    useEffect(() => {

        if (topics.length === 0 && topics !== null) {

            // get all topics
            TopicServices.getAllTopics().then(res => res.data).then(data => {

                // set topics to store
                setTopics(data.topics);

            }).catch(err => {
                let errors = err.response.data.errors
                if (errors) {
                    setAlert({ msg: err.response.data.errors[0].msg, class: 'danger' });
                } else {
                    window.location.reload(); 
                }
            })
        };
        
    }, []);

    
    
    


    // add new topic request
    

    const submitTopic = (e) => {
        e.preventDefault();
        startLoading();
        let token = AuthService.getLocalData();

        if (token) {

            TopicServices.addTopic({ title: newTopic.title }, token).then(res => res.data).then(data => {
                
                // update topics
                setNewTopic(data.topic);
                setAlert({msg: data.msg, class: "success"});
        

            }).catch(err => {
                let errors = err.response.data.errors
                if(errors)
                setAlert({msg: errors[0].msg, class: 'danger'});
        
            });
        }
        
    }

    

    

    return (

        <div className="Page Topics">
            <div className="container">
                <div className="row justify-content-center flex-column">
                    <h1 className="display-4 pt-5 ml-3 mb-4">Popular Topics</h1>
                    <p className="Topics__sub-title mb-5 pb-5 ml-3">
                        {
                            <Fragment>
                                <NotAuth>
                                    <Fragment><span className="text-danger">Hello Dear Guest,</span> please log in for a full user expirience.</Fragment>
                                </NotAuth>
                                <IsAuth>
                                    <Fragment><span className="text-danger">Hello {name},</span> let's blog...</Fragment>
                                </IsAuth>
                            </Fragment>
                        }
                    </p>
                </div>
                <div className="row">
                    {
                        // render topics from store
                        topicsLoading && topics.length < 1 ?
                            <div className="lds-dual-ring-big mx-auto"></div> :
                            topics.map(topic => <Topic topic={topic} key={topic._id} />)
                    }
                    {
                        //  show if click on add topic btn
                        topicsLoading && topics.length > 1 && <div className="col-12 col-sm-4 col-md-3 mb-3 mb-md-5">
                                                                    <a href="#" className="topic-link disabled">
                                                                        <div className="card">
                                                                            <div className="card-body text-center d-flex align-items-center justify-content-between px-2 py-3">
                                                                                <div className="lds-dual-ring mx-auto"></div>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>
                    }
                </div>

                <Alert alert={alert} />
                
                {/* show add topic input if user is loge in */}
                <IsAuth>
                    <div className="Topics__add-new-topics">
                        <div className="row mt-5 mb-3">
                            <h3 className="ml-3">Add New Topic</h3>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-8">
                                <div className="form-group">
                                    <input onChange={(e) => setTypedTopic({ ...newTopic, [e.target.name]: e.target.value })} value={newTopic.title} type="text" className="form-control" placeholder="Name of the New Topic" name="title" />
                                </div>
                                <button onClick={submitTopic} className="btn btn-info d-block mr-auto">ADD TOPIC</button>
                            </div>
                        </div>
                    </div>
                </IsAuth>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        name: state.authReducer.user !== null && state.authReducer.user.name,
        topics: state.topicReducer.topics,
        alert: state.alertReducer.alert,
        topicsLoading: state.topicReducer.loading
    }
}

export default connect(mapStateToProps, { setTopics, setAlert, setNewTopic, startLoading, endLoading })(Topics)
