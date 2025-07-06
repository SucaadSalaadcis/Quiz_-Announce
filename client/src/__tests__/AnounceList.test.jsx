import React from 'react';
import { render, screen } from '@testing-library/react';
import AnounceList from '../pages/Anouncements/AnounceList'; 
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');


const mockAnnouncements = [
  {
    _id: '1',
    name: 'Admin',
    title: 'Important Update',
    avatar: 'https://example.com/avatar.png',
    message: 'System maintenance on Sunday.',
    date: '2025-07-10',
  },
];

describe('AnounceList Component', () => {
  it('renders announcement data from API', async () => {
    axios.get.mockResolvedValueOnce({ data: { data: mockAnnouncements } });

    render(
      <BrowserRouter>
        <AnounceList />
      </BrowserRouter>
    );

    const nameElement = await screen.findByText('Admin');
    const titleElement = await screen.findByText('Important Update');
    const messageElement = await screen.findByText('System maintenance on Sunday.');

    expect(nameElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
  });
});
