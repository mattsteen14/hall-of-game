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
        if(!game) {
            dispatch(fetchGamesByIdThunk(id));
        }
    }, [id, dispatch, game]);
    const {
        handleYearClick,
        handlePlatformClick,
        handleGenreClick
    } = useFilterHandlers();
    return (
        <div>
            {game ? (
                <div className='game-details'>
                    <section className="game-header">
                        <span className="title">{game.name}</span>
                        <a 
                        className="year"
                        onClick={(e) => handleYearClick(e, game.released)}
                        >
                            {game.released}
                            </a>
                        {game.developers.length > 0 && (
                            <span
                                className="dev"
                            >
                                {game.developers[0]}
                            </span>
                        )}
                    </section>
                    <section className="game-banner">
                        <img
                            src={game.background_image}
                            alt={game.name}
                            className='game-box-art'
                        />
                        <img
                            src={game.background_image_additional}
                            alt="screenshot"
                            className='game-screenshot'
                        />
                        <aside className="igdb-rating">
                            <span className="rating">{game.metacritic}</span>
                            {/* <a href={game.url} target="_blank" rel="noreferrer" className="igdb-link">
                                <SiIgdb className="igdb-logo" />
                            </a>
                            <p className="igdb-note">See IGDB for more info and to rate this game.</p> */}
                        </aside>
                    </section>
                    <section className="game-info-container">
                        <article className="game-info">
                            <h4>Genre: </h4>
                            <a
                                onClick={(e) => handleGenreClick(e, game.genres)}
                                href="#"
                            >
                                {game.genres.join(", ")}
                                </a>
                            <br />
                            <h4>Platforms: </h4>
                                <a 
                                onClick={(e) => handlePlatformClick(e, game.platforms)}
                                href="#"
                                >
                                    {game.platforms}
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
                            <span className="age-ratings">
                                {game.esrb_rating.name}
                                </span>
                        </aside>
                    </section>
                    <section className="game-description">
                        <h4>Description: </h4>
                        <p>{game.description_raw}</p>
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
            ) : (
                <p>Game not found</p>
            )}
        </div>
    );
};