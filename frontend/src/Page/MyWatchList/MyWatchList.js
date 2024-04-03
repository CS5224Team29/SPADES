import React, { useEffect, useState } from 'react';
import CustomTable from '../../Components/CustomTable/CustomTable';
import { useNavigate } from 'react-router-dom';
import { deleteWatchList, fetchWatchList } from '../../Services/watchListing';
import { useDispatch, useSelector } from 'react-redux';
import { setWatchlist } from '../../Redux/watchlist/watchlistSlice';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import Notification from '../../Components/Notification/Notification';


const MyWatchList = () => {
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user.userId);
    const columns = useSelector((state) => state.sector.columns);
    const watchlist = useSelector((state) => state.watchlist.watchlist);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });


    console.log({ userId });

    useEffect(() => {
        const fetchInitialWatchlistData = async () => {
            try {
                setIsLoading(true);
                const initialWatchlist = await fetchWatchList({ user_id: userId });
                if (initialWatchlist) {
                    dispatch(setWatchlist(initialWatchlist));
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching watchlist data:", error);
            }
        };

        fetchInitialWatchlistData();
    }, [userId, dispatch]);

    useEffect(() => {
        if (notification.message !== '') {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [notification.message]);




    const handleDelete = async (row) => {

        try {
            setIsLoading(true);
            const response = await deleteWatchList({ user_id: userId, stock_id: row.id });
            if (response) {
                const updatedWatchlist = watchlist.filter(stock => stock.id !== row.id);
                dispatch(setWatchlist(updatedWatchlist));
                setNotification({ message: 'Delete from watchlist successfully', type: 'success' });
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error deleting stock from watchlist:", error);
        }
    };


    const handleAdd = async (row) => { };

    const handleDetail = (row) => {

        navigate(`/stocks?id=${row.id}`);
    };


    return (
        <>
            <Notification message={notification.message} type={notification.type} />
            {!isLoading ? (
                watchlist ? (
                    <CustomTable
                        columns={columns}
                        data={watchlist}
                        onDelete={handleDelete}
                        onAdd={handleAdd}
                        onDetail={handleDetail}
                        showDelete={true}
                        showDetail={true}
                        showAdd={false} />)
                    : (<Box
                        sx={{
                            margin: 6,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1.5px solid ',
                            borderColor: '#E87A2A',
                            borderRadius: 4,
                            height: '15vh',
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={0.5}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography component="span" align="center">
                                {`You don't have any stock in your watchlist.`}
                            </Typography>
                            <Typography
                                component="span"
                                sx={{
                                    color: '#E87A2A',
                                    fontWeight: 'bold',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                }}
                                onClick={() => navigate('/dashboard')}
                            >
                                Add a stock to watchlist
                            </Typography>
                        </Stack>
                    </Box >)


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
                </Box >
            )}

        </>
    );
};


export default MyWatchList;
