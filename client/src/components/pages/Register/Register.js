import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { registerUser } from '../../../store/actions/authActions';

import Alert from '../../layout/Alert/Alert';

const Register = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    
    const alert = useSelector(state => state.alertReducer.alert);


    return (
        <div className="Page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        <h1 className="display-4 pt-5">Register</h1>
                    </div>
                </div>

                { <Alert alert={alert} /> }
                
                <div className="row justify-content-center pt-5">
                    <div className="col-12 col-md-8">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} value={formData.name} name="name" type="text" className="form-control" placeholder="Your name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">E-mail</label>
                                <input onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} value={formData.email} name="email" type="text" className="form-control" placeholder="Your email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} value={formData.password} name="password" type="password" className="form-control" placeholder="Set your password(min length 5 character)" />
                            </div>
                            <button onClick={(e) => { e.preventDefault(); dispatch(registerUser(formData, history, setLoading)) }} className="btn btn-block btn-success">{!loading ? "SUBMIT" : <div className="lds-dual-ring"></div>}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default Register
