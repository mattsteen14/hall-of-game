import './GamesList.css';
import { GameRow } from "../../../components/GameRow";
import { gameData } from '../../../api/gameData';

export const GamesList = () => {
    const games = gameData;
    return (
        <div className='games-list'>
            {games.map((game) => (
                <GameRow key={game.id}>
                    <img 
                    src={game.cover} 
                    alt={game.name} 
                    className='game-cover'
                    />
                    <span>{game.name}</span>
                    <span>{game.platforms.join(', ')}</span>
                    <span>{game.release_year}</span>
                    <span>{game.rating}</span>
                </GameRow>
            ))}
        </div>
    )
}
