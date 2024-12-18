import axios from "axios";

const API_URL = 'https://api.rawg.io/api';

export const api = axios.create({
    baseURL: API_URL,
});