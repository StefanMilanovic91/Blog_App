import { combineReducers } from 'redux';

import authReducer from './authReducer';
import alertReducer from './alertReducer';
import topicReducer from './topicReducer';

export default combineReducers({
    authReducer,
    alertReducer,
    topicReducer
});