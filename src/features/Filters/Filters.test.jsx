import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import '@testing-library/jest-dom'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../store/store";
import { Filters } from "./Filters";

describe('Filters component', () => {
    test('renders the Filters component', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Filters />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
    test('renders platform options', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Filters />
                </BrowserRouter>
            </Provider>
        );
        const platformSelect = await screen.findByRole('combobox', { name: 'All Platforms' });
        expect(platformSelect).toBeInTheDocument();
        expect(platformSelect).toHaveTextContent('All Platforms');
    })
    test('renders genre options', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Filters />
                </BrowserRouter>
            </Provider>
        );
        const genreSelect = await screen.findByRole('combobox', { name: 'All Genres' });
        expect(genreSelect).toBeInTheDocument();
        expect(genreSelect).toHaveTextContent('All Genres');
    })
    test('renders year options', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Filters />
                </BrowserRouter>
            </Provider>
        );
        const yearSelect = await screen.findByRole('combobox', { name: 'All Years' });
        expect(yearSelect).toBeInTheDocument();
        expect(yearSelect).toHaveTextContent('All Years');
    })
})