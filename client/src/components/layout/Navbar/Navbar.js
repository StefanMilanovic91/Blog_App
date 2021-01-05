import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {

    const [toggleMenu, setToggleMenu] = useState(false);

    const toggleMenuHendler = () => setToggleMenu(!toggleMenu);

    let navbarClasses = ["navbar navbar-expand-md navbar-dark bg-dark"].join(' ');

    if(toggleMenu) navbarClasses = ["navbar navbar-show navbar-expand-md navbar-dark bg-dark"].join(' ');

    return (
        <nav className={navbarClasses} >
            <Link className="text-success" to="/home">Blog_App</Link>
            <button onClick={toggleMenuHendler} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto text-center">
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/posts">Posts</NavLink> 
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">Register</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Log In</NavLink>
                    </li>
                </ul>
            </div>

        </nav>
    )
}

export default Navbar
