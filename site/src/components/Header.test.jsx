import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import Header from './Header'; // Adjust the import path to your Header component
import { useAuth } from '../hoooks/AuthContext'; // Adjust the import path to your useAuth hook
import '@testing-library/jest-dom';


jest.mock('../hoooks/AuthContext'); // Mock the useAuth hook

describe('Header', () => {
    it('should show the login and signup links when not logged in', async () => {
        useAuth.mockReturnValue({
            isLoggedIn: false,
            logout: jest.fn(),
        });

        render(<Header/>);

        await waitFor(() => expect(screen.getByText("Sign Up")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText("Login")).toBeInTheDocument());


    });

    it('should show the search, public users, favorites, and logout links when logged in', async () => {
        useAuth.mockReturnValue({
            isLoggedIn: true,
            logout: jest.fn(),
        });

        render(<Header />);

        expect(screen.getByText('Search')).toBeInTheDocument();
        expect(screen.getByText('Public Users\' Lists')).toBeInTheDocument();
        expect(screen.getByText('Favorites')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
        expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
    });

    it('calls logout function when logout is clicked', async () => {
        const mockLogout = jest.fn();
        useAuth.mockReturnValue({
            isLoggedIn: true,
            logout: mockLogout,
        });

        render(<Header />);

        fireEvent.click(screen.getByText('Logout'));
        expect(mockLogout).toHaveBeenCalled();
    });
});
