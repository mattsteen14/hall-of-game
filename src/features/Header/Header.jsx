import { Link } from 'react-router-dom';
import './Header.css';
import { GiMetroid } from "react-icons/gi";
import { HiOutlineSearch } from 'react-icons/hi';
import { useFilterHandlers } from '../../utils/handlers';

export const Header = () => {
    const {
        searchTerm,
        setSearchTerm,
        handleSearch,
        handleReset
    } = useFilterHandlers();

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        handleSearch(event.target.value); // Trigger search on input change
    };
    return (
        <header>
            <Link
                className='logo'
                to='/'
                aria-label='Home'
                onClick={handleReset}
                role='link'
                title='Home'
            >
                <h1>HALL OF GAME</h1>
            </Link>
            <a
            className='metroid'
            href='https://www.ign.com/games/super-metroid'
            target='_blank'
            rel='noreferrer'
            role='link'
            aria-label="Super Metroid"
            name="Super Metroid"
            title="Super Metroid"
            >
                <GiMetroid />
            </a>
            <div className='search-bar'>
                <form className='search' onSubmit={handleSearch}>
                    <input
                        type='text'
                        name='search'
                        role='textbox'
                        placeholder='SEARCH'
                        aria-label='Search'
                        title='Search input'
                        value={searchTerm}
                        onChange={handleInputChange} 
                        autoComplete='on'
                        autoCorrect='on'
                        />
                    <button
                        className='search-icon'
                        type='submit'
                        aria-label='Search'
                        title='Search button'
                        name='Search button'
                        role='button'
                        >
                        <HiOutlineSearch />
                    </button>
                </form>
            </div>
        </header>
    )
}
