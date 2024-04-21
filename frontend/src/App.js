
import React from 'react';
import { Box, CircularProgress } from '@mui/material';
const App = () => {

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

