import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { test, expect, describe } from "vitest";
import { Footer } from "./Footer";

describe('Footer component', () => {
    test('renders the Footer component', () => {        
        render(<Footer />);
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
    test('renders the RAWG logo', () => {
        render(<Footer />);
        expect(screen.getByText('RAWG')).toBeInTheDocument();
    });
    test('renders secret link correctly', () => {
        render(<Footer />);
        const secret = screen.getByRole('link', { name: 'Super Metroid'});
        expect(secret).toBeInTheDocument();
        expect(secret).toHaveAttribute('href', 'https://www.ign.com/games/super-metroid');
        expect(secret).toHaveAttribute('target', '_blank');
        expect(secret).toHaveAttribute('rel', 'noreferrer');
    })
    test('renders GitHub link correctly', () => {
        render(<Footer />);
        const githubLink = screen.getByRole('link', { name: 'GitHub' });
        expect(githubLink).toBeInTheDocument();
        expect(githubLink).toHaveAttribute('href', 'https://github.com/mattsteen14/hall-of-game');
        expect(githubLink).toHaveAttribute('target', '_blank');
        expect(githubLink).toHaveAttribute('rel', 'noreferrer');
    });
    
    test('renders Back to top link correctly', () => {
        render(<Footer />);
        const backToTopLink = screen.getByRole('link', { name: 'Back to top' });
        expect(backToTopLink).toBeInTheDocument();
        expect(backToTopLink).toHaveAttribute('aria-label', 'Back to top');
        expect(backToTopLink).not.toHaveAttribute('href');
        expect(backToTopLink).not.toHaveAttribute('target');
        expect(backToTopLink).not.toHaveAttribute('rel');
    });
})