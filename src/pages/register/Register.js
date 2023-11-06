import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { basicSchema } from '../../schema/FormSchema';
import './Register.css';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300,
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  borderRadius: 1,
  p: 3,
};

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (value, option) => {
    try {
      const url = 'https://654886f5dd8ebcd4ab2304ff.mockapi.io/books';

      setLoading(true);
      await axios.post(url, formik.values);
      setLoading(false);
      navigate('/');
    } catch (error) {
      console.log(error);
    }

    option.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      Book: '',
      email: '',
      RecipientName: '',
      IssueDate: new Date().toLocaleDateString(),
      ReturnDate: '--',
    },
    validationSchema: basicSchema,
    onSubmit,
  });

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
        <Box sx={style}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ textAlign: 'center', marginBottom: '1rem' }}
          >
            Issue Book
          </Typography>
          <form
            autoComplete="off"
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            onSubmit={formik.handleSubmit}
          >
            <TextField
              type="text"
              id="Book"
              size="small"
              label="Book"
              variant="outlined"
              value={formik.values.Book}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.Book && formik.touched.Book ? true : false}
              helperText={formik.touched.Book && formik.errors.Book}
              required
            />
            <TextField
              type="text"
              id="email"
              size="small"
              label="email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.email && formik.touched.email ? true : false}
              helperText={formik.touched.email && formik.errors.email}
              required
            />
            <TextField
              type="text"
              id="RecipientName"
              size="small"
              label="Recipient-name"
              variant="outlined"
              value={formik.values.RecipientName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.RecipientName && formik.touched.RecipientName
                  ? true
                  : false
              }
              helperText={
                formik.touched.RecipientName && formik.errors.RecipientName
              }
              required
            />
            <Button variant="contained" type="submit">
              confirm
            </Button>
          </form>
        </Box>
      )}
    </>
  );
};

export default Register;
