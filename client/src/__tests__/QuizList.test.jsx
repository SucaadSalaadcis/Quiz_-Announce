import React from 'react';
import { render, screen } from '@testing-library/react';
import QuizList from '../pages/Quizzes/QuizList';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');

const mockQuizzes = [
  {
    _id: '1',
    name: 'Frontend Basics Quiz',
    course: 'Programming',
    topic: 'React.js',
    dueTo: '2025-07-15',
    questions: [
      {
        questionText: 'What hook is used to manage state in React?',
        options: ['useState', 'useEffect', 'useContext'],
        correctAnswer: 'useState',
      },
    ],
  },
];

describe('QuizList Component', () => {
  it('renders quiz data from API', async () => {
    axios.get.mockResolvedValueOnce({ data: { data: mockQuizzes } });

    render(
      <BrowserRouter>
        <QuizList />
      </BrowserRouter>
    );

    const quizName = await screen.findByText('Frontend Basics Quiz');
    expect(quizName).toBeInTheDocument();
  });
});
