import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Game.css'
import 'lazysizes';
import { SiMetacritic } from 'react-icons/si';
import { useFilterHandlers } from '../../../utils/handlers';
import { ParentPlatformIcons } from '../../../components/PlatformIcons/ParentPlatformIcons';

export const Game = ({ game }) => {
    const { handleYearClick } = useFilterHandlers();
    
    return (
        <div className='game'>
            <div
                className='game-image-container'
            >
                <Link to={`/games/${game.id}`}>
                    <img
                        data-src={game.background_image}
                        alt={game.name}
                        className='game-cover lazyload'
                        width='100%'
                        height='100%'
                        role='img link'
                        aria-label='Game Cover'
                        name='Game Cover'
                        title='Game Cover'
                    />
                </Link>
            </div>
            <div className='game-name'>
                <Link 
                to={`/games/${game.id}`}
                role='link'
                aria-label={`See more details for ${game.name}`}
                name={`See more details for ${game.name}`}
                title={`See more details for ${game.name}`}
                >
                    {game.name}
                </Link>
            </div>
            <div
                className='middle-row'
            >
                <a
                    className='game-year'
                    onClick={(e) => handleYearClick(e, new Date(game.released).getFullYear())}
                    role='button'
                    aria-label={`Filter by year ${new Date(game.released).getFullYear()}`}
                    name={`Filter by year ${new Date(game.released).getFullYear()}`}
                    title={`Filter by year ${new Date(game.released).getFullYear()}`}
                >
                    {new Date(game.released).getFullYear()}
                </a>
                <a
                    className="rating"
                    href={`https://www.metacritic.com/game/${game.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    role='link'
                    aria-label={`Metacritic rating for ${game.name}`}
                    name={`Metacritic rating for ${game.name}`}
                    title={`Metacritic rating for ${game.name}`}
                >
                    <SiMetacritic /> {game.metacritic || "N/A"}
                </a>
            </div>
            <div className='game-platforms'>
                <ParentPlatformIcons parentPlatforms={game.parent_platforms} />
            </div>
        </div>
    )
}

Game.propTypes = {
    game: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        background_image: PropTypes.string,
        released: PropTypes.string,
        metacritic: PropTypes.number,
        slug: PropTypes.string.isRequired,
        parent_platforms: PropTypes.arrayOf(
            PropTypes.shape({
                platform: PropTypes.shape({
                    id: PropTypes.number,
                    name: PropTypes.string,
                }),
            })
        ),
    }).isRequired,
};