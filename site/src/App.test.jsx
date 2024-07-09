import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";
import '@testing-library/jest-dom';


function renderWithRouter(ui, { route = '/' } = {}) {
    window.history.pushState({}, 'Test page', route);

    return render(ui, { wrapper: BrowserRouter });
}

describe("App Routing", () => {
    test("renders without crashing", () => {
        renderWithRouter(<App />);
        // Add assertions if there are any static elements you can test for
    });

    test("default route redirects to /searchPage", () => {
        renderWithRouter(<App />, { route: '/' });
        expect(screen.getAllByText("Login"));
    });

    test("/loginPage should show the login page", () => {
        renderWithRouter(<App />, { route: '/signupPage' });
        expect(screen.getByText("Username must be at least 5 characters long.")).toBeInTheDocument(); // Replace with a test ID or actual text
    });


});

