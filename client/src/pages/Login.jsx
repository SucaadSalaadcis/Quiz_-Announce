import { useNavigate } from 'react-router-dom';

import quiz from '../assets/quiz.jpg'

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col w-full max-w-5xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row">

        <div className="md:w-1/2">
          <img
            src={quiz}
            alt="Quiz Illustration"
            className="object-cover w-full h-full"
          />

        </div>
        
        <div className="flex flex-col justify-center p-10 md:w-1/2">
          <h2 className="mb-4 text-3xl font-bold text-blue-600">Welcome to Quiz Portal</h2>
          <p className="mb-6 text-gray-600">
            Click the button below to continue to the dashboard.
          </p>
          <button
            onClick={handleLogin}
            className="px-6 py-3 text-white transition bg-blue-600 rounded hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
