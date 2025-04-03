export interface ICourse {
    /**
     * Load course content from a JSON file
     * @param path Path to the course JSON file
     */
    loadCourse(path: string): Promise<void>;

    /**
     * Get the total number of steps in the course
     */
    getTotalSteps(): number;

    /**
     * Get the title of the course
     */
    getTitle(): string;

    /**
     * Get the content for a specific step
     * @param stepId The ID of the step to get content for
     */
    getStepContent(stepId: string): any;

    /**
     * Get all step IDs in order
     */
    getStepIds(): string[];
} 