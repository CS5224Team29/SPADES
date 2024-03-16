import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
    const stockData = {
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
    };

    return (
        <div className="dashboard-container">
            <div className="header">
                <h1>SPADES</h1>
                <div className="tabs">
                    <span>Stocks</span>
                    <span className="active">My watch list</span>
                </div>
                <div className="user-info">
                    John Doe <span> johndoe@gmail.com</span>
                </div>
            </div>
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
                    <tr>
                        <td>{stockData.shortName}</td>
                        <td>{stockData.symbol}</td>
                        <td>{stockData.close_price.toFixed(2)}</td>
                        <td>{stockData.change.toFixed(2)}</td>
                        <td>{(stockData.change_percentage * 100).toFixed(2)}%</td>
                        <td>{stockData.open_price.toFixed(2)}</td>
                        <td>{stockData.high.toFixed(2)}</td>
                        <td>{stockData.low.toFixed(2)}</td>
                        <td>{stockData.volume.toLocaleString()}</td>
                        <td><button>Delete</button></td>
                    </tr>
                    {/* You can map over an array of stock data to generate more rows */}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
