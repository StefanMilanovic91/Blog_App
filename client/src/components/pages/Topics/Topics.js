import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import TopicServices from '../../../services/topic-services/TopicServices';
import AuthService from '../../../services/auth-service/AuthService';

import Topic from './Topic/Topic';
import Alert from '../../layout/Alert/Alert';

import { setTopics } from '../../../store/actions/topicActions';

const Topics = ({isAuth, loading, name, topics, setTopics}) => {

    const [loader, setLoader] = useState(false);
    const [allTopics, setAllTopics] = useState(null);
    
    // msg alert from response
    const [alert, setAlert] = useState(null);

    
    useEffect(() => {

        if (topics.length === 0 && topics !== null) {

            // get all topics
            TopicServices.getAllTopics().then(res => res.data).then(data => {
                setTopics(data.topics);
                let allTopics = data.topics.map(topic => <Topic topic={topic} key={topic._id} />);
                setAllTopics(allTopics);

            }).catch(err => {

                if (err.response.data.errors) {
                    console.log(err.response.data.errors[0].msg);
                    setAlert({ msg: err.response.data.errors[0].msg, class: 'danger' });
                    setTimeout(() => setAlert(null), 3000);
                }          
            })
        } else {
            let allTopics = topics.map(topic => <Topic topic={topic} key={topic._id} />);
            setAllTopics(allTopics);
        }
        
    }, []);

    
    
    


    // add new topic request
    const [newTopic, setNewTopic] = useState({ title: "" });

    const submitTopic = (e) => {
        e.preventDefault();
        setLoader(true);

        let token = AuthService.getLocalData();
        if (token) {
            TopicServices.addTopic({ title: newTopic.title }, token).then(res => res.data).then(data => {
                // update topics
                let allTopics = data.topics.map(topic => <Topic topic={topic} key={topic._id} />);
                setAllTopics(allTopics);

                setAlert({msg: data.msg, class: "success"});
                setLoader(false);
                setTimeout(() => setAlert(null), 3000);
            }).catch(err => {
                setAlert({msg: err.response.data.errors[0].msg, class: 'danger'});
                setLoader(false);
                setTimeout(() => setAlert(null), 3000);
            });
        }
        
    }





    // subtitle (login/logout)
    let subTitle = <Fragment><span className="text-danger">Hello Dear Guest,</span> please log in for a full user expirience.</Fragment>;
    if (isAuth && !loading) {
    subTitle = <Fragment> <span className="text-danger">Hello {name},</span> let's blog...</Fragment>
    }
    
    // add topic input (login/logout)
    let addTopic = <Fragment>

                        <div className="Topics__add-new-topics">
                            <div className="row mt-5 mb-3">
                                <h3 className="ml-3">Add New Topic</h3>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-8">
                                    <div className="form-group">
                                        <input onChange={(e) => setNewTopic({ ...newTopic, [e.target.name]: e.target.value })} value={newTopic.title} type="text" className="form-control" placeholder="Name of the New Topic" name="title" />
                                    </div>
                                    <button onClick={submitTopic} className="btn btn-info d-block mr-auto">{loader ? <div className="lds-dual-ring"></div> : 'ADD TOPIC'}</button>
                                </div>
                            </div>
                        </div>
                </Fragment>

    

    

    return (

        <div className="Page Topics">
            <div className="container">
                <div className="row justify-content-center flex-column">
                    <h1 className="display-4 pt-5 ml-3 mb-4">Popular Topics</h1>
                    <p className="Topics__sub-title mb-5 pb-5 ml-3">{!loading && subTitle}</p>
                </div>
                <div className="row">
                    {allTopics === null ? <div className="lds-dual-ring-big mx-auto"></div> : allTopics}
                </div>
                <Alert alert={alert} />
                {isAuth && !loading && addTopic}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.isAuthenticated,
        loading: state.authReducer.loading,
        name: state.authReducer.user !== null && state.authReducer.user.name,
        topics: state.topicReducer.topics
    }
}

export default connect(mapStateToProps, { setTopics })(Topics)
