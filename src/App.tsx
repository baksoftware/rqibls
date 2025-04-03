import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { CourseViewer } from './frontend/CourseViewer';
import { Course } from './course/Course';
import { store } from './store/store';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { 
  setStepIds, 
  setLoading, 
  setError,
  selectCurrentStep,
  selectIsCompleted,
  selectProgress
} from './store/engineSlice';
import './App.css';

function AppContent() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.engine);
  const currentStep = useAppSelector(selectCurrentStep);
  const isCompleted = useAppSelector(selectIsCompleted);
  const progress = useAppSelector(selectProgress);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        dispatch(setLoading(true));
        const course = Course.getInstance();
        await course.loadCourse('/src/bls-course/bls-course.json');
        const stepIds = course.getStepIds();
        dispatch(setStepIds(stepIds));
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to load course'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadCourse();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading course...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const course = Course.getInstance();

  return (
    <div className="app">
      <CourseViewer 
        currentStep={currentStep}
        isCompleted={isCompleted}
        progress={progress}
        course={course}
      />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
