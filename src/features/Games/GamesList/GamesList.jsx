import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './GamesList.css';
import { SiMetacritic } from 'react-icons/si';
import { fetchGamesThunk } from '../gamesSlice';
import { useFilterHandlers } from '../../../utils/handlers';
import { Loading } from '../../../components/Loading/Loading';
import { ParentPlatformIcons } from '../../../components/PlatformIcons/ParentPlatformIcons';

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
    const {
        handleGenreClick,
        handleGenreReset,
        handleYearClick,
        handleYearReset,
        handlePlatformReset
    } = useFilterHandlers();
    const filteredGames = games
        .filter((game) => game.name.toLowerCase().includes(search.toLowerCase()))
        // Match if any of the selected platforms match the game's platforms
        .filter((game) => !filters.platform.length || game.platforms.some((p) => filters.platform.includes(p.platform.name)))
        .filter((game) => !filters.parentPlatform.length || game.parent_platforms.some((p) => filters.parentPlatform.includes(p.platform.slug)))
        // Match if any of the selected genres match the game's genres
        .filter((game) => !filters.genre.length || game.genres.some((g) => filters.genre.includes(g.name)))
        // Filter by year if set
        .filter((game) => !filters.year || new Date(game.released).getFullYear() === parseInt(filters.year, 10));
    const rankedGames = filteredGames.map((game, index) => {
        return { ...game, rank: index + 1 };
    });
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
                        <th><SiMetacritic /> Rating</th>
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
                                <ParentPlatformIcons
                                    // onClick={handlePlatformClick}
                                    parentPlatforms={game.parent_platforms}
                                />
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