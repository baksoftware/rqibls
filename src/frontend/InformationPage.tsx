import React from 'react';
import { InformationContent } from '../course/Course';
import './CourseViewer.css';

interface InformationPageProps {
    content: InformationContent;
    onNext: () => void;
    progress: number;
}

export const InformationPage: React.FC<InformationPageProps> = ({
    content,
    onNext,
    progress,
}) => {
    return (        
        <div className="course-viewer">
            <div className="question-container">
                <div className="question-image">
                    {content.imagePath && (
                        <img src={`/src/bls-course/${content.imagePath}`} alt="Scene illustration" />
                    )}
                </div>
                <div className="question-content">
                    <p className="information-text">{content.text}</p>
                    <div className="navigation">
                        <button onClick={onNext} className="next-button">
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <div className="progress">
                Progress: {progress}%
            </div>
        </div>
    );
}; 