import axios from "axios";

const API_URL = "https://www.giantbomb.com/api";
const API_KEY = ""; // Your API key from https://www.giantbomb.com/api/
const format = "&format=json";

const api = axios.create({
  baseURL: API_URL,
});

export const fetchGames = async () => {
  try {
    const response = await api.get(`/games/?api_key=${API_KEY}${format}`);
    console.log("Games fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};

export const fetchGameById = async (guid) => {
  try {
    const response = await api.get(
      `/game/${guid}/?api_key=${API_KEY}${format}`
    );
    console.log("Game fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching game:", error);
    throw error;
  }
};

// fetchGames();
fetchGameById("3030-56725"); // Red Dead Redemption 2
