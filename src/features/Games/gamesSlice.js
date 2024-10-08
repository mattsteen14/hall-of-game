import { createSlice } from "@reduxjs/toolkit";

const gamesSlice = createSlice({
    name: "games",
    initialState: {
        currentGame: null,
        games: [],
        search: '',
    },
    reducers: {
        selectGame(state, action) {
            state.currentGame = action.payload;
        },
        clearSelectedGame(state) {
            state.currentGame = null;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        delSearch: (state) => {
            state.search = '';
        } 
    },
});

export const { selectGame, clearSelectedGame, setSearch, delSearch } = gamesSlice.actions;
export const selectCurrentGame = (state) => state.games.currentGame;
export default gamesSlice.reducer;