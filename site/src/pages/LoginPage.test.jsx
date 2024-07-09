import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import LoginPage from './LoginPage';
import '@testing-library/jest-dom'


test('Render Login Page', async () => {
    render(<LoginPage />)
    expect(screen.findByText(/Login/i))
})

test('Display invalid password format', async () => {
    render(<LoginPage />)
    const username = screen.getByPlaceholderText(/username/i)
    const password = screen.getByPlaceholderText(/password/i)
    const button = screen.getByTestId(/button/i)

    fireEvent.change(username, {target: {value: 'tommy'}})
    fireEvent.change(password, {target: {value: 'password'}})
    fireEvent.click(button)

    await waitFor(() => {
        const passwordError = screen.getByTestId(/pass-error-message/i)
        expect(passwordError).toHaveTextContent('Invalid password format')
    })
})

test('Display invalid username format', async () => {
    render(<LoginPage />)
    const username = screen.getByPlaceholderText(/username/i)
    const password = screen.getByPlaceholderText(/password/i)
    const button = screen.getByTestId(/button/i)

    fireEvent.change(username, {target: {value: ''}})
    fireEvent.change(password, {target: {value: 'password'}})
    fireEvent.click(button)

    await waitFor(() => {
        const passwordError = screen.getByTestId(/username-error-message/i)
        expect(passwordError).toHaveTextContent('Invalid username format')
    })
})

test('Does not display invalid username and password format', async () => {
    render(<LoginPage />)
    const username = screen.getByPlaceholderText(/username/i)
    const password = screen.getByPlaceholderText(/password/i)
    const button = screen.getByTestId(/button/i)

    fireEvent.change(username, {target: {value: 'tommy'}})
    fireEvent.change(password, {target: {value: 'Password123'}})

    fireEvent.click(button)

    await waitFor(() => {
        expect(screen.queryByTestId(/pass-error-message/i)).not.toBeInTheDocument();
        expect(screen.queryByTestId(/username-error-message/i)).not.toBeInTheDocument();
    })
})

test('Initial state does not show any error messages', () => {
    render(<LoginPage />);
    const usernameErrorMessage = screen.queryByTestId('username-error-message')
    const passwordErrorMessage = screen.queryByTestId('pass-error-message')
    expect(passwordErrorMessage && usernameErrorMessage).not.toBeInTheDocument()
});
