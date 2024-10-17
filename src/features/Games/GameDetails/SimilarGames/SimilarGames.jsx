import PropTypes from "prop-types";
import "./SimilarGames.css";

export const SimilarGames = ({ game }) => {
    return (
        <div className="similar-game">
            <img
                src={game.cover}
                alt={game.name}
                className="similar-game-box-art"
            />
            <p className="similar-game-title">{game.name}</p>
            <p className="similar-game-rating">{game.rating}</p>
        </div>
    )
}

SimilarGames.propTypes = {
    game: PropTypes.object.isRequired
}