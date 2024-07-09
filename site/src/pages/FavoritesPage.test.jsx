import React from 'react';
import {render, screen, waitFor, act, getByText} from '@testing-library/react';
import FavoritesPage from './FavoritesPage';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import '@testing-library/dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  fetch.resetMocks();
});

const mockedFavorites =
  [
    {
      "id": "77E0D7F0-1942-494A-ACE2-9004D2BDC59E",
      "url": "https://www.nps.gov/abli/index.htm",
      "fullName": "Abraham Lincoln Birthplace National Historical Park",
      "parkCode": "abli",
      "description": "For over a century people from around the world have come to rural Central Kentucky to honor the humble beginnings of our 16th president, Abraham Lincoln. His early life on Kentucky's frontier shaped his character and prepared him to lead the nation through Civil War. Visit our country's first memorial to Lincoln, built with donations from young and old, and the site of his childhood home.",
      "latitude": "37.5858662",
      "longitude": "-85.67330523",
      "latLong": "lat:37.5858662, long:-85.67330523",
      "ranking": "1",
      "activities": [
        {
          "id": "13A57703-BB1A-41A2-94B8-53B692EB7238",
          "name": "Astronomy"
        },
        {
          "id": "D37A0003-8317-4F04-8FB0-4CF0A272E195",
          "name": "Stargazing"
        },
        {
          "id": "1DFACD97-1B9C-4F5A-80F2-05593604799E",
          "name": "Food"
        },
        {
          "id": "C6D3230A-2CEA-4AFE-BFF3-DC1E2C2C4BB4",
          "name": "Picnicking"
        },
        {
          "id": "B33DC9B6-0B7D-4322-BAD7-A13A34C584A3",
          "name": "Guided Tours"
        },
        {
          "id": "A0631906-9672-4583-91DE-113B93DB6B6E",
          "name": "Self-Guided Tours - Walking"
        },
        {
          "id": "42FD78B9-2B90-4AA9-BC43-F10E9FEA8B5A",
          "name": "Hands-On"
        },
        {
          "id": "DF4A35E0-7983-4A3E-BC47-F37B872B0F25",
          "name": "Junior Ranger Program"
        },
        {
          "id": "0B685688-3405-4E2A-ABBA-E3069492EC50",
          "name": "Wildlife Watching"
        },
        {
          "id": "5A2C91D1-50EC-4B24-8BED-A2E11A1892DF",
          "name": "Birdwatching"
        },
        {
          "id": "0C0D142F-06B5-4BE1-8B44-491B90F93DEB",
          "name": "Park Film"
        },
        {
          "id": "C8F98B28-3C10-41AE-AA99-092B3B398C43",
          "name": "Museum Exhibits"
        },
        {
          "id": "24380E3F-AD9D-4E38-BF13-C8EEB21893E7",
          "name": "Shopping"
        },
        {
          "id": "467DC8B8-0B7D-436D-A026-80A22358F615",
          "name": "Bookstore and Park Store"
        },
        {
          "id": "43800AD1-D439-40F3-AAB3-9FB651FE45BB",
          "name": "Gift Shop and Souvenirs"
        }
      ],
      "topics": [
        {
          "id": "D10852A3-443C-4743-A5FA-6DD6D2A054B3",
          "name": "Birthplace"
        },
        {
          "id": "F669BC40-BDC4-41C0-9ACE-B2CD25373045",
          "name": "Presidents"
        },
        {
          "id": "0D00073E-18C3-46E5-8727-2F87B112DDC6",
          "name": "Animals"
        },
        {
          "id": "957EF2BD-AC6C-4B7B-BD9A-87593ADC6691",
          "name": "Birds"
        },
        {
          "id": "E25F3456-43ED-45DD-93BC-057F9B944F7A",
          "name": "Caves, Caverns and Karst"
        },
        {
          "id": "F0F97E32-2F29-41B4-AF98-9FBE8DAB36B1",
          "name": "Geology"
        },
        {
          "id": "4BE01DC5-52E6-4F18-8C9A-B22D65965F6D",
          "name": "Groundwater"
        },
        {
          "id": "0E1A04CC-EB51-4F18-93D4-EC0B0B4EC1E3",
          "name": "Freshwater Springs"
        },
        {
          "id": "A7359FC4-DAD8-45F5-AF15-7FF62F816ED3",
          "name": "Night Sky"
        }
      ],
      "states": "KY",
      "contacts": {
        "phoneNumbers": [
          {
            "phoneNumber": "2703583137",
            "description": "",
            "extension": "",
            "type": "Voice"
          },
          {
            "phoneNumber": "2703583874",
            "description": "",
            "extension": "",
            "type": "Fax"
          }
        ],
        "emailAddresses": [
          {
            "description": "",
            "emailAddress": "ABLI_Administration@nps.gov"
          }
        ]
      },
      "entranceFees": [],
      "entrancePasses": [],
      "fees": [],
      "directionsInfo": "The Birthplace Unit of the park is located approximately 2 miles south of the town of Hodgenville on U.S. Highway 31E South. The Boyhood Home Unit at Knob Creek is located approximately 10 miles northeast of the Birthplace Unit of the park.",
      "directionsUrl": "http://www.nps.gov/abli/planyourvisit/directions.htm",
      "operatingHours": [
        {
          "exceptions": [
            {
              "exceptionHours": {},
              "startDate": "2024-11-28",
              "name": "Park is Closed",
              "endDate": "2024-11-28"
            },
            {
              "exceptionHours": {},
              "startDate": "2024-12-25",
              "name": "Park is Closed",
              "endDate": "2024-12-25"
            },
            {
              "exceptionHours": {},
              "startDate": "2025-01-01",
              "name": "Park is Closed",
              "endDate": "2025-01-01"
            }
          ],
          "description": "Memorial Building:\nopen 9:00 am - 4:30 pm eastern time.\n\nBirthplace Unit Visitor Center and Grounds: \nopen 9:00 am - 5:00 pm eastern time.",
          "standardHours": {
            "wednesday": "9:00AM - 5:00PM",
            "monday": "9:00AM - 5:00PM",
            "thursday": "9:00AM - 5:00PM",
            "sunday": "9:00AM - 5:00PM",
            "tuesday": "9:00AM - 5:00PM",
            "friday": "9:00AM - 5:00PM",
            "saturday": "9:00AM - 5:00PM"
          },
          "name": "Birthplace Unit"
        },
        {
          "exceptions": [
            {
              "exceptionHours": {
                "wednesday": "Closed",
                "monday": "Closed",
                "thursday": "Closed",
                "sunday": "10:00AM - 4:00PM",
                "tuesday": "Closed",
                "friday": "Closed",
                "saturday": "10:00AM - 4:00PM"
              },
              "startDate": "2024-04-01",
              "name": "Spring Hours",
              "endDate": "2024-05-31"
            }
          ],
          "description": "The Boyhood Home Unit at Knob Creek Grounds:\nopen daily dawn to dusk.\n\nKnob Creek Tavern Visitor Center:\nHours are seasonal. Hours are to be announced for 2024.",
          "standardHours": {
            "wednesday": "Closed",
            "monday": "Closed",
            "thursday": "Closed",
            "sunday": "Closed",
            "tuesday": "Closed",
            "friday": "Closed",
            "saturday": "Closed"
          },
          "name": "Boyhood Unit"
        }
      ],
      "addresses": [
        {
          "postalCode": "42748",
          "city": "Hodgenville",
          "stateCode": "KY",
          "countryCode": "US",
          "provinceTerritoryCode": "",
          "line1": "2995 Lincoln Farm Road",
          "type": "Physical",
          "line3": "",
          "line2": ""
        },
        {
          "postalCode": "42748",
          "city": "Hodgenville",
          "stateCode": "KY",
          "countryCode": "US",
          "provinceTerritoryCode": "",
          "line1": "2995 Lincoln Farm Road",
          "type": "Mailing",
          "line3": "",
          "line2": ""
        }
      ],
      "images": [
        {
          "credit": "NPS Photo",
          "title": "The Memorial Building with fall colors",
          "altText": "The Memorial Building surrounded by fall colors",
          "caption": "Over 200,000 people a year come to walk up the steps of the Memorial Building to visit the site where Abraham Lincoln was born",
          "url": "https://www.nps.gov/common/uploads/structured_data/3C861078-1DD8-B71B-0B774A242EF6A706.jpg"
        },
        {
          "credit": "NPS Photo",
          "title": "The Memorial Building",
          "altText": "The first memorial erected to honor Abraham Lincoln",
          "caption": "The Memorial Building constructed on the traditional site of the birth of Abraham Lincoln.",
          "url": "https://www.nps.gov/common/uploads/structured_data/3C861263-1DD8-B71B-0B71EF9B95F9644F.jpg"
        },
        {
          "credit": "NPS Photo",
          "title": "The Symbolic Birth Cabin of Abraham Lincoln",
          "altText": "The symbolic birth cabin on the traditional site of the birth of Abraham Lincoln.",
          "caption": "The symbolic birth cabin of Abraham Lincoln.",
          "url": "https://www.nps.gov/common/uploads/structured_data/3C86137D-1DD8-B71B-0B978BACD7EBAEF1.jpg"
        },
        {
          "credit": "NPS Photo",
          "title": "Statue of the Lincoln Family in the Visitor Center",
          "altText": "Statue of the Lincoln family in the park's Visitor Center",
          "caption": "Visitors to the park can view the statue of the Lincoln family.",
          "url": "https://www.nps.gov/common/uploads/structured_data/3C8614D1-1DD8-B71B-0B1AF72CA452B051.jpg"
        }
      ],
      "weatherInfo": "There are four distinct seasons in Central Kentucky. However, temperature and weather conditions can vary widely within those seasons. Spring and Fall are generally pleasant with frequent rain showers. Summer is usually hot and humid. Winter is moderately cold with mixed precipitation.",
      "name": "Abraham Lincoln Birthplace",
      "designation": "National Historical Park",
      "relevanceScore": 1,
      "isFavorite": true
    }
  ]


