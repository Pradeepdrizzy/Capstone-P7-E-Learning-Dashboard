import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const testimonials = [
        {
            id: 1,
            name: "Alice Johnson",
            feedback: "This platform transformed my learning experience. The interactive content and expert guidance were outstanding!"
        },
        {
            id: 2,
            name: "Michael Smith",
            feedback: "I was able to advance my skills quickly with the comprehensive resources provided here. Highly recommended!"
        },
        {
            id: 3,
            name: "Samantha Lee",
            feedback: "Thanks to this platform, I achieved my dream job in tech. The practical knowledge I gained was invaluable."
        }
    ];

    return (
        <div className="home-container">
            <h1>Welcome to E-Learning Dashboard</h1>
            <p>Discover and enroll in courses to enhance your skills</p>

            <div className="testimonials-container">
                <h2>Student Testimonials</h2>
                <div className="testimonials-list">
                    {testimonials.map(testimonial => (
                        <div key={testimonial.id} className="testimonial-card">
                            <h3>{testimonial.name}</h3>
                            <p>{testimonial.feedback}</p>
                        </div>
                    ))}
                </div>

                <div className="register-section">
                    <p>Sign up today and unlock access to our comprehensive course library.</p>
                    <Link to="/register">
                        <button className="register-button">Register Now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
