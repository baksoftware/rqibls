import React from 'react';
import { ICourse } from '../course/ICourse';

interface CompletionPageProps {
    course: ICourse;
    correctAnswers: number;
}

export const CompletionPage: React.FC<CompletionPageProps> = ({ course, correctAnswers }) => {
    return (
        <div className="completion-page">
            <h2>Course Completed!</h2>
            <div className="completion-summary">
                <p>You answered {correctAnswers} out of {course.getTotalSteps()} questions correctly.</p>
                <p>That's {Math.round((correctAnswers / course.getTotalSteps()) * 100)}% correct!</p>
            </div>
        </div>
    );
}; 