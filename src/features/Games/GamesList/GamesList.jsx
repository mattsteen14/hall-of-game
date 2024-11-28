import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './GamesList.css';
import { fetchGamesThunk } from '../gamesSlice';
import { useFilterHandlers } from '../../../utils/handlers';

export const GamesList = () => {
    const dispatch = useDispatch();
    const {
        games,
        search,
        platformFilter,
        genreFilter,
        yearFilter,
        loading,
        error
    } = useSelector((state) => state.games);
    useEffect(() => {
        if(!games.length) {
            dispatch(fetchGamesThunk());
        }
    }, [dispatch, games])
    const {
        handlePlatformClick,
        handlePlatformReset,
        handleGenreClick,
        handleGenreReset,
        handleYearClick,
        handleYearReset
    } = useFilterHandlers();
    const filteredGames = games
        .filter((game) => game.name.toLowerCase().includes(search.toLowerCase()))
        // Match if any of the selected platforms match the game's platforms
        .filter((game) => !platformFilter.length || game.platforms.some((p) => platformFilter.includes(p.platform.name)))
        // Match if any of the selected genres match the game's genres
        .filter((game) => !genreFilter.length || game.genres.some((g) => genreFilter.includes(g.name)))
        // Filter by year if set
        .filter((game) => !yearFilter || new Date(game.released).getFullYear() === parseInt(yearFilter, 10));
    const rankedGames = filteredGames.map((game, index) => {
        return { ...game, rank: index + 1 };
    });
    if (loading) {
        return <div>Loading games...</div>
    }
    if (error) {
        return <div>Error fetching games: {error}</div>
    }
    return (
        <div className='games-list'>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>
                            Title / <a
                                href='#'
                                onClick={handleYearReset}
                            >
                                Year
                            </a>
                        </th>
                        <th>
                            <a
                                href='#'
                                onClick={handlePlatformReset}>
                                Platforms
                            </a>
                        </th>
                        <th>
                            <a
                                href='#'
                                onClick={handleGenreReset}>
                                Genres
                            </a>
                        </th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {rankedGames.map((game) => (
                        <tr key={game.id}>
                            <td
                                className='game-rank-td'
                            >
                                <span
                                    className='game-rank'
                                >
                                    {game.rank}
                                </span>
                            </td>
                            <td
                                className='game-cover-td'
                            >
                                <Link to={`/games/${game.id}`}>
                                    <img
                                        src={game.background_image}
                                        alt={game.name}
                                        className='game-cover'
                                    />
                                </Link>
                            </td>
                            <td>
                                <span
                                    className='game-name'
                                >
                                    <Link to={`/games/${game.id}`}>
                                        {game.name}
                                    </Link>
                                    {' '}
                                    <a
                                        className='game-year'
                                        onClick={(e) => handleYearClick(e, new Date(game.released).getFullYear())}
                                    >
                                        ({new Date(game.released).getFullYear()})
                                    </a>
                                </span>
                            </td>
                            <td>
                                <span className="game-platform">
                                    {game.platforms.map((p, index) => (
                                        <React.Fragment key={index}>
                                            <a
                                                onClick={(e) => handlePlatformClick(e, p.platform.name)}
                                            >
                                                {p.platform.name}
                                            </a>
                                            {index < game.platforms.length - 1 && ", "} {/* Comma-separated platforms */}
                                        </React.Fragment>
                                    ))}
                                </span>
                            </td>
                            <td>
                                <span className="game-genre">
                                    {game.genres.map((g, index) => (
                                        <React.Fragment key={index}>
                                            <a
                                                onClick={(e) => handleGenreClick(e, g.name)}
                                            >
                                                {g.name}
                                            </a>
                                            {index < game.genres.length - 1 && ", "} {/* Comma-separated genres */}
                                        </React.Fragment>
                                    ))}
                                </span>
                            </td>
                            <td>
                                <span
                                    className='game-rating'
                                >
                                    {game.metacritic}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}