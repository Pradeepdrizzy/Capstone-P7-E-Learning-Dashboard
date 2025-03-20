import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../App.css";

const CorrectAnswers = () => {
    const { courseId } = useParams();
    const [scores, setScores] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [error, setError] = useState('');

    // Fetch Course Name
    useEffect(() => {
        const fetchCourseName = async () => {
            try {
                const response = await axios.get(`https://localhost:7028/api/CourseDetails/${courseId}`);
                setCourseName(response.data.courseTitle || 'Unknown Course');
            } catch (err) {
                setCourseName('Unknown Course');
            }
        };

        const fetchScores = async () => {
            try {
                const response = await axios.get(`https://localhost:7028/api/Results/course-scores/${courseId}`);
                console.log('API Response:', response.data); // Ensure the data structure is correct
        
                if (!response.data || !Array.isArray(response.data.scores)) {
                    throw new Error('Invalid data format received.');
                }

                const updatedScores = response.data.scores.map(score => ({
                    fullName: score.fullName || 'N/A',
                    correctAnswers: score.correctAnswers,
                    wrongAnswers: score.wrongAnswers || 0
                }));

                setScores(updatedScores);
            } catch (err) {
                console.error('Error fetching scores:', err); 
                setError('Failed to fetch scores.');
            }
        };

        fetchCourseName();
        fetchScores();
    }, [courseId]);

    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="scores-container">
            <h1>Scores for {courseName}</h1>
            <table className="scores-table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Correct Answers</th>
                        <th>Wrong Answers</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.length === 0 ? (
                        <tr>
                            <td colSpan="3">No scores available for this course.</td>
                        </tr>
                    ) : (
                        scores.map((score, index) => (
                            <tr key={index}>
                                <td>{score.fullName}</td>
                                <td>{score.correctAnswers}</td>
                                <td>{score.wrongAnswers}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CorrectAnswers;
