import { useState } from 'react'
import { useDispatch } from 'react-redux';
import './Header.css';
import { HiOutlineSearch } from 'react-icons/hi';
import { setSearch } from '../Games/gamesSlice';

export const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearch(searchTerm));
    }
    return (
        <header>
            <div className='logo'>
                <h1>Hall of Games</h1>
            </div>
            <div className='search-bar'>
                <form className='search' onSubmit={handleSearch}>
                    <input
                        type='text'
                        placeholder='Search'
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
        </header>
    )
}
