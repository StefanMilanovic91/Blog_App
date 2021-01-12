import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AuthService from '../../../services/auth-service/AuthService';
import { setAlert } from '../../../store/actions/alertActions';

const Register = ({setAlert}) => {

    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [startRegister, setStartRegister] = useState(false);

    const history = useHistory();

    const submit = (e) => {
        e.preventDefault();
        setStartRegister(true);
        // send register data
        AuthService.register(formData).then(res => res.data).then(data => {
            setStartRegister(false);
            setAlert({ msg: data.msg, class: 'success' });
            setTimeout(() => history.push('/login') , 3000);
            
            
        }).catch(error => {
            if (error.response.data.errors) {
                setAlert({ msg: error.response.data.errors[0].msg, class: 'danger' });
            }
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

export default connect(null, { setAlert })(Register)
