import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
                body: 'fields name, cover, first_release_date, platforms, genres, summary, websites, rating; limit 100; where category = 0; order rating desc;'
            })
        }),
    }),
});

export const {
    useGetGamesQuery,
} = igdbApi;

export default igdbApi.reducer;