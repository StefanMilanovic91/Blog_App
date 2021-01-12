import React, { useState } from 'react'
import AuthService from '../../../services/auth-service/AuthService';
import { connect } from 'react-redux';
import  jwt_decode  from 'jwt-decode';
import { logInUser } from '../../../store/actions/authActions';
import { setAlert } from '../../../store/actions/alertActions';
import { useHistory } from 'react-router-dom';

const Login = ({ logInUser, setAlert }) => {

    const history = useHistory()

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [startLogin, setStartLogin] = useState(false);
    
    const submit = (e) => {
        e.preventDefault();
        setStartLogin(true);

        AuthService.logIn(formData).then(res => res.data).then(data => {
            setStartLogin(false);

            // save token loacally
            AuthService.saveDataLocally(JSON.stringify(data.token));

            // save to store
            let decode = jwt_decode(data.token);
            logInUser({ token: data.token, ...decode });
            
            // redirect to home page
            history.push('/topics');

        }).catch(err => {
            setStartLogin(false);
            if (err) {
                setAlert({ msg: err.response.data.errors[0].msg, class: 'danger' });
            }
            
        });


    }

    return (
        <div className="Page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        <h1 className="display-4 py-5">Log In</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
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
}

export default connect(null, { logInUser, setAlert })(Login);
