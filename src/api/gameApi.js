import { api } from './api';

const handleError = (error) => {
    console.error('API Error:', error?.response.data || error.message);
    throw error;
};

export const fetchGames = async (page, filters) => {
    try {
        const { platform, genre, year, search, parentPlatform } = filters;

        const params = {
            key: import.meta.env.VITE_API_KEY,
            page,
            page_size: 40,
            platforms: platform || undefined,
            genres: genre || undefined,
            dates: year ? `${year}-01-01,${year}-12-31` : undefined,
            search: search || undefined,
            parent_platforms: parentPlatform || undefined,
        };

        // Apply ordering only if there's no search term
        if (!search) {
            params.ordering = '-metacritic';
        }

        const response = await api.get(`/games`, { params });
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