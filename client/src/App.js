import React, { Fragment, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Navbar from './components/layout/Navbar/Navbar';

import Topics from './components/pages/Topics/Topics';
import TopicPosts from './components/pages/TopicPosts/TopicPosts';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';

import { endOfAuthLoading, logInUser, logOutUser } from './store/actions/authActions';
import AuthService from './services/auth-service/AuthService';
import jwt_decode from 'jwt-decode';




const App = () => { 

    const dispatch = useDispatch();

    useEffect(() => { 

        // check local data
        let token = AuthService.getLocalData();
        
        if (token) {
            let decodedToken = jwt_decode(token);
            
            let currTime = Math.floor(Date.now() / 1000);

            if (currTime > decodedToken.exp) {
                
                // clear local storage
                AuthService.removeLocalData();

                // logout User
                dispatch(logOutUser());
                
            } else {
                dispatch(logInUser({token, ...decodedToken})); 
            }
            
        }
        dispatch(endOfAuthLoading());
    // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <Navbar />
            

            <Switch>
                <Route exact path="/" render={() => <Redirect to="/topics" />} />

                <Route exact path="/topics" component={Topics} /> 
                <Route path="/topics/topic_posts/:title/:id" component={TopicPosts} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                
                <Redirect to="/topics" />
            </Switch>

        </Fragment>
    )
}

export default App
