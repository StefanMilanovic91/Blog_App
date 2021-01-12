import axios from 'axios';

class AuthService {

    static register(formData) {

        let body = JSON.stringify(formData);

        return axios.post('/user/register', body, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    static logIn(body) {
        return axios.post('/user/login', body);
    }

    static saveDataLocally(token) {
        localStorage.setItem('auth-token', token);
    }

    static getLocalData() {
        let token = localStorage.getItem('auth-token');
        return token ? JSON.parse(token) : null;
    }

    static removeLocalData() {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user');
    }

};

export default AuthService;