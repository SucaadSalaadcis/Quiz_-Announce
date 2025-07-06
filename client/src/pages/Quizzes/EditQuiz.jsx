import React, { useState, useEffect } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper
} from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function EditQuiz() {
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [topic, setTopic] = useState('');
    const [date, setDate] = useState('');
    const [questions, setQuestions] = useState([
        { questionText: '', options: ['', '', ''], correctAnswer: '' },
    ]);

    const navigate = useNavigate();
    const { id } = useParams();

    const handleSingleData = () => {
        axios.get(`http://localhost:5000/quizzes/${id}`)
            .then(res => {
                const quiz = res.data.quiz || res.data;

                setName(quiz.name || '');
                setCourse(quiz.course || '');
                setTopic(quiz.topic || '');
                setDate(quiz.date?.slice(0, 10));
                setQuestions(
                    Array.isArray(quiz.questions) && quiz.questions.length > 0
                        ? quiz.questions
                        : [{ questionText: '', options: ['', '', ''], correctAnswer: '' }]
                );
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to load quiz.");
            });
    };

    useEffect(() => {
        handleSingleData();
    }, []);

    const handleUpdateQuiz = (e) => {
        e.preventDefault();

        const data = { name, course, topic, date, questions };

        axios.put(`http://localhost:5000/quizzes/${id}`, data)
            .then(() => {
                toast.success("Quiz updated successfully");
                navigate('/quizzes');
            })
            .catch((error) => {
                console.log(error);
                toast.error("Update failed");
            });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Update Quiz
                </Typography>

                <Box component="form" onSubmit={handleUpdateQuiz} noValidate>
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
                        label="Course"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
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

                    {questions.map((q, idx) => (
                        <Box key={idx} sx={{ mb: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                            <Typography variant="subtitle2" fontWeight="bold">
                                Question {idx + 1}
                            </Typography>

                            <TextField
                                label="Question Text"
                                fullWidth
                                value={q.questionText}
                                onChange={(e) => {
                                    const updated = [...questions];
                                    updated[idx].questionText = e.target.value;
                                    setQuestions(updated);
                                }}
                                sx={{ mt: 1 }}
                                required
                            />

                            {q.options.map((opt, optIdx) => (
                                <TextField
                                    key={optIdx}
                                    label={`Option ${optIdx + 1}`}
                                    fullWidth
                                    value={opt}
                                    onChange={(e) => {
                                        const updated = [...questions];
                                        updated[idx].options[optIdx] = e.target.value;
                                        setQuestions(updated);
                                    }}
                                    sx={{ mt: 1 }}
                                    required
                                />
                            ))}

                            <TextField
                                label="Correct Answer"
                                fullWidth
                                value={q.correctAnswer}
                                onChange={(e) => {
                                    const updated = [...questions];
                                    updated[idx].correctAnswer = e.target.value;
                                    setQuestions(updated);
                                }}
                                sx={{ mt: 1 }}
                                required
                            />
                        </Box>
                    ))}

                    <Box mt={3} textAlign="center">
                        <Button type="submit" variant="contained" color="primary">
                            Update Quiz
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
