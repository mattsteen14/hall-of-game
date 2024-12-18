import { render, screen } from '@testing-library/react';
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ParentPlatformIcons } from './ParentPlatformIcons';
import { useFilterHandlers } from '../../utils/handlers';

vi.mock('../../utils/handlers', () => ({
    useFilterHandlers: vi.fn(),
}));

describe('ParentPlatformIcons', () => {
    const mockHandleParentPlatformClick = vi.fn();

    beforeEach(() => {
        // Mock the hook
        useFilterHandlers.mockReturnValue({
            handleParentPlatformClick: mockHandleParentPlatformClick,
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders icons based on the parentPlatforms prop', () => {
        const parentPlatforms = [
            { platform: { id: 1, slug: 'playstation', name: 'PlayStation' } },
            { platform: { id: 2, slug: 'xbox', name: 'Xbox' } },
            { platform: { id: 3, slug: 'nintendo', name: 'Nintendo' } },
        ];

        render(<ParentPlatformIcons parentPlatforms={parentPlatforms} />);

        // Check that the icons for PlayStation, Xbox, and Nintendo are rendered
        expect(screen.getByRole('link', { name: /PlayStation/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Xbox/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Nintendo/i })).toBeInTheDocument();
    });

    it('applies the correct classes for special cases', () => {
        const parentPlatforms = [
            { platform: { id: 1, slug: 'nintendo', name: 'Nintendo' } },
            { platform: { id: 2, slug: '3do', name: '3DO' } },
        ];

        render(<ParentPlatformIcons parentPlatforms={parentPlatforms} />);

        // Nintendo should have the "nintendo-icon" class
        const nintendoIcon = screen.getByRole('link', { name: /Nintendo/i }).parentElement;
        expect(nintendoIcon).toHaveClass('nintendo-icon');

        // 3DO should have the "threedo-icon" class
        const threedoIcon = screen.getByRole('link', { name: /3DO/i }).parentElement;
        expect(threedoIcon).toHaveClass('threedo-icon');
    });

    it('calls handleParentPlatformClick when an icon is clicked', async () => {
        const parentPlatforms = [
            { platform: { id: 1, slug: 'playstation', name: 'PlayStation' } },
        ];

        render(<ParentPlatformIcons parentPlatforms={parentPlatforms} />);

        const user = userEvent.setup();
        const playstationIcon = screen.getByRole('link', { name: /PlayStation/i });

        // Simulate a click on the icon
        await user.click(playstationIcon);

        // Check that the click handler was called with the correct arguments
        expect(mockHandleParentPlatformClick).toHaveBeenCalledWith(expect.anything(), 1);
    });

    it('renders nothing when parentPlatforms is an empty array', () => {
        render(<ParentPlatformIcons parentPlatforms={[]} />);
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('renders nothing for invalid platform data', () => {
        const parentPlatforms = [
            { platform: null }, // Invalid entry
        ];

        render(<ParentPlatformIcons parentPlatforms={parentPlatforms} />);
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
});