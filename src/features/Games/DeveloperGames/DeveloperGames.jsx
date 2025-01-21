import { useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import "./DeveloperGames.css";
import { Card } from "../../../components/Card/Card";
import { Game } from "../Game/Game";

export const DeveloperGames = ({ game, developerGames, setDeveloperGames }) => {
    useEffect(() => {
        const fetchDeveloperGames = async () => {
            if (!game?.developers || game.developers.length === 0) return;

            const gamesByDeveloper = {};

            await Promise.all(
                game.developers.map(async (developer) => {
                    try {
                        const response = await axios.get(
                            `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&developers=${developer.id}&page_size=6`
                        );

                        const filteredGames = response.data.results
                            .filter(devGame => devGame.id !== game.id)
                            .slice(0, 3);

                        gamesByDeveloper[developer.id] = filteredGames;
                    } catch (error) {
                        console.error(`Error fetching games for developer ${developer.id}:`, error);
                    }
                })
            );

            setDeveloperGames((prev) => ({ ...prev, ...gamesByDeveloper }));
        };

        fetchDeveloperGames();
    }, [game, setDeveloperGames]);

    return (
        <section className="developer-games-container">
            {game?.developers?.length > 0 ? (
                game.developers.map((developer) => (
                    <div key={developer.id}>
                        <h4>Other games by {developer.name}:</h4>
                        <div className="developer-games">
                            {developerGames[developer.id]?.length > 0 ? (
                                developerGames[developer.id].map((devGame) => (
                                    <Card key={devGame.id}>
                                        <Game game={devGame} />
                                    </Card>
                                ))
                            ) : (
                                <p>No other games by {developer.name} listed</p>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p>No developers found for this game.</p>
            )}
        </section>
    );
};

DeveloperGames.propTypes = {
    game: PropTypes.shape({
        id: PropTypes.number.isRequired,
        developers: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    developerGames: PropTypes.object.isRequired,
    setDeveloperGames: PropTypes.func.isRequired,
};