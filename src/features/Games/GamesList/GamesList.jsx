import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './GamesList.css';
import { gameData } from '../../../api/gameData';
import { setPlatformFilter, resetPlatformFilter, setYearFilter, resetYearFilter, setGenreFilter, resetGenreFilter } from '../gamesSlice';

export const GamesList = () => {
    const dispatch = useDispatch();
    const search = useSelector((state) => state.games.search);
    const platformFilter = useSelector((state) => state.games.platformFilter);
    const genreFilter = useSelector((state) => state.games.genreFilter);
    const yearFilter = useSelector((state) => state.games.yearFilter);
    const handlePlatformReset = (e) => {
        e.preventDefault();
        dispatch(resetPlatformFilter());
    };
    const handleYearReset = (e) => {
        e.preventDefault();
        dispatch(resetYearFilter());
    };
    const handleGenreReset = (e) => {
        e.preventDefault();
        dispatch(resetGenreFilter());
    };
    const games = gameData;
    const filteredGames = games
        .filter((game) => game.name.toLowerCase().includes(search.toLowerCase()))
        .filter((game) => !platformFilter || game.platforms.includes(platformFilter))
        .filter((game) => !genreFilter || game.genres.includes(genreFilter))
        .filter((game) => !yearFilter || game.release_year === yearFilter);
    const rankedGames = filteredGames.map((game, index) => {
        return { ...game, rank: index + 1 };
    });
    const handlePlatformClick = (e, platform) => {
        e.preventDefault();
        dispatch(setPlatformFilter(platform));
    }
    const handleYearClick = (e, year) => {
        e.preventDefault();
        dispatch(setYearFilter(year));
    }
    const handleGenreClick = (e, genre) => {
        e.preventDefault();
        dispatch(setGenreFilter(genre));
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
                                onClick={(e) => handleYearReset(e)}
                            >
                                Year
                            </a>
                        </th>
                        <th>
                            <a
                                href='#'
                                onClick={(e) => handlePlatformReset(e)}>
                                Platforms
                            </a>
                        </th>
                        <th>
                            <a
                                href='#'
                                onClick={(e) => handleGenreReset(e)}>
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
                                <img
                                    src={game.cover}
                                    alt={game.name}
                                    className='game-cover'
                                />
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
                                        onClick={(e) => handleYearClick(e, game.release_year)}
                                    >
                                        ({game.release_year})
                                    </a>
                                </span>
                            </td>
                            <td>
                                {game.platforms.length > 0 && (
                                    <span className='game-platform'>
                                        <a onClick={(e) => handlePlatformClick(e, game.platforms[0])}>
                                            {game.platforms[0]}
                                        </a>
                                    </span>
                                )}
                            </td>
                            {/* <td>
                                {game.genres.length > 0 && (
                                    <span className='game-genre'>
                                        <a onClick={(e) => handleGenreClick(e, game.genres[0])}>
                                            {game.genres[0]}
                                        </a>
                                    </span>
                                )}
                            </td> (to handle multiple genres with real API) */}
                            <td>
                                <a
                                    className='game-genre'
                                    onClick={(e) => handleGenreClick(e, game.genres)}
                                >
                                    {game.genres}
                                </a>
                            </td>
                            <td>
                                <span
                                    className='game-rating'
                                >
                                    {game.rating}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}