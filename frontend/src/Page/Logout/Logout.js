
import React, { useEffect } from 'react';
import { SIGNIN_URL } from '../../Utils/Parameter';
import { Box, CircularProgress } from '@mui/material';


const Logout = () => {
    useEffect(() => {

        sessionStorage.clear();
        localStorage.clear();
        window.location.href = SIGNIN_URL;
    }, []);

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

export default Logout;
