import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AuthServices from '../../../services/auth-service/AuthService';

import jwt_decode from 'jwt-decode';

import { logInUser } from '../../../store/actions/authActions';
import { setAlert } from '../../../store/actions/alertActions';


import Alert from '../../layout/Alert/Alert';

const Login = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [startLogin, setStartLogin] = useState(false);
    
    const alert = useSelector(state => state.alertReducer.alert);

    const submit = (e) => {
        e.preventDefault();
        setStartLogin(true);

        AuthServices.logIn(formData).then(res => res.data).then(data => {
            setStartLogin(false);

            // save token loacally
            AuthServices.saveDataLocally(JSON.stringify(data.token));

            // save to store
            let decode = jwt_decode(data.token);
            dispatch(logInUser({ token: data.token, ...decode }));
            
            // redirect to previous view
            history.push('/');

        }).catch(err => {
            setStartLogin(false);
            let errors = err.response.data.errors;
            
            if (errors) {
                dispatch(setAlert({ msg: err.response.data.errors[0].msg, class: 'danger' }));
            }
            
        });


    }

    return (
        <div className="Page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        <h1 className="display-4 pt-5">Log In</h1>
                    </div>
                </div>

                
                <Alert alert={alert} />

                <div className="row justify-content-center pt-5">
                    <div className="col-12 col-md-8">
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">E-mail</label>
                                <input onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} value={formData.email} name="email" type="text" className="form-control" placeholder="Your email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} value={formData.password} name="password" type="password" className="form-control" placeholder="Set your password(min length 5 character)" />
                            </div>
                            <button onClick={submit} className="btn btn-block btn-success">{!startLogin ? "SUBMIT" : <div className="lds-dual-ring"></div>}</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login
