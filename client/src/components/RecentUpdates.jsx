import React, { useEffect, useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    Button
} from '@mui/material';

import QuizIcon from '@mui/icons-material/Quiz';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RecentUpdates() {
    const [announcements, setAnnouncements] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/announcements')
            .then((res) => setAnnouncements(res.data.data))
            .catch((error) => console.log(error));

        axios.get('http://localhost:5000/quizzes')
            .then((res) => setQuizzes(res.data.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 4 }}>
            {/* Announcements */}
            <Paper sx={{ p: 2, flex: 1, minWidth: 300, maxHeight: 300, overflowY: 'auto' }}>
                <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                    🔔 Latest Announcements
                </Typography>
                <List>
                    {announcements.map((item, index) => (
                        <div key={index}>
                            <ListItem alignItems="flex-start" sx={{ py: 1 }}>
                                <Typography sx={{ width: 30, color: 'gray', fontSize: '0.875rem' }}>
                                    {String(index + 1).padStart(2, '0')}
                                </Typography>

                                <ListItemAvatar>
                                    <Avatar src={item.avatar} sx={{ width: 32, height: 32 }} />
                                </ListItemAvatar>

                                <ListItemText
                                    primary={
                                        <Typography variant="body1" fontWeight="bold">
                                            {item.name}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" sx={{ textTransform: 'uppercase' }}>
                                            {item.title}
                                        </Typography>
                                    }
                                />

                                <Typography variant="body2" sx={{ color: 'gray' }}>
                                    {item.message}
                                </Typography>
                            </ListItem>

                            {index < announcements.length - 1 && <Divider />}
                        </div>
                    ))}
                </List>


            </Paper>

            {/* Quizzes */}
            {/* Quizzes */}
            <Paper sx={{ p: 2, width: 320 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary', fontWeight: 600 }}>
                    📝 Latest Quizzes
                </Typography>

                <List>
                    {quizzes.map((el, idx) => (
                        <ListItem
                            key={idx}
                            alignItems="flex-start"
                            sx={{
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                borderBottom: idx < quizzes.length - 1 ? '1px solid #eee' : 'none',
                                pb: 2,
                                mb: 2
                            }}
                        >
                            {/* Quiz Title */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <QuizIcon sx={{ color: '#155DFC' }} />
                                <Typography variant="h6" fontWeight="bold">
                                    {el.name}
                                </Typography>
                            </Box>

                            {/* Quiz Info */}
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                <strong>Course:</strong> {el.course}
                            </Typography>

                            <Typography variant="body1" sx={{ mt: 0.5 }}>
                                <strong>Topic:</strong> {el.topic}
                            </Typography>

                            <Typography variant="body1" sx={{ mt: 0.5 }}>
                                <strong>Due To:</strong> {new Date(el.date).toLocaleDateString('en-US')}
                            </Typography>

                            {/* Button */}
                            <Link to="/startQ">
                                <Button
                                    variant="outlined"
                                    sx={{ mt: 2, alignSelf: 'flex-end' }}
                                    color="primary"
                                >
                                    Start Quiz
                                </Button>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Paper>


        </Box>
    );
}

export default RecentUpdates;
