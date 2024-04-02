import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    watchlist: null,
};


export const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {
        setWatchlist: (state, action) => {
            state.watchlist = action.payload;
        },
    },
});

export const { setWatchlist } = watchlistSlice.actions;

export default watchlistSlice.reducer;