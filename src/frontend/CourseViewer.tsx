import React, { useState, useEffect } from 'react';
import { IEngine } from '../engine/IEngine';
import { ICourse } from '../course/ICourse';
import { StartPage } from './StartPage';
import { CourseStepPage } from './CourseStepPage';
import { CompletionPage } from './CompletionPage';

interface CourseViewerProps {
    engine: IEngine;
    course: ICourse;
}

type Page = 'start' | 'course' | 'completion';

export const CourseViewer: React.FC<CourseViewerProps> = ({ engine, course }) => {
    const [currentPage, setCurrentPage] = useState<Page>('start');
    const [currentContent, setCurrentContent] = useState<any>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState<boolean>(false);
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);

    useEffect(() => {
        if (currentPage === 'course') {
            const stepId = engine.getCurrentStep();
            const content = course.getStepContent(stepId);
            setCurrentContent(content);
            setSelectedAnswer(null);
            setShowFeedback(false);
        }
    }, [engine, course, currentPage]);

    const handleStart = () => {
        setCurrentPage('course');
    };

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
        } else {
            setCurrentPage('completion');
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

    switch (currentPage) {
        case 'start':
            return <StartPage engine={engine} course={course} onStart={handleStart} />;
        case 'course':
            if (!currentContent) {
                return <div>Loading...</div>;
            }
            return (
                <CourseStepPage
                    engine={engine}
                    course={course}
                    currentContent={currentContent}
                    onAnswerSelect={handleAnswerSelect}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    selectedAnswer={selectedAnswer}
                    showFeedback={showFeedback}
                />
            );
        case 'completion':
            return <CompletionPage course={course} correctAnswers={correctAnswers} />;
        default:
            return null;
    }
}; 