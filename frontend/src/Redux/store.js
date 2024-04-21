import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user/userSlice";
import watchlistReducer from "./watchlist/watchlistSlice";
import sectorReducer from "./sector/sectorSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    watchlist: watchlistReducer,
    sector: sectorReducer,
  },
  devTools: true,
});


