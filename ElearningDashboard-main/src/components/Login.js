import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Check if the user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const confirmAction = window.confirm(
                'You are already logged in. Would you like to log out?'
            );

            if (confirmAction) {
                localStorage.removeItem('token');
                localStorage.removeItem('userId'); // Clear userId as well
                alert('You have been logged out. Please log in again.');
            } else {
                alert('You are still logged in. Redirecting to Home...');
                navigate('/');  // Redirect to Home
            }
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('https://localhost:7028/api/auth/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const { token, userId } = response.data;

            console.log('User ID from API:', userId); // ✅ Debug log

            if (!userId) {
                throw new Error('User ID not found in response.');
            }

            // Save token and userId in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);

            setSuccessMessage('Login Successful! Redirecting...');

            // Redirect to courses page after successful login
            setTimeout(() => {
                navigate('/courses');
            }, 2000);

        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
            setError(errorMessage);
            console.error('Error during login:', errorMessage);
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-header">Login</h2>

            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                />
                <button type="submit">Login</button>
                <Link to="/register" className="link">
                    Don't have an account? Register here
                </Link>
            </form>
        </div>
    );
};

export default Login;