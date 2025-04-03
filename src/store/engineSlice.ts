import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EngineState {
  currentStepIndex: number;
  stepIds: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: EngineState = {
  currentStepIndex: 0,
  stepIds: [],
  isLoading: false,
  error: null,
};

const engineSlice = createSlice({
  name: 'engine',
  initialState,
  reducers: {
    setStepIds: (state, action: PayloadAction<string[]>) => {
      state.stepIds = action.payload;
    },
    setCurrentStepIndex: (state, action: PayloadAction<number>) => {
      state.currentStepIndex = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStepIndex < state.stepIds.length - 1) {
        state.currentStepIndex++;
      }
    },
    previousStep: (state) => {
      if (state.currentStepIndex > 0) {
        state.currentStepIndex--;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setStepIds, 
  setCurrentStepIndex, 
  nextStep, 
  previousStep, 
  setLoading, 
  setError 
} = engineSlice.actions;

export const selectCurrentStep = (state: { engine: EngineState }) => 
  state.engine.stepIds[state.engine.currentStepIndex];

export const selectIsCompleted = (state: { engine: EngineState }) => 
  state.engine.stepIds.length === 0 ? false : 
  state.engine.currentStepIndex === state.engine.stepIds.length - 1;

export const selectProgress = (state: { engine: EngineState }) => 
  state.engine.stepIds.length === 0 ? 0 : 
  Math.round((state.engine.currentStepIndex / (state.engine.stepIds.length - 1)) * 100);

export default engineSlice.reducer; 