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
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AnounceList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // get data
  const getAllData = () => {
    axios
      .get('http://localhost:5000/announcements')
      .then((res) => {
        setAnnouncements(res.data.data);
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
          .delete(`http://localhost:5000/announcements/${id}`)
          .then(() => {
            getAllData();
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
            navigate('/announcements');
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
        Announcement List
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          component={Link}
          to="/createAnouncement"
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
                <TableCell sx={{ color: 'white', fontSize: '16px' }}>Title</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px' }}>Avatar</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px' }}>Message</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px' }}>Due To</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px' }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {announcements.map((el) => (
                <TableRow key={el._id} hover>
                  <TableCell>{el.name}</TableCell>
                  <TableCell>{el.title}</TableCell>
                  <TableCell>
                    <Avatar src={el.avatar} alt={el.name} />
                  </TableCell>
                  <TableCell>{el.message}</TableCell>
                  <TableCell>{new Date(el.date).toLocaleDateString('en-US')}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="warning"
                      component={Link}
                      to={`/editAnouncement/${el._id}`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(el._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Mobile Card View */}
      {isMobile && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          {announcements.map((el) => (
            <Card key={el._id} elevation={2}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={el.avatar} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {el.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {el.title}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Message:</strong> {el.message}
                </Typography>
                <Typography variant="body2">
                  <strong>Date:</strong> {el.date}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <IconButton
                  color="warning"
                  component={Link}
                  to={`/editAnouncement/${el._id}`}
                >
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(el._id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default AnounceList;
