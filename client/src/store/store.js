import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rooteReducer from './reducers/index'; 

const initState = {};

const middleware = [thunk];

const store = createStore(
    rooteReducer,
    initState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;