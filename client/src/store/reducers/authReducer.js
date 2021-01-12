import * as actionTypes from '../types';


const initState = {
    token: null,
    user: null,
    isAuthenticated: false,
    loading: true
};

const logInUser = (state, payload) => {
    return {
        ...state,
        token: payload.token,
        user: {
            name: payload.name,
            id: payload.id
        },
        isAuthenticated: true,
        loading: false
    }
}

const logOutUser = (state) => {
    return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false
    }
}

const endOfAuthLoading = (state) => {
    return {
        ...state,
        loading: false
    }
}

const authReducer = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        
        case actionTypes.LOGIN_USER:
            return logInUser(state, payload);
        case actionTypes.LOGOUT_USER:
            return logOutUser(state);
        case actionTypes.END_OF_AUTH_LOADING:
            return endOfAuthLoading(state);

        default: return state;
    }

};

export default authReducer;