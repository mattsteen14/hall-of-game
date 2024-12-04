import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './GamesList.css';
import { fetchGamesThunk } from '../gamesSlice';
import { Loading } from '../../../components/Loading/Loading';
import { Card } from '../../../components/Card/Card';
import { Game } from '../Game/Game';

export const GamesList = () => {
    const dispatch = useDispatch();
    const { games, search, loading, error } = useSelector((state) => state.games);

    // Local state for dropdown filters
    const [platform, setPlatform] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');

    useEffect(() => {
        if (!games.length) {
            dispatch(fetchGamesThunk());
        }
    }, [dispatch, games]);

    const filteredGames = useMemo(() => {
        return games
            .filter(game => game.name.toLowerCase().includes(search.toLowerCase()))
            .filter(game => !platform || game.platforms.some(p => p.platform.name === platform))
            .filter(game => !genre || game.genres.some(g => g.name === genre))
            .filter(game => !year || new Date(game.released).getFullYear().toString() === year);
    }, [games, search, platform, genre, year]);

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        )
    };
    if (error) {
        return <div>Error fetching games: {error}</div>
    };

    return (
        <div className='games-list-container'>
            {/* Filter Dropdowns */}
            <div className='filters'>
                <select onChange={(e) => setPlatform(e.target.value)} value={platform}>
                    <option value=''>All Platforms</option>
                    {Array.from(new Set(games.flatMap(game => game.platforms.map(p => p.platform.name))))
                    .sort((a, b) => a.localeCompare(b)).map(platform => (
                        <option key={platform} value={platform}>
                            {platform}
                        </option>
                    ))}
                </select>

                <select onChange={(e) => setGenre(e.target.value)} value={genre}>
                    <option value=''>All Genres</option>
                    {Array.from(new Set(games.flatMap(game => game.genres.map(g => g.name))))
                    .sort((a, b) => a.localeCompare(b)).map(genre => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>

                <select onChange={(e) => setYear(e.target.value)} value={year}>
                    <option value=''>All Years</option>
                    {Array.from(new Set(games.map(game => new Date(game.released).getFullYear().toString())))
                    .sort((a, b) => a - b)
                    .map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
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