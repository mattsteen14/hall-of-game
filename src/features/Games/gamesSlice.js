import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGames, fetchGamesById } from "../../api/gameApi";

export const fetchGamesThunk = createAsyncThunk(
    "games/fetchGames",
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchGames();
            const filterGames = data.results.filter(game => game.added > 1);
            const uniqueGames = filterGames.filter((game, index, self) =>
                index === self.findIndex((g) => g.id === game.id) 
            )
            return uniqueGames;
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
        search: '',
        platformFilter: [],
        genreFilter: [],
        yearFilter: '',
    },
    reducers: {
        setGames: (state, action) => { 
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
            state.platformFilter = []; 
        },
        setGenreFilter: (state, action) => { 
            state.genreFilter = action.payload; 
        },
        resetGenreFilter: (state) => { 
            state.genreFilter = []; 
        },
        setYearFilter: (state, action) => { 
            state.yearFilter = action.payload; 
        },
        resetYearFilter: (state) => { 
            state.yearFilter = ''; 
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
                state.games = action.payload;
            })
            .addCase(fetchGamesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchGamesByIdThunk.fulfilled, (state, action) => {
                state.currentGame = action.payload;
            })
            .addCase(fetchGamesByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchGamesByIdThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
    }
});

export const { 
    selectGame, 
    clearSelectedGame, 
    setSearch, 
    delSearch, 
    setPlatformFilter, 
    resetPlatformFilter, 
    setGenreFilter, 
    resetGenreFilter, 
    setYearFilter, 
    resetYearFilter, 
    setGames, 
} = gamesSlice.actions;
export const selectCurrentGame = (state) => state.games.currentGame;
export const selectGames = (state) => state.games.games;
export default gamesSlice.reducer;