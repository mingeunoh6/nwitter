import React from 'react';
import { authService } from 'fbase'
import { Link } from "react-router-dom"

const Navigation = () => {

    const onLogOutClick = () => authService.signOut()


    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">My Profile</Link>
                </li>
            </ul>
            <div>
                <button onClick={onLogOutClick}>LogOut</button>
            </div>
        </nav>
    );
};

export default Navigation;