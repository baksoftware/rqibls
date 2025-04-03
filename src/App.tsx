import { useState, useEffect } from 'react'
import { CourseViewer } from './frontend/CourseViewer'
import { Engine } from './engine/Engine'
import { Course } from './course/Course'
import './App.css'

function App() {
  const [engine, setEngine] = useState<Engine | null>(null);
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const loadCourse = async () => {
      const newCourse = new Course();
      await newCourse.loadCourse('/src/bls-course/bls-course.json');
      const newEngine = new Engine(newCourse.getStepIds());
      setCourse(newCourse);
      setEngine(newEngine);
    };

    loadCourse();
  }, []);

  if (!engine || !course) {
    return <div>Loading course...</div>;
  }

  return (
    <div className="app">
      <h1>Basic Life Support Course</h1>
      <CourseViewer engine={engine} course={course} />
    </div>
  );
}

export default App
