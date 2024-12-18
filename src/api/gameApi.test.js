import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchGames, fetchGamesById } from './gameApi';
import { api } from './api';

// Mock axios's `api.get` method
vi.mock('./api', () => ({
    api: {
        get: vi.fn(),
    },
}));

describe('gameApi.js', () => {
    afterEach(() => {
        vi.clearAllMocks(); // Clear mock calls after each test
    });

    describe('fetchGames', () => {
        it('should fetch games successfully with the correct parameters', async () => {
            // Arrange: Set up mock response
            const mockResponse = { data: { results: [] } };
            api.get.mockResolvedValueOnce(mockResponse);

            const filters = { platform: 'pc', genre: 'action', year: 2023, search: 'game' };
            const page = 1;

            // Act: Call the function
            const result = await fetchGames(page, filters);

            // Assert: Check that API was called with the correct parameters
            expect(api.get).toHaveBeenCalledWith('/games', expect.objectContaining({
                params: expect.objectContaining({
                    key: expect.any(String), // Ensure API key is passed
                    ordering: '-metacritic',
                    page: 1,
                    page_size: 40,
                    platforms: 'pc',
                    genres: 'action',
                    dates: '2023-01-01,2023-12-31',
                    search: 'game',
                }),
            }));

            // Assert: Check that the response data is returned correctly
            expect(result).toEqual(mockResponse.data);
        });

        it('should handle errors when the API call fails', async () => {
            // Arrange: Set up mock rejection
            const mockError = new Error('API Error');
            api.get.mockRejectedValueOnce(mockError);

            const filters = { platform: 'pc', genre: 'action', year: 2023 };
            const page = 1;

            // Act & Assert: Ensure the function throws the error
            await expect(fetchGames(page, filters)).rejects.toThrowError('API Error');
        });
    });

    describe('fetchGamesById', () => {
        it('should fetch game by ID successfully', async () => {
            // Arrange: Set up mock response
            const mockResponse = { data: { id: 1, name: 'Game 1' } };
            api.get.mockResolvedValueOnce(mockResponse);

            const gameId = 1;
            const apiKey = import.meta.env.VITE_API_KEY;  // This is your actual API key

            // Act: Call the function
            const result = await fetchGamesById(gameId);

            // Assert: Check that API was called with the correct ID and API key
            expect(api.get).toHaveBeenCalledWith(`/games/1?key=${apiKey}`);

            // Assert: Check that the response data is returned correctly
            expect(result).toEqual(mockResponse.data);
        });

        it('should handle errors when the API call fails for game by ID', async () => {
            // Arrange: Set up mock rejection
            const mockError = new Error('API Error');
            api.get.mockRejectedValueOnce(mockError);

            const gameId = 1;

            // Act & Assert: Ensure the function throws the error
            await expect(fetchGamesById(gameId)).rejects.toThrowError('API Error');
        });
    });
});