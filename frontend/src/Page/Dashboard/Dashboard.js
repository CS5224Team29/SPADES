import React, { useState } from 'react';
import { Box, Button, Drawer, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import CustomTable from '../../Components/CustomTable/CustomTable';

const Dashboard = () => {
    const columns = [
        { id: 'shortName', label: 'Name' },
        { id: 'symbol', label: 'Symbol' },
        { id: 'close_price', label: 'Last' },
        { id: 'change', label: 'Chg' },
        { id: 'change_percentage', label: '% Chg' },
        { id: 'open_price', label: 'Open' },
        { id: 'high', label: 'High' },
        { id: 'low', label: 'Low' },
        { id: 'volume', label: 'Volume' },
    ];

    const initialStockData = [{
        'symbol': 'MSFT',
        'shortName': 'Microsoft Corporation',
        'industry': 'Software - Infrastructure',
        'website': 'https://www.microsoft.com',
        'sector': 'Technology',
        'open_price': 419.27,
        'close_price': 417.69,
        'high': 422.60,
        'low': 415.76,
        'volume': 14053016,
        'prev_close_price': 425.22,
        'change': -7.53,
        'change_percentage': -1.77
    }, {
        'symbol': 'MSFT',
        'shortName': 'Microsoft Corporation',
        'industry': 'Software - Infrastructure',
        'website': 'https://www.microsoft.com',
        'sector': 'Technology',
        'open_price': 419.27,
        'close_price': 417.69,
        'high': 422.60,
        'low': 415.76,
        'volume': 14053016,
        'prev_close_price': 425.22,
        'change': -7.53,
        'change_percentage': -1.77
    },];
    const [searchTerm, setSearchTerm] = useState('');


    const sectors = ['Technology', 'Healthcare', 'Finance', 'Energy', 'Industrials', 'Utilities']; // Example sectors
    const [selectedSector, setSelectedSector] = useState('Technology');



    const handleSelectSector = (sector) => {
        console.log(`Fetching stocks for sector: ${sector}`);
        setSelectedSector(sector); // Set the selected sector
        // Here you would call your API to fetch stocks for the given sector
    };




    const handleDelete = (row) => {
        console.log('Delete item: ', row);
        // Perform deletion logic here
    };

    const handleSearch = () => {
        console.log("search", searchTerm)
    }

    return (
        <Box sx={{ display: 'flex', pt: '30px' }}>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: 200,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 200,
                        boxSizing: 'border-box',
                        top: '80px',
                        height: `calc(100% - 80px)`,
                        display: 'flex',

                    },
                }}
            >
                <List sx={{ width: '100%' }}>
                    {sectors.map((sector, index) => (
                        <ListItem
                            button
                            key={index}
                            selected={selectedSector === sector}
                            onClick={() => handleSelectSector(sector)}
                            sx={{
                                justifyContent: 'center',
                                backgroundColor: selectedSector === sector ? '#E87A2A' : 'transparent',
                                '&:hover': {
                                    backgroundColor: selectedSector === sector ? '#E87A2A' : 'rgba(0, 0, 0, 0.04)',
                                },
                            }}
                        >
                            <ListItemText primary={sector} sx={{ textAlign: 'center' }} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h6" noWrap>
                    Sector: {selectedSector}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: "space-around", alignItems: 'center' }}>
                    <TextField
                        label="Search by company name"
                        variant="outlined"
                        sx={{ flex: 1 }}
                        margin="normal"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        sx={{ ml: 2, mt: 0.75, height: '54px', width: "60px" }}
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </Box>
                <CustomTable columns={columns} data={initialStockData} onDelete={handleDelete} showDelete={true} showDetail={true} />
            </Box>
        </Box>

    );
};

export default Dashboard;
