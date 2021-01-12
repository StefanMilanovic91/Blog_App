import * as actionTypes from '../types';


const initState = {
    topics: []
};

const setTopics = (state, payload) => {
    return {
        ...state,
        topics: payload
    }
}

const authReducer = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        
        case actionTypes.SET_TOPICS:
            return setTopics(state, payload);

        default: return state;
    }

};

export default authReducer;