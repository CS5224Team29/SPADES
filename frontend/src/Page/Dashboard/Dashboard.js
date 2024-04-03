import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Drawer, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import CustomTable from '../../Components/CustomTable/CustomTable';
import { fetchStocksBySector, searchStock } from '../../Services/dashboardListing'
import { addToWatchList, fetchWatchList } from '../../Services/watchListing';
import { useNavigate } from 'react-router-dom';
import { fetchUserInfo } from '../../Cognito/UserSession';
import { setUserId } from '../../Redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setWatchlist } from '../../Redux/watchlist/watchlistSlice';
import { setCurrentSector, setSectorStockList } from '../../Redux/sector/sectorSlice';
import Notification from '../../Components/Notification/Notification';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userId);
    const watchlist = useSelector((state) => state.watchlist.watchlist);
    const sectors = useSelector((state) => state.sector.sectors);
    const currentSector = useSelector((state) => state.sector.currentSector);
    const sectorStockList = useSelector((state) => state.sector.sectorStockList);
    const columns = useSelector((state) => state.sector.columns);


    const [searchTerm, setSearchTerm] = useState('');
    const [stocks, setStocks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });




    useEffect(() => {
        const fetchUserData = async () => {
            const searchParams = new URLSearchParams(window.location.search);
            const code = searchParams.get('code');
            if (code) {
                const user_id = await fetchUserInfo({ code });
                if (user_id) {
                    dispatch(setUserId(user_id));
                    console.log({ user_id })

                }
            }
        };

        fetchUserData();
    }, [dispatch]);


    useEffect(() => {
        if (!sectorStockList[currentSector] || sectorStockList[currentSector].length === 0) {
            setIsLoading(true);
            const fetchInitialStocks = async () => {
                const data = await fetchStocksBySector({ sector: currentSector });
                if (data) {
                    dispatch(setSectorStockList({ sector: currentSector, data }));
                    setStocks(data);
                    setIsLoading(false);
                }

            };
            fetchInitialStocks();
        } else {
            setStocks(sectorStockList[currentSector]);
        }
    }, [dispatch, currentSector, sectorStockList]);

    useEffect(() => {
        if (notification.message !== '') {

            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [notification.message]);


    // useEffect(() => {
    //     const fetchInitialWatchlistData = async () => {
    //         try {
    //             if (userId) {
    //                 setIsLoading(true);
    //                 const initialWatchlist = await fetchWatchList({ user_id: userId });
    //                 if (initialWatchlist) {
    //                     dispatch(setWatchlist(initialWatchlist));
    //                 }
    //                 setIsLoading(false);
    //             }

    //         } catch (error) {
    //             console.error("Error fetching watchlist data:", error);
    //         }
    //     };

    //     fetchInitialWatchlistData();
    // }, [userId, dispatch]);

    const handleSelectSector = async (sector) => {

        dispatch(setCurrentSector(sector));

        if (!sectorStockList[sector] || sectorStockList[sector].length === 0) {
            setIsLoading(true);
            const newStocks = await fetchStocksBySector({ sector });
            if (newStocks) {
                dispatch(setSectorStockList({ sector, data: newStocks }));
                setStocks(newStocks);
                setIsLoading(false);
            }

        } else {
            setStocks(sectorStockList[sector]);
        }
    };



    const handleDelete = (row) => {
    };

    const handleAdd = async (row) => {

        const response = await addToWatchList({ user_id: userId, stock_id: row.id });
        if (response) {
            const newStockData = row;

            dispatch(setWatchlist([...watchlist, newStockData]));
            setNotification({ message: 'Added to watchlist successfully', type: 'success' });

        }
    };


    const handleDetail = (row) => {
        navigate(`/stocks?id=${row.id}`);
    };



    const handleSearch = async () => {
        setIsLoading(true);
        const newStock = await searchStock({ searchText: searchTerm });
        if (newStock) {
            setStocks(newStock);
            setCurrentSector(newStock.sector)
            setIsLoading(false)
        }

    }

    const handleClean = async (sector) => {
        setSearchTerm('');

        setCurrentSector(sector);
        if (!sectorStockList[sector].length > 0) {
            setIsLoading(true);
            const newStocks = await fetchStocksBySector({ sector });
            if (newStocks) {
                setSectorStockList(newStocks);
                setStocks(newStocks);
                setIsLoading(false);
            }

        } else {
            setStocks(sectorStockList[sector]);
        }


    }


    return (
        <Box sx={{ display: 'flex', pt: '30px' }}>
            <Notification message={notification.message} type={notification.type} />
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
                {!isLoading ? (stocks &&
                    <CustomTable columns={columns} data={stocks} onDelete={handleDelete} onAdd={handleAdd} onDetail={handleDetail} showDelete={false} showDetail={true} showAdd={true} />
                ) : (
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
                )}

            </Box>
        </Box>

    );
};

export default Dashboard;
