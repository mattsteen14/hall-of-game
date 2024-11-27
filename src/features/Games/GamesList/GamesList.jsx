import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './GamesList.css';
import { useFilterHandlers } from '../../../utils/handlers';

export const GamesList = () => {
    const {
        games,
        search,
        platformFilter,
        genreFilter,
        yearFilter,
        loading,
        error
    } = useSelector((state) => state.games);
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
        .filter((game) => !platformFilter || game.platforms.includes(platformFilter))
        .filter((game) => !genreFilter || game.genres.includes(genreFilter))
        .filter((game) => !yearFilter || game.released === yearFilter);
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
                                        onClick={(e) => handleYearClick(e, game.released)}
                                    >
                                        ({new Date(game.released).getFullYear()})
                                    </a>
                                </span>
                            </td>
                            <td>
                                {game.platforms.length > 0 && (
                                    <span className="game-platform">
                                        <a onClick={(e) => handlePlatformClick(e, game.platforms)}>
                                            {game.platforms
                                                .map((platformObj) => platformObj.platform.name) // Extract platform name
                                                .join(', ')}
                                        </a>
                                    </span>
                                )}
                            </td>
                            <td>
                                {game.genres.length > 0 && (
                                    <span className="game-genre">
                                        <a onClick={(e) => handleGenreClick(e, game.genres)}>
                                            {game.genres
                                                .map((genre) => genre.name) // Extract genre name
                                                .join(', ')}
                                        </a>
                                    </span>
                                )}
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