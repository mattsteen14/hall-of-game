import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./GameDetails.css";
import { BiLinkExternal } from "react-icons/bi";
import { HiOutlineDocument } from "react-icons/hi2";
import { FaWikipediaW, FaTwitch } from "react-icons/fa";
import { SiIgdb } from "react-icons/si";
import { selectGameById } from "../gamesSlice";
import { SimilarGames } from "./SimilarGames/SimilarGames";

export const GameDetails = () => {
    const { id } = useParams();
    const game = useSelector((state) => selectGameById(state, id));
    return (
        <div>
            {game ? (
                <div className='game-details'>
                    <section className="game-header">
                        <span className="title">{game.name}</span>
                        <span className="year">{game.release_year}</span>
                        {game.involved_companies.length > 0 && (
                            <span
                                className="dev"
                            >
                                {game.involved_companies[0]}
                            </span>
                        )}
                    </section>
                    <section className="game-banner">
                        <img
                            src={game.cover}
                            alt={game.name}
                            className='game-box-art'
                        />
                        <img
                            src="https://media.retroachievements.org/Images/032852.png"
                            alt="screenshot"
                            className='game-screenshot'
                        />
                        <aside className="igdb-rating">
                            <span className="rating">{game.rating}</span>
                            <a href={game.url} target="_blank" rel="noreferrer" className="igdb-link">
                                <SiIgdb className="igdb-logo" />
                            </a>
                            <p className="igdb-note">See IGDB for more info and to rate this game.</p>
                        </aside>
                    </section>
                    <section className="game-info-container">
                        <article className="game-info">
                            <h4 className="info-title">Genre: </h4>
                            <span>{game.genres}</span>
                            <h4 className="info-title">Platforms: </h4>
                            <span>{game.platforms}</span>
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
                            <span className="age-ratings">{game.age_rating}</span>
                        </aside>
                    </section>
                    <section className="game-description">
                        <h4>Description: </h4>
                        <p>{game.summary}</p>
                        <h4>Story: </h4>
                        <p>{game.story}</p>
                    </section>
                    <footer>
                        <SimilarGames />
                    </footer>
                </div>
            ) : (
                <p>Game not found</p>
            )}
        </div>
    );
};