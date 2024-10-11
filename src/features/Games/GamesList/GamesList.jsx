import './GamesList.css';
import { gameData } from '../../../api/gameData';

export const GamesList = () => {
    const games = gameData;
    return (
        <div className='games-list'>
            <table>
                <thead>
                    <tr>
                        <th>Cover</th>
                        <th>Game Name</th>
                        <th>Platforms</th>
                        <th>Release Year</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game) => (
                        <tr key={game.id}>
                            <td className='game-cover-td'><img src={game.cover} alt={game.name} className='game-cover' /></td>
                            <td><span className='game-name'>{game.name}</span></td>
                            <td><span className='game-platform'>{game.platforms.join(', ')}</span></td>
                            <td><span className='game-year'>{game.release_year}</span></td>
                            <td><span className='game-rating'>{game.rating}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}