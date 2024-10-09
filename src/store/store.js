import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "../features/Games/gamesSlice";
import { igdbApi } from "../api/igdbApiSlice";

export const store = configureStore({
    reducer: {
        games: gamesReducer,
        [igdbApi.reducerPath]: igdbApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(igdbApi.middleware),
});