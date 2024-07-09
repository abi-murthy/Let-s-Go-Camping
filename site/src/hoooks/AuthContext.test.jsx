import React, {useEffect} from 'react';
import { render, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext'
import { BrowserRouter } from 'react-router-dom';

// Mock the navigate function from react-router-dom
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-overridden methods
    useNavigate: () => jest.fn(),
}));

beforeEach(() => {
    global.fetch = jest.fn();
});

const TestComponent = () => {
    const { isLoggedIn, login, logout } = useAuth();

    // Effect to call login/logout for testing
    useEffect(() => {
        const testLogin = async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true, // Change to false to test the negative case
                json: () => Promise.resolve({}),

            });
            await login('testUser', 'testPassword');
            console.log('Login successful');

            global.fetch.mockResolvedValueOnce({
                ok: false, // Change to false to test the negative case
                json: () => Promise.resolve({}),
            });
            await login('testUser', 'testPassword');
            console.log('Login unsuccessful');

            // global.fetch.mockResolvedValueOnce({
            //     ok: false, // Change to false to test the negative case
            //     json: () => Promise.resolve({}),
            // });
            fetch.mockRejectedValueOnce(new Error('login failed'));
            await login('testUser', 'testPassword');
            console.log('Login threw an error');
        };

        const testLogout = async () => {
            // Example: Trigger logout action
            global.fetch.mockResolvedValueOnce({
                ok: true, // Change to false to test the negative case
            });
            await logout();
            console.log('Logout successful');

            global.fetch.mockResolvedValueOnce({
                ok: false, // Change to false to test the negative case
            });
            await logout();
            console.log('Logout failed');

            fetch.mockRejectedValueOnce(new Error('logout failed'));
            await logout();
            console.log('Logout successful');
        };

        // Example: Call login and logout functions for testing
        testLogin();
        testLogout();

    }, [login, logout]);

    return (
        <div>
            {isLoggedIn ? 'Logged In' : 'Logged Out'}
        </div>
    );
};
// const TestComponent = () => {
//     const { isLoggedIn, login, logout } = useAuth();
//
//     return (
//         <div>
//             {isLoggedIn ? (
//                 <button onClick={logout}>Logout</button>
//             ) : (
//                 <button onClick={() => login('username', 'password')}>Login</button>
//             )}
//             {isLoggedIn ? 'Logged In' : 'Logged Out'}
//         </div>
//     );
// };

describe('AuthProvider', () => {
    it('validates session and sets logged in state accordingly', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true, // Change to false to test the negative case
            json: () => Promise.resolve({}),
        });

        const { getByText } = render(
            <BrowserRouter>
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(getByText('Logged In'));
        });
    });

    it('handles login', async () => {
        // Mock fetch to simulate successful login
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({}),
        });
        const { getByText } = render(
            <BrowserRouter>
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            </BrowserRouter>
        );

        // ... implement test for login functionality
    });

    it('handles logout', async () => {
        // Mock fetch to simulate successful logout
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({}),
        });

        // ... implement test for logout functionality
    });

    // Add more test cases as needed
    it('during the validate session the response.ok is false', async () => {
        // Mock fetch to simulate successful logout
        global.fetch.mockResolvedValueOnce({
            ok: false,
            json: () => Promise.resolve({}),
        });

        const { getByText } = render(
            <BrowserRouter>
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(getByText('Logged Out'));
        });

        // await waitFor(() => {
        //     expect(getByText('nooo'));
        // });

        // ... implement test for logout functionality
    });

    it('login function testing', async () => {
        // Mock fetch to simulate successful logout
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({}),
        });

        const { getByText } = render(
            <BrowserRouter>
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(getByText('Logged In'));
        });
    });

    it('during the validate session the response throws an error', async () => {
        // Mock fetch to simulate successful logout
        fetch.mockRejectedValueOnce(new Error('Session validation error'));

        const { getByText } = render(
            <BrowserRouter>
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(getByText('Logged Out'));
        });

        // ... implement test for logout functionality
    });

    it('testing login function', async () => {
        // Mock fetch to simulate successful logout
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({}),
        });
        global.fetch.mockResolvedValueOnce({
            ok: true,
        });

        const { getByText } = render(
            <BrowserRouter>
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            </BrowserRouter>
        );

        //await AuthProvider.login('testUser', 'testPassword')
        // ... implement test for logout functionality
    });


});
