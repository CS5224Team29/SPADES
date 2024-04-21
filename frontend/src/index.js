import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Dashboard from './Page/Dashboard/Dashboard';
import MyWatchList from './Page/MyWatchList/MyWatchList';
import Stocks from './Page/Stocks/Stocks';
import Navigation from './Components/Navigation/Navigation';
import Logout from './Page/Logout/Logout';
import { Provider } from 'react-redux';
import { store } from './Redux/store';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={
            <>
              <Navigation />
              <Dashboard />
            </>
          } />
          <Route path="/mywatchlist" element={<>
            <Navigation />
            <MyWatchList />
          </>} />
          <Route path="/stocks" element={<>
            <Navigation />
            <Stocks />
          </>} />

          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
