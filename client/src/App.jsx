import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

import AnounceList from './pages/Anouncements/AnounceList';
import CreateAnounce from './pages/Anouncements/CreateAnounce';
import EditAnounce from './pages/Anouncements/EditAnounce';

import QuizList from './pages/Quizzes/QuizList';
import CreateQuiz from './pages/Quizzes/CreateQuiz';
import EditQuiz from './pages/Quizzes/EditQuiz';
import QuizPage from './pages/Quizzes/QuizPage';

export default function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/startQ" element={<QuizPage />} />

        <Route
          element={
            <PrivateRoute>
              <Sidebar />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/announcements" element={<AnounceList />} />
          <Route path="/createAnouncement" element={<CreateAnounce />} />
          <Route path="/editAnouncement/:id" element={<EditAnounce />} />
          <Route path="/quizzes" element={<QuizList />} />
          <Route path="/createQuiz" element={<CreateQuiz />} />
          <Route path="/editQuiz/:id" element={<EditQuiz />} />
        </Route>
      </Routes>

      <Toaster />
    </>

  );
}
