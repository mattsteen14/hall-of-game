import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "../features/Games/gamesSlice";

export const store = configureStore({
    reducer: {
        games: gamesReducer,
    },
});