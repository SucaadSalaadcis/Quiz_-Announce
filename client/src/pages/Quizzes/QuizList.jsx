import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from "sweetalert2";
import {
    Container,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Box,
    IconButton,
    Card,
    CardContent,
    CardActions,
    Divider,
    useTheme,
    useMediaQuery,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,

} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);

    const [open, setOpen] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    const handleOpen = (quiz) => {
        setSelectedQuiz(quiz);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedQuiz(null);
    };

    const navigate = useNavigate();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // get data
    const getAllData = () => {
        axios
            .get('http://localhost:5000/quizzes')
            .then((res) => {
                setQuizzes(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getAllData();
    }, []);

    // delete data
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:5000/quizzes/${id}`)
                    .then(() => {
                        getAllData();
                        Swal.fire("Deleted!", "Your data has been deleted.", "success");
                        navigate('/quizzes');
                    })
                    .catch((error) => {
                        console.error("Error deleting the record:", error);
                        Swal.fire(
                            "Error!",
                            error.response?.data?.message || "Failed to delete the record.",
                            "error"
                        );
                    });
            }
        });
    };


    return (
        <Container maxWidth="lg" sx={{ mt: 10 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Quiz List
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                    component={Link}
                    to="/createQuiz"
                    variant="contained"
                    startIcon={<AddIcon />}
                >
                    Add
                </Button>
            </Box>

            {/* Desktop Table */}
            {!isMobile && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#1565C0' }}>
                            <TableRow>
                                <TableCell sx={{ color: 'white', fontSize: '16px' }}>Name</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '16px' }}>Course</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '16px' }}>Topic</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '16px' }}>Due To</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '16px' }}>Questions</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '16px' }} align="center">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {quizzes.map((el) => (
                                <TableRow key={el._id}>
                                    <TableCell>{el.name}</TableCell>
                                    <TableCell>{el.course}</TableCell>
                                    <TableCell>{el.topic}</TableCell>
                                    <TableCell>{new Date(el.date).toLocaleDateString('en-US')}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleOpen(el)}>
                                            <VisibilityIcon color="primary" />
                                        </IconButton>
                                    </TableCell>
                                    {/* actions */}
                                    <TableCell align="center">
                                        <IconButton
                                            color="warning"
                                            component={Link}
                                            to={`/editQuiz/${el._id}`}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDelete(el._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {/* Modal Dialog */}
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                maxWidth="sm"
                                fullWidth={false}

                            >
                                <DialogTitle sx={{ fontSize: '18px', fontWeight: 'bold', pb: 1 }}>
                                    Quiz Questions
                                </DialogTitle>

                                <DialogContent dividers sx={{ maxHeight: '60vh', p: 2 }}>
                                    {selectedQuiz?.questions?.length > 0 ? (
                                        selectedQuiz.questions.map((q, index) => (
                                            <Box key={index} sx={{ mb: 2 }}>
                                                <Typography
                                                    sx={{ fontSize: '15px', fontWeight: 'bold', mb: 0.5 }}
                                                >
                                                    Q{index + 1}: {q.questionText}
                                                </Typography>
                                                <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                                                    {q.options.map((option, optIdx) => (
                                                        <li key={optIdx}>
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    fontSize: '14px',
                                                                    color: option === q.correctAnswer ? 'green' : 'text.primary',
                                                                }}
                                                            >
                                                                {option}
                                                            </Typography>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Box>
                                        ))
                                    ) : (
                                        <Typography>No questions available</Typography>
                                    )}
                                </DialogContent>

                                <DialogActions>
                                    <Button onClick={handleClose} variant="outlined" size="small">
                                        Close
                                    </Button>
                                </DialogActions>
                            </Dialog>


                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Mobile Card View */}
            {isMobile && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    {quizzes.map((el) => (
                        <Card key={el._id} elevation={2} sx={{ p: 1 }}>
                            <CardContent sx={{ p: 1.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {el.name}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {el.course}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Divider sx={{ my: 1 }} />

                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    <strong>Topic:</strong> {el.topic}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    <strong>Due To:</strong> {el.dueTo}
                                </Typography>

                                <Box sx={{ mt: 1 }}>
                                    <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
                                        Questions:
                                    </Typography>
                                    {el.questions && el.questions.length > 0 ? (
                                        <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                                            {el.questions.map((q, idx) => (
                                                <li key={idx}>
                                                    <Typography variant="body2" sx={{ fontSize: '13px' }}>
                                                        <strong>Q{idx + 1}:</strong> {q.questionText}
                                                    </Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <Typography variant="caption" color="text.secondary">
                                            No questions available
                                        </Typography>
                                    )}
                                </Box>
                            </CardContent>

                            <CardActions sx={{ justifyContent: 'flex-end', px: 1 }}>
                                <IconButton
                                    color="warning"
                                    component={Link}
                                    to={`/editQuiz/${el._id}`}
                                    size="small"
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleDelete(el._id)} size="small">
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            )}

        </Container>
    );
};

export default QuizList;
