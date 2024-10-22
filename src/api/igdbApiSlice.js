import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const C = 8.0;
const m = 50;

const calculateWeightedRating = game => {
    const R = game.rating || 0;
    const v = game.rating_count || 0;
    return ((R * v) + (C * m)) / (v + m);
}

export const igdbApi = createApi({
    reducerPath: 'igdbApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: import.meta.env.VITE_PROXY_URL 
    }),
    prepareHeaders: (headers) => {
        headers.set('x-api-key', import.meta.env.VITE_API_KEY);
        headers.set('Content-Type', 'application/json');
        return headers;
    },
    endpoints: (builder) => ({
        getGames: builder.query({

            query: () => ({
                url: '/v4/games',
                method: 'POST',
                body: 'fields id, name, cover, first_release_date, platforms, genres, summary, websites, rating, rating_count, involved_companies, screenshots, url, similar_games; limit 100; where category = 0; order rating desc;'
            }),
            transformResponse: (response) => {
                return response.map(game => {
                    return {
                        id: game.id,
                        name: game.name,
                        cover: game.cover,
                        first_release_date: game.first_release_date,
                        platforms: game.platforms,
                        genres: game.genres,
                        summary: game.summary,
                        websites: game.websites,
                        involvedCompanies: game.involved_companies,
                        screenshots: game.screenshots,
                        url: game.url,
                        weightedRating: calculateWeightedRating({
                            rating: game.rating,
                            rating_count: game.rating_count,
                        }),
                        similarGames: game.similar_games,
                        releaseYear: game.first_release_date ? new Date(game.first_release_date).getFullYear() : null,
                    }
                }).sort((a, b) => b.weightedRating - a.weightedRating);
            },
        }),
    }),
});

export const {
    useGetGamesQuery,
} = igdbApi;

export default igdbApi.reducer;