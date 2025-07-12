import React, { useState } from 'react';
import './Quiz.css';

const questions = [
    {
        question: "What is the recipient's age group?",
        options: ['Child (0-12)', 'Teen (13-19)', 'Young Adult (20-35)', 'Adult (36-60)', 'Senior (60+)'],
    },
    {
        question: 'What is the occasion?',
        options: ['Birthday', 'Anniversary', 'Holiday', 'Graduation', 'Just Because'],
    },
    {
        question: 'What are their interests?',
        options: ['Technology', 'Fashion', 'Books', 'Travel', 'Food'],
    },
    {
        question: 'What is your budget?',
        options: ['$0 - $25', '$25 - $50', '$50 - $100', '$100+'],
    },
    {
        question: "How do they typically react to surprises?",
        options: ["They love them!", "They prefer to know about gifts in advance.", "They're neutral about surprises."],
    },
    {
        question: "Would they prefer a gift that is practical or one that is sentimental?",
        options: ["Definitely something practical and useful.", "Something sentimental and meaningful is always better.", "A balance of both would be ideal."],
    },
    {
        question: "What's their ideal way to unwind and relax?",
        options: ["Curling up with a good book or movie.", "Getting active and spending time outdoors.", "Socializing with friends and family.", "Working on a creative project or hobby."],
    },
];

const Quiz = ({ onQuizComplete }) => {
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState('');

    const handleAnswerChange = (questionIndex, answer) => {
        setAnswers({
            ...answers,
            [questionIndex]: answer,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(answers).length !== questions.length) {
            setError('Please answer all questions.');
            return;
        }
        setError('');
        onQuizComplete(answers);
    };

    return (
        <div className="quiz-container">
            <h2>Find the Perfect Gift</h2>
            <form onSubmit={handleSubmit}>
                {questions.map((q, index) => (
                    <div key={index} className="question-block">
                        <p className="question">{index + 1}. {q.question}</p>
                        <div className="options">
                            {q.options.map((option) => (
                                <label key={option} className={answers[index] === option ? 'selected' : ''}>
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option}
                                        onChange={() => handleAnswerChange(index, option)}
                                        checked={answers[index] === option}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                {error && <p className="error">{error}</p>}
                <button type="submit" className="submit-btn">Get Gift Ideas</button>
            </form>
        </div>
    );
};

export default Quiz;