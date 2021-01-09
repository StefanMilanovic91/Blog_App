import axios from 'axios';

class AuthService {

    static register(body) {
        return axios.post('/register', body);
    }

    static logIn(body) {
        return axios.post('/user/login', body);
    }

    static saveDataLocally(data) {
        localStorage.setItem('auth-token', data.token);
        localStorage.setItem('user', data.name);
    }

    static getLocalData(data) {
        let token = localStorage.getItem('auth-token');
        let name = localStorage.getItem('user');
        let userData = null
        if (token) 
            userData = {
                token, name
            }

        return userData;
    }

    static removeLocalData() {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user');
    }

};

export default AuthService;