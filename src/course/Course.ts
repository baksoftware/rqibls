import { ICourse } from './ICourse';

export interface CourseData {
    title: string;
    description?: string;
    steps: Array<{
        id: string;
        title: string;
        content: any;
    }>;
}

export class Course implements ICourse {
    private static instance: Course | null = null;
    private courseData: CourseData | null = null;
    private stepIds: string[] = [];

    private constructor() {}

    public static getInstance(): Course {
        if (!Course.instance) {
            Course.instance = new Course();
        }
        return Course.instance;
    }

    async loadCourse(path: string): Promise<void> {
        if (this.courseData) {
            return; // Already loaded
        }
        try {
            const response = await fetch(path);
            const data = await response.json();
            if (!data.steps || !Array.isArray(data.steps)) {
                throw new Error('Invalid course format: steps array is required');
            }
            this.courseData = data;
            this.stepIds = data.steps.map((step: { id: string }) => step.id);
        } catch (error) {
            console.error('Failed to load course:', error);
            throw error;
        }
    }

    getTotalSteps(): number {
        return this.stepIds.length;
    }

    getStepContent(stepId: string): any {
        if (!this.courseData) {
            throw new Error('Course not loaded');
        }
        const step = this.courseData.steps.find(s => s.id === stepId);
        if (!step) {
            throw new Error(`Step ${stepId} not found`);
        }
        return step.content;
    }

    getStepIds(): string[] {
        return [...this.stepIds];
    }
} 