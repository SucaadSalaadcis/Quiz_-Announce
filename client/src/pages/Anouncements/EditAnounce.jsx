import React, { useEffect, useState } from 'react';
import {
    Container, TextField, Button, Typography, Box, Paper
} from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function EditAnounce() {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [avatar, setAvatar] = useState('');
    const [message, setMessage] = useState('');
    const [date, setDate] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    const handleSingleData = () => {
        axios.get(`http://localhost:5000/announcements/${params.id}`)
            .then(res => {
                if (res.data && res.data.anounce) {
                    setName(res.data.anounce.name);
                    setTitle(res.data.anounce.title || '');
                    setAvatar(res.data.anounce.avatar || '');
                    setMessage(res.data.anounce.message || '');
                    setDate(res.data.anounce.date?.slice(0, 10));
                } else {
                    toast.error("Anouncenet not found");
                    navigate("/announcements");
                }
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to load announcement");
                navigate("/announcements");
            });
    };

    useEffect(() => {
        handleSingleData();
    }, []);


    const handleEditAnnouncement = (e) => {
        e.preventDefault();
        const data = {
            name,
            title,
            avatar,
            message,
            date,
        };

        axios.put(`http://localhost:5000/announcements/${params.id}`, data).then(() => {
            navigate("/announcements");
            toast.success("Updated Successfully...");
        }).catch((error) => {
            alert('An error happened. Please Chack console');
            console.log(error);
        });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Edit Announcement
                </Typography>

                <Box component="form" onSubmit={handleEditAnnouncement} noValidate>
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

                    <TextField
                        fullWidth
                        type="date"
                        label="Date"
                        InputLabelProps={{ shrink: true }}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
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
