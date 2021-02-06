import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'

import AuthService from '../../../services/auth-service/AuthService';

import { logOutUser } from '../../../store/actions/authActions';

import IsAuth from '../../auxiliary/IsAuth';
import NotAuth from '../../auxiliary/NotAuth';

const Navbar = () => {

    const dispatch = useDispatch();
    
    const isAuth = useSelector(state => state.authReducer.isAuthenticated);
    const [toggleMenu, setToggleMenu] = useState(false);
    

    const toggleMenuHendler = () => setToggleMenu(!toggleMenu);
    let navbarClasses = ["navbar navbar-expand-md navbar-dark bg-dark"].join(' ');
    if (toggleMenu) {
        navbarClasses = ["navbar navbar-show navbar-expand-md navbar-dark bg-dark"].join(' ');
        if (isAuth) navbarClasses = ["navbar navbar-auth-show navbar-expand-md navbar-dark bg-dark"].join(' ');
    }



    const logOut = (e) => {

        e.preventDefault();

        // remove data from local storage
        AuthService.removeLocalData();

        // remove data from redux store
        dispatch(logOutUser())
    }

    return (
        <header className="Header">
            <nav className={navbarClasses} >
                <div className="container px-0">
                    <Link className="navbar-brand text-success text-decoration-none" to="/topics">POP_TOPICS</Link>
                    <button onClick={toggleMenuHendler} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto text-center">
                            <NotAuth>
                                <li className="nav-item">
                                    <NavLink exact to="/topics" className="nav-link" >Popular Topics</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/register" className="nav-link" >Register</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link" >Log In</NavLink>
                                </li>
                            </NotAuth>
                            <IsAuth>
                                <li className="nav-item">
                                    <NavLink exact to="/topics" className="nav-link" >Popular Topics</NavLink>
                                </li>
                                <li className="nav-item">
                                    <a href="!#" className="nav-link" onClick={logOut} >Log Out</a>
                                </li>
                            </IsAuth>
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}


export default Navbar
