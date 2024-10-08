import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const igdbApi = createApi({
    reducerPath: 'igdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.igdb.com/v4/' }),
    prepareHeaders: (headers) => {
        headers.set('Client-Id', '4dforijzrsuxwrqgk0r9zaowtvt2mv');
        headers.set('Authorization', 'Bearer e4mzfey3p8nb4cpjhhlsice1dhimgb');

        return headers;
    }
    endpoints: (builder) => ({
        getGames: builder.query({
            query: () => ({
                url: 'games',
                method: 'POST',
                body: 'fields name, cover, first_release_date, platforms, genres, summary, websites; limit 100;'
            })
        }),
    }),
});