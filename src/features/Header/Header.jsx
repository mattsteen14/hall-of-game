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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    <button
                        className='search-icon'
                        type='submit'
                        aria-label='Search'
                        role='button'
                        >
                        <HiOutlineSearch />
                    </button>
                </form>
            </div>
        </header>
    )
}
