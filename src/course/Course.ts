import { ICourse } from './ICourse';

export enum PageType {
    Next = 'information',
    MultipleChoice = 'multiple-choice',
    Completed = 'completed'
}

export interface MultipleChoiceContent {
    type: PageType.MultipleChoice;
    question: string;
    imagePath?: string;
    options: string[];
    correctAnswer: number;
}

export interface InformationContent {
    type: PageType.Next;
    text: string;
    imagePath?: string;
}

export interface CompletedContent {
    type: PageType.Completed;
    text: string;
    imagePath?: string;
}

export type StepContent = MultipleChoiceContent | InformationContent | CompletedContent;

export interface CourseStep {
    id: string;
    title: string;
    content: StepContent;
}

export interface CourseData {
    title: string;
    description?: string;
    steps: CourseStep[];
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
            this.stepIds = data.steps.map((step: CourseStep) => step.id);
        } catch (error) {
            console.error('Failed to load course:', error);
            throw error;
        }
    }

    getTitle(): string {
        return this.courseData?.title || '';
    }

    getTotalSteps(): number {
        return this.stepIds.length;
    }

    getStepContent(stepId: string): StepContent {
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