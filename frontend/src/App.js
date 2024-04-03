
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
const App = () => {
  const navigate = useNavigate();

  useEffect(() => {

    navigate('/dashboard');
  }, [navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20vh',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default App;

