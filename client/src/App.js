import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/layout/Navbar/Navbar';

import Topics from './components/pages/Topics/Topics';
import Topic from './components/pages/Topic/Topic';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';


const App = () => { 

    return (
        <Fragment>
            
            <Navbar />

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

export default App
