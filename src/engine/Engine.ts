import { IEngine } from './IEngine';

export class Engine implements IEngine {
    private currentStepIndex: number = 0;
    private stepIds: string[] = [];
    private completedSteps: Map<string, boolean> = new Map();
    private isInRepeatMode: boolean = false;
    private failedSteps: string[] = [];

    constructor(stepIds: string[]) {
        console.log('Engine constructor', stepIds);
        this.stepIds = stepIds;
    }

    getCurrentStep(): string {
        return this.stepIds[this.currentStepIndex];
    }

    nextStep(): boolean {
        if (this.isInRepeatMode) {
            // In repeat mode, we need to handle failed steps
            if (this.failedSteps.length > 0) {
                const nextFailedStep = this.failedSteps[0];
                this.currentStepIndex = this.stepIds.indexOf(nextFailedStep);
                this.failedSteps.shift();
                return true;
            } else {
                // No more failed steps to repeat
                this.isInRepeatMode = false;
                return false;
            }
        }

        if (this.currentStepIndex < this.stepIds.length - 1) {
            this.currentStepIndex++;
            return true;
        }
        return false;
    }

    previousStep(): boolean {
        if (this.currentStepIndex > 0) {
            this.currentStepIndex--;
            return true;
        }
        return false;
    }

    isCompleted(): boolean {
        if (this.stepIds.length === 0) return false;
        
        // Check if all steps are completed correctly
        const allStepsCompleted = this.stepIds.every(stepId => 
            this.completedSteps.get(stepId) === true
        );
        
        return allStepsCompleted && this.currentStepIndex === this.stepIds.length - 1;
    }

    getProgress(): number {
        if (this.stepIds.length === 0) return 0;
        return Math.round((this.currentStepIndex / (this.stepIds.length - 1)) * 100);
    }

    markStepCompleted(isCorrect: boolean): void {
        const currentStep = this.getCurrentStep();
        this.completedSteps.set(currentStep, isCorrect);

        if (!isCorrect) {
            this.failedSteps.push(currentStep);
        }

        // If we've reached the end and not all steps are correct, enter repeat mode
        if (this.currentStepIndex === this.stepIds.length - 1 && !this.isCompleted()) {
            this.isInRepeatMode = true;
            this.currentStepIndex = 0;
        }
    }

    getScore(): number {
        if (this.stepIds.length === 0) return 0;
        
        const correctSteps = Array.from(this.completedSteps.values())
            .filter(isCorrect => isCorrect).length;
            
        return Math.round((correctSteps / this.stepIds.length) * 100);
    }

    isCurrentStepRepeat(): boolean {
        return this.isInRepeatMode;
    }
} 