const mockVisibility = {
  "visibility": false
}



describe('FavoritesPage', () => {
  it('displays the spinner while loading favorites', async () => {
    fetch.mockResponseOnce(JSON.stringify({ body: [] }), { status: 200 });

    const user = userEvent.setup();
    render(<FavoritesPage/>, {wrapper: BrowserRouter});

    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
  });



  it('fetches favorites and sets them in state', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockedFavorites));
    fetch.mockResponseOnce(JSON.stringify(mockVisibility));

    const user = userEvent.setup();
    render(<FavoritesPage/>, {wrapper: BrowserRouter});
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

    const firstPark = await screen.getByText('Abraham Lincoln Birthplace National Historical Park');
    expect(firstPark).toBeInTheDocument();
  });

  test('fetches favorites fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    fetch.mockRejectOnce(new Error('favorites could not be loaded'));
    const user = userEvent.setup();
    render(<FavoritesPage/>, {wrapper: BrowserRouter});
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

    // Check if console.error was called
    expect(consoleSpy).toHaveBeenCalled();

    // Optionally, check if console.error was called with a specific error
    expect(consoleSpy).toHaveBeenCalledWith('favorites could not be loaded');

    consoleSpy.mockRestore(); // Clean up
  });

  test('mock visibility fails', async () => {
    // const consoleSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    fetch.mockResponseOnce(JSON.stringify(mockedFavorites));
    fetch.mockRejectOnce(new Error('visibility could not be loaded'));


    const user = userEvent.setup();
    render(<FavoritesPage/>, {wrapper: BrowserRouter});
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
  });

  test('handles non-ok response gracefully in getListPublicity', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockedFavorites));
    fetch.mockResponseOnce(JSON.stringify({ message: 'oopsies' }), { status: 500 });

    render(<FavoritesPage/>, {wrapper: BrowserRouter});

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument(); // Assuming spinner disappears
    });

  });


  test('changing visibility to public', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockedFavorites));
    fetch.mockResponseOnce(JSON.stringify(mockVisibility));

    const user = userEvent.setup();
    render(<FavoritesPage/>, {wrapper: BrowserRouter});
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

    const visibilityButton = await screen.getByText('Change privacy status to public');
    await waitFor(() => user.click(visibilityButton));

    const updatedVisibility = await screen.getByText('Change privacy status to private');
    expect(updatedVisibility).toBeInTheDocument();
  });




  test('changing visibility response not-ok', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockedFavorites));
    fetch.mockResponseOnce(JSON.stringify(mockVisibility));

    fetch.mockResponseOnce(JSON.stringify({ message: 'Error' }), { status: 500 });

    const user = userEvent.setup();
    render(<FavoritesPage/>, {wrapper: BrowserRouter});
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

    const visibilityButton = await screen.getByText('Change privacy status to public');
    await waitFor(() => user.click(visibilityButton));


  });

  test('changing visibility fetch fails entirely', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockedFavorites));
    fetch.mockResponseOnce(JSON.stringify(mockVisibility));

    fetch.mockReject(new Error('Network failure'));


    const user = userEvent.setup();
    render(<FavoritesPage/>, {wrapper: BrowserRouter});
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

    const visibilityButton = await screen.getByText('Change privacy status to public');
    await waitFor(() => user.click(visibilityButton));


  });




});

