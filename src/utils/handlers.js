import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    setPlatformFilter,
    setYearFilter,
    setGenreFilter,
    setSearch,
    delSearch,
    setGames,
    clearSelectedGame,
    setParentPlatformFilter,
    resetFilters,
    setPage,
    selectCurrentPage,
    selectNextPage,
    selectPreviousPage,
} from "../features/Games/gamesSlice";

export const useFilterHandlers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const resetGameData = (dispatch, navigate) => {
        dispatch(setGames([]));
        dispatch(clearSelectedGame());
        navigate('/');
    };
    const currentPage = useSelector(selectCurrentPage);
    const nextPage = useSelector(selectNextPage);
    const previousPage = useSelector(selectPreviousPage);
    const changePage = newPage => {
        dispatch(setPage(newPage));
    }
    const handlePlatformClick = (e, platform) => {
        e.preventDefault();
        dispatch(setPlatformFilter(platform));
        dispatch(resetGameData(dispatch, navigate));
    };
    const handleParentPlatformClick = (e, parentPlatform) => {
        e.preventDefault();
        dispatch(setParentPlatformFilter(parentPlatform));
    }
    const handleYearClick = (e, year) => {
        e.preventDefault();
        dispatch(setYearFilter(year.toString()));
        dispatch(resetGameData(dispatch, navigate));
    };

    const handleGenreClick = (e, genre) => {
        e.preventDefault();
        dispatch(setGenreFilter(genre));
        dispatch(resetGameData(dispatch, navigate));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if(searchTerm) {
            dispatch(setSearch(searchTerm));
        } else {
            dispatch(delSearch());
        }
        dispatch(resetGameData(dispatch, navigate));
    };
    const handleReset = (e) => {
        if (e) e.preventDefault();
        dispatch(resetFilters());
        setSearchTerm('');
        dispatch(delSearch());
        dispatch(resetGameData(dispatch, navigate));
        dispatch(setPage(1));   
    };
    const handleNextPage = () => {
        if(nextPage) {
            changePage(currentPage + 1);
        }
    };
    const handlePreviousPage = () => {
        if(previousPage && currentPage > 1) {
            changePage(currentPage - 1);
        }
    };
    return {
        handlePlatformClick,
        handleYearClick,
        handleGenreClick,
        handleSearch,
        handleReset,
        searchTerm,
        setSearchTerm,
        handleParentPlatformClick,
        handleNextPage,
        handlePreviousPage,
        currentPage,
        nextPage,
        previousPage
    }
}