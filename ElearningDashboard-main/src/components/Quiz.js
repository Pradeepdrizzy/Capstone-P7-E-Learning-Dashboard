import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Quiz = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState('');

    // Fetch quiz questions for the specified course
    useEffect(() => {
        const fetchQuizQuestions = async () => {
            try {
                const response = await axios.get(`https://localhost:7028/api/QuizQuestions/quizquestions/${courseId}`);
                setQuestions(response.data);
            } catch (err) {
                setError('Error fetching quiz questions. Please try again.');
            }
        };

        fetchQuizQuestions();
    }, [courseId]);

    // Handle option selection
    const handleAnswerChange = (questionId, selectedOption) => {
        const selectedKey = Object.keys(questions.find(q => q.questionId === questionId))
            .find(key => questions.find(q => q.questionId === questionId)[key] === selectedOption);

        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: selectedKey
        }));
    };

    // Handle quiz submission
    const handleSubmit = async () => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
            alert('User not found. Please log in again.');
            return;
        }

        console.log('User ID during quiz submission:', userId); // ✅ Debug log

        const quizResults = Object.keys(answers).map(questionId => ({
            userId: parseInt(userId),  // ✅ Ensure it's a number
            questionId: parseInt(questionId),
            optionSelected: answers[questionId]
        }));

        try {
            await axios.post('https://localhost:7028/api/Results', quizResults);
            alert('Quiz submitted successfully!');
            navigate(`/correctanswers/${courseId}`);  // Redirect to CorrectAnswers page
        } catch (err) {
            console.error('Error submitting quiz results:', err);
            alert('Error submitting quiz results. Please try again.');
        }
    };

    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="quiz-container">
            <h1>Quiz</h1>
            {questions.length === 0 ? (
                <p>No quiz questions available for this course.</p>
            ) : (
                <form onSubmit={(e) => e.preventDefault()}>
                    {questions.map((question, index) => (
                        <div key={question.questionId} className="question-card">
                            <p><b>{index + 1}. {question.question}</b></p>
                            <div className="options">
                                {['optionA', 'optionB', 'optionC', 'optionD'].map((option) => (
                                    <label key={option} className="option-label">
                                        <input
                                            type="radio"
                                            name={`question-${question.questionId}`}
                                            value={question[option]}
                                            checked={answers[question.questionId] === option}
                                            onChange={() => handleAnswerChange(question.questionId, question[option])}
                                        />
                                        {question[option]}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button 
                        className="submit-button"
                        type="button"
                        onClick={handleSubmit}
                    >
                        Submit Quiz
                    </button>
                </form>
            )}
        </div>
    );
};

export default Quiz;
