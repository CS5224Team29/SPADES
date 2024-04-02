import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user/userSlice";
import watchlistReducer from "./watchlist/watchlistSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    watchlist: watchlistReducer,
  },
  devTools: true,
});


