import { useState } from 'react';
import { useSelector } from 'react-redux';
import './Filters.css'

export const Filters = () => {
    const { games } = useSelector((state) => state.games);
    const [platform, setPlatform] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    return (
        <div className='filters'>
                <select onChange={(e) => setPlatform(e.target.value)} value={platform}>
                    <option value=''>All Platforms</option>
                    {Array.from(new Set(games.flatMap(game => game.platforms.map(p => p.platform.name)))).map(platform => (
                        <option key={platform} value={platform}>
                            {platform}
                        </option>
                    ))}
                </select>

                <select onChange={(e) => setGenre(e.target.value)} value={genre}>
                    <option value=''>All Genres</option>
                    {Array.from(new Set(games.flatMap(game => game.genres.map(g => g.name)))).map(genre => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>

                <select onChange={(e) => setYear(e.target.value)} value={year}>
                    <option value=''>All Years</option>
                    {Array.from(new Set(games.map(game => new Date(game.released).getFullYear().toString()))).map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
    )
}
