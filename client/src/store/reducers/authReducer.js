import * as actionTypes from '../types';


const initState = {
    token: null,
    user: null,
    isAuthenticated: false,
    loading: false
};

const authReducer = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        

        default: return state;
    }

};

export default authReducer;