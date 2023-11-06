import styled from '@emotion/styled';
import {
  Avatar,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Stack,
  IconButton,
  Tooltip,
  Fab,
  TextField,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';

const StyledCell = styled(TableCell)({
  fontWeight: 'bold',
  fontSize: '1rem',
  color: '#495057',
});

const StyledDataCell = styled(TableCell)({
  fontSize: '1rem',
  fontWeight: 300,
  color: '#0e0e0e',
});

const BookTable = () => {
  const [id, setId] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookRecords, setBookRecords] = useState([]);
  const [bookReturned, setBookReturned] = useState(false);
  const [editValues, setEditValues] = useState({
    Book: '',
    email: '',
    RecipientName: '',
  });
  const url = 'https://654886f5dd8ebcd4ab2304ff.mockapi.io/books';
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const getBookRecords = async () => {
    try {
      await axios.get(url).then(({ data }) => setBookRecords(data));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      setLoading(true);
      await axios.delete(url + `/${id}`);
      await getBookRecords();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const returnBookHandler = async (id) => {
    const data = new Date().toLocaleDateString();

    try {
      setLoading(true);
      await axios.put(url + `/${id}`, { ReturnDate: data });
      await getBookRecords();
      setBookReturned(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const editHandler = async (id) => {
    await axios.get(url + `/${id}`).then(({ data }) => setEditValues(data));
    setIsEdit(true);
    setId(id);
  };

  const editBookRecords = async (id) => {
    try {
      setLoading(true);
      await axios.put(url + `/${id}`, editValues);
      await getBookRecords();
      setBookReturned(false);
      setIsEdit(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios.get(url).then(({ data }) => setBookRecords(data));
    console.log('run');
  }, [url]);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            bgcolor: '#f1f3f5',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" component="p">
            Please wait...
          </Typography>
        </Box>
      ) : (
        <>
          <Container sx={{ marginTop: '7rem' }}>
            <Stack sx={{ marginBottom: '2rem' }}>
              <Typography variant="h2" sx={{ color: '#0e0e0e' }}>
                Library Management
              </Typography>
              <Typography variant="h6" sx={{ color: '#0e0e0e' }}>
                Welcome 🙏🏻
              </Typography>
            </Stack>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledCell>Name</StyledCell>
                  <StyledCell align="left">E-mail</StyledCell>
                  <StyledCell align="left">Book</StyledCell>
                  <StyledCell align="left">Borrowed</StyledCell>
                  <StyledCell align="left">Returned</StyledCell>
                  <StyledCell align="center">Actions</StyledCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookRecords.map((record, index) => (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    key={index}
                  >
                    <TableCell component="th" scope="row">
                      <Stack
                        direction="row"
                        sx={{ gap: 1, alignItems: 'center' }}
                      >
                        <Avatar
                          src={record.avatar}
                          sx={{ height: '1.5rem', width: '1.5rem' }}
                        />
                        {isEdit && id === record.id ? (
                          <TextField
                            variant="standard"
                            value={editValues.RecipientName}
                            placeholder={record.RecipientName}
                            name="RecipientName"
                            onChange={handleChange}
                          />
                        ) : (
                          <Typography
                            sx={{
                              fontSize: '1rem',
                              color: '#0e0e0e',
                              fontWeight: 500,
                            }}
                          >
                            {record.RecipientName}
                          </Typography>
                        )}
                      </Stack>
                    </TableCell>

                    <StyledDataCell align="left">
                      {isEdit && id === record.id ? (
                        <TextField
                          variant="standard"
                          value={editValues.email}
                          placeholder={record.email}
                          name="email"
                          onChange={handleChange}
                        />
                      ) : (
                        record.email
                      )}
                    </StyledDataCell>
                    <StyledDataCell align="left">
                      {isEdit && id === record.id ? (
                        <TextField
                          variant="standard"
                          value={editValues.Book}
                          placeholder={record.Book}
                          name="Book"
                          onChange={handleChange}
                        />
                      ) : (
                        record.Book
                      )}
                    </StyledDataCell>
                    <StyledDataCell align="left">
                      {record.IssueDate}
                    </StyledDataCell>
                    <StyledDataCell align="left">
                      {record.ReturnDate}
                    </StyledDataCell>
                    <StyledDataCell>
                      {bookReturned ? (
                        <IconButton
                          color="success"
                          onClick={() => returnBookHandler(record.id)}
                        >
                          <CheckIcon />
                        </IconButton>
                      ) : isEdit && id === record.id ? (
                        <IconButton
                          color="success"
                          onClick={() => editBookRecords(record.id)}
                        >
                          <CheckIcon />
                        </IconButton>
                      ) : (
                        <Stack direction="row">
                          <IconButton
                            color="primary"
                            onClick={() => navigate('/register')}
                          >
                            <AddIcon />
                          </IconButton>
                          <IconButton
                            color="primary"
                            onClick={() => editHandler(record.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => deleteHandler(record.id)}>
                            <DeleteOutlineIcon color="error" />
                          </IconButton>
                        </Stack>
                      )}
                    </StyledDataCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Container>
          <Tooltip
            title="Return book"
            onClick={() => setBookReturned(true)}
            sx={{
              position: 'fixed',
              bottom: 20,
              right: { xs: 'calc(50% - 25px)', md: 30 },
            }}
          >
            <Fab color="primary" aria-label="add">
              <AssignmentReturnedIcon />
            </Fab>
          </Tooltip>
        </>
      )}
    </>
  );
};

export default BookTable;
