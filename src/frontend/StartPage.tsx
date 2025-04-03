import React from 'react';
import { ICourse } from '../course/ICourse';

interface StartPageProps {
    course: ICourse;
    onStart: () => void;
}

export const StartPage: React.FC<StartPageProps> = ({ course, onStart }) => {
    return (
        <div className="start-page">
            <h1>{course.getTitle()}</h1>
            <div className="course-info">
                <p>This course contains {course.getTotalSteps()} steps to help you learn.</p>
                <p>Click the button below to begin your learning journey!</p>
            </div>
            <button className="start-button" onClick={onStart}>
                Start Course
            </button>
        </div>
    );
}; 