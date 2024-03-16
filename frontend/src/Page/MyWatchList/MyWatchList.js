import React from 'react';
import './MyWatchList.css';
import CustomTable from '../../Components/CustomTable/CustomTable';

const MyWatchList = () => {
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
    const stockData = [{
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
    const handleDelete = (id) => {
        console.log('Delete item with id: ', id);
        // Perform deletion logic here
    };

    return (
        <CustomTable columns={columns} data={stockData} onDelete={handleDelete} showAdd={false} showDelete={true} showDetail={true} />
    );
};


export default MyWatchList;
