import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpPage from './SignUpPage';
import { BrowserRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import '@testing-library/dom';
import userEvent from '@testing-library/user-event';

beforeAll(() => {
    fetchMock.enableMocks();

});

beforeEach(() => {
    fetch.resetMocks();
});

function setup() {
    const user = userEvent.setup();
    render(<SignUpPage />, { wrapper: BrowserRouter });

    const username = screen.getByTestId('username-input');
    const password = screen.getByTestId('initial-password-input');
    const confirmPassword = screen.getByTestId('confirm-password-input');
    const button = screen.getByTestId('submit-button');

    return { user, username, password, confirmPassword, button };
}

describe('SignUpPage', () => {
    it('renders the input fields and sign-up button', async () => {
        const {user, username, password, confirmPassword, button} = setup();

        await waitFor(() => user.click(username));
        await waitFor(() => user.click(password));
        await waitFor(() => user.click(confirmPassword));

        expect(screen.findByTestId('username-input'));
        expect(screen.findByTestId('initial-password-input'));
        expect(screen.findByTestId('confirm-password-input'));
        expect(screen.findByTestId('submit-button'));
    });

    it('Inputs a username that is 3 characters', async () => {
        const { user, username, password, confirmPassword, button } = setup();

        await waitFor(() => user.type(username, 'tom'));
        await waitFor(() => user.type(password, 'password'));
        await waitFor(() => user.type(confirmPassword, 'password'));
        await waitFor(() => user.click(button));

        await waitFor(() => {
            const passwordError = screen.getByTestId('error-message');
            expect(passwordError).toHaveTextContent('Username must be at least 5 characters long.');
        });
    });

    // Other tests continue using the `setup` function in a similar way
    it('Inputs a password that does not have a number', async () => {
        const {user, username, password, confirmPassword, button } = setup();

        await waitFor(() => user.type(username, 'tommy'));
        await waitFor(() => user.type(password, 'Password'));
        await waitFor(() => user.type(confirmPassword, 'Password'));
        await waitFor(() => user.click(button));

        await waitFor(() => {
            const passwordError = screen.getByTestId('error-message');
            expect(passwordError).toHaveTextContent('Password requires one uppercase, one lowercase, and one number.');
        });
    });

    it('Inputs wrong confirmation password', async () => {
        const { user, username, password, confirmPassword, button } = setup();

        await waitFor(() => user.type(username, 'tommy'));
        await waitFor(() => user.type(password, 'Password123'));
        await waitFor(() => user.type(confirmPassword, 'Password12'));
        await waitFor(() => user.click(button));

        await waitFor(() => {
            const passwordError = screen.getByTestId('error-message');
            expect(passwordError).toHaveTextContent('Passwords do not match.');
        });
    });

    it('Successful sign-up', async () => {
        const { user, username, password, confirmPassword, button } = setup();
        fetch.mockResponseOnce(JSON.stringify({"error": "Sign up succeeded"}));

        await waitFor(() => user.type(username, 'tommy'));
        await waitFor(() => user.type(password, 'Password123'));
        await waitFor(() => user.type(confirmPassword, 'Password123'));
        await waitFor(() => user.click(button));

        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('Successful sign-up but fetch response fails', async () => {
        const consoleLogSpy = jest.spyOn(console, 'log');
        const { user, username, password, confirmPassword, button } = setup();
        fetch.mockReject(new Error('Error during signup, server error'));

        await waitFor(() => user.type(username, 'tommy'));
        await waitFor(() => user.type(password, 'Password123'));
        await waitFor(() => user.type(confirmPassword, 'Password123'));
        await waitFor(() => user.click(button));


        expect(consoleLogSpy).toHaveBeenCalledWith(Error( 'Error during signup, server error'));
    });

    it('Successful cancel attempt', async () => {
        const consoleLogSpy = jest.spyOn(console, 'log');
        const { user, username, password, confirmPassword, button } = setup();

        await waitFor(() => user.type(username, 'tommy'));
        await waitFor(() => user.type(password, 'Password123'));
        await waitFor(() => user.type(confirmPassword, 'Password123'));

        const cancelButton = screen.getByTestId('signup-cancel');
        await waitFor(() => user.click(cancelButton));

        const cancelFalse = screen.getByTestId('cancel-false');
        await waitFor(() => user.click(cancelFalse));

        await waitFor(() => user.click(cancelButton));
        const cancelTrue = screen.getByTestId('cancel-true');
        await waitFor(() => user.click(cancelTrue));

        expect(username).toHaveValue('');
    });
});