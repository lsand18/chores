import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

export const Navigation = () => {
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    const toggleNav = () => setIsActive(!isActive);

    return (
        <>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item">
                        <NavLink to="/"className="logo">
                            Chore Check
                        </NavLink>
                    </a>
                    <a
                        role="button"
                        className={`navbar-burger ${isActive ? 'is-active' : ''}`}
                        aria-label="menu"
                        aria-expanded={isActive ? 'true' : 'false'}
                        data-target="navbarMenu"
                        onClick={toggleNav}
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbarMenu" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                    <div className="navbar-start">
                        <a className="navbar-item">
                            <NavLink to="/household">View Your Household</NavLink>
                        </a>
                        <a className="navbar-item">
                            <NavLink to="/feed">View Feed</NavLink>
                        </a>
                    </div>
                    <div className="navbar-end">
                        <a
                            className="navbar-item"
                            onClick={() => {
                                localStorage.removeItem("chore_token");
                                navigate('/login');
                            }}
                        >
                            Logout
                        </a>
                    </div>
                </div>
            </nav>
        </>
    )
}