import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './GamesList.css';
import { fetchGamesThunk } from '../gamesSlice';
import { useFilterHandlers } from '../../../utils/handlers';
import { Filters } from '../../Filters/Filters';
import { Loading } from '../../../components/Loading/Loading';
import { Card } from '../../../components/Card/Card';
import { Game } from '../Game/Game';
import { PageSelect } from '../../Pages/PageSelect';

export const GamesList = () => {
    const dispatch = useDispatch();
    const { games, loading, error, filters } = useSelector((state) => state.games);
    const { currentPage } = useFilterHandlers();
    const stableFilters = useMemo(() => filters, [filters]);
    useEffect(() => {
        // Fetch games only if the game list is empty
        dispatch(fetchGamesThunk({ page: currentPage, filters: stableFilters }));
    }, [dispatch, currentPage, stableFilters]);

    {
        loading && (
            <div
                aria-live="polite"
                aria-busy="true"
                role='status'
                aria-label='Loading'
                name='Loading'
                title='Loading'
            >
                <Loading />
            </div>
        )
    }

    if (error) {
        return (
            <div className='error'>
                <div className='error-box'
                    role='alert'
                    aria-label='Error Alert'
                    name='Error Alert'
                    title='Error Alert'
                >
                    <h1>Game Over</h1>
                    <h2>Error:</h2>
                    <h3>{error.status}</h3>
                    <h4>{error.message || 'An error occurred'}</h4>
                    <Link
                        className='reset-button error-reset'
                        to='/'
                        onClick={() => dispatch(fetchGamesThunk({ page: currentPage, filters: stableFilters }))}
                        aria-label='Error Reset'
                        name='Error Reset'
                        title='Error Reset'
                    >
                        RESET
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className='games-list-container'>
            {/* Filter Dropdowns */}
            <Filters />
            {/* Games List */}
            <div className='games-list'
                aria-label='Game List'
                name='Game List'
                title='Game List'
            >
                {games.length > 0 ? (
                    games.map(game => (
                        <Card key={game.id}>
                            <Game game={game} />
                        </Card>
                    ))
                ) : (
                    <div
                        aria-live="polite"
                        aria-busy="true"
                        role='status'
                        aria-label='Loading'
                        name='Loading'
                        title='Loading'
                    >
                        <Loading />
                    </div>
                )
                }
            </div>
            {/* Pagination */}
            <PageSelect />
        </div>
    );
};