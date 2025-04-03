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
} 