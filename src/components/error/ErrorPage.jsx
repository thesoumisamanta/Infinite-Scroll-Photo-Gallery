import React from 'react';
import { useDispatch } from 'react-redux';
import { resetState } from '../../redux/slices/gallerySlice';
import {
  Box,
  Typography,
  Button,
  Paper
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import './errorPage.css';

export default function ErrorPage({ statusCode, message }) {
  const dispatch = useDispatch();

  const handleReload = () => {
    dispatch(resetState()); 
    window.location.reload(); 
  };

  return (
    <Box className="error-container">
      <Paper className="error-paper" elevation={0}>
        <ErrorOutlineIcon className="error-icon" />

        <Typography
          variant="h5"
          component="h1"
          className="error-title"
        >
          This page isn't working
        </Typography>

        <Typography
          variant="body1"
          className="error-message"
        >
          {message || "The server is currently unable to handle this request."}
        </Typography>

        <Typography
          variant="body2"
          className="error-code"
        >
          HTTP ERROR {statusCode || 500}
        </Typography>

        <Button
          variant="contained"
          className="reload-button"
          onClick={handleReload}  
        >
          <RefreshIcon className="reload-icon" />
          Reload
        </Button>

      </Paper>
    </Box>
  );
}