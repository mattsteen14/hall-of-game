import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import '@testing-library/jest-dom'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../store/store";
import { PageSelect } from "./PageSelect";

describe('PageSelect component', () => {
    test('renders the PageSelect component', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <PageSelect />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
    test('renders page navigation buttons', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <PageSelect />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByRole('button', { name: 'Previous Page' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Next Page' })).toBeInTheDocument();
    })
    test('renders page number', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <PageSelect />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByText(/Page \d+/)).toBeInTheDocument();
    })
    test('previous page button is disabled when no previous page', () => {
        // Mock the store to have no previous page
        const mockStore = {
            ...store,
            getState: () => ({ games: { currentPage: 1, previousPage: null } }),
        };
        render(
            <Provider store={mockStore}>
                <BrowserRouter>
                    <PageSelect />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByRole('button', { name: 'Previous Page' })).toBeDisabled();
    });

    test('next page button is disabled when no next page', () => {
        // Mock the store to have no next page
        const mockStore = {
            ...store,
            getState: () => ({ games: { currentPage: 1, nextPage: null } }),
        };
        render(
            <Provider store={mockStore}>
                <BrowserRouter>
                    <PageSelect />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByRole('button', { name: 'Next Page' })).toBeDisabled();
    });
})