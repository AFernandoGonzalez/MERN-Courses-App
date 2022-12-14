import React from 'react';
import { NavLink } from 'react-router-dom'

const Nav = () => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact='true' to="/" className="nav-item nav-link">Courses</NavLink>
            </div>
        </nav>
    )
}

export default Nav