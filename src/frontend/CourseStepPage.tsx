import React, { useState } from 'react';
import { IEngine } from '../engine/IEngine';
import { ICourse } from '../course/ICourse';

interface CourseStepPageProps {
    engine: IEngine;
    course: ICourse;
    currentContent: any;
    onAnswerSelect: (index: number) => void;
    onNext: () => void;
    onPrevious: () => void;
    selectedAnswer: number | null;
    showFeedback: boolean;
}

export const CourseStepPage: React.FC<CourseStepPageProps> = ({
    engine,
    currentContent,
    onAnswerSelect,
    onNext,
    onPrevious,
    selectedAnswer,
    showFeedback
}) => {
    return (
        <div className="course-step-page">
            <h2>{currentContent.question}</h2>
            <div className="options">
                {currentContent.options.map((option: string, index: number) => (
                    <button
                        key={index}
                        onClick={() => onAnswerSelect(index)}
                        className={`option ${selectedAnswer === index ? 'selected' : ''}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {showFeedback && (
                <div className="feedback">
                    {selectedAnswer === currentContent.correctAnswer
                        ? "Correct! Well done!"
                        : "Incorrect. Please try again."}
                </div>
            )}
            <div className="navigation">
                <button onClick={onPrevious} disabled={!engine.previousStep()}>
                    Previous
                </button>
                <button onClick={onNext} disabled={!engine.nextStep()}>
                    Next
                </button>
            </div>
            <div className="progress">
                Progress: {engine.getProgress()}%
            </div>
        </div>
    );
}; 