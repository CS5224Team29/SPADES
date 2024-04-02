import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  columns: [
    { id: 'name', label: 'Name' },
    { id: 'symbol', label: 'Symbol' },
    { id: 'close_price', label: 'Last' },
    { id: 'change', label: 'Chg' },
    { id: 'change_percentage', label: '% Chg' },
    { id: 'open_price', label: 'Open' },
    { id: 'high', label: 'High' },
    { id: 'low', label: 'Low' },
    { id: 'volume', label: 'Volume' },
  ],
  sectors: ['Technology', 'Basic Materials', 'Utilities', 'Consumer Defensive', 'Consumer Cyclical', 'Energy', 'Real Estate', 'Industrials', 'Communication Services', 'Healthcare', 'Financial Services'],
  currentSector: 'Technology',
  sectorStockList: {},
};

export const sectorSlice = createSlice({
  name: 'sector',
  initialState,
  reducers: {
    setCurrentSector: (state, action) => {
      state.currentSector = action.payload;
    },
    setSectorStockList: (state, action) => {
      state.sectorStockList[state.currentSector] = action.payload;
    },
  },
});

export const { setCurrentSector, setSectorStockList } = sectorSlice.actions;

export default sectorSlice.reducer;
