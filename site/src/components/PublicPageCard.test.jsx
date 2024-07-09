import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PublicPageCard from "./PublicPageCard";
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import '@testing-library/dom';


beforeAll(() => {
    fetchMock.enableMocks();
});

beforeEach(() => {
    fetch.resetMocks();
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
        addresses: [{ line1: "123 Mock St.", city: "Mock City", stateCode: "MC", postalCode: "12345" }]
    }
};

const mockAmenities = [
    [
        {
            "id": "4E4D076A-6866-46C8-A28B-A129E2B8F3DB",
            "name": "Accessible Rooms",
            "parks": [
                {
                    "states": "KY",
                    "designation": "National Historical Park",
                    "parkCode": "abli",
                    "fullName": "Abraham Lincoln Birthplace National Historical Park",
                    "places": [
                        {
                            "title": "Lincoln Tavern",
                            "id": "D5265572-4FD7-4078-A73E-F9B13956C5E5",
                            "url": "https://www.nps.gov/places/lincoln-tavern.htm"
                        }
                    ],
                    "url": "http://www.nps.gov/abli/",
                    "name": "Abraham Lincoln Birthplace"
                }
            ]
        }
    ]
];

describe("ParkCard", () => {
    test("renders without crashing", () => {
        render(<PublicPageCard park={mockPark.park} />);
        expect(screen.getByText("Mock Park")).toBeInTheDocument();
    });


    test("expands to show more details when 'See More' is clicked", async () => {
        render(<PublicPageCard park={mockPark.park} />);
        fetch.mockResponseOnce(JSON.stringify(mockAmenities));

        const seeMoreButton = screen.getByTestId(/title-button/i);
        await act(()=> {
            userEvent.click(seeMoreButton);
        })

        // Assuming the activities are shown only after expanding
        await waitFor(() => expect(screen.getByText("Hiking, Swimming")).toBeInTheDocument());

        const amenitiesButton = screen.getByText("Amenities");
        await act(()=> {
            userEvent.click(amenitiesButton);

        })

        await waitFor(() => expect(screen.getByText("Accessible Rooms")).toBeInTheDocument());
    });
});

