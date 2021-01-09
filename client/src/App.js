import React, { Fragment, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './components/layout/Navbar/Navbar';
import Alert from './components/layout/Alert/Alert';

import Topics from './components/pages/Topics/Topics';
import Topic from './components/pages/Topic/Topic';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';

import { endOfAuthLoading, logInUser } from './store/actions/authActions';
import AuthService from './services/auth-service/AuthService';




const App = ({ alert, endOfAuthLoading, logInUser }) => { 

    useEffect(() => { 

        // check local data
        let userData = AuthService.getLocalData();
        
        if (userData !== null) {
            logInUser(userData);
        }
        endOfAuthLoading();

    }, []);

    return (
        <Fragment>
            <Navbar />
            
            <Alert alert={alert} />
            

            <Switch>
                <Route exact path="/" render={() => <Redirect to="/topics" />} />

                <Route exact path="/topics" component={Topics} /> 
                <Route path="/topics/topic/:id" component={Topic} />
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

export default connect(mapStateToProps, { endOfAuthLoading, logInUser })(App)
