import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./screens/Dashboard.jsx";
import ModuleOverview from "./screens/ModuleOverview.jsx";
import LessonPage from "./screens/LessonPage.jsx";
import QuizPage from "./screens/QuizPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard - home page */}
        <Route path="/" element={<Dashboard />} />

        {/* Module overview - /module/:moduleId */}
        <Route path="/module/:moduleId" element={<ModuleOverview />} />

        {/* Lesson page - /lesson/:lessonId (e.g., /lesson/1-2) */}
        <Route path="/lesson/:lessonId" element={<LessonPage />} />

        {/* Quiz page - /quiz/:moduleId */}
        <Route path="/quiz/:moduleId" element={<QuizPage />} />

        {/* Redirect unknown routes to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
