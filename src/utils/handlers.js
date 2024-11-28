import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    setPlatformFilter,
    resetPlatformFilter,
    setYearFilter,
    resetYearFilter,
    setGenreFilter,
    resetGenreFilter,
    setSearch,
    setGames,
    clearSelectedGame
} from "../features/Games/gamesSlice";

export const useFilterHandlers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlePlatformClick = (e, platform) => {
        e.preventDefault();
        dispatch(setPlatformFilter([platform]));
        dispatch(setGames([]));
        navigate('/');
    };

    const handlePlatformReset = (e) => {
        e.preventDefault();
        dispatch(resetPlatformFilter());
    };

    const handleYearClick = (e, year) => {
        e.preventDefault();
        dispatch(setYearFilter(year.toString()));
        dispatch(setGames([]));
        navigate('/');
    };

    const handleYearReset = (e) => {
        e.preventDefault();
        dispatch(resetYearFilter());
    };

    const handleGenreClick = (e, genre) => {
        e.preventDefault();
        dispatch(setGenreFilter([genre]));
        dispatch(setGames([]));
        navigate('/');
    };

    const handleGenreReset = (e) => {
        e.preventDefault();
        dispatch(resetGenreFilter());
    };

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearch(searchTerm));
        navigate('/');
    };
    const handleReset = (e) => {
        if (e) e.preventDefault();
        dispatch(resetPlatformFilter());
        dispatch(resetYearFilter());
        dispatch(resetGenreFilter());
        setSearchTerm('');
        dispatch(setSearch(''));
        dispatch(setGames([]));
        dispatch(clearSelectedGame())
        navigate('/');
    };
    return {
        handlePlatformClick,
        handlePlatformReset,
        handleYearClick,
        handleYearReset,
        handleGenreClick,
        handleGenreReset,
        handleSearch,
        handleReset,
        searchTerm,
        setSearchTerm
    }
}