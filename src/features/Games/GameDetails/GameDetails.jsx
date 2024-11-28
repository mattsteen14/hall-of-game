import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { Link } from "react-router-dom";
import "./GameDetails.css";
import { BiLinkExternal } from "react-icons/bi";
import { HiOutlineDocument } from "react-icons/hi2";
import { FaWikipediaW, FaTwitch } from "react-icons/fa";
// import { SiIgdb } from "react-icons/si";
import { selectCurrentGame, fetchGamesByIdThunk } from "../gamesSlice";
import { useFilterHandlers } from "../../../utils/handlers";

export const GameDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const game = useSelector(selectCurrentGame);
    // const similarGames = useSelector((state) => selectSimilarGamesById(state, id));

    useEffect(() => {
        dispatch(fetchGamesByIdThunk(id));
    }, [id, dispatch]);

    const { handleYearClick, handlePlatformClick, handleGenreClick } = useFilterHandlers();

    if (!game) {
        return <div>Loading game...</div>;
    }

    return (
        <div>
            <div className="game-details">
                <section className="game-header">
                    <span className="title">{game.name || "No title available"}</span>
                    <a
                        className="year"
                        onClick={(e) => handleYearClick(e, new Date(game.released).getFullYear())}
                        href="#"
                    >
                        {new Date(game.released).getFullYear()}
                    </a>
                    {game.developers?.length > 0 && (
                        <span className="dev">{game.developers[0].name || "Unknown Developer"}</span>
                    )}
                </section>

                <section className="game-banner">
                    <img
                        src={game.background_image || "fallback_image_url"}
                        alt={game.name || "Game image"}
                        className="game-box-art"
                    />
                    {game.background_image_additional && (
                        <img
                            src={game.background_image_additional}
                            alt="screenshot"
                            className="game-screenshot"
                        />
                    )}
                    <aside className="igdb-rating">
                        <span className="rating">{game.metacritic || "N/A"}</span>
                        {/* IGDB Link (commented out) */}
                    </aside>
                </section>

                <section className="game-info-container">
                    <article className="game-info">
                        <h4>Genre:</h4>
                        <a onClick={(e) => handleGenreClick(e, game.genres.map(g => g.name))} 
                        href="#"
                        >
                            {game.genres?.map((g) => g.name).join(", ") || "No genres available"}
                        </a>
                        <br />
                        <h4>Platforms:</h4>
                        <a onClick={(e) => handlePlatformClick(e, game.platforms.map(p => p.platform.name))}
                        href="#"
                        >
                            {game.platforms
                                ?.map((p) => p.platform.name)
                                .join(", ") || "No platforms available"}
                        </a>
                    </article>

                    <aside className="game-aside">
                        <h4>Links:</h4>
                        <article className="links">
                            <BiLinkExternal />
                            <HiOutlineDocument />
                            <FaWikipediaW />
                            <FaTwitch />
                        </article>
                        <h4>Age Ratings:</h4>
                        {game.esrb_rating ? (
                            <span className="age-ratings">{game.esrb_rating.name}</span>
                        ) : (
                            <span className="age-ratings">Not Rated</span>
                        )}
                    </aside>
                </section>

                <section className="game-description">
                    <h4>Description:</h4>
                    <p>{game.description_raw || "No description available"}</p>
                </section>

                <footer>
                    {/* <h3>Similar Games:</h3>
                        <div
                        className="similar-games-container"
                        >
                        {similarGames.map((similarGame) => (
                                <Link
                                    key={similarGame.id}
                                    to={`/games/${similarGame.id}`}
                                    onClick={() => window.scrollTo(0, 0)}
                                >
                                    <Card>
                                        <SimilarGames
                                            game={similarGame}
                                        />
                                    </Card>
                                </Link>
                        ))}
                        </div> */}
                </footer>
            </div>
        </div>
    );
};