// Additional imports may be necessary depending on your setup

describe('FavoritesPage ranking functionality', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('increases ranking successfully and refreshes favorites', async () => {
    fetch.mockResponses(
        [JSON.stringify(mockedFavorites), { status: 200 }],
        [JSON.stringify({}), { status: 200 }]
    );


    const user = userEvent.setup();
    render(<FavoritesPage />, { wrapper: BrowserRouter });


    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

    const increaseButton = await screen.getByTestId('increase-ranking-button');
    await user.click(increaseButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/moveParkUp/" + mockedFavorites[0].parkCode, expect.anything());
      expect(fetch).toHaveBeenCalledWith("/getUserFavorites", expect.anything());
    });
  });



  it('decreases ranking successfully and refreshes favorites', async () => {
    fetch.mockResponses(
        [JSON.stringify(mockedFavorites), { status: 200 }],
        [JSON.stringify({}), { status: 200 }]
    );

    const user = userEvent.setup();
    render(<FavoritesPage />, { wrapper: BrowserRouter });

    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

    const decreaseButton = await screen.getByTestId('decrease-ranking-button');
    await user.click(decreaseButton);

    await waitFor(() => {
      // Assert that the fetch was called for decreasing rank
      expect(fetch).toHaveBeenCalledWith("/moveParkDown/" + mockedFavorites[0].parkCode, expect.anything());
      // Assert that the fetch was called again to refresh the favorites
      expect(fetch).toHaveBeenCalledWith("/getUserFavorites", expect.anything());
    });
  });

  test('handles failure when increasing ranking', async () => {
    // Setup the fetch mock response
    fetch.mockResponseOnce(JSON.stringify(mockedFavorites), { status: 200 });
    fetch.mockResponseOnce(() => Promise.reject("Failed to increase rank"));

    const consoleSpy = jest.spyOn(console, 'error');

    const user = userEvent.setup();

    render(<FavoritesPage />, { wrapper: BrowserRouter });

    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

    const increaseButton = await screen.getByTestId('increase-ranking-button');
    await act(async () => {
      await user.click(increaseButton);
    });



    // Assert that console.error was called with a specific error message
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining("favorites could not be loaded"));
  });

  test('handles failure when decreasing ranking', async () => {
    // Setup the fetch mock response
    fetch.mockResponseOnce(JSON.stringify(mockedFavorites), { status: 200 });
    fetch.mockResponseOnce(() => Promise.reject("Failed to decrease rank"));

    const consoleSpy = jest.spyOn(console, 'error');

    const user = userEvent.setup();

    render(<FavoritesPage />, { wrapper: BrowserRouter });

    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

    const decreaseButton = await screen.getByTestId('decrease-ranking-button');
    await act(async () => {
      await user.click(decreaseButton);
    });



    // Assert that console.error was called with a specific error message
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining("favorites could not be loaded"));
  });

});
