import * as actionTypes from '../types';

const initState = {
    posts: null,
    loading: false
}

const setPosts = (state, payload) => {
    return {
        ...state,
        posts: payload
    }
}

const setNewPost = (state, payload) => {
    return {
        ...state,
        posts: [...state.posts, payload]
    }
}

const removePost = (state, payload) => {
    return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload)
    }
}

const startPostLoading = (state) => {
    return {
        ...state,
        loading: true
    }
}

const endPostLoading = (state) => {
    return {
        ...state,
        loading: false
    }
}

const postReducer = (state = initState, action) => {

    const { type, payload } = action;

    switch (type) {
        case actionTypes.SET_POSTS:
            return setPosts(state, payload);
        case actionTypes.SET_NEW_POST:
            return setNewPost(state, payload);
        case actionTypes.START_POST_LOADING:
            return startPostLoading(state);
        case actionTypes.END_POST_LOADING:
            return endPostLoading(state);
        case actionTypes.REMOVE_POST:
            return removePost(state, payload);
        
        default: return state;
    }

}

export default postReducer;