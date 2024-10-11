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
                            <td><img src={game.cover} alt={game.name} className='game-cover' /></td>
                            <td>{game.name}</td>
                            <td>{game.platforms.join(', ')}</td>
                            <td>{game.release_year}</td>
                            <td>{game.rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}