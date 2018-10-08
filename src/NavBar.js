import React from "react";
import {Link} from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar navbar-dark bg-primary fixed-top">
            <Link className="navbar-brand" to="/">
                Todo list
            </Link>
            <ul className="navbar-nav mr-auto">
                <Link className="nav-item" to="/create">
                    Create new
                </Link>
            </ul>
        </nav>
    );
}

export default NavBar;