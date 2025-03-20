import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [scores, setScores] = useState([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await fetch(`https://localhost:7028/api/coursedetails/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch course details.');
                }

                const data = await response.json();
                setCourse(data);
            } catch (err) {
                setError('Error fetching course details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [id]);

    const fetchResults = async () => {
        try {
            const response = await fetch(`https://localhost:7028/api/Results/course-scores/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch quiz results.');
            }

            const data = await response.json();
            setScores(data.scores || []);
            setShowResults(true); // Display results after fetching
        } catch (err) {
            setError('Error fetching quiz results. Please try again.');
        }
    };

    if (loading) return <p>Loading course details...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="course-details-container">
            <h1>{course?.courseName || 'Course Details'}</h1>
            <p>{course?.courseDescription || 'No description available'}</p>

            <div className="button-container">
                <Link to="/courses" className="back-button">Back to Courses</Link>
                <Link to={`/quiz/${id}`} className="quiz-button">Take Quiz Now</Link>
                <button onClick={fetchResults} className="results-button">Check Results</button>
            </div>

            {showResults && (
                <div className="results-container">
                    <h2>Quiz Results</h2>
                    {scores.length === 0 ? (
                        <p>No quiz results available.</p>
                    ) : (
                        <table className="results-table">
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Correct Answers</th>
                                    <th>Wrong Answers</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scores.map((score, index) => (
                                    <tr key={index}>
                                        <td>{score.fullName || 'N/A'}</td>
                                        <td>{score.correctAnswers}</td>
                                        <td>{score.wrongAnswers}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

export default CourseDetails;
