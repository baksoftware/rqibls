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

interface AnswerHistory {
    stepId: string;
    selectedAnswer: number;
    isCorrect: boolean;
}

export const CourseViewer: React.FC<CourseViewerProps> = ({ engine, course }) => {
    const [currentPage, setCurrentPage] = useState<Page>('start');
    const [currentContent, setCurrentContent] = useState<any>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answerHistory, setAnswerHistory] = useState<AnswerHistory[]>([]);

    useEffect(() => {
        if (currentPage === 'course') {
            const stepId = engine.getCurrentStep();
            const content = course.getStepContent(stepId);
            setCurrentContent(content);
            setSelectedAnswer(null);
        }
    }, [engine, course, currentPage]);

    const handleStart = () => {
        setCurrentPage('course');
    };

    const handleAnswerSelect = (index: number) => {
        setSelectedAnswer(index);
    };

    const handleNext = () => {
        if (selectedAnswer !== null) {
            const stepId = engine.getCurrentStep();
            const isCorrect = selectedAnswer === currentContent.correctAnswer;
            setAnswerHistory(prev => [...prev, { stepId, selectedAnswer, isCorrect }]);
        }

        if (engine.nextStep()) {
            const stepId = engine.getCurrentStep();
            const content = course.getStepContent(stepId);
            setCurrentContent(content);
            setSelectedAnswer(null);
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
        }
    };

    console.log(`currentPage: ${currentPage}`);
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
                    currentContent={currentContent}
                    onAnswerSelect={handleAnswerSelect}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    selectedAnswer={selectedAnswer}
                />
            );
        case 'completion':
            return <CompletionPage course={course} answerHistory={answerHistory} />;
        default:
            return null;
    }
}; 