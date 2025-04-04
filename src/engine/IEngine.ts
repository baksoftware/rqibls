export interface IEngine {
    /**
     * Get the current step/page to display
     */
    getCurrentStep(): string;

    /**
     * Move to the next step/page
     * @returns true if there is a next step, false if at the end
     */
    nextStep(): boolean;

    /**
     * Move to the previous step/page
     * @returns true if there is a previous step, false if at the beginning
     */
    previousStep(): boolean;

    /**
     * Check if the course is completed
     */
    isCompleted(): boolean;

    /**
     * Get the current progress (0-100)
     */
    getProgress(): number;

    /**
     * Mark the current step as completed
     * @param isCorrect Whether the step was completed correctly
     */
    markStepCompleted(isCorrect: boolean): void;

    /**
     * Get the score for the course (0-100)
     */
    getScore(): number;

    /**
     * Check if the current step needs to be repeated
     */
    isCurrentStepRepeat(): boolean;
} 