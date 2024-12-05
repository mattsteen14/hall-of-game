import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './GamesList.css';
import { fetchGamesThunk } from '../gamesSlice';
import { useFilterHandlers } from '../../../utils/handlers';
import { filterGames } from '../../Filters/filterGames';
import { Filters } from '../../Filters/Filters';
import { Loading } from '../../../components/Loading/Loading';
import { Card } from '../../../components/Card/Card';
import { Game } from '../Game/Game';

export const GamesList = () => {
    const dispatch = useDispatch();
    const { games, loading, error, filters } = useSelector((state) => state.games);
    const { year, parentPlatform, search } = filters;

    // Get filter values from Redux state
    const platform = filters.platform[0]; 
    const genre = filters.genre[0]; 
    const {
        currentPage,
        nextPage,
        previousPage,
        handleNextPage,
        handlePreviousPage
    } = useFilterHandlers();

    useEffect(() => {
        // Fetch games only if the game list is empty
        if (!games.length) {
            dispatch(fetchGamesThunk(currentPage));
        }
    }, [dispatch, games, currentPage]);

    // Filter games based on search and filters in Redux
    const filteredGames = useMemo(() => filterGames(games, { search, platform, genre, year, parentPlatform }), [games, search, platform, genre, year, parentPlatform]);

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
            <Filters />

            {/* Games List */}
            <div className='games-list'>
                {filteredGames.map(game => (
                    <Card key={game.id}>
                        <Game game={game} />
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            <div className='page-select'>
                <button onClick={handlePreviousPage} disabled={!previousPage || currentPage === 1}>Previous Page</button>
                <span>Page {currentPage}</span>
                <button onClick={handleNextPage} disabled={!nextPage}>Next Page</button>
            </div>
        </div>
    );
};