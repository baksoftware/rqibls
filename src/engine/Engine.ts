import { IEngine } from './IEngine';

export class Engine implements IEngine {
    private currentStepIndex: number = 0;
    private stepIds: string[] = [];

    constructor(stepIds: string[]) {
        this.stepIds = stepIds;
    }

    getCurrentStep(): string {
        return this.stepIds[this.currentStepIndex];
    }

    nextStep(): boolean {
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
        return this.currentStepIndex === this.stepIds.length - 1;
    }

    getProgress(): number {
        if (this.stepIds.length === 0) return 0;
        return Math.round((this.currentStepIndex / (this.stepIds.length - 1)) * 100);
    }
} 