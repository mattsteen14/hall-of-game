import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './GamesList.css';
import { useGetGamesQuery } from '../../../api/igdbApiSlice';
import { useFilterHandlers } from '../../../utils/handlers'; // Adjust path as necessary

export const GamesList = () => {
    // const games = useSelector((state) => state.games.games); // Assuming your state structure
    const search = useSelector((state) => state.games.search);
    const platformFilter = useSelector((state) => state.games.platformFilter);
    const genreFilter = useSelector((state) => state.games.genreFilter);
    const yearFilter = useSelector((state) => state.games.yearFilter);
    const {
        handlePlatformClick,
        handlePlatformReset,
        handleGenreClick,
        handleGenreReset,
        handleYearClick,
        handleYearReset
    } = useFilterHandlers();
    const { data: games = [] } = useGetGamesQuery();
    const filteredGames = games
        .filter((game) => game.name.toLowerCase().includes(search.toLowerCase()))
        .filter((game) => !platformFilter || game.platforms.includes(platformFilter))
        .filter((game) => !genreFilter || game.genres.includes(genreFilter))
        .filter((game) => !yearFilter || new Date(game.first_release_date * 1000).getFullYear() === yearFilter);

    const rankedGames = filteredGames.map((game, index) => {
        return { ...game, rank: index + 1 };
    });

    return (
        <div className='games-list'>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>
                            Title / <a href='#' onClick={handleYearReset}>Year</a>
                        </th>
                        <th>
                            <a href='#' onClick={handlePlatformReset}>Platforms</a>
                        </th>
                        <th>
                            <a href='#' onClick={handleGenreReset}>Genres</a>
                        </th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {rankedGames.map((game) => (
                        <tr key={game.id}>
                            <td className='game-rank-td'>
                                <span className='game-rank'>{game.rank}</span>
                            </td>
                            <td className='game-cover-td'>
                                <Link to={`/games/${game.id}`}>
                                    <img src={game.cover} alt={game.name} className='game-cover' />
                                </Link>
                            </td>
                            <td>
                                <span className='game-name'>
                                    <Link to={`/games/${game.id}`}>{game.name}</Link>
                                    {' '}
                                    <a
                                        className='game-year'
                                        onClick={(e) => handleYearClick(e, new Date(game.first_release_date * 1000).getFullYear())}
                                    >
                                        ({new Date(game.first_release_date * 1000).getFullYear()})
                                    </a>
                                </span>
                            </td>
                            <td>
                                {game.platforms.length > 0 && (
                                    <span className='game-platform'>
                                        <a onClick={(e) => handlePlatformClick(e, game.platforms[0].name)}>
                                            {game.platforms[0].name}
                                        </a>
                                    </span>
                                )}
                            </td>
                            <td>
                                {game.genres.length > 0 && (
                                    <span className='game-genre'>
                                        <a onClick={(e) => handleGenreClick(e, game.genres[0].name)}>
                                            {game.genres[0].name}
                                        </a>
                                    </span>
                                )}
                            </td>
                            <td>
                                <span className='game-rating'>{game.weightedRating.toFixed(1)}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};