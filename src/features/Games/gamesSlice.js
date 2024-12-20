import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGames, fetchGamesById } from "../../api/gameApi";

export const fetchGamesThunk = createAsyncThunk(
    "games/fetchGames",
    async ({ page, filters = {} }, { rejectWithValue }) => {
        try {
            const data = await fetchGames(page, filters);
            const filterGames = data.results.filter(game => game.added > 6 && game.background_image !== null);
            const uniqueGames = filterGames.filter((game, index, self) =>
                index === self.findIndex((g) => g.id === game.id)
            )
            return { games: uniqueGames, next: data.next, previous: data.previous };
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const fetchGamesByIdThunk = createAsyncThunk(
    "games/fetchGamesById",
    async (id, { rejectWithValue }) => {
        try {
            const data = await fetchGamesById(id);
            return data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        currentGame: null,
        games: [],
        loading: false,
        error: null,
        currentPage: 1,
        next: null,
        previous: null,
        filters: {
            platform: '',
            genre: '',
            year: '',
            parentPlatform: '',
            search: ''
        }
    },
    reducers: {
        setGames(state, action) {
            state.games = action.payload;
        },
        clearSelectedGame(state) {
            state.currentGame = null;
        },
        setPage(state, action) {
            state.currentPage = action.payload;
        },
        setSearch(state, action) {
            state.filters.search = action.payload;
        },
        delSearch(state) {
            state.filters.search = '';
        },
        setPlatformFilter(state, action) {
            state.filters.platform = action.payload;
        },
        setParentPlatformFilter(state, action) {
            state.filters.parentPlatform = action.payload;
        },
        setGenreFilter(state, action) {
            state.filters.genre = action.payload;
        },
        setYearFilter(state, action) {
            state.filters.year = action.payload;
        },
        resetFilters(state) {
            state.filters = {
                platform: '',
                genre: '',
                year: '',
                parentPlatform: '',
                search: ''
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGamesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGamesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.games = action.payload.games;
                state.next = action.payload.next;
                state.previous = action.payload.previous;
                console.log('Next:', action.payload.next, 'Previous:', action.payload.previous);
            })
            .addCase(fetchGamesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchGamesByIdThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGamesByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.currentGame = action.payload;
            })
            .addCase(fetchGamesByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const {
    selectGame,
    clearSelectedGame,
    setSearch,
    delSearch,
    setPlatformFilter,
    setGenreFilter,
    setYearFilter,
    setGames,
    setParentPlatformFilter,
    resetFilters,
    setPage
} = gamesSlice.actions;
export const selectCurrentGame = (state) => state.games.currentGame;
export const selectGames = (state) => state.games.games;
export const selectCurrentPage = (state) => state.games.currentPage;
export const selectNextPage = (state) => state.games.next;
export const selectPreviousPage = (state) => state.games.previous;
export default gamesSlice.reducer;