import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import OpenRoute from './OpenRoute';
import { useAuth } from '../hoooks/AuthContext'; // Adjust the import path to your useAuth hook
import { BrowserRouter, Routes, Route } from 'react-router-dom';

jest.mock('../hoooks/AuthContext'); // Mock the useAuth hook

const DummyComponent = () => <div>Dummy Component</div>;

describe('OpenRoute', () => {
    it('renders the component when not logged in', () => {
        useAuth.mockReturnValue({ isLoggedIn: false });

        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<OpenRoute component={DummyComponent} />} />
                </Routes>
            </BrowserRouter>
        );

        expect(screen.getByText('Dummy Component')).toBeInTheDocument();
    });

    it('redirects to SearchPage when logged in', () => {
        useAuth.mockReturnValue({ isLoggedIn: true });

        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<OpenRoute component={DummyComponent} />} />
                    {/* Add this route for testing redirection */}
                    <Route path="/SearchPage" element={<div>Search Page</div>} />
                </Routes>
            </BrowserRouter>
        );

        expect(screen.queryByText('Dummy Component')).not.toBeInTheDocument();
        expect(screen.getByText('Search Page')).toBeInTheDocument();
    });
});


