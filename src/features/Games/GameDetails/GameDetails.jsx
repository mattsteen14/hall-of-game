import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { Link } from "react-router-dom";
import "./GameDetails.css";
import { SiMetacritic, SiReddit } from "react-icons/si";
import { selectCurrentGame, fetchGamesByIdThunk } from "../gamesSlice";
import { useFilterHandlers } from "../../../utils/handlers";
import { Loading } from "../../../components/Loading/Loading";

export const GameDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const game = useSelector(selectCurrentGame);
    // const similarGames = useSelector((state) => selectSimilarGamesById(state, id));

    useEffect(() => {
        dispatch(fetchGamesByIdThunk(id));
    }, [id, dispatch]);

    const { handleYearClick,
        handlePlatformClick,
        handleGenreClick,
    } = useFilterHandlers();

    if (!game) {
        return (
            <div>
                <Loading />
            </div>
        )
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
                    <span className="rating"><SiMetacritic /> {game.metacritic || "N/A"}</span>
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
                </section>

                <section className="game-info-container">
                    <article className="game-info">
                        <h4>Genre:</h4>
                        {game.genres.map((g, index) => (
                            <React.Fragment key={index}>
                                <a
                                    onClick={(e) => handleGenreClick(e, g.name)}
                                    href="#"
                                >
                                    {g.name}
                                </a>
                                {index < game.genres.length - 1 && ", "} {/* Comma-separated genres */}
                            </React.Fragment>
                        ))}
                        <h4>Platforms:</h4>
                        {game.platforms.map((p, index) => (
                            <React.Fragment key={index}>
                                <a
                                    onClick={(e) => handlePlatformClick(e, p.platform.name)}
                                    href="#"
                                >
                                    {p.platform.name}
                                </a>
                                {index < game.platforms.length - 1 && ", "} {/* Comma-separated platforms */}
                            </React.Fragment>
                        ))}
                        <h4>Developers:</h4>
                        <p>
                            {game.developers?.map(((dev) => dev.name)).join(", ") || "No developers listed"}
                        </p>
                        <h4>Publishers:</h4>
                        <p>
                            {game.publishers?.map(((pub) => pub.name)).join(", ") || "No publishers listed"}
                        </p>
                    </article>

                    <aside className="game-aside">
                        <h4>Links:</h4>
                        <article className="links">
                            <a
                                href={game.metacritic_url}
                                target="_blank"
                            >
                                <SiMetacritic />
                            </a>
                            <a
                                href={game.reddit_url}
                                target="_blank"
                            >
                                <SiReddit />
                            </a>
                            <a
                                className="rawg-logo"
                                href={`https://www.rawg.io/games/${game.slug}?ref=api`}
                                target="_blank"
                            >
                                RAWG
                            </a>
                        </article>
                        <h4>Age Rating:</h4>
                        {game.esrb_rating ? (
                            <span className="age-ratings">{game.esrb_rating.name}</span>
                        ) : (
                            <span className="age-ratings">Not Rated</span>
                        )}
                        <h4>Stores:</h4>
                        <p>
                            {game.stores && game.stores.length > 0 ? (
                                game.stores.map((store, index) => (
                                    <span key={index}>
                                        <a
                                            href={`https://${store.store.domain}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {store.store.name}
                                        </a>
                                        {index < game.stores.length - 1 && ", "}
                                    </span>
                                ))
                            ) : (
                                "No stores listed"
                            )}
                        </p>
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