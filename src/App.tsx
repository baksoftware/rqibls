import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { CourseViewer } from './frontend/CourseViewer';
import { Course } from './course/Course';
import { store } from './store/store';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { 
  setStepIds, 
  setCourse, 
  setLoading, 
  setError,
  selectCurrentStep,
  selectIsCompleted,
  selectProgress
} from './store/engineSlice';
import './App.css';

function AppContent() {
  const dispatch = useAppDispatch();
  const { course, isLoading, error } = useAppSelector((state) => state.engine);
  const currentStep = useAppSelector(selectCurrentStep);
  const isCompleted = useAppSelector(selectIsCompleted);
  const progress = useAppSelector(selectProgress);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        dispatch(setLoading(true));
        const newCourse = new Course();
        await newCourse.loadCourse('/src/bls-course/bls-course.json');
        const stepIds = newCourse.getStepIds();
        dispatch(setStepIds(stepIds));
        dispatch(setCourse(newCourse));
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to load course'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (!course) {
      loadCourse();
    }
  }, [dispatch, course]);

  if (isLoading) {
    return <div>Loading course...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return null;
  }

  return (
    <div className="app">
      <h1>Basic Life Support Course</h1>
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
