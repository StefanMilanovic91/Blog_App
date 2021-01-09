import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import AuthService from '../../../services/auth-service/AuthService';
import { setAlert } from '../../../store/actions/alertActions';

const Register = () => {

    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [startRegister, setStartRegister] = useState(false);

    const history = useHistory();

    const submit = (e) => {
        e.preventDefault();
        setStartRegister(true);
        // send register data
        AuthService.register(formData).catch(res => res.data).catch(data => {
            console.log(data);
            history.push('/login');
            setStartRegister(false);

        }).catch(err => {
            setAlert({ msg: err.response.data.msg, class: 'danger' });
            console.log(err.response.data);
            setStartRegister(false);

        });
    }

    return (
        <div className="Page">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <h1 className="display-4 py-5">Register</h1>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value}) } value={formData.name} name="name" type="text" className="form-control" placeholder="Your name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value}) } value={formData.email} name="email" type="text" className="form-control" placeholder="Your email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value}) } value={formData.password} name="password" type="password" className="form-control" placeholder="Set your password(min length 5 character)" />
                        </div>
                        <button onClick={submit} className="btn btn-block btn-success">{!startRegister ? "SUBMIT" : <div className="lds-dual-ring"></div>}</button>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Register
