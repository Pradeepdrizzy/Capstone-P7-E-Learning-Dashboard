import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import '../App.css';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('https://localhost:7028/api/courses');
                setCourses(response.data); // Axios automatically parses JSON
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError('Failed to load courses. Please try again later.');
            }
        };
        fetchCourses();
    }, []);

    // Dynamic Image Path using For Loop
    const getImageUrl = (courseId) => {
        return courseId >= 1 && courseId <= 24 
            ? `/images/${courseId}.jpg` 
            : '/images/Default.jpg';
    };

    return (
        <div className="courses-container">
            <h2>Courses</h2>
            
            {error && <p className="error-message">{error}</p>}
            
            <div className="courses-list">
                {courses.map(course => (
                    <div key={course.courseId} className="course-card">
                        <img 
                            src={getImageUrl(course.courseId)} 
                            alt={course.courseName} 
                            className="course-image"
                        />
                        <h3>{course.courseName}</h3>

                        {/* View More Button */}
                        <Link 
                            className="view-more-button" 
                            to={`/coursedetails/${course.courseId}`}
                        >
                            Learn More
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;
