import * as actionTypes from '../types';


const initState = {
    topics: [],
    loading: true
};

const setTopics = (state, payload) => {
    return {
        ...state,
        topics: payload,
        loading: false
    }
}

const setNewTopic = (state, payload) => {
    return {
        ...state,
        topics: [...state.topics, payload],
        loading: false
    }
}

const startLoading = (state) => {
    return {
        ...state,
        loading: true
    }
}

const endLoading = (state) => {
    return {
        ...state,
        loading: false
    }
}



const topicReducer = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        
        case actionTypes.SET_TOPICS:
            return setTopics(state, payload);
        case actionTypes.SET_NEW_TOPIC:
            return setNewTopic(state, payload);
        case actionTypes.START_LOADING:
            return startLoading(state);
        case actionTypes.END_LOADING:
            return endLoading(state);

        default: return state;
    }

};

export default topicReducer;