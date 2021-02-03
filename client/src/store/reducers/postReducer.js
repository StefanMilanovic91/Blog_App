import * as actionTypes from '../types';

const initState = {
    posts: [],
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

const addComment = (state, payload) => {
    let posts = state.posts.map(post => Object.assign({}, post));
    let postIndex = posts.findIndex(post => post._id === payload.id);
    posts[postIndex].comments.push(payload.comment);
    
    return {
        ...state,
        posts: posts
    }
}

const updateLike = (state, payload) => {
    
    const { postID, data: { like, unlike } } = payload;
    let posts = [...state.posts];
    
    // remove like
    if (!unlike) {
        return {
            ...state,
            posts: posts.map(post => (post._id === postID) ? { ...post, likes: [...post.likes, like] } : post)
        }
    }
    // add like
    return {
        ...state,
        posts: posts.map(post => (post._id === postID) ? { ...post, likes: post.likes.filter(lks => lks._id !== like._id ) } : post)
    }
   
}

const addSubComment = (state, payload) => {
    
    let posts = state.posts.map(post => Object.assign({}, post));
    let postIndex = posts.findIndex(post => post._id === payload.postID);
    
    let commentIndex = posts[postIndex].comments.findIndex(comment => comment._id === payload.commentID);
    let subComm = [...posts[postIndex].comments[commentIndex].comment.comments]
    posts[postIndex].comments[commentIndex].comment.comments = [...subComm,  {...payload.comment}];
   
    return {
        ...state,
        posts: posts
    }
}

const removeComment = (state, payload) => {

    let posts = state.posts.map(post => Object.assign({}, post));
    let postIndex = posts.findIndex(post => post._id === payload.postID);
    let newComments = posts[postIndex].comments.filter(comment => comment._id !== payload.commentID);
    posts[postIndex].comments = newComments;

    return {
        ...state,
        posts: posts
    }
}

const removeSubComment = (state, payload) => {
    let posts = [...state.posts];

    let postIndex = posts.findIndex(post => post._id === payload.postID);
    let commentIndex = posts[postIndex].comments.findIndex(comment => comment._id === payload.commentID);
    let newSubComments = posts[postIndex].comments[commentIndex].comment.comments.filter(comment => comment._id !== payload.subCommentID);
    
    posts[postIndex].comments[commentIndex].comment.comments = newSubComments;

    return {
        ...state,
        posts: posts
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
        case actionTypes.REMOVE_POST:
            return removePost(state, payload);
        
        case actionTypes.ADD_COMMENT:
            return addComment(state, payload);
        case actionTypes.ADD_SUB_COMMENT:
            return addSubComment(state, payload);
        case actionTypes.REMOVE_COMMENT:
            return removeComment(state, payload);
        case actionTypes.REMOVE_SUB_COMMENT:
            return removeSubComment(state, payload);
        
        case actionTypes.UPDATE_LIKE:
            return updateLike(state, payload);
        
        case actionTypes.START_LOADING:
            return startPostLoading(state);
        case actionTypes.END_LOADING:
            return endPostLoading(state);
        
        default: return state;
    }

}

export default postReducer;