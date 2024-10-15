import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectGameById } from "../gamesSlice";

export const GameDetails = () => {
    const { id } = useParams();
    const game = useSelector((state) => selectGameById(state, id));
    return (
        <div>
            {game ? (
                <div>
                    <h2>{game.name}</h2>
                    <p>{game.summary}</p>
                </div>
            ) : (
                <p>Game not found</p>
            )}
        </div>
    );
};