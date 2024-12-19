import { api } from './api';

const handleError = (error) => {
    console.error('API Error:', error?.response.data || error.message);
    throw error;
};

export const fetchGames = async (page, filters) => {
    try {
        const { platform, genre, year, search, parentPlatform } = filters;
        const response = await api.get(`/games`, {
            params: {
                key: import.meta.env.VITE_API_KEY,
                ordering: '-metacritic',
                page,
                page_size: 40,
                // exclude_additions: 'true',
                platforms: platform || undefined, // Include only if provided
                genres: genre || undefined,
                dates: year ? `${year}-01-01,${year}-12-31` : undefined,
                search: search || undefined,
                parent_platforms: parentPlatform || undefined
            },
        });
        console.log('Games fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const fetchGamesById = async (id) => {
    try {
        const response = await api.get(`/games/${id}`, {
            params: {
                key: import.meta.env.VITE_API_KEY,
            },
        });
        console.log('Game fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}