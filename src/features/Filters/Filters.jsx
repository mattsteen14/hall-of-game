import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlatformFilter, setGenreFilter, setYearFilter } from '../Games/gamesSlice';
import axios from 'axios';
import './Filters.css';

export const Filters = () => {
    const dispatch = useDispatch();
    const { filters } = useSelector((state) => state.games);
    const { platform, genre, year } = filters;

    const [platforms, setPlatforms] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        // Fetch available platforms and genres
        const fetchFilters = async () => {
            const apiKey = import.meta.env.VITE_API_KEY;

            try {
                const platformsResponse = await axios.get(`https://api.rawg.io/api/platforms?key=${apiKey}`);
                setPlatforms(platformsResponse.data.results);

                const genresResponse = await axios.get(`https://api.rawg.io/api/genres?key=${apiKey}`);
                setGenres(genresResponse.data.results);
            } catch (error) {
                console.error('Error fetching filter options:', error);
            }
        };

        fetchFilters();
    }, []);

    return (
        <div className="filters">
            {/* Platforms Filter */}
            <select
                onChange={(e) => dispatch(setPlatformFilter(parseInt(e.target.value) || ''))}
                value={platform || ''}
            >
                <option value="">All Platforms</option>
                {platforms.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                ))}
            </select>
            {/* Genres Filter */}
            <select
                onChange={(e) => dispatch(setGenreFilter(parseInt(e.target.value) || ''))}
                value={genre || ''}
            >
                <option value="">All Genres</option>
                {genres.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                ))}
            </select>

            {/* Year Filter */}
            <select
                className="year-filter"
                onChange={(e) => dispatch(setYearFilter(e.target.value))}
                value={year || ''}
            >
                <option value="">All Years</option>
                {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                ))}
            </select>
        </div>
    );
};