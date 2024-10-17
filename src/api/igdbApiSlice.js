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
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.igdb.com/v4/' }),
    prepareHeaders: (headers) => {
        headers.set('Client-Id', import.meta.env.VITE_CLIENT_ID);
        headers.set('Authorization', `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`);

        return headers;
    },
    endpoints: (builder) => ({
        getGames: builder.query({
            query: () => ({
                url: 'games',
                method: 'POST',
                body: 'fields name, cover, first_release_date, platforms, genres, summary, websites, rating, rating_count, involved_companies, screenshots, url; limit 100; where category = 0; order rating desc;'
            }),
            transformResponse: (response) => {
                return response.map(game => {
                    return {
                        ...game,
                        weightedRating: calculateWeightedRating(game),
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