import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    resetFilters,
    setPage,
    selectCurrentPage,
    selectNextPage,
    selectPreviousPage
} from "../features/Games/gamesSlice";

export const useFilterHandlers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentPage = useSelector(selectCurrentPage);
    const nextPage = useSelector(selectNextPage);
    const previousPage = useSelector(selectPreviousPage);
    const handlePlatformClick = (e, platform) => {
        e.preventDefault();
        dispatch(setPlatformFilter(platform));
        dispatch(setGames([]));
        dispatch(clearSelectedGame());
        navigate('/');
    };

    const handlePlatformReset = (e) => {
        e.preventDefault();
        dispatch(resetPlatformFilter());
        dispatch(resetParentPlatformFilter())
    };

    const handleParentPlatformClick = (e, parentPlatform) => {
        e.preventDefault();
        dispatch(setParentPlatformFilter(parentPlatform));
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
        navigate('/');
    };

    const handleYearReset = (e) => {
        e.preventDefault();
        dispatch(resetYearFilter());
    };

    const handleGenreClick = (e, genre) => {
        e.preventDefault();
        dispatch(setGenreFilter(genre));
        dispatch(setGames([]));
        dispatch(clearSelectedGame());
        navigate('/');
    };

    const handleGenreReset = (e) => {
        e.preventDefault();
        dispatch(resetGenreFilter());
    };

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearch(searchTerm));
        dispatch(clearSelectedGame());
        navigate('/');
    };
    const handleReset = (e) => {
        if (e) e.preventDefault();
        dispatch(resetFilters());
        setSearchTerm('');
        dispatch(setSearch(''));
        dispatch(clearSelectedGame());
        navigate('/');
        dispatch(setPage(1));   
    };
    const handleNextPage = () => {
        if(nextPage) {
            const newPage = currentPage + 1;
            dispatch(setPage(newPage))
        }
    };
    const handlePreviousPage = () => {
        if(previousPage && currentPage > 1) {
            const newPage = currentPage - 1;
            dispatch(setPage(newPage))
        }
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
        handleParentPlatformReset,
        handleNextPage,
        handlePreviousPage,
        currentPage,
        nextPage,
        previousPage
    }
}