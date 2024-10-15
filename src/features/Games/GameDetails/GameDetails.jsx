import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./GameDetails.css";
import { BiLinkExternal } from "react-icons/bi";
import { HiOutlineDocument } from "react-icons/hi2";
import { FaWikipediaW, FaTwitch } from "react-icons/fa";
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
                        <span>{game.name}</span>
                        <span>{game.release_year}</span>
                        <span>{game.involved_companies}</span>
                        <br />
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
                        <span>{game.rating}</span>
                    </section>
                    <section>
                        <span>Genre: </span>
                        <span>{game.genres}</span>
                        <br />
                        <span>Platforms: </span>
                        <span>{game.platforms}</span>
                    </section>
                    <section>
                        <article>
                            <span>Description: </span>
                            <p>{game.summary}</p>
                            <span>Story: </span>
                            <p>{game.story}</p>
                        </article>
                        <aside>
                            <span>Links</span>
                            <BiLinkExternal />
                            <HiOutlineDocument />
                            <FaWikipediaW />
                            <FaTwitch />
                            <span>Age Ratings</span>
                            <span>{game.age_rating}</span>
                        </aside>
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