import axios from 'axios';

const API_URL = 'https://api.rawg.io/api';

const api = axios.create({
    baseURL: API_URL,
});

export const fetchGames = async () => {
    try {
        const response = await api.get(`/games`, {
            params: {
                key: import.meta.env.RAWG_API_KEY,
                ordering: '-metacritic'
            }
        });
        console.log('Games fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
};

export const fetchGamesById = async (id) => {
    try {
        const response = await api.get(`/games/${id}?key=${import.meta.env.RAWG_API_KEY}`);
        console.log('Game fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching game:', error);
        throw error;
    }
}