import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Paper,
    Grid,
    Container,
    IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();

    const question = "What does 'const' mean in JavaScript?";
    const options = [
        "A variable that can be reassigned",
        "A constant variable",
        "A function",
        "A class"
    ];

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 3 }}>
                {/* Top Image with Back Button */}
                <Box
                    sx={{
                        height: 160,
                        backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative'
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            zIndex: 2
                        }}
                    >
                        <IconButton
                            onClick={() => navigate('/dashboard')}
                            sx={{
                                color: 'white',
                                backgroundColor: 'rgba(0,0,0,0.4)',
                                '&:hover': {
                                    backgroundColor: 'rgba(0,0,0,0.6)'
                                }
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    </Box>

                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant="h5" color="white" fontWeight="bold">
                            Quiz App
                        </Typography>
                    </Box>
                </Box>

                {/* Question */}
                <Box sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                        {question}
                    </Typography>

                    <Grid container spacing={2} justifyContent="center">
                        {options.map((opt, idx) => (
                            <Grid item xs={12} key={idx}>
                                <Button
                                    fullWidth
                                    variant={selected === opt ? 'contained' : 'outlined'}
                                    color={selected === opt ? 'primary' : 'inherit'}
                                    onClick={() => setSelected(opt)}
                                    sx={{
                                        textTransform: 'none',
                                        fontSize: '0.95rem',
                                        py: 1,
                                        whiteSpace: 'normal',
                                        minHeight: '50px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        px: 2
                                    }}
                                >
                                    {opt}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>

                    <Button
                        variant="contained"
                        sx={{
                            mt: 4,
                            backgroundColor: '#2e3c51',
                            textTransform: 'none',
                            fontSize: '0.95rem',
                            px: 4,
                            py: 1.2
                        }}
                    >
                        Next Question
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default QuizPage;
