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
    clearSelectedGame,
    setParentPlatformFilter,
    resetParentPlatformFilter,
    resetFilters
} from "../features/Games/gamesSlice";

export const useFilterHandlers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlePlatformClick = (e, platform) => {
        e.preventDefault();
        dispatch(setPlatformFilter([platform]));
        dispatch(setGames([]));
        dispatch(clearSelectedGame());
        navigate(`/?platform=${platform}`);
    };

    const handlePlatformReset = (e) => {
        e.preventDefault();
        dispatch(resetPlatformFilter());
        dispatch(resetParentPlatformFilter())
    };

    const handleParentPlatformClick = (e, parentPlatform) => {
        e.preventDefault();
        dispatch(setParentPlatformFilter([parentPlatform]));
    }
    const handleParentPlatformReset = (e) => {
        e.preventDefault();
        dispatch(resetParentPlatformFilter());
    }
    const handleYearClick = (e, year) => {
        e.preventDefault();
        dispatch(setYearFilter(year.toString()));
        dispatch(setGames([]));
        dispatch(clearSelectedGame());
        navigate(`/?year=${year}`);
    };

    const handleYearReset = (e) => {
        e.preventDefault();
        dispatch(resetYearFilter());
    };

    const handleGenreClick = (e, genre) => {
        e.preventDefault();
        dispatch(setGenreFilter([genre]));
        dispatch(setGames([]));
        dispatch(clearSelectedGame());
        navigate(`/?genre=${genre}`);
    };

    const handleGenreReset = (e) => {
        e.preventDefault();
        dispatch(resetGenreFilter());
    };

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearch(searchTerm));
        dispatch(setGames([]));
        dispatch(clearSelectedGame());
        navigate(`/?search=${searchTerm}`);
    };
    const handleReset = (e) => {
        if (e) e.preventDefault();
        dispatch(resetFilters());
        setSearchTerm('');
        dispatch(setSearch(''));
        dispatch(setGames([]));
        dispatch(clearSelectedGame());
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
        setSearchTerm,
        handleParentPlatformClick,
        handleParentPlatformReset
    }
}