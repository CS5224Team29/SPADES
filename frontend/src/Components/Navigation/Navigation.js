import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Tabs, Tab, Box, Typography, IconButton, Popover, Button, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const routes = ["/dashboard", "/stocks", "/mywatchlist"];
    const currentTab = routes.indexOf(location.pathname);

    const handleChange = (event, newValue) => {
        navigate(routes[newValue]);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverOpen, setPopoverOpen] = useState(false);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setPopoverOpen(true);
    };

    const handlePopoverClose = () => {
        setPopoverOpen(false);
    };

    const handleCleanSession = () => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = `https://spades.auth.us-east-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=4l27f32rcgmkkh51eu23g7ormr&logout_uri=https://dev.dzym427ke4wx7.amplifyapp.com/logout`;
    }


    return (
        <AppBar position="static" sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem', backgroundColor: 'white' }}>
            <Typography variant="h6" noWrap component="div" sx={{ cursor: 'pointer', color: "black", fontWeight: "bold" }} onClick={() => navigate('/dashboard')}>
                SPADES
            </Typography>
            <Tabs
                value={currentTab === -1 ? false : currentTab}
                onChange={handleChange}
                variant="fullWidth"
                sx={{
                    marginRight: "30px", marginLeft: "30px",
                    flex: 1,
                    '.MuiTabs-flexContainer': {
                        justifyContent: 'space-evenly'
                    },
                    '.MuiTabs-indicator': {
                        backgroundColor: '#E87A2A',
                    },
                }}
            >
                {routes.map((route, index) => (
                    <Tab
                        key={route}
                        label={index === 1 ? "Stocks" : index === 2 ? "My Watch List" : "Dashboard"}
                        sx={{
                            color: currentTab === index ? '#E87A2A' : '#A9A9A9',
                            '&.Mui-selected': {
                                color: '#E87A2A',
                                borderBottom: `2px solid #E87A2A`,
                            },
                            '&:hover': {
                                backgroundColor: '#FAEBD7',
                                color: '#E87A2A',
                                opacity: 1,
                            },
                        }}
                    />
                ))}
            </Tabs>
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#E87A2A' }}>

                <IconButton
                    size="medium"
                    sx={{ color: '#E87A2A' }}
                    onClick={handlePopoverOpen}
                >
                    <AccountCircleIcon />
                </IconButton>
                <Popover
                    id="mouse-over-popover"
                    open={popoverOpen}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                    sx={{
                        padding: "10px"
                    }}
                >
                    {/* <Typography sx={{ p: 2, fontSize: "12px" }}>johndoe@gmail.com</Typography>
                    <Divider /> */}
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 1.5 }}>
                        <MonetizationOnIcon sx={{ mr: 1, size: "15px", color: '#E87A2A' }} />
                        <Typography sx={{ fontSize: "12px" }}>50</Typography>
                    </Box>
                    <Divider />
                    <Button
                        startIcon={<LogoutIcon />}
                        onClick={handleCleanSession}
                        sx={{
                            color: 'white',
                            backgroundColor: '#E87A2A',
                            borderRadius: 0,
                            fontSize: "12px",
                            width: "100%",
                            p: 1.5

                        }}
                    >
                        Logout
                    </Button>
                </Popover>
            </Box>
        </AppBar>
    );
};

export default Navigation;
