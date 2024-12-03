import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './GamesList.css';
import { fetchGamesThunk } from '../gamesSlice';
import { Loading } from '../../../components/Loading/Loading';
import { Card } from '../../../components/Card/Card';
import { Game } from '../Game/Game';


export const GamesList = () => {
    const dispatch = useDispatch();
    const {
        games,
        search,
        filters,
        loading,
        error
    } = useSelector((state) => state.games);
    useEffect(() => {
        if (!games.length) {
            dispatch(fetchGamesThunk());
        }
    }, [dispatch, games])
    const filteredGames = useMemo(() => {
        return games
            .filter((game) => game.name.toLowerCase().includes(search.toLowerCase()))
            // Match if any of the selected platforms match the game's platforms
            .filter((game) => !filters.platform.length || game.platforms.some((p) => filters.platform.includes(p.platform.name)))
            .filter((game) => !filters.parentPlatform.length || game.parent_platforms.some((p) => filters.parentPlatform.includes(p.platform.slug)))
            // Match if any of the selected genres match the game's genres
            .filter((game) => !filters.genre.length || game.genres.some((g) => filters.genre.includes(g.name)))
            // Filter by year if set
            .filter((game) => !filters.year || new Date(game.released).getFullYear() === parseInt(filters.year, 10));
    }, [games, search, filters]);
    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        )
    }
    if (error) {
        return <div>Error fetching games: {error}</div>
    }
    return (
        <div className='games-list'>
            {filteredGames.map((game) => (
                <Card key={game.id}>
                    <Game game={game} />
                </Card>
            ))}
        </div>
    );
}