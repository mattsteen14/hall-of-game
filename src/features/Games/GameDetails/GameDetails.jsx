import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./GameDetails.css";
import { SiMetacritic, SiReddit } from "react-icons/si";
import { FaExternalLinkAlt } from "react-icons/fa";
import { selectCurrentGame, fetchGamesByIdThunk } from "../gamesSlice";
import { useFilterHandlers } from "../../../utils/handlers";
import { Loading } from "../../../components/Loading/Loading";
import { DeveloperGames } from "../DeveloperGames/DeveloperGames";

export const GameDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const game = useSelector(selectCurrentGame);
    const [developerGames, setDeveloperGames] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        dispatch(fetchGamesByIdThunk(id));
    }, [id, dispatch]);

    const openImageModal = (image) => {
        setSelectedImage(image);
    }

    const closeImageModal = () => setSelectedImage(null);

    const { handleYearClick,
        handlePlatformClick,
        handleGenreClick,
    } = useFilterHandlers();

    if (!game) {
        return (
            <div
                aria-live="polite"
                aria-busy="true"
                role='status'
                aria-label='Loading'
                name='Loading'
                title='Loading'
            >
                <Loading />
            </div>
        )
    }

    return (
        <div>
            <div className="game-details">
                <section className="game-header">
                    <span className="title">{game.name || "No title available"}</span>
                    <div
                        className="links"
                    >
                        <a
                            className="rating"
                            href={`https://www.metacritic.com/game/${game.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            role='link'
                            aria-label={`Metacritic rating for ${game.name}`}
                            name={`Metacritic rating for ${game.name}`}
                            title={`Metacritic rating for ${game.name}`}
                            tabIndex={0}
                        >
                            <SiMetacritic /> {game.metacritic || "N/A"}
                        </a>

                        <a
                            className="rawg-logo"
                            href={`https://www.rawg.io/games/${game.slug}?ref=api`}
                            target="_blank"
                            rel="noopener noreferrer"
                            role='link'
                            aria-label={`${game.name} RAWG page`}
                            name={`${game.name} RAWG page`}
                            title={`${game.name} RAWG page`}
                            tabIndex={0}
                        >
                            RAWG
                        </a>
                        {game.website &&
                            <a
                                href={game.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                role='link'
                                aria-label={`Website for ${game.name}`}
                                name={`Website for ${game.name}`}
                                title={`Website for ${game.name}`}
                                tabIndex={0}
                            >
                                <FaExternalLinkAlt />
                            </a>}
                        <a
                            href={game.reddit_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            role='link'
                            aria-label={`Reddit page for ${game.name}`}
                            name={`Reddit page for ${game.name}`}
                            title={`Reddit page for ${game.name}`}
                            tabIndex={0}
                        >
                            <SiReddit />
                        </a>
                    </div>

                </section>

                <section className="game-banner">
                    <img
                        src={game.background_image || "fallback_image_url"}
                        alt={game.name || "Game image"}
                        role="img"
                        aria-label={`Main image or box art for ${game.name}`}
                        name={`Main image or box art for ${game.name}`}
                        title={`Main image or box art for ${game.name}`}
                        className="game-box-art"
                        loading="lazy"
                        onClick={() => openImageModal(game.background_image)}
                        style={{ cursor: "pointer" }}
                    />
                    {game.background_image_additional && (
                        <img
                            src={game.background_image_additional}
                            alt="screenshot"
                            className="game-screenshot"
                            role="img"
                            aria-label={`Screenshot for ${game.name}`}
                            name={`Screenshot for ${game.name}`}
                            title={`Screenshot for ${game.name}`}
                            loading="lazy"
                            onClick={() => openImageModal(game.background_image_additional)}
                            style={{ cursor: "pointer" }}
                        />
                    )}
                </section>

                {selectedImage && (
                    <div className="image-modal" onClick={closeImageModal}>
                        <div className="image-modal-content">
                            <span className="close-modal" onClick={closeImageModal}>&times;</span>
                            <img src={selectedImage} alt="Enlarged game image" />
                        </div>
                    </div>
                )}

                <section className="game-info-container">
                    <article className="game-info">
                        <h4>Genres:</h4>
                        <p>
                            {game.genres?.map((g, index) => (
                                <React.Fragment key={index}>
                                    <a
                                        onClick={(e) => handleGenreClick(e, g.id)}
                                        href="#"
                                        role='button'
                                        aria-label={`Filter by genre: ${g.name}`}
                                        name={`Filter by genre: ${g.name}`}
                                        title={`Filter by genre: ${g.name}`}
                                    >
                                        {g.name}
                                    </a>
                                    {index < game.genres.length - 1 && ", "}
                                </React.Fragment>
                            )) || "No genres listed"}
                        </p>

                        <h4>Platforms:</h4>
                        <p>
                            {game.platforms?.map((p, index) => (
                                <React.Fragment key={index}>
                                    <a
                                        onClick={(e) => handlePlatformClick(e, p.platform.id)}
                                        href="#"
                                        role='button'
                                        aria-label={`Filter by platform: ${p.platform.name}`}
                                        name={`Filter by platform: ${p.platform.name}`}
                                        title={`Filter by platform: ${p.platform.name}`}
                                    >
                                        {p.platform.name}
                                    </a>
                                    {index < game.platforms.length - 1 && ", "}
                                </React.Fragment>
                            )) || "No platforms listed"}
                        </p>

                        <h4>Developers:</h4>
                        <p>
                            {game.developers?.map((dev) => dev.name).join(", ") || "No developers listed"}
                        </p>

                        <h4>Publishers:</h4>
                        <p>
                            {game.publishers?.map((pub) => pub.name).join(", ") || "No publishers listed"}
                        </p>
                    </article>

                    <aside className="game-aside">
                        <h4>Release Date:</h4>
                        <a
                            className="year"
                            onClick={(e) => handleYearClick(e, new Date(game.released).getFullYear())}
                            href="#"
                            role='button'
                            aria-label={`Filter by release year: ${new Date(game.released).getFullYear()}`}
                            name={`Filter by release year: ${new Date(game.released).getFullYear()}`}
                            title={`Filter by release year: ${new Date(game.released).getFullYear()}`}
                            tabIndex={0}
                        >
                            {new Date(game.released).toLocaleDateString()}
                        </a>
                        <h4>Play Time:</h4>
                        <span>{game.playtime} hours</span>
                        <h4>Stores:</h4>
                        <p>
                            {game.stores && game.stores.length > 0 ? (
                                game.stores.map((store, index) => (
                                    <span key={index}>
                                        <a
                                            href={`https://${store.store.domain}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            role='link'
                                            aria-label={`Visit ${store.store.name}'s website`}
                                            name={`Visit ${store.store.name}'s website`}
                                            title={`Visit ${store.store.name}'s website`}
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
                        <h4>Age Rating:</h4>
                        {game.esrb_rating ? (
                            <span
                                className="age-ratings"
                                role='info'
                                aria-label={`Age rating for ${game.name}: ${game.esrb_rating.name}`}
                                name={`Age rating for ${game.name}: ${game.esrb_rating.name}`}
                                title={`Age rating for ${game.name}: ${game.esrb_rating.name}`}
                            >{game.esrb_rating.name}</span>
                        ) : (
                            <span className="age-ratings">Not Rated</span>
                        )}
                    </aside>
                </section>

                <section
                    className="game-description"
                    role='info'
                    aria-label={`Description for ${game.name}`}
                    name={`Description for ${game.name}`}
                    title={`Description for ${game.name}`}
                >
                    <h4>Description:</h4>
                    <p>{game.description_raw || "No description available"}</p>
                </section>
                <DeveloperGames 
                game={game}
                developerGames={developerGames}
                setDeveloperGames={setDeveloperGames}
                />
            </div>
        </div>
    );
};