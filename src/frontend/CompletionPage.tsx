import React from 'react';
import { ICourse } from '../course/ICourse';
import './CourseViewer.css';

interface AnswerHistory {
    stepId: string;
    selectedAnswer: number;
    isCorrect: boolean;
    selfAssessment: string | null;
}

interface CompletionPageProps {
    course: ICourse;
    answerHistory: AnswerHistory[];
}

const getAssessmentText = (assessment: string | null): string => {
    switch (assessment) {
        case 'know':
            return 'I know it';
        case 'think':
            return 'Think I know it';
        case 'unsure':
            return 'Not sure';
        case 'noidea':
            return 'No idea';
        default:
            return 'No assessment';
    }
};

export const CompletionPage: React.FC<CompletionPageProps> = ({ course, answerHistory }) => {
    const correctAnswers = answerHistory.filter(answer => answer.isCorrect).length;
    const totalSteps = course.getTotalSteps();

    // Debug logging
    console.log('Answer History:', answerHistory);

    return (
        <div className="completion-page">
            <h2>Course Completed!</h2>
            <div className="completion-summary">
                <p>You answered {correctAnswers} out of {totalSteps} questions correctly.</p>
                <p>That's {Math.round((correctAnswers / totalSteps) * 100)}% correct!</p>
            </div>
            <div className="answer-history">
                <h3>Your Answers and Self-Assessment:</h3>
                <ul>
                    {answerHistory.map((answer, index) => {
                        console.log(`Answer ${index + 1} self-assessment:`, answer.selfAssessment);
                        return (
                            <li key={answer.stepId} className={answer.isCorrect ? 'correct' : 'incorrect'}>
                                <div className="answer-details">
                                    <span>Question {index + 1}: {answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}</span>
                                    <button 
                                        className="self-assessment-badge"
                                        data-assessment={answer.selfAssessment}
                                        disabled
                                    >
                                        {getAssessmentText(answer.selfAssessment)}
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}; 