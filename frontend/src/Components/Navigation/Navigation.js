import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Tabs, Tab, Box, Typography, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const routes = ["/stocks", "/mywatchlist", "/dashboard"];
    const currentTab = routes.indexOf(location.pathname);

    const handleChange = (event, newValue) => {
        navigate(routes[newValue]);
    };

    return (
        <AppBar position="static" color="default" sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem' }}>
            <Typography variant="h6" noWrap component="div" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                SPADES
            </Typography>
            <Tabs value={currentTab === -1 ? false : currentTab} onChange={handleChange} centered>
                <Tab label="Stocks" />
                <Tab label="My Watch List" />
                <Tab label="Dashboard" />
            </Tabs>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" noWrap>
                    John Doe
                </Typography>
                <IconButton size="large" edge="end" color="inherit">
                    <AccountCircleIcon />
                </IconButton>
            </Box>
        </AppBar>
    );
};

export default Navigation;
