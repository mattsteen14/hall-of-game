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
        resetPlatformFilter: (state) => {
            state.platformFilter = '';
        },
        setGenreFilter: (state, action) => {
            state.genreFilter = action.payload;
        },
        resetGenreFilter: (state) => {
            state.genreFilter = '';
        },
        setYearFilter: (state, action) => {
            state.yearFilter = action.payload;
        },
        resetYearFilter: (state) => {
            state.yearFilter = '';
        }
    },
});

export const selectGameById = (state, gameId) => {
    return state.games.games.find(game => game.id === Number(gameId));
}

export const { selectGame, clearSelectedGame, setSearch, delSearch, setPlatformFilter, resetPlatformFilter, setGenreFilter, resetGenreFilter, setYearFilter, resetYearFilter, setGames } = gamesSlice.actions;
export const selectCurrentGame = (state) => state.games.currentGame;
export default gamesSlice.reducer;