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
    setSearch
} from "../features/Games/gamesSlice";

export const useFilterHandlers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlePlatformClick = (e, platform) => {
        e.preventDefault();
        dispatch(setPlatformFilter(platform));
        navigate('/');
    };
    const handlePlatformReset = (e) => {
        e.preventDefault();
        dispatch(resetPlatformFilter());
    };
    const handleYearClick = (e, first_release_date) => {
        e.preventDefault();
        const releaseYear = new Date(first_release_date).getFullYear();
        dispatch(setYearFilter(releaseYear));
        navigate('/');
    };
    const handleYearReset = (e) => {
        e.preventDefault();
        dispatch(resetYearFilter());
    };
    const handleGenreClick = (e, genre) => {
        e.preventDefault();
        dispatch(setGenreFilter(genre));
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