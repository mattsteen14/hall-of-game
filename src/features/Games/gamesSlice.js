import { createSlice } from "@reduxjs/toolkit";

const gamesSlice = createSlice({
    name: "games",
    initialState: {
        currentGame: null,
        games: [],
        search: '',
        platformFilter: '',
        genreFilter: '',
        yearFilter: '',
    },
    reducers: {
        setGames(state, action) {
            state.games = action.payload;
        },
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
        },
        setPlatformFilter: (state, action) => {
            state.platformFilter = action.payload;
        },
        setGenreFilter: (state, action) => {
            state.genreFilter = action.payload;
        },
        setYearFilter: (state, action) => {
            state.yearFilter = action.payload;
        }
    },
});

export const { selectGame, clearSelectedGame, setSearch, delSearch, setPlatformFilter, setGenreFilter, setYearFilter } = gamesSlice.actions;
export const selectCurrentGame = (state) => state.games.currentGame;
export default gamesSlice.reducer;