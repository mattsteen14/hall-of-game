import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import './Header.css';
import { HiOutlineSearch } from 'react-icons/hi';
import { setSearch } from '../Games/gamesSlice';
import { resetGenreFilter, resetPlatformFilter, resetYearFilter } from '../Games/gamesSlice';

export const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearch(searchTerm));
        navigate('/');
    };
    const handleReset = () => {
        navigate('/');
        dispatch(resetPlatformFilter());
        dispatch(resetYearFilter());
        dispatch(resetGenreFilter());
        setSearchTerm('');
        dispatch(setSearch(''));
        navigate('/');
    }
    return (
        <header>
            <div className='logo'>
                <h1>HALL OF GAME</h1>
            </div>
            <div className='search-bar'>
                <form className='search' onSubmit={handleSearch}>
                    <input
                        type='text'
                        placeholder='SEARCH'
                        aria-label='Search'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    <button
                        className='search-icon'
                        type='submit'
                        aria-label='Search'>
                        <HiOutlineSearch />
                    </button>
                </form>
            </div>
            <Link
                className='reset-button'
                to='/'
                onClick={handleReset}
            >
                RESET
            </Link>
        </header>
    )
}
