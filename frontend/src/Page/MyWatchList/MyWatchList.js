import React, { useState } from 'react';
import CustomTable from '../../Components/CustomTable/CustomTable';
import { useNavigate } from 'react-router-dom';
import { deleteWatchList, fetchWatchList } from '../../Services/watchListing';
import { useSelector } from 'react-redux';


const MyWatchList = () => {
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user.userId);
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
        'id': '1',
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
        'id': '2',
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

    const [stockData, setStockData] = useState(initialStockData)



    // useEffect(() => {
    //     const fetchInitialStockData = async () => {
    //         try {
    //             const stocks = await fetchWatchList({userId});
    //             setWatchlist(stocks);
    //         } catch (error) {
    //             console.error("Error fetching watchlist data:", error);

    //         }
    //     };

    //     fetchInitialStockData();
    // }, [userId]);



    const handleDelete = async (row) => {

        console.log('Deleting', row.id);
        await deleteWatchList({ user_id: userId, stock_id: row.id });
        const newStocksList = await fetchWatchList({ user_id: userId })
        setStockData(newStocksList);

    };

    const handleAdd = async (row) => {

    };

    const handleDetail = (row) => {

        navigate(`/stocks?stockId=${row.id}`);
    };


    return (
        <CustomTable columns={columns} data={stockData} onDelete={handleDelete} onAdd={handleAdd} onDetail={handleDetail} showDelete={true} showDetail={true} showAdd={false} />
    );
};


export default MyWatchList;
