import { ICourse } from './ICourse';

interface CourseData {
    title: string;
    description?: string;
    steps: Array<{
        id: string;
        title: string;
        content: any;
    }>;
}

export class Course implements ICourse {
    private courseData: CourseData | null = null;
    private stepIds: string[] = [];

    async loadCourse(path: string): Promise<void> {
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