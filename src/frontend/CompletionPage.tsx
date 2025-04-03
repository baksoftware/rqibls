import React from 'react';
import { ICourse } from '../course/ICourse';
import './CourseViewer.css';

interface AnswerHistory {
    stepId: string;
    selectedAnswer: number;
    isCorrect: boolean;
}

interface CompletionPageProps {
    course: ICourse;
    answerHistory: AnswerHistory[];
}

export const CompletionPage: React.FC<CompletionPageProps> = ({ course, answerHistory }) => {
    const correctAnswers = answerHistory.filter(answer => answer.isCorrect).length;
    const totalSteps = course.getTotalSteps();

    return (
        <div className="completion-page">
            <h2>Course Completed!</h2>
            <div className="completion-summary">
                <p>You answered {correctAnswers} out of {totalSteps} questions correctly.</p>
                <p>That's {Math.round((correctAnswers / totalSteps) * 100)}% correct!</p>
            </div>
            <div className="answer-history">
                <h3>Your Answers:</h3>
                <ul>
                    {answerHistory.map((answer, index) => (
                        <li key={answer.stepId} className={answer.isCorrect ? 'correct' : 'incorrect'}>
                            Question {index + 1}: {answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}; 