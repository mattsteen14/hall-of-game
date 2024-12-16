import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { Provider } from "react-redux";
import { test, expect, vi, describe } from "vitest";
// import { JSDOM } from "jsdom";
import { store } from "./store/store";
import App from "./App";

// const dom = new JSDOM('<!doctype html><html><body></body></html>');
// globalThis.document = dom.window.document;

vi.mock('./features/Games/gamesSlice', async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...actual,
        fetchGamesThunk: vi.fn(() => ({
            type: 'games/fetchGames/pending'
        }))
    }
})

describe('App component', () => {
    test('renders the App component with Header, main and Footer', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        expect(screen.getByRole('banner')).toBeInTheDocument();
        expect(screen.getByRole('main')).toBeInTheDocument();
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    })
})

