import React, { useEffect, useState } from 'react';
import { Box, Button, Drawer, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import CustomTable from '../../Components/CustomTable/CustomTable';
import { fetchStocksBySector, searchStock } from '../../Services/dashboardListing'
import { addToWatchList, fetchWatchList } from '../../Services/watchListing';
import { useNavigate } from 'react-router-dom';
import { fetchUserInfo } from '../../Cognito/UserSession';
import { setUserId } from '../../Redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setWatchlist } from '../../Redux/watchlist/watchlistSlice';
import { setCurrentSector, setSectorStockList } from '../../Redux/sector/sectorSlice';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userId);
    const sectors = useSelector((state) => state.sector.sectors);
    const currentSector = useSelector((state) => state.sector.currentSector);
    const sectorStockList = useSelector((state) => state.sector.sectorStockList);
    const columns = useSelector((state) => state.sector.columns);
    const [searchTerm, setSearchTerm] = useState('');
    const [stocks, setStocks] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            const searchParams = new URLSearchParams(window.location.search);
            const code = searchParams.get('code');
            if (code) {
                const user_id = await fetchUserInfo({ code });
                if (user_id) {
                    dispatch(setUserId(user_id));
                }
            }
        };

        fetchData();
    }, [dispatch]);


    useEffect(() => {
        const fetchInitialStocks = async () => {
            try {
                const initialStocks = await fetchStocksBySector({ sector: 'Technology' });
                dispatch(setCurrentSector('Technology'));
                dispatch(setSectorStockList(initialStocks));
                setStocks(initialStocks);
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };

        fetchInitialStocks();
    }, [dispatch]);

    const handleSelectSector = async (sector) => {
        dispatch(setCurrentSector(sector));
        if (!sectorStockList[sector] || sectorStockList[sector].length === 0) {
            const newStocks = await fetchStocksBySector({ sector });
            dispatch(setSectorStockList({ [sector]: newStocks }));
            setStocks(newStocks);
        } else {
            setStocks(sectorStockList[sector]);
        }
    };



    const handleDelete = (row) => {
    };

    const handleAdd = async (row) => {
        await addToWatchList({ user_id: userId, stock_id: row.id });
        const newStocksList = await fetchWatchList({ user_id: userId })
        setWatchlist(newStocksList);

    };

    const handleDetail = (row) => {
        navigate(`/stocks?id=${row.id}`);
    };



    const handleSearch = async () => {
        const newStock = await searchStock(searchTerm);
        setStocks(newStock);
        setCurrentSector(newStock.sector)
        console.log("search", searchTerm)
    }

    const handleClean = async (sector) => {
        setSearchTerm('');

        setCurrentSector(sector);
        if (!sectorStockList[sector].length > 0) {
            const newStocks = await fetchStocksBySector({ sector });
            setSectorStockList(newStocks);
            setStocks(newStocks);
        } else {
            setStocks(sectorStockList[sector]);
            setStocks(sectorStockList[sector]);
        }

        console.log("search", searchTerm)
    }

    console.log("stocks", stocks)

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
                            selected={currentSector === sector}
                            onClick={() => handleSelectSector(sector)}
                            sx={{
                                justifyContent: 'center',
                                backgroundColor: currentSector === sector ? '#E87A2A' : 'transparent',
                                '&:hover': {
                                    backgroundColor: currentSector === sector ? '#E87A2A' : 'rgba(0, 0, 0, 0.04)',
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
                    Sector: {currentSector}
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
                {stocks &&
                    <CustomTable columns={columns} data={stocks} onDelete={handleDelete} onAdd={handleAdd} onDetail={handleDetail} showDelete={false} showDetail={true} showAdd={true} />
                }

            </Box>
        </Box>

    );
};

export default Dashboard;
