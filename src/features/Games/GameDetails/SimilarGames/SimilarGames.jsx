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
            <span className="similar-game-title">{game.name}</span>
            <span className="similar-game-rating">{game.rating}</span>
        </div>
    )
}

SimilarGames.propTypes = {
    game: PropTypes.object.isRequired
}