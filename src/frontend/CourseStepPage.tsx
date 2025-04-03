import React, { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { PageType, StepContent } from '../course/Course';
import { InformationPage } from './InformationPage';
import './CourseViewer.css';

interface CourseStepPageProps {
    currentContent: StepContent;
    onAnswerSelect: (index: number) => void;
    onNext: (assessment?: string) => void;
    onPrevious: () => void;
    selectedAnswer: number | null;
    progress: number;
    onSelfAssessment: (assessment: string) => void;
}

export const CourseStepPage: React.FC<CourseStepPageProps> = ({
    currentContent,
    onAnswerSelect,
    onNext,
    onPrevious,
    selectedAnswer,
    progress,
    onSelfAssessment,
}) => {
    const currentStepIndex = useAppSelector((state) => state.engine.currentStepIndex);
    const [selfAssessment, setSelfAssessment] = useState<string | null>(null);

    const handleSelfAssessment = (assessment: string) => {
        setSelfAssessment(assessment);
        onSelfAssessment(assessment);
        onNext(assessment);
        setSelfAssessment(null);
    };

    if (currentContent.type === PageType.Next) {
        return (
            <InformationPage
                content={currentContent}
                onNext={() => onNext()}
                progress={progress}
            />
        );
    }

    if (currentContent.type === PageType.MultipleChoice) {
        return (
            <div className="course-viewer">
                <div className="question-container">
                    <div className="question-image">
                        {currentContent.imagePath && (
                            <img src={`/src/bls-course/${currentContent.imagePath}`} alt="Question illustration" />
                        )}
                    </div>
                    <div className="question-content">
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
                    </div>
                </div>
                <div className="self-assessment">
                    <h3>How well do you know this?</h3>
                    <div className="assessment-buttons">
                        <button 
                            className={`assessment-button ${selfAssessment === 'know' ? 'selected' : ''}`}
                            onClick={() => handleSelfAssessment('know')}
                            disabled={selectedAnswer === null}
                            data-assessment="know"
                        >
                            I know it
                        </button>
                        <button 
                            className={`assessment-button ${selfAssessment === 'think' ? 'selected' : ''}`}
                            onClick={() => handleSelfAssessment('think')}
                            disabled={selectedAnswer === null}
                            data-assessment="think"
                        >
                            Think I know it
                        </button>
                        <button 
                            className={`assessment-button ${selfAssessment === 'unsure' ? 'selected' : ''}`}
                            onClick={() => handleSelfAssessment('unsure')}
                            disabled={selectedAnswer === null}
                            data-assessment="unsure"
                        >
                            Not sure
                        </button>
                        <button 
                            className={`assessment-button ${selfAssessment === 'noidea' ? 'selected' : ''}`}
                            onClick={() => handleSelfAssessment('noidea')}
                            disabled={selectedAnswer === null}
                            data-assessment="noidea"
                        >
                            No idea
                        </button>
                    </div>
                </div>
                <div className="navigation">
                </div>
                <div className="progress">
                    Progress: {progress}%
                </div>
            </div>
        );
    }

    return null;
}; 