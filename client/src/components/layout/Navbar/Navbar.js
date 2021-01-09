import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import AuthService from '../../../services/auth-service/AuthService';
import { logOutUser } from '../../../store/actions/authActions';

const Navbar = ({ isAuth, loading, logOutUser }) => {

    const [toggleMenu, setToggleMenu] = useState(false);

    const toggleMenuHendler = () => setToggleMenu(!toggleMenu);
    let navbarClasses = ["navbar navbar-expand-md navbar-dark bg-dark"].join(' ');
    if (toggleMenu) {
        navbarClasses = ["navbar navbar-show navbar-expand-md navbar-dark bg-dark"].join(' ');
        if (isAuth) navbarClasses = ["navbar navbar-auth-show navbar-expand-md navbar-dark bg-dark"].join(' ');
    }



    const logOut = () => {
        // remove data from local storage
        AuthService.removeLocalData();
        // remove data from redux store
        logOutUser();
    }

    let links = <Fragment>
                    <li className="nav-item">
                        <NavLink exact to="/topics" className="nav-link" >Popular Topics</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/register" className="nav-link" >Register</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/login" className="nav-link" >Log In</NavLink>
                    </li>
                </Fragment>

    if (isAuth && !loading){
        links = <Fragment>
            <li className="nav-item">
                <NavLink exact to="/topics" className="nav-link" >Popular Topics</NavLink>
            </li>
            <li className="nav-item">
                <NavLink exact to="/" className="nav-link" onClick={logOut} >Log Out</NavLink>
            </li>
        </Fragment>
    }

    return (
        <header className="Header">
            <nav className={navbarClasses} >
                <div className="container px-0">
                    <Link className="text-success text-decoration-none" to="/topics">POP_TOP_Blog</Link>
                    <button onClick={toggleMenuHendler} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto text-center">
                            {!loading && links}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.isAuthenticated,
        loading: state.authReducer.loading
    }
}

export default connect(mapStateToProps, { logOutUser })(Navbar)
