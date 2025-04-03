import React from 'react';
import { IEngine } from '../engine/IEngine';
import './CourseViewer.css';

interface CourseStepPageProps {
    engine: IEngine;
    currentContent: any;
    onAnswerSelect: (index: number) => void;
    onNext: () => void;
    onPrevious: () => void;
    selectedAnswer: number | null;
}

export const CourseStepPage: React.FC<CourseStepPageProps> = ({
    engine,
    currentContent,
    onAnswerSelect,
    onNext,
    onPrevious,
    selectedAnswer,
}) => {
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
                <button onClick={onPrevious} disabled={!engine.previousStep()}>
                    Previous
                </button>
                <button onClick={onNext} disabled={selectedAnswer === null}>
                    Next
                </button>
            </div>
            <div className="progress">
                Progress: {engine.getProgress()}%
            </div>
        </div>
    );
}; 