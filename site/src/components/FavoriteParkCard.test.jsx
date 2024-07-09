import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavoriteParkCard from "./FavoriteParkCard";
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';


beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
            message: "Success",
        }),
    }));
});



const mockPark = {
    park: {
        activities: [{ name: "Hiking" }, { name: "Swimming" }],
        entranceFees: [{ title: "General Admission", cost: "$10", description: "Per vehicle" }],
        description: "A beautiful park.",
        fullName: "Mock Park",
        images: [{ url: "image-url", altText: "A beautiful view of Mock Park" }],
        isFavorite: false,
        parkCode: "mock-park",
        addresses: [{ line1: "123 Mock St.", city: "Mock City", stateCode: "MC", postalCode: "12345" }],
        ranking:1
    }
};

describe("FavoriteParkCard", () => {
    test("renders without crashing", () => {
        render(<FavoriteParkCard park={mockPark.park} />);
        expect(screen.getByText("Mock Park")).toBeInTheDocument();
    });

    test("toggle favorite status", async () => {
        render(<FavoriteParkCard getFavorites={()=>{}} park={mockPark.park} />);
        const favoriteButton = screen.getByTestId("favorite-button");
        userEvent.click(favoriteButton);

        // Wait for the confirmation dialog to be visible
        await waitFor(() => screen.getByTestId("confirm-delete-button"));

        const confirmButton = screen.getByTestId("confirm-delete-button");
        userEvent.click(confirmButton);


        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    });

    test("expands to show more details when 'See More' is clicked", async () => {
        render(<FavoriteParkCard park={mockPark.park} />);
        const seeMoreButton = screen.getByText("See More");
        userEvent.click(seeMoreButton);

        // Assuming the activities are shown only after expanding
        await waitFor(() => expect(screen.getByText("Hiking, Swimming")).toBeInTheDocument());
    });
});

