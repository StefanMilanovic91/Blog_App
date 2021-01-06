import React, { useState } from 'react'

const Login = () => {


    const [formData, setFormData] = useState({ email: "", password: "" });

    const submit = (e) => {
        e.preventDefault();
        // send login data for login// ( AuthService )
        console.log(formData);
    }

    return (
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
                            <input onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value}) } value={formData.email} name="email" type="text" className="form-control" placeholder="Your email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value}) } value={formData.password} name="password" type="password" className="form-control" placeholder="Set your password(min length 5 character)" />
                        </div>
                        <button onClick={submit} className="btn btn-block btn-success">SUBMIT</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
