import React, { useState, useEffect } from 'react';
import { ICourse } from '../course/ICourse';
import { StartPage } from './StartPage';
import { CourseStepPage } from './CourseStepPage';
import { CompletionPage } from './CompletionPage';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { nextStep, previousStep, selectCurrentStep, selectIsCompleted, selectProgress } from '../store/engineSlice';

interface CourseViewerProps {
    course: ICourse;
    currentStep: string;
    isCompleted: boolean;
    progress: number;
}

type Page = 'start' | 'course' | 'completion';

interface AnswerHistory {
    stepId: string;
    selectedAnswer: number;
    isCorrect: boolean;
    selfAssessment: string | null;
}

export const CourseViewer: React.FC<CourseViewerProps> = ({ 
    course,
    currentStep,
    isCompleted,
    progress
}) => {
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState<Page>('start');
    const [currentContent, setCurrentContent] = useState<any>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answerHistory, setAnswerHistory] = useState<AnswerHistory[]>([]);
    const [currentSelfAssessment, setCurrentSelfAssessment] = useState<string | null>(null);

    useEffect(() => {
        if (currentPage === 'course') {
            const content = course.getStepContent(currentStep);
            setCurrentContent(content);
            setSelectedAnswer(null);
            setCurrentSelfAssessment(null);
        }
    }, [course, currentPage, currentStep]);

    const handleStart = () => {
        setCurrentPage('course');
    };

    const handleAnswerSelect = (index: number) => {
        setSelectedAnswer(index);
    };

    const handleSelfAssessment = (assessment: string) => {
        console.log('Setting self-assessment:', assessment);
        setCurrentSelfAssessment(assessment);
    };

    const handleNext = (assessment?: string) => {
        if (selectedAnswer !== null) {
            const isCorrect = selectedAnswer === currentContent.correctAnswer;
            console.log('Adding to answer history:', {
                stepId: currentStep,
                selectedAnswer,
                isCorrect,
                selfAssessment: assessment || currentSelfAssessment
            });
            setAnswerHistory(prev => [...prev, { 
                stepId: currentStep, 
                selectedAnswer, 
                isCorrect,
                selfAssessment: assessment || currentSelfAssessment
            }]);
            setCurrentSelfAssessment(null);
        }

        dispatch(nextStep());
        if (isCompleted) {
            setCurrentPage('completion');
        }
    };

    const handlePrevious = () => {
        dispatch(previousStep());
    };

    switch (currentPage) {
        case 'start':
            return <StartPage course={course} onStart={handleStart} />;
        case 'course':
            if (!currentContent) {
                return <div>Loading...</div>;
            }
            return (
                <CourseStepPage
                    currentContent={currentContent}
                    onAnswerSelect={handleAnswerSelect}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    selectedAnswer={selectedAnswer}
                    progress={progress}
                    onSelfAssessment={handleSelfAssessment}
                />
            );
        case 'completion':
            return <CompletionPage course={course} answerHistory={answerHistory} />;
        default:
            return null;
    }
}; 