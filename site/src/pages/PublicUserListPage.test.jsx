import React from 'react';
import {render, fireEvent, screen, waitFor, act, getByText} from '@testing-library/react';
import PublicUserListPage from './PublicUserListPage';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import '@testing-library/dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SearchPage from "./SearchPage";

beforeAll(() => {
    fetchMock.enableMocks();
});

beforeEach(() => {
    fetchMock.resetMocks();
});

describe ('PublicUserListPage', () => {

    const mockedLoadUp = {
        "robertp1": [
            "Abraham Lincoln Birthplace National Historical Park",
            "Acadia National Park"
        ],
        "johndoe": [
            "Adams National Historical Park",
            "Acadia National Park"
        ]
    }

    const mockedCompare = {
        "Abraham Lincoln Birthplace National Historical Park": [
            "robertp1"
        ],
        "Acadia National Park": [
            "robertp1",
            "johndoe"
        ],
        "Adams National Historical Park": [
            "johndoe"
        ]
    }

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

    test('fetches users and favorites', async () => {
        fetch.mockResponseOnce(JSON.stringify(mockedLoadUp));

        const user = userEvent.setup();
        render(<PublicUserListPage/>, {wrapper: BrowserRouter});
        await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

        const username = await screen.getByText('robertp1');
        expect(username).toBeInTheDocument();
    });

    test('compares users', async () => {
        fetch.mockResponseOnce(JSON.stringify(mockedLoadUp));
        fetch.mockResponseOnce(JSON.stringify(mockedCompare));

        const user = userEvent.setup();
        render(<PublicUserListPage/>, {wrapper: BrowserRouter});
        await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

        const username1 = await screen.getByText('robertp1')
        const parentDiv1 =  username1.parentElement;
        const select1 = parentDiv1.querySelector('button');

        // tests the select on and off
        await waitFor(() => userEvent.click(select1));
        await waitFor(() => userEvent.click(select1));
        await waitFor(() => userEvent.click(select1));

        const username2 = await screen.getByText('johndoe')
        const parentDiv2 =  username2.parentElement;
        const select2 = parentDiv2.querySelector('button');

        await waitFor(() => userEvent.click(select2));

        const compareButton = await screen.getByText('Compare Favorites');
        fetch.mockResponseOnce(JSON.stringify(mockPark));
        fetch.mockResponseOnce(JSON.stringify(mockPark));
        fetch.mockResponseOnce(JSON.stringify(mockPark));


        await waitFor(() => userEvent.click(compareButton));


        const tooltip = await screen.getByTestId('tooltip-Acadia National Park')
        await waitFor(() => userEvent.click(tooltip));


        const compared = await screen.getByText('robertp1, johndoe');
        expect(compared).toBeInTheDocument();

        const exitButton = await screen.getByText('X');
        await waitFor(() => userEvent.click(exitButton));
    });

    test('compares users response not-ok', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        fetch.mockResponseOnce(JSON.stringify({ message: 'Could not fetch users and favorites' }), { status: 500 });

        const user = userEvent.setup();
        render(<PublicUserListPage/>, {wrapper: BrowserRouter});
        await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

        expect(consoleSpy).toHaveBeenCalledWith('Could not fetch users and favorites');
        consoleSpy.mockRestore();
    });

    test('compares users response fails entirely', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        fetch.mockResponseOnce(null);

        const user = userEvent.setup();
        render(<PublicUserListPage/>, {wrapper: BrowserRouter});
        await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

        expect(consoleSpy).toHaveBeenCalledWith('An error occurred while fetching users and their favorites', expect.anything());
        consoleSpy.mockRestore();
    });

    test('compares users response not-ok', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        fetch.mockResponseOnce(JSON.stringify(mockedLoadUp));
        fetch.mockResponseOnce(JSON.stringify({ message: 'Could not fetch users and favorites' }), { status: 500 });

        const user = userEvent.setup();
        render(<PublicUserListPage/>, {wrapper: BrowserRouter});
        await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

        //select user1
        const username1 = await screen.getByText('robertp1')
        const select1 = (username1.parentElement).querySelector('button');
        await waitFor(() => userEvent.click(select1));

        //select user2
        const username2 = await screen.getByText('johndoe')
        const select2 = (username2.parentElement).querySelector('button');
        await waitFor(() => userEvent.click(select2));

        //compare both
        const compareButton = await screen.getByText('Compare Favorites');
        await waitFor(() => userEvent.click(compareButton));

        expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch common favorites:', expect.anything());
        consoleSpy.mockRestore();
    });

    test('compares users response fails entirely as well', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        fetch.mockResponseOnce(JSON.stringify(mockedLoadUp));
        fetch.mockResponseOnce(null);

        const user = userEvent.setup();
        render(<PublicUserListPage/>, {wrapper: BrowserRouter});
        await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

        //select user1
        const username1 = await screen.getByText('robertp1')
        const select1 = (username1.parentElement).querySelector('button');
        await waitFor(() => userEvent.click(select1));

        //select user2
        const username2 = await screen.getByText('johndoe')
        const select2 = (username2.parentElement).querySelector('button');
        await waitFor(() => userEvent.click(select2));

        //compare both
        const compareButton = await screen.getByText('Compare Favorites');
        await waitFor(() => userEvent.click(compareButton));

        expect(consoleSpy).toHaveBeenCalledWith('An error occurred while fetching common favorites:', expect.anything());
        consoleSpy.mockRestore();
    });

    test('suggests a park for selected users', async () => {
        fetch.mockResponseOnce(JSON.stringify(mockedLoadUp));
        fetch.mockResponseOnce(JSON.stringify("Yellowstone National Park"));

        const user = userEvent.setup();
        act(() => {
            render(<PublicUserListPage/>, {wrapper: BrowserRouter});
        })
        await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

        const username1 = await screen.getByText('robertp1');
        const parentDiv1 = username1.parentElement;
        const select1 = parentDiv1.querySelector('button');
        act(()=> {
            user.click(select1);
        })
        const username2 = await screen.getByText('johndoe');
        const parentDiv2 = username2.parentElement;
        const select2 = parentDiv2.querySelector('button');
        act(()=> {
            user.click(select2);
        })

        // Click on the 'Suggest a Park' button
        const suggestButton = await screen.getByText('Suggest a Park');
        fetch.mockResponseOnce(JSON.stringify(mockPark));
        act(() => {
            user.click(suggestButton);
        });
        await waitFor(() => expect(screen.getByTestId('title-\"Yellowstone National Park\"')).toHaveTextContent("Yellowstone National Park"))


        const exitButton = await screen.getByText('X');
        await act(async () => {
            await user.click(exitButton);
        });

    });

});