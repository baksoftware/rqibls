import React from 'react';
import { useAppSelector } from '../store/hooks';
import './CourseViewer.css';

interface CourseStepPageProps {
    currentContent: any;
    onAnswerSelect: (index: number) => void;
    onNext: () => void;
    onPrevious: () => void;
    selectedAnswer: number | null;
    progress: number;
}

export const CourseStepPage: React.FC<CourseStepPageProps> = ({
    currentContent,
    onAnswerSelect,
    onNext,
    onPrevious,
    selectedAnswer,
    progress,
}) => {
    const currentStepIndex = useAppSelector((state) => state.engine.currentStepIndex);

    return (
        <div className="course-viewer">
            <h2>{currentContent.question}</h2>
            <div className="options">
                {currentContent.options.map((option: string, index: number) => (
                    <button
                        key={index}
                        className={`option ${selectedAnswer === index ? 'selected' : ''}`}
                        onClick={() => onAnswerSelect(index)}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <div className="navigation">
                <button onClick={onPrevious} disabled={currentStepIndex === 0}>
                    Previous
                </button>
                <button onClick={onNext} disabled={selectedAnswer === null}>
                    Next
                </button>
            </div>
            <div className="progress">
                Progress: {progress}%
            </div>
        </div>
    );
}; 