import React from 'react';
import './MyWatchList.css';

const MyWatchList = () => {
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

    return (
        <div className="my-watch-list-container">

            <table className="stocks-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Last</th>
                        <th>Chg</th>
                        <th>% Chg</th>
                        <th>Open</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Volume</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {stockData.map((stock, index) => (
                        <tr key={index}>
                            <td>{stock.shortName}</td>
                            <td>{stock.symbol}</td>
                            <td>{stock.close_price.toFixed(2)}</td>
                            <td>{stock.change.toFixed(2)}</td>
                            <td>{(stock.change_percentage * 100).toFixed(2)}%</td>
                            <td>{stock.open_price.toFixed(2)}</td>
                            <td>{stock.high.toFixed(2)}</td>
                            <td>{stock.low.toFixed(2)}</td>
                            <td>{stock.volume.toLocaleString()}</td>
                            <td><button>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default MyWatchList;
