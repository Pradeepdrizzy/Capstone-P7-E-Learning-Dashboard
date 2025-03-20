import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";

const Navbar = () => {
    const navigate = useNavigate();

    const handleCoursesClick = (e) => {
        const token = localStorage.getItem('token'); // Checking token for authentication
        if (!token) {
            e.preventDefault(); // Prevents navigation to the `/courses` route
            navigate('/login'); // Redirects to login
        }
    };

    return (
        <nav className="navbar">
            <h1 >E-Learning Portal</h1>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/courses" onClick={handleCoursesClick}>Courses</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
    );
};

export default Navbar;
