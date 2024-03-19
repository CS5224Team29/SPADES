import React, { useState } from 'react';
import { Box, Button, Drawer, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import CustomTable from '../../Components/CustomTable/CustomTable';
import { fetchStocksBySector, searchStock } from '../../Services/dashboardListing'
import { addToWatchList } from '../../Services/watchListing';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
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
        'id': 'bbbbbbbbbbbb',
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
        'id': 'aaaaaaaaaaaaa',
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


    const sectors = ['Technology', 'Healthcare', 'Finance', 'Energy', 'Industrials', 'Utilities'];
    const [selectedSector, setSelectedSector] = useState('Technology');
    const [stocks, setStocks] = useState(initialStockData);



    // const [stocks, setStocks] = useState([]); // Initialize with empty array


    // useEffect(() => {
    //     const fetchInitialStocks = async () => {
    //         try {
    //             const stocks = await fetchStocksBySector('Technology');
    //             setStockData(stocks);
    //         } catch (error) {
    //             console.error("Error fetching watchlist data:", error);

    //         }
    //     };

    //     fetchInitialStocks();
    // }, []);

    const handleSelectSector = async (sector) => {
        console.log(`Fetching stocks for sector: ${sector}`);
        setSelectedSector(sector);

        const newStocks = await fetchStocksBySector(sector);
        setStocks(newStocks);

    };




    const handleDelete = (row) => {
        console.log('Deleting', row.id);
    };

    const handleAdd = async (row) => {
        await addToWatchList(row.id);
        console.log('Adding', row.id);

    };

    const handleDetail = (row) => {
        navigate(`/stocks?id=${row.id}`);
    };



    const handleSearch = async () => {
        const newStock = await searchStock(searchTerm);
        setStocks(newStock);
        setSelectedSector(newStock.sector)
        console.log("search", searchTerm)
    }

    const handleClean = async (sector) => {
        setSearchTerm('');
        const newStocks = await fetchStocksBySector(sector);
        setStocks(newStocks);
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
                    <Button
                        variant="contained"
                        sx={{ ml: 2, mt: 0.75, height: '54px', width: "60px" }}
                        onClick={handleClean}
                    >
                        Clean Search
                    </Button>
                </Box>
                <CustomTable columns={columns} data={stocks} onDelete={handleDelete} onAdd={handleAdd} onDetail={handleDetail} showDelete={false} showDetail={true} showAdd={true} />
            </Box>
        </Box>

    );
};

export default Dashboard;
