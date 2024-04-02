import React, { useState } from 'react';
import CustomTable from '../../Components/CustomTable/CustomTable';
import { useNavigate } from 'react-router-dom';
import { deleteWatchList, fetchWatchList } from '../../Services/watchListing';

const MyWatchList = () => {
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


    // const [stockData, setStockData] = useState([]); // Initialize with empty array


    // useEffect(() => {
    //     const fetchInitialStockData = async () => {
    //         try {
    //             const stocks = await fetchWatchList();
    //             setStockData(stocks);
    //         } catch (error) {
    //             console.error("Error fetching watchlist data:", error);

    //         }
    //     };

    //     fetchInitialStockData();
    // }, []);



    const handleDelete = async (row) => {

        console.log('Deleting', row.id);

        await deleteWatchList(row.id);
        const newStocks = await fetchWatchList({ user_id: user_id })
        setStockData(newStocks);

    };

    const handleAdd = (row) => {

        console.log('Adding', row.id);

    };

    const handleDetail = (row) => {

        navigate(`/stocks?id=${row.id}`);
    };


    return (
        <CustomTable columns={columns} data={stockData} onDelete={handleDelete} onAdd={handleAdd} onDetail={handleDetail} showDelete={true} showDetail={true} showAdd={false} />
    );
};


export default MyWatchList;
