import React, { Fragment, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './components/layout/Navbar/Navbar';
import Alert from './components/layout/Alert/Alert';

import Topics from './components/pages/Topics/Topics';
import TopicPosts from './components/pages/TopicPosts/TopicPosts';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';

import { endOfAuthLoading, logInUser, logOutUser } from './store/actions/authActions';
import AuthService from './services/auth-service/AuthService';
import jwt_decode from 'jwt-decode';




const App = ({ alert, endOfAuthLoading, logInUser, logOutUser }) => { 

    useEffect(() => { 

        // check local data
        let token = AuthService.getLocalData();
        if (token !== null) {
            let decodedToken = jwt_decode(token);
            let currTime = Math.floor(Date.now() / 1000);

            if (currTime > decodedToken.exp) {

                // logout User
                logOutUser();
                AuthService.removeLocalData();
            } else {
                logInUser({token, ...decodedToken}); 
            }
            
        }
        endOfAuthLoading();

    }, []);

    return (
        <Fragment>
            <Navbar />
            
            {/*<Alert alert={alert} /> stavi alert popup */}
            

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

const mapStateToProps = state => {
    return {
        alert: state.alertReducer.alert
    }
}

export default connect(mapStateToProps, { endOfAuthLoading, logInUser, logOutUser })(App)
