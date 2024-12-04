import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './GamesList.css';
import { fetchGamesThunk } from '../gamesSlice';
import { Loading } from '../../../components/Loading/Loading';
import { Card } from '../../../components/Card/Card';
import { Game } from '../Game/Game';
import { setPlatformFilter, setYearFilter, setGenreFilter, setSearch } from '../gamesSlice';

export const GamesList = () => {
    const dispatch = useDispatch();
    const { games, search, loading, error, filters } = useSelector((state) => state.games);
    const location = useLocation();
    const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

    // Get filter values from Redux state
    const platform = filters.platform[0]; // Ensure it's a single value
    const genre = filters.genre[0]; // Ensure it's a single value
    const year = filters.year;

    // Get search query from URL parameters
    const searchQuery = queryParams.get('search') || '';

    useEffect(() => {
        // If the search query from URL differs from the search in Redux state, update the Redux state
        if (searchQuery !== search) {
            dispatch(setSearch(searchQuery));
        }
    }, [dispatch, searchQuery, search]);

    useEffect(() => {
        // Fetch games only if the game list is empty
        if (!games.length) {
            dispatch(fetchGamesThunk());
        }
    }, [dispatch, games]);

    // Filter games based on search and filters in Redux
    const filteredGames = useMemo(() => {
        return games
            .filter(game => game.name.toLowerCase().includes(search.toLowerCase())) // Apply search filter
            .filter(game => !platform || game.platforms.some(p => p.platform.name === platform)) // Apply platform filter
            .filter(game => !genre || game.genres.some(g => g.name === genre)) // Apply genre filter
            .filter(game => !year || new Date(game.released).getFullYear().toString() === year); // Apply year filter
    }, [games, search, platform, genre, year]);

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className='error'>
                <div className='error-header'>
                    <h1>Game Over!</h1>
                    <h2>Error:</h2>
                    <h3>{error}</h3>
                </div>
            </div>
        );
    }

    return (
        <div className='games-list-container'>
            {/* Filter Dropdowns */}
            <div className='filters'>
                <select
                    onChange={(e) => dispatch(setPlatformFilter([e.target.value]))}
                    value={platform || ''}
                >
                    <option value=''>All Platforms</option>
                    {Array.from(new Set(games.flatMap(game => game.platforms.map(p => p.platform.name))))
                        .sort((a, b) => a.localeCompare(b))
                        .map(platform => (
                            <option key={platform} value={platform}>{platform}</option>
                        ))}
                </select>

                <select
                    onChange={(e) => dispatch(setGenreFilter([e.target.value]))}
                    value={genre || ''}
                >
                    <option value=''>All Genres</option>
                    {Array.from(new Set(games.flatMap(game => game.genres.map(g => g.name))))
                        .sort((a, b) => a.localeCompare(b))
                        .map(genre => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                </select>

                <select
                    onChange={(e) => dispatch(setYearFilter(e.target.value))}
                    value={year || ''}
                >
                    <option value=''>All Years</option>
                    {Array.from(new Set(games.map(game => new Date(game.released).getFullYear().toString())))
                        .sort((a, b) => a - b)
                        .map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                </select>
            </div>

            {/* Games List */}
            <div className='games-list'>
                {filteredGames.map(game => (
                    <Card key={game.id}>
                        <Game game={game} />
                    </Card>
                ))}
            </div>
        </div>
    );
};