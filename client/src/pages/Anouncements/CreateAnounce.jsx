import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, Paper
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function CreateAnounce() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [avatar, setAvatar] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  const handleSaveAnnouncement = (e) => {
    e.preventDefault();

    const data = { name, title, avatar, message, date };

    axios.post('http://localhost:5000/announcements', data)
      .then(() => {
        toast.success("Announcement Created Successfully");
        navigate('/announcements');
        setName('');
        setTitle('');
        setAvatar('');
        setMessage('');
        setDate('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Add New Announcement
        </Typography>

        <Box component="form" onSubmit={handleSaveAnnouncement} noValidate>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            margin="normal"
            required
          />

       

          <Box mt={3} textAlign="center">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
