import React, { useState, useEffect } from 'react';
import { IEngine } from '../engine/IEngine';
import { ICourse } from '../course/ICourse';

interface CourseViewerProps {
    engine: IEngine;
    course: ICourse;
}

export const CourseViewer: React.FC<CourseViewerProps> = ({ engine, course }) => {
    const [currentContent, setCurrentContent] = useState<any>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState<boolean>(false);
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);

    useEffect(() => {
        const stepId = engine.getCurrentStep();
        const content = course.getStepContent(stepId);
        setCurrentContent(content);
        setSelectedAnswer(null);
        setShowFeedback(false);
    }, [engine, course]);

    const handleAnswerSelect = (index: number) => {
        setSelectedAnswer(index);
        setShowFeedback(true);
        if (index === currentContent.correctAnswer) {
            setCorrectAnswers(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (engine.nextStep()) {
            const stepId = engine.getCurrentStep();
            const content = course.getStepContent(stepId);
            setCurrentContent(content);
            setSelectedAnswer(null);
            setShowFeedback(false);
        }
    };

    const handlePrevious = () => {
        if (engine.previousStep()) {
            const stepId = engine.getCurrentStep();
            const content = course.getStepContent(stepId);
            setCurrentContent(content);
            setSelectedAnswer(null);
            setShowFeedback(false);
        }
    };

    if (!currentContent) {
        return <div>Loading...</div>;
    }

    const isCompleted = engine.isCompleted();
    console.log(`isCompleted: ${isCompleted}`);
    if (isCompleted) {
        return (
            <div className="course-viewer">
                <h2>Course Completed!</h2>
                <div className="completion-summary">
                    <p>You answered {correctAnswers} out of {course.getTotalSteps()} questions correctly.</p>
                    <p>That's {Math.round((correctAnswers / course.getTotalSteps()) * 100)}% correct!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="course-viewer">
            <h2>{currentContent.question}</h2>
            <div className="options">
                {currentContent.options.map((option: string, index: number) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
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
                <button onClick={handlePrevious} disabled={!engine.previousStep()}>
                    Previous
                </button>
                <button onClick={handleNext} disabled={!engine.nextStep()}>
                    Next
                </button>
            </div>
            <div className="progress">
                Progress: {engine.getProgress()}%
            </div>
        </div>
    );
}; 