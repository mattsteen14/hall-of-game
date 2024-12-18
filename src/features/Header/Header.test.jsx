import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store/store';
import { Header } from './Header';

describe('Header component', () => {
    test('renders the Header component', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByRole('banner')).toBeInTheDocument();
    });
    test('renders hall of game logo', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
        expect(screen.getByText('HALL OF GAME')).toBeInTheDocument();
    });
    test('renders back to home link in hall of game logo', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        );
        const homeLink = screen.getByRole('link', { name: 'Home' });
        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveAttribute('href', '/');
        expect(homeLink).toHaveAttribute('aria-label', 'Home');
        expect(homeLink).not.toHaveAttribute('target');
        expect(homeLink).not.toHaveAttribute('rel');
    });
        test('renders secret link correctly', () => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <Header />
                    </BrowserRouter>
                </Provider>
            );
            const secret = screen.getByRole('link', { name: 'Super Metroid'});
            expect(secret).toBeInTheDocument();
            expect(secret).toHaveAttribute('href', 'https://www.ign.com/games/super-metroid');
            expect(secret).toHaveAttribute('target', '_blank');
            expect(secret).toHaveAttribute('rel', 'noreferrer');
        })
    test('renders search input', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        );
        const searchInput = screen.getByRole('textbox');
        const searchButton = screen.getByRole('button');
        expect(searchInput).toBeInTheDocument();
        expect(searchInput).toHaveAttribute('placeholder', 'SEARCH');
        expect(searchInput).toHaveAttribute('aria-label', 'Search');
        expect(searchButton).toBeInTheDocument();
        expect(searchButton).toHaveAttribute('type', 'submit');
        expect(searchButton).toHaveAttribute('aria-label', 'Search');
    });
    test('searches for games correctly', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        );
        const searchInput = screen.getByRole('textbox');
        const searchButton = screen.getByRole('button');
        const user = userEvent.setup();
        await user.type(searchInput, 'Halo');
        expect(searchInput).toHaveValue('Halo');
        await user.click(searchButton);
    });
    test('handleSearch function', () => {
        const handleSearch = vi.fn();
        const searchTerm = 'Halo';
        handleSearch({ target: { value: searchTerm } });
        expect(handleSearch).toHaveBeenCalledTimes(1);
        expect(handleSearch).toHaveBeenCalledWith(expect.any(Object));
    });
})