export const filterGames = (games, filters) => {
    const { platform, genre, year } = filters;

    return games.filter((game) => {
        const matchesPlatform = !platform || game.platforms.some((p) => p.platform.id === platform);
        const matchesGenre = !genre || game.genres.some((g) => g.id === genre);
        const matchesYear = !year || new Date(game.released).getFullYear().toString() === year;

        return matchesPlatform && matchesGenre && matchesYear;
    });
};