import React from 'react';
import {render, fireEvent, screen, waitFor, act, getByText} from '@testing-library/react';
import SearchPage from './SearchPage';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import '@testing-library/dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

beforeAll(() => {
    fetchMock.enableMocks();
});

beforeEach(() => {
    fetch.resetMocks()

    fetch.mockResponseOnce(JSON.stringify(mockActivitiesResponse));
    fetch.mockResponseOnce(JSON.stringify(mockTopicsResponse));
    fetch.mockResponseOnce(JSON.stringify(mockAmenitiesResponse));
    fetch.mockResponseOnce(JSON.stringify(mockAllParksResponse));
});

afterEach(() => {
    window.history.pushState(null, document.title, '/');
});

const mockActivitiesResponse = [
    { "id": "09DF0950-D319-4557-A57E-04CD2F63FF42", "name": "Arts and Culture" },
    { "id": "13A57703-BB1A-41A2-94B8-53B692EB7238", "name": "Astronomy"}
]

const mockTopicsResponse = [
    {"id": "28AEAE85-9DDA-45B6-981B-1CFCDCC61E14", "name": "African American Heritage"}
]

const mockAmenitiesResponse = [
    {
        "id": "A1B0AD01-740C-41E7-8412-FBBEDD5F1443",
        "name": "ATM/Cash Machine",
        "categories": [
            "Convenience",
            "Souvenirs and Supplies"
        ]
    }
]

const mockAllParksResponse = [
    {
        "id": "77E0D7F0-1942-494A-ACE2-9004D2BDC59E",
        "url": "https://www.nps.gov/abli/index.htm",
        "fullName": "Abraham Lincoln Birthplace National Historical Park",
        "parkCode": "abli",
        "description": "For over a century people from around the world have come to rural Central Kentucky to honor the humble beginnings of our 16th president, Abraham Lincoln. His early life on Kentucky's frontier shaped his character and prepared him to lead the nation through Civil War. Visit our country's first memorial to Lincoln, built with donations from young and old, and the site of his childhood home.",
        "latitude": "37.5858662",
        "longitude": "-85.67330523",
        "latLong": "lat:37.5858662, long:-85.67330523",
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
        "relevanceScore": 1
    },
    {
        "id": "6DA17C86-088E-4B4D-B862-7C1BD5CF236B",
        "url": "https://www.nps.gov/acad/index.htm",
        "fullName": "Acadia National Park",
        "parkCode": "acad",
        "description": "Acadia National Park protects the natural beauty of the highest rocky headlands along the Atlantic coastline of the United States, an abundance of habitats, and a rich cultural heritage. At 4 million visits a year, it's one of the top 10 most-visited national parks in the United States. Visitors enjoy 27 miles of historic motor roads, 158 miles of hiking trails, and 45 miles of carriage roads.",
        "latitude": "44.409286",
        "longitude": "-68.247501",
        "latLong": "lat:44.409286, long:-68.247501",
        "activities": [
            {
                "id": "09DF0950-D319-4557-A57E-04CD2F63FF42",
                "name": "Arts and Culture"
            },
            {
                "id": "FAED7F97-3474-4C21-AB42-FB0768A2F826",
                "name": "Cultural Demonstrations"
            },
            {
                "id": "13A57703-BB1A-41A2-94B8-53B692EB7238",
                "name": "Astronomy"
            },
            {
                "id": "D37A0003-8317-4F04-8FB0-4CF0A272E195",
                "name": "Stargazing"
            },
            {
                "id": "7CE6E935-F839-4FEC-A63E-052B1DEF39D2",
                "name": "Biking"
            },
            {
                "id": "071BA73C-1D3C-46D4-A53C-00D5602F7F0E",
                "name": "Boating"
            },
            {
                "id": "A59947B7-3376-49B4-AD02-C0423E08C5F7",
                "name": "Camping"
            },
            {
                "id": "7CFF5F03-5ECC-4F5A-8572-75D1F0976C0C",
                "name": "Group Camping"
            },
            {
                "id": "B12FAAB9-713F-4B38-83E4-A273F5A43C77",
                "name": "Climbing"
            },
            {
                "id": "87D3B1CD-3903-4561-ABB1-2DD870C43F2F",
                "name": "Rock Climbing"
            },
            {
                "id": "C11D3746-5063-4BD0-B245-7178D1AD866C",
                "name": "Compass and GPS"
            },
            {
                "id": "CA3641A0-FADC-497F-B036-3FE426D0DDCC",
                "name": "Geocaching"
            },
            {
                "id": "AE42B46C-E4B7-4889-A122-08FE180371AE",
                "name": "Fishing"
            },
            {
                "id": "25FB188F-5AAD-459A-9092-28A9801709FF",
                "name": "Freshwater Fishing"
            },
            {
                "id": "9BC03FAF-28F1-4609-BF6F-643F58071AED",
                "name": "Fly Fishing"
            },
            {
                "id": "17411C8D-5769-4D0F-ABD1-52ED03840C18",
                "name": "Saltwater Fishing"
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
                "id": "3DE599E2-22ED-40BF-B383-EDA073563C1E",
                "name": "Bus/Shuttle Guided Tour"
            },
            {
                "id": "5A241412-0CFB-497A-9B5F-0AB8C03CDE72",
                "name": "Boat Tour"
            },
            {
                "id": "42FD78B9-2B90-4AA9-BC43-F10E9FEA8B5A",
                "name": "Hands-On"
            },
            {
                "id": "31F88DA6-696F-441F-89CF-D7B1415C4CB9",
                "name": "Citizen Science"
            },
            {
                "id": "BFF8C027-7C8F-480B-A5F8-CD8CE490BFBA",
                "name": "Hiking"
            },
            {
                "id": "45261C0A-00D8-4C27-A1F8-029F933A0D34",
                "name": "Front-Country Hiking"
            },
            {
                "id": "0307955A-B65C-4CE4-A780-EB36BAAADF0B",
                "name": "Horse Trekking"
            },
            {
                "id": "1886DA47-0AEC-4568-B9C2-8E9BC316AAAC",
                "name": "Horseback Riding"
            },
            {
                "id": "5FF5B286-E9C3-430E-B612-3380D8138600",
                "name": "Ice Skating"
            },
            {
                "id": "4D224BCA-C127-408B-AC75-A51563C42411",
                "name": "Paddling"
            },
            {
                "id": "21DB3AFC-8AAC-4665-BC1F-7198C0685983",
                "name": "Canoeing"
            },
            {
                "id": "F353A9ED-4A08-456E-8DEC-E61974D0FEB6",
                "name": "Kayaking"
            },
            {
                "id": "B3EF12AF-D951-419E-BD3C-6B36CBCC1E16",
                "name": "Stand Up Paddleboarding"
            },
            {
                "id": "DF4A35E0-7983-4A3E-BC47-F37B872B0F25",
                "name": "Junior Ranger Program"
            },
            {
                "id": "F9B1D433-6B86-4804-AED7-B50A519A3B7C",
                "name": "Skiing"
            },
            {
                "id": "EAB1EBDE-5B72-493F-8F8F-0EE5B1724436",
                "name": "Cross-Country Skiing"
            },
            {
                "id": "C38B3C62-1BBF-4EA1-A1A2-35DE21B74C17",
                "name": "Snow Play"
            },
            {
                "id": "7C912B83-1B1B-4807-9B66-97C12211E48E",
                "name": "Snowmobiling"
            },
            {
                "id": "01D717BC-18BB-4FE4-95BA-6B13AD702038",
                "name": "Snowshoeing"
            },
            {
                "id": "587BB2D3-EC35-41B2-B3F7-A39E2B088AEE",
                "name": "Swimming"
            },
            {
                "id": "82C3230F-6F87-452C-A01B-F8458867B26A",
                "name": "Freshwater Swimming"
            },
            {
                "id": "C2801992-F34D-4974-A0F2-80FF04309EE4",
                "name": "Saltwater Swimming"
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
                "id": "24380E3F-AD9D-4E38-BF13-C8EEB21893E7",
                "name": "Shopping"
            },
            {
                "id": "467DC8B8-0B7D-436D-A026-80A22358F615",
                "name": "Bookstore and Park Store"
            }
        ],
        "topics": [
            {
                "id": "00F3C3F9-2D67-4802-81AE-CCEA5D3BA370",
                "name": "Arts"
            },
            {
                "id": "05B7868A-3F3C-433D-876E-A886C4BE7A12",
                "name": "Painting"
            },
            {
                "id": "9BD60DC0-C82B-42BA-A170-456B7423429D",
                "name": "Photography"
            },
            {
                "id": "156AD9B6-B377-418C-BC9A-F6E682D4BAF7",
                "name": "Poetry and Literature"
            },
            {
                "id": "0DE2D6B3-46DE-44B1-BB5F-E9E8874630D5",
                "name": "Sculpture"
            },
            {
                "id": "7F12224B-217A-4B07-A4A2-636B1CE7F221",
                "name": "Colonization and Settlement"
            },
            {
                "id": "4C9D4777-A9DA-47D1-A0B9-F4A3C98BC1B3",
                "name": "Maritime"
            },
            {
                "id": "263BAC6E-4DEC-47E4-909D-DA8AD351E06E",
                "name": "Lighthouses"
            },
            {
                "id": "BEB7E470-13B2-4E00-84B2-0402D98DAF69",
                "name": "Monuments and Memorials"
            },
            {
                "id": "3CDB67A9-1EAC-408D-88EC-F26FA35E90AF",
                "name": "Schools and Education"
            },
            {
                "id": "FE2C2613-B41E-4531-BC43-03EB6E45CBCF",
                "name": "Transportation"
            },
            {
                "id": "1015393C-D7B0-47F3-86FB-786F30368CA2",
                "name": "Bridges"
            },
            {
                "id": "0BBD4A42-2B3D-4E82-B5C4-1A3874C8682E",
                "name": "Roads, Routes and Highways"
            },
            {
                "id": "A160B3D9-1603-4D89-B82F-21FCAF9EEE3B",
                "name": "Tragic Events"
            },
            {
                "id": "C373F02B-7335-4F8A-A3ED-3E2E37CD4085",
                "name": "Catastrophic Fires"
            },
            {
                "id": "7DA81DAB-5045-4953-9C20-36590AD9FA95",
                "name": "Women's History"
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
                "id": "1608649A-E7D7-4529-BD83-074C90F9FB68",
                "name": "Fish"
            },
            {
                "id": "4DC11D06-00F1-4A01-81D0-89CCCCE4FF50",
                "name": "Climate Change"
            },
            {
                "id": "04A39AB8-DD02-432F-AE5F-BA1267D41A0D",
                "name": "Fire"
            },
            {
                "id": "41B1A0A3-11FF-4F55-9CB9-034A7E28B087",
                "name": "Forests and Woodlands"
            },
            {
                "id": "F0F97E32-2F29-41B4-AF98-9FBE8DAB36B1",
                "name": "Geology"
            },
            {
                "id": "1CF1F6BB-A037-445B-8CF2-81428E50CE52",
                "name": "Lakes"
            },
            {
                "id": "101F4D51-F99D-45A6-BBB6-CD481E5FACED",
                "name": "Mountains"
            },
            {
                "id": "A7359FC4-DAD8-45F5-AF15-7FF62F816ED3",
                "name": "Night Sky"
            },
            {
                "id": "E06F3C94-AC8A-4B1C-A247-8EBA8910D5EE",
                "name": "Astronomy"
            },
            {
                "id": "0E6D8503-CB65-467F-BCD6-C6D9E28A4E0B",
                "name": "Oceans"
            },
            {
                "id": "4244F489-6813-4B7A-9D0C-20CE098C8FFF",
                "name": "Rock Landscapes and Features"
            },
            {
                "id": "5BE55D7F-BDB6-4E3D-AC35-2D8EBB974417",
                "name": "Trails"
            },
            {
                "id": "1365C347-952C-475A-B755-731DD523C195",
                "name": "Wetlands"
            }
        ],
        "states": "ME",
        "contacts": {
            "phoneNumbers": [
                {
                    "phoneNumber": "2072883338",
                    "description": "",
                    "extension": "",
                    "type": "Voice"
                },
                {
                    "phoneNumber": "2072888813",
                    "description": "",
                    "extension": "",
                    "type": "Fax"
                },
                {
                    "phoneNumber": "2072888800",
                    "description": "",
                    "extension": "",
                    "type": "TTY"
                }
            ],
            "emailAddresses": [
                {
                    "description": "",
                    "emailAddress": "acadia_information@nps.gov"
                }
            ]
        },
        "entranceFees": [
            {
                "cost": "6.00",
                "description": "Vehicle reservations are not required for any other areas of the park, or for visitors who enter the area by foot, bike, or taxi. Vehicle reservations provide a timed entry, but do not require a departure time until 10 pm, when the road closes to vehicles. Reservations do not permit re-entry. Reservations are per vehicle, not per person. Reservations do not assign a specific parking space. Parking is prohibited outside of designated spaces. Cadillac is not served by the Island Explorer bus system.",
                "title": "Timed Entry Reservation - Location"
            },
            {
                "cost": "35.00",
                "description": "Valid for seven days. Admits private, non-commercial vehicle (15 passenger capacity or less) and all occupants. This includes rental cars, RVs, and vans with fewer than 16 passengers. If the vehicle pass is purchased, no other pass is necessary.",
                "title": "Entrance - Private Vehicle"
            },
            {
                "cost": "30.00",
                "description": "Valid for seven days. Admits one or two passengers on a private, non-commercial motorcycle.",
                "title": "Entrance - Motorcycle"
            },
            {
                "cost": "20.00",
                "description": "Valid for seven days. Admits one individual with no car (bicyclist, hiker, pedestrian). Youth 15 and under are admitted free of charge.",
                "title": "Entrance - Per Person"
            },
            {
                "cost": "0.00",
                "description": "School groups and other academic institutions may qualify for an Educational Fee Waiver. If not qualified, please check fees for large or commercial groups.",
                "title": "Entrance - Education/Academic Groups"
            },
            {
                "cost": "0.00",
                "description": "Groups entering Acadia by bus, van, or other high-capacity vehicles (16 people or more) must pay an organized group entrance fee.\n\nAdults (16 years old and over): $20/per person\nYouth (15 years old and under): Free",
                "title": "Entrance - Non-commercial Groups"
            },
            {
                "cost": "0.00",
                "description": "Are you operating a business that provides leisure or recreational services while in the park? If so, it is considered a commercial group and you are required to have a Commercial Use Authorization.\n\nA commercial group is defined as consisting of one or more persons traveling on an itinerary that has been packaged, priced, or sold for leisure or recreational purposes by an organization that realizes financial gain through the provisions of the service. Learn more on our \"Do Business With Us\" page.",
                "title": "Commercial Entrance - Per Person"
            }
        ],
        "entrancePasses": [
            {
                "cost": "70.00",
                "description": "The Acadia Annual Pass is valid only at Acadia and may be purchased online or in person. You do not need an additional entrance pass if you already have a federal lands pass. It is valid for 12 months from purchase month. This pass admits the pass holder and passengers in a non-commercial vehicle.\n\nIn addition to park visitor centers and campgrounds, the Acadia Annual Pass is available at the Acadia Regional Chamber at Thompson Island, and at Bar Harbor, Ellsworth and Southwest Harbor chambers of commerce.",
                "title": "Annual Entrance - Park"
            }
        ],
        "fees": [],
        "directionsInfo": "From Boston take I-95 north to Augusta, Maine, then Route 3 east to Ellsworth, and on to Mount Desert Island. For an alternate route, continue on I-95 north to Bangor, Maine, then take I-395 to U.S. Route 1A east to Ellsworth. In Ellsworth, take Route 3 to Mount Desert Island.",
        "directionsUrl": "http://www.nps.gov/acad/planyourvisit/directions.htm",
        "operatingHours": [
            {
                "exceptions": [],
                "description": "Acadia National Park is open year-round. Check our website for park facilities operating hours, such as Hulls Cove Visitor Center.",
                "standardHours": {
                    "wednesday": "All Day",
                    "monday": "All Day",
                    "thursday": "All Day",
                    "sunday": "All Day",
                    "tuesday": "All Day",
                    "friday": "All Day",
                    "saturday": "All Day"
                },
                "name": "Acadia National Park"
            }
        ],
        "addresses": [
            {
                "postalCode": "04609",
                "city": "Bar Harbor",
                "stateCode": "ME",
                "countryCode": "US",
                "provinceTerritoryCode": "",
                "line1": "25 Visitor Center Road",
                "type": "Physical",
                "line3": "",
                "line2": "Hulls Cove Visitor Center"
            },
            {
                "postalCode": "04609",
                "city": "Bar Harbor",
                "stateCode": "ME",
                "countryCode": "US",
                "provinceTerritoryCode": "",
                "line1": "PO Box 177",
                "type": "Mailing",
                "line3": "",
                "line2": ""
            }
        ],
        "images": [
            {
                "credit": "NPS / Kristi Rugg",
                "title": "Acadia's rocky coastline",
                "altText": "Large puffy clouds dot a brilliant blue sky as wave crash against the rocky coastline of Acadia.",
                "caption": "Millions of people come to Acadia for our distinctive rocky coastline.",
                "url": "https://www.nps.gov/common/uploads/structured_data/3C7B45AE-1DD8-B71B-0B7EE131C7DFC2F5.jpg"
            },
            {
                "credit": "NPS / Kristi Rugg",
                "title": "Heavy snow-laden trees",
                "altText": "Hiking tracks carved through three feet of snow wind through a heavy snow-laden forest.",
                "caption": "During the colder months snows transform our landscape into a winter wonderland.",
                "url": "https://www.nps.gov/common/uploads/structured_data/3C7B4BEC-1DD8-B71B-0B2CF833F93140FF.jpg"
            },
            {
                "credit": "NPS / Kristi Rugg",
                "title": "Sunset atop Cadillac Mountain",
                "altText": "A brilliant sunset filled with hues of blue, red, orange, magenta, and purple highlight the sky.",
                "caption": "As the tallest point on the eastern seaboard Cadillac Mountain provides fantastic viewpoints.",
                "url": "https://www.nps.gov/common/uploads/structured_data/3C7B477B-1DD8-B71B-0BCB48E009241BAA.jpg"
            },
            {
                "credit": "NPS / Kristi Rugg",
                "title": "Climbing The Precipice",
                "altText": "Two hikers ascend a sheer cliff trail by way of historic iron rung ladders.",
                "caption": "Whether it's a stroll along Ocean Path or a difficult ascent up The Precipice, there are hiking trails for everyone!",
                "url": "https://www.nps.gov/common/uploads/structured_data/3C7B48F9-1DD8-B71B-0BD3B413E58978F8.jpg"
            }
        ],
        "weatherInfo": "Located on Mount Desert Island in Maine, Acadia experiences all four seasons. Summer temperatures range from 45-90F (7-30C). Fall temperatures range from 30-70F (-1-21C). Typically the first frost is in mid-October and first snowfall begins in November and can continue through April with an average accumulation of 73 inches (185 cm). Winter temperatures range from 14-35F (-10 - 2C). Spring temperatures range from 30-70F (-1-21C).",
        "name": "Acadia",
        "designation": "National Park",
        "relevanceScore": 1
    }
]


test('renders search options', async () => {
    const user = userEvent.setup();
    render(<SearchPage/>, {wrapper: BrowserRouter});
    const searchByTextElement = await screen.getByText('Search By:');
    expect(searchByTextElement).toBeInTheDocument();
});


test('renders state selection when state search type is selected', async () => {
    const user = userEvent.setup();
    render(<SearchPage/>, {wrapper: BrowserRouter});
    const input = await screen.getByText('State');

    act(() => {
        fireEvent.click(input);
    });

    const spinner = await screen.getByText('Select a state');
    expect(spinner).toBeInTheDocument();
});

test('renders activity selection when activity search type is selected', async () => {
    const user = userEvent.setup();
    render(<SearchPage/>, {wrapper: BrowserRouter});
    const input = await screen.getByText('Activity');

    act(() => {
        fireEvent.click(input);
    });

    const spinner = await screen.getByTestId('activitySelection');
    expect(spinner).toBeInTheDocument();
});


test('renders name input when name search type is selected', async () => {
    const user = userEvent.setup();
    render(<SearchPage/>, {wrapper: BrowserRouter});
    const input = await screen.getByText('Name');

    act(() => {
        fireEvent.click(input);
    });

    const textArea = screen.getByTestId('nameSelection');
    expect(textArea).toBeInTheDocument();
});

test('renders topic selection when topic search type is selected', async () => {
    const user = userEvent.setup();
    render(<SearchPage/>, {wrapper: BrowserRouter});
    const input = screen.getByText('Topic');

    act(() => {
        fireEvent.click(input);
    });

    const spinner = await screen.getByTestId('topicSelection');
    expect(spinner).toBeInTheDocument();
});

test('activities rendered into spinner', async () => {
    const user = userEvent.setup();
    render(<SearchPage/>, {wrapper: BrowserRouter});

    const input = screen.getByText('Activity');
    await waitFor(() => user.click(input));

    const activitySpinner = await screen.getByTestId('activitySelection');
    const allActivityOptions = Array.from(activitySpinner.options).map(option => option.value);
    expect(allActivityOptions).toStrictEqual(['','09DF0950-D319-4557-A57E-04CD2F63FF42', '13A57703-BB1A-41A2-94B8-53B692EB7238'])
});

test('topics rendered into spinner', async () => {
    const user = userEvent.setup();
    render(<SearchPage/>, {wrapper: BrowserRouter});

    const input = screen.getByText('Topic');
    await waitFor(() => user.click(input));

    const topicSpinner = await screen.getByTestId('topicSelection');
    const allTopicOptions = Array.from(topicSpinner.options).map(option => option.value);
    expect(allTopicOptions).toStrictEqual(['','28AEAE85-9DDA-45B6-981B-1CFCDCC61E14'])
});

test('states rendered into spinner', async () => {
    const user = userEvent.setup();
    render(<SearchPage/>, {wrapper: BrowserRouter});

    const input = screen.getByText('State');
    await waitFor(() => user.click(input));

    const stateSpinner = await screen.getByTestId('stateSelection');
    const allStateOptions = Array.from(stateSpinner.options).map(option => option.value);
    expect(allStateOptions).toEqual(expect.arrayContaining(['ME', 'KY']));
});

test('amenities rendered into spinner', async () => {
    const user = userEvent.setup();
    render(<SearchPage/>, {wrapper: BrowserRouter});

    const input = screen.getByText('Amenity');
    await waitFor(() => user.click(input));

    const amenitySpinner = await screen.getByTestId('amenitySelection');
    const allAmenityOptions = Array.from(amenitySpinner.options).map(option => option.value);
    expect(allAmenityOptions).toEqual(expect.arrayContaining(['A1B0AD01-740C-41E7-8412-FBBEDD5F1443']));
});

const mockActivitiesSearch = [
    {
        "id": "6DA17C86-088E-4B4D-B862-7C1BD5CF236B",
        "url": "https://www.nps.gov/acad/index.htm",
        "fullName": "Acadia National Park",
        "parkCode": "acad",
        "description": "Acadia National Park protects the natural beauty of the highest rocky headlands along the Atlantic coastline of the United States, an abundance of habitats, and a rich cultural heritage. At 4 million visits a year, it's one of the top 10 most-visited national parks in the United States. Visitors enjoy 27 miles of historic motor roads, 158 miles of hiking trails, and 45 miles of carriage roads.",
        "latitude": "44.409286",
        "longitude": "-68.247501",
        "latLong": "lat:44.409286, long:-68.247501",
        "activities": [
            {
                "id": "09DF0950-D319-4557-A57E-04CD2F63FF42",
                "name": "Arts and Culture"
            },
            {
                "id": "FAED7F97-3474-4C21-AB42-FB0768A2F826",
                "name": "Cultural Demonstrations"
            },
            {
                "id": "13A57703-BB1A-41A2-94B8-53B692EB7238",
                "name": "Astronomy"
            },
            {
                "id": "D37A0003-8317-4F04-8FB0-4CF0A272E195",
                "name": "Stargazing"
            },
            {
                "id": "7CE6E935-F839-4FEC-A63E-052B1DEF39D2",
                "name": "Biking"
            },
            {
                "id": "071BA73C-1D3C-46D4-A53C-00D5602F7F0E",
                "name": "Boating"
            },
            {
                "id": "A59947B7-3376-49B4-AD02-C0423E08C5F7",
                "name": "Camping"
            },
            {
                "id": "7CFF5F03-5ECC-4F5A-8572-75D1F0976C0C",
                "name": "Group Camping"
            },
            {
                "id": "B12FAAB9-713F-4B38-83E4-A273F5A43C77",
                "name": "Climbing"
            },
            {
                "id": "87D3B1CD-3903-4561-ABB1-2DD870C43F2F",
                "name": "Rock Climbing"
            },
            {
                "id": "C11D3746-5063-4BD0-B245-7178D1AD866C",
                "name": "Compass and GPS"
            },
            {
                "id": "CA3641A0-FADC-497F-B036-3FE426D0DDCC",
                "name": "Geocaching"
            },
            {
                "id": "AE42B46C-E4B7-4889-A122-08FE180371AE",
                "name": "Fishing"
            },
            {
                "id": "25FB188F-5AAD-459A-9092-28A9801709FF",
                "name": "Freshwater Fishing"
            },
            {
                "id": "9BC03FAF-28F1-4609-BF6F-643F58071AED",
                "name": "Fly Fishing"
            },
            {
                "id": "17411C8D-5769-4D0F-ABD1-52ED03840C18",
                "name": "Saltwater Fishing"
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
                "id": "3DE599E2-22ED-40BF-B383-EDA073563C1E",
                "name": "Bus/Shuttle Guided Tour"
            },
            {
                "id": "5A241412-0CFB-497A-9B5F-0AB8C03CDE72",
                "name": "Boat Tour"
            },
            {
                "id": "42FD78B9-2B90-4AA9-BC43-F10E9FEA8B5A",
                "name": "Hands-On"
            },
            {
                "id": "31F88DA6-696F-441F-89CF-D7B1415C4CB9",
                "name": "Citizen Science"
            },
            {
                "id": "BFF8C027-7C8F-480B-A5F8-CD8CE490BFBA",
                "name": "Hiking"
            },
            {
                "id": "45261C0A-00D8-4C27-A1F8-029F933A0D34",
                "name": "Front-Country Hiking"
            },
            {
                "id": "0307955A-B65C-4CE4-A780-EB36BAAADF0B",
                "name": "Horse Trekking"
            },
            {
                "id": "1886DA47-0AEC-4568-B9C2-8E9BC316AAAC",
                "name": "Horseback Riding"
            },
            {
                "id": "5FF5B286-E9C3-430E-B612-3380D8138600",
                "name": "Ice Skating"
            },
            {
                "id": "4D224BCA-C127-408B-AC75-A51563C42411",
                "name": "Paddling"
            },
            {
                "id": "21DB3AFC-8AAC-4665-BC1F-7198C0685983",
                "name": "Canoeing"
            },
            {
                "id": "F353A9ED-4A08-456E-8DEC-E61974D0FEB6",
                "name": "Kayaking"
            },
            {
                "id": "B3EF12AF-D951-419E-BD3C-6B36CBCC1E16",
                "name": "Stand Up Paddleboarding"
            },
            {
                "id": "DF4A35E0-7983-4A3E-BC47-F37B872B0F25",
                "name": "Junior Ranger Program"
            },
            {
                "id": "F9B1D433-6B86-4804-AED7-B50A519A3B7C",
                "name": "Skiing"
            },
            {
                "id": "EAB1EBDE-5B72-493F-8F8F-0EE5B1724436",
                "name": "Cross-Country Skiing"
            },
            {
                "id": "C38B3C62-1BBF-4EA1-A1A2-35DE21B74C17",
                "name": "Snow Play"
            },
            {
                "id": "7C912B83-1B1B-4807-9B66-97C12211E48E",
                "name": "Snowmobiling"
            },
            {
                "id": "01D717BC-18BB-4FE4-95BA-6B13AD702038",
                "name": "Snowshoeing"
            },
            {
                "id": "587BB2D3-EC35-41B2-B3F7-A39E2B088AEE",
                "name": "Swimming"
            },
            {
                "id": "82C3230F-6F87-452C-A01B-F8458867B26A",
                "name": "Freshwater Swimming"
            },
            {
                "id": "C2801992-F34D-4974-A0F2-80FF04309EE4",
                "name": "Saltwater Swimming"
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
                "id": "24380E3F-AD9D-4E38-BF13-C8EEB21893E7",
                "name": "Shopping"
            },
            {
                "id": "467DC8B8-0B7D-436D-A026-80A22358F615",
                "name": "Bookstore and Park Store"
            }
        ],
        "topics": [
            {
                "id": "00F3C3F9-2D67-4802-81AE-CCEA5D3BA370",
                "name": "Arts"
            },
            {
                "id": "05B7868A-3F3C-433D-876E-A886C4BE7A12",
                "name": "Painting"
            },
            {
                "id": "9BD60DC0-C82B-42BA-A170-456B7423429D",
                "name": "Photography"
            },
            {
                "id": "156AD9B6-B377-418C-BC9A-F6E682D4BAF7",
                "name": "Poetry and Literature"
            },
            {
                "id": "0DE2D6B3-46DE-44B1-BB5F-E9E8874630D5",
                "name": "Sculpture"
            },
            {
                "id": "7F12224B-217A-4B07-A4A2-636B1CE7F221",
                "name": "Colonization and Settlement"
            },
            {
                "id": "4C9D4777-A9DA-47D1-A0B9-F4A3C98BC1B3",
                "name": "Maritime"
            },
            {
                "id": "263BAC6E-4DEC-47E4-909D-DA8AD351E06E",
                "name": "Lighthouses"
            },
            {
                "id": "BEB7E470-13B2-4E00-84B2-0402D98DAF69",
                "name": "Monuments and Memorials"
            },
            {
                "id": "3CDB67A9-1EAC-408D-88EC-F26FA35E90AF",
                "name": "Schools and Education"
            },
            {
                "id": "FE2C2613-B41E-4531-BC43-03EB6E45CBCF",
                "name": "Transportation"
            },
            {
                "id": "1015393C-D7B0-47F3-86FB-786F30368CA2",
                "name": "Bridges"
            },
            {
                "id": "0BBD4A42-2B3D-4E82-B5C4-1A3874C8682E",
                "name": "Roads, Routes and Highways"
            },
            {
                "id": "A160B3D9-1603-4D89-B82F-21FCAF9EEE3B",
                "name": "Tragic Events"
            },
            {
                "id": "C373F02B-7335-4F8A-A3ED-3E2E37CD4085",
                "name": "Catastrophic Fires"
            },
            {
                "id": "7DA81DAB-5045-4953-9C20-36590AD9FA95",
                "name": "Women's History"
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
                "id": "1608649A-E7D7-4529-BD83-074C90F9FB68",
                "name": "Fish"
            },
            {
                "id": "4DC11D06-00F1-4A01-81D0-89CCCCE4FF50",
                "name": "Climate Change"
            },
            {
                "id": "04A39AB8-DD02-432F-AE5F-BA1267D41A0D",
                "name": "Fire"
            },
            {
                "id": "41B1A0A3-11FF-4F55-9CB9-034A7E28B087",
                "name": "Forests and Woodlands"
            },
            {
                "id": "F0F97E32-2F29-41B4-AF98-9FBE8DAB36B1",
                "name": "Geology"
            },
            {
                "id": "1CF1F6BB-A037-445B-8CF2-81428E50CE52",
                "name": "Lakes"
            },
            {
                "id": "101F4D51-F99D-45A6-BBB6-CD481E5FACED",
                "name": "Mountains"
            },
            {
                "id": "A7359FC4-DAD8-45F5-AF15-7FF62F816ED3",
                "name": "Night Sky"
            },
            {
                "id": "E06F3C94-AC8A-4B1C-A247-8EBA8910D5EE",
                "name": "Astronomy"
            },
            {
                "id": "0E6D8503-CB65-467F-BCD6-C6D9E28A4E0B",
                "name": "Oceans"
            },
            {
                "id": "4244F489-6813-4B7A-9D0C-20CE098C8FFF",
                "name": "Rock Landscapes and Features"
            },
            {
                "id": "5BE55D7F-BDB6-4E3D-AC35-2D8EBB974417",
                "name": "Trails"
            },
            {
                "id": "1365C347-952C-475A-B755-731DD523C195",
                "name": "Wetlands"
            }
        ],
        "states": "ME",
        "contacts": {
            "phoneNumbers": [
                {
                    "phoneNumber": "2072883338",
                    "description": "",
                    "extension": "",
                    "type": "Voice"
                },
                {
                    "phoneNumber": "2072888813",
                    "description": "",
                    "extension": "",
                    "type": "Fax"
                },
                {
                    "phoneNumber": "2072888800",
                    "description": "",
                    "extension": "",
                    "type": "TTY"
                }
            ],
            "emailAddresses": [
                {
                    "description": "",
                    "emailAddress": "acadia_information@nps.gov"
                }
            ]
        },
        "entranceFees": [
            {
                "cost": "6.00",
                "description": "Vehicle reservations are not required for any other areas of the park, or for visitors who enter the area by foot, bike, or taxi. Vehicle reservations provide a timed entry, but do not require a departure time until 10 pm, when the road closes to vehicles. Reservations do not permit re-entry. Reservations are per vehicle, not per person. Reservations do not assign a specific parking space. Parking is prohibited outside of designated spaces. Cadillac is not served by the Island Explorer bus system.",
                "title": "Timed Entry Reservation - Location"
            },
            {
                "cost": "35.00",
                "description": "Valid for seven days. Admits private, non-commercial vehicle (15 passenger capacity or less) and all occupants. This includes rental cars, RVs, and vans with fewer than 16 passengers. If the vehicle pass is purchased, no other pass is necessary.",
                "title": "Entrance - Private Vehicle"
            },
            {
                "cost": "30.00",
                "description": "Valid for seven days. Admits one or two passengers on a private, non-commercial motorcycle.",
                "title": "Entrance - Motorcycle"
            },
            {
                "cost": "20.00",
                "description": "Valid for seven days. Admits one individual with no car (bicyclist, hiker, pedestrian). Youth 15 and under are admitted free of charge.",
                "title": "Entrance - Per Person"
            },
            {
                "cost": "0.00",
                "description": "School groups and other academic institutions may qualify for an Educational Fee Waiver. If not qualified, please check fees for large or commercial groups.",
                "title": "Entrance - Education/Academic Groups"
            },
            {
                "cost": "0.00",
                "description": "Groups entering Acadia by bus, van, or other high-capacity vehicles (16 people or more) must pay an organized group entrance fee.\n\nAdults (16 years old and over): $20/per person\nYouth (15 years old and under): Free",
                "title": "Entrance - Non-commercial Groups"
            },
            {
                "cost": "0.00",
                "description": "Are you operating a business that provides leisure or recreational services while in the park? If so, it is considered a commercial group and you are required to have a Commercial Use Authorization.\n\nA commercial group is defined as consisting of one or more persons traveling on an itinerary that has been packaged, priced, or sold for leisure or recreational purposes by an organization that realizes financial gain through the provisions of the service. Learn more on our \"Do Business With Us\" page.",
                "title": "Commercial Entrance - Per Person"
            }
        ],
        "entrancePasses": [
            {
                "cost": "70.00",
                "description": "The Acadia Annual Pass is valid only at Acadia and may be purchased online or in person. You do not need an additional entrance pass if you already have a federal lands pass. It is valid for 12 months from purchase month. This pass admits the pass holder and passengers in a non-commercial vehicle.\n\nIn addition to park visitor centers and campgrounds, the Acadia Annual Pass is available at the Acadia Regional Chamber at Thompson Island, and at Bar Harbor, Ellsworth and Southwest Harbor chambers of commerce.",
                "title": "Annual Entrance - Park"
            }
        ],
        "fees": [],
        "directionsInfo": "From Boston take I-95 north to Augusta, Maine, then Route 3 east to Ellsworth, and on to Mount Desert Island. For an alternate route, continue on I-95 north to Bangor, Maine, then take I-395 to U.S. Route 1A east to Ellsworth. In Ellsworth, take Route 3 to Mount Desert Island.",
        "directionsUrl": "http://www.nps.gov/acad/planyourvisit/directions.htm",
        "operatingHours": [
            {
                "exceptions": [],
                "description": "Acadia National Park is open year-round. Check our website for park facilities operating hours, such as Hulls Cove Visitor Center.",
                "standardHours": {
                    "wednesday": "All Day",
                    "monday": "All Day",
                    "thursday": "All Day",
                    "sunday": "All Day",
                    "tuesday": "All Day",
                    "friday": "All Day",
                    "saturday": "All Day"
                },
                "name": "Acadia National Park"
            }
        ],
        "addresses": [
            {
                "postalCode": "04609",
                "city": "Bar Harbor",
                "stateCode": "ME",
                "countryCode": "US",
                "provinceTerritoryCode": "",
                "line1": "25 Visitor Center Road",
                "type": "Physical",
                "line3": "",
                "line2": "Hulls Cove Visitor Center"
            },
            {
                "postalCode": "04609",
                "city": "Bar Harbor",
                "stateCode": "ME",
                "countryCode": "US",
                "provinceTerritoryCode": "",
                "line1": "PO Box 177",
                "type": "Mailing",
                "line3": "",
                "line2": ""
            }
        ],
        "images": [
            {
                "credit": "NPS / Kristi Rugg",
                "title": "Acadia's rocky coastline",
                "altText": "Large puffy clouds dot a brilliant blue sky as wave crash against the rocky coastline of Acadia.",
                "caption": "Millions of people come to Acadia for our distinctive rocky coastline.",
                "url": "https://www.nps.gov/common/uploads/structured_data/3C7B45AE-1DD8-B71B-0B7EE131C7DFC2F5.jpg"
            },
            {
                "credit": "NPS / Kristi Rugg",
                "title": "Heavy snow-laden trees",
                "altText": "Hiking tracks carved through three feet of snow wind through a heavy snow-laden forest.",
                "caption": "During the colder months snows transform our landscape into a winter wonderland.",
                "url": "https://www.nps.gov/common/uploads/structured_data/3C7B4BEC-1DD8-B71B-0B2CF833F93140FF.jpg"
            },
            {
                "credit": "NPS / Kristi Rugg",
                "title": "Sunset atop Cadillac Mountain",
                "altText": "A brilliant sunset filled with hues of blue, red, orange, magenta, and purple highlight the sky.",
                "caption": "As the tallest point on the eastern seaboard Cadillac Mountain provides fantastic viewpoints.",
                "url": "https://www.nps.gov/common/uploads/structured_data/3C7B477B-1DD8-B71B-0BCB48E009241BAA.jpg"
            },
            {
                "credit": "NPS / Kristi Rugg",
                "title": "Climbing The Precipice",
                "altText": "Two hikers ascend a sheer cliff trail by way of historic iron rung ladders.",
                "caption": "Whether it's a stroll along Ocean Path or a difficult ascent up The Precipice, there are hiking trails for everyone!",
                "url": "https://www.nps.gov/common/uploads/structured_data/3C7B48F9-1DD8-B71B-0BD3B413E58978F8.jpg"
            }
        ],
        "weatherInfo": "Located on Mount Desert Island in Maine, Acadia experiences all four seasons. Summer temperatures range from 45-90F (7-30C). Fall temperatures range from 30-70F (-1-21C). Typically the first frost is in mid-October and first snowfall begins in November and can continue through April with an average accumulation of 73 inches (185 cm). Winter temperatures range from 14-35F (-10 - 2C). Spring temperatures range from 30-70F (-1-21C).",
        "name": "Acadia",
        "designation": "National Park",
        "relevanceScore": 1
    }
]

test('search by activity renders parks', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockActivitiesSearch));

    const user = userEvent.setup();
    render(<SearchPage/>, {wrapper: BrowserRouter});

    const input = screen.getByText('Activity');
    await waitFor(() => user.click(input));

    const activitySpinner = await screen.getByTestId('activitySelection');

    await waitFor(() => user.selectOptions(activitySpinner, ['09DF0950-D319-4557-A57E-04CD2F63FF42']));
    const searchButton = await screen.getByText('Search');
    await waitFor(() => user.click(searchButton));

    const firstPark = await screen.getByText('Acadia National Park');
    expect(firstPark).toBeInTheDocument();
});

const mockTopicsSearch = [
    {
        "id": "1A47416F-DAA3-4137-9F30-14AF86B4E547",
        "url": "https://www.nps.gov/afam/index.htm",
        "fullName": "African American Civil War Memorial",
        "parkCode": "afam",
        "description": "Over 200,000 African-American soldiers and sailors served in the U.S. Army and Navy during the Civil War. Their service helped to end the war and free over four million slaves. The African American Civil War Memorial honors their service and sacrifice.",
        "latitude": "38.9166",
        "longitude": "-77.026",
        "latLong": "lat:38.9166, long:-77.026",
        "activities": [
            {
                "id": "B33DC9B6-0B7D-4322-BAD7-A13A34C584A3",
                "name": "Guided Tours"
            },
            {
                "id": "A0631906-9672-4583-91DE-113B93DB6B6E",
                "name": "Self-Guided Tours - Walking"
            }
        ],
        "topics": [
            {
                "id": "28AEAE85-9DDA-45B6-981B-1CFCDCC61E14",
                "name": "African American Heritage"
            },
            {
                "id": "BEB7E470-13B2-4E00-84B2-0402D98DAF69",
                "name": "Monuments and Memorials"
            },
            {
                "id": "27BF8807-54EA-4A3D-B073-AA7AA361CD7E",
                "name": "Wars and Conflicts"
            },
            {
                "id": "A8E54356-20CD-490E-B34D-AC6A430E6F47",
                "name": "Civil War"
            }
        ],
        "states": "DC",
        "contacts": {
            "phoneNumbers": [
                {
                    "phoneNumber": "2024266841",
                    "description": "",
                    "extension": "",
                    "type": "Voice"
                }
            ],
            "emailAddresses": [
                {
                    "description": "",
                    "emailAddress": "national_mall@nps.gov"
                }
            ]
        },
        "entranceFees": [],
        "entrancePasses": [],
        "fees": [],
        "directionsInfo": "The memorial is located at the corner of Vermont Avenue, 10th St, and U Street NW, near the U Street/African-American Civil War Memorial/Cardozo Metro Station.",
        "directionsUrl": "http://www.nps.gov/afam/planyourvisit/directions.htm",
        "operatingHours": [
            {
                "exceptions": [],
                "description": "The African American Civil War Memorial is always open to the public.  There are no Rangers on duty at this site (except for special events). The United States Park Police are on duty 24 hours a day.",
                "standardHours": {
                    "wednesday": "All Day",
                    "monday": "All Day",
                    "thursday": "All Day",
                    "sunday": "All Day",
                    "tuesday": "All Day",
                    "friday": "All Day",
                    "saturday": "All Day"
                },
                "name": "Always Open"
            }
        ],
        "addresses": [
            {
                "postalCode": "20001",
                "city": "Washington",
                "stateCode": "DC",
                "countryCode": "US",
                "provinceTerritoryCode": "",
                "line1": "1925 Vermont Avenue Northwest",
                "type": "Physical",
                "line3": "",
                "line2": ""
            },
            {
                "postalCode": "20242",
                "city": "Washington",
                "stateCode": "DC",
                "countryCode": "US",
                "provinceTerritoryCode": "",
                "line1": "1100 Ohio Drive SW",
                "type": "Mailing",
                "line3": "",
                "line2": ""
            }
        ],
        "images": [
            {
                "credit": "NPS Photo",
                "title": "African American Civil War Statue",
                "altText": "Site Statue",
                "caption": "A poignant reminder of our nations past",
                "url": "https://www.nps.gov/common/uploads/structured_data/3C816B50-1DD8-B71B-0BF380049FB6B6A2.jpg"
            },
            {
                "credit": "NPS Photo",
                "title": "African American Sailor",
                "altText": "African American Sailor Close up",
                "caption": "African American Civil War Sailor",
                "url": "https://www.nps.gov/common/uploads/structured_data/3C816C97-1DD8-B71B-0B7B2A0DD09C870A.jpg"
            },
            {
                "credit": "NPS Photo",
                "title": "African American Soldier",
                "altText": "African American Soldier Close up",
                "caption": "African American Civil War Soldier",
                "url": "https://www.nps.gov/common/uploads/structured_data/3C816DF6-1DD8-B71B-0B5D792777650EA4.jpg"
            },
            {
                "credit": "NPS / Liz Macro",
                "title": "African American Civil War Memorial",
                "altText": "Bronze statue of African American Civil War soldiers.",
                "caption": "African American Civil War Memorial",
                "url": "https://www.nps.gov/common/uploads/structured_data/1DA05382-E7D7-BD05-0A4A7ED42138D49D.jpg"
            },
            {
                "credit": "NPS / Liz Macro",
                "title": "African American Civil War Memorial",
                "altText": "Bronze statue of African American Civil War soldier.",
                "caption": "African American Civil War Memorial",
                "url": "https://www.nps.gov/common/uploads/structured_data/1E29A16A-C551-66A4-9DABCD61403D61C7.jpg"
            }
        ],
        "weatherInfo": "Washington DC gets to see all four seasons. Humidity will make the temps feel hotter in summer and colder in winter. Spring (March - May) Temp: Average high is 65.5 degrees with a low of 46.5 degrees Summer (June - August) Temp: Average high is 86 degrees with a low of 68.5 degrees Fall (September - November) Temp: Average high is 68 degrees with a low of 51.5 degrees Winter (December - February) Temp: Average high is 45 degrees with a low of 30 degrees (Source: www.usclimatedata.com)",
        "name": "African American Civil War Memorial",
        "designation": "",
        "relevanceScore": 1
    }
]

test('search by topic renders parks', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockTopicsSearch));

    const user = userEvent.setup();
    render(<SearchPage/>, {wrapper: BrowserRouter});

    const input = screen.getByText('Topic');
    await waitFor(() => user.click(input));

    const topicSpinner = await screen.getByTestId('topicSelection');

    await waitFor(() => user.selectOptions(topicSpinner, ['28AEAE85-9DDA-45B6-981B-1CFCDCC61E14']));
    const searchButton = await screen.getByText('Search');
    await waitFor(() => user.click(searchButton));

    const firstPark = await screen.getByText('African American Civil War Memorial');
    expect(firstPark).toBeInTheDocument();
});

const mockAmenitiesSearch = [
    {
        "id": "B170CCF7-7AB9-48FF-950E-31815FD4DBB2",
        "url": "https://www.nps.gov/badl/index.htm",
        "fullName": "Badlands National Park",
        "parkCode": "badl",
        "description": "The rugged beauty of the Badlands draws visitors from around the world. These striking geologic deposits contain one of the world’s richest fossil beds. Ancient horses and rhinos once roamed here. The park’s 244,000 acres protect an expanse of mixed-grass prairie where bison, bighorn sheep, prairie dogs, and black-footed ferrets live today.",
        "latitude": "43.68584846",
        "longitude": "-102.482942",
        "latLong": "lat:43.68584846, long:-102.482942",
        "activities": [
            {
                "id": "5F723BAD-7359-48FC-98FA-631592256E35",
                "name": "Auto and ATV"
            },
            {
                "id": "0B4A5320-216D-451A-9990-626E1D5ACE28",
                "name": "Scenic Driving"
            },
            {
                "id": "13A57703-BB1A-41A2-94B8-53B692EB7238",
                "name": "Astronomy"
            },
            {
                "id": "7CE6E935-F839-4FEC-A63E-052B1DEF39D2",
                "name": "Biking"
            },
            {
                "id": "A59947B7-3376-49B4-AD02-C0423E08C5F7",
                "name": "Camping"
            },
            {
                "id": "4A58AF13-E8FB-4530-B41A-97DF0B0C77B7",
                "name": "Backcountry Camping"
            },
            {
                "id": "9159DF0F-951D-4AAE-9987-CEB3CE2A9ADA",
                "name": "Car or Front Country Camping"
            },
            {
                "id": "80229F2D-972E-40A8-8860-232551CC30D6",
                "name": "Horse Camping (see also Horse/Stock Use)"
            },
            {
                "id": "C11D3746-5063-4BD0-B245-7178D1AD866C",
                "name": "Compass and GPS"
            },
            {
                "id": "1DFACD97-1B9C-4F5A-80F2-05593604799E",
                "name": "Food"
            },
            {
                "id": "BFF8C027-7C8F-480B-A5F8-CD8CE490BFBA",
                "name": "Hiking"
            },
            {
                "id": "0307955A-B65C-4CE4-A780-EB36BAAADF0B",
                "name": "Horse Trekking"
            },
            {
                "id": "788C7572-5425-49EF-A0BF-5A0DF93F7542",
                "name": "Horse Camping (see also camping)"
            },
            {
                "id": "1886DA47-0AEC-4568-B9C2-8E9BC316AAAC",
                "name": "Horseback Riding"
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
                "id": "7F81A0CB-B91F-4896-B9A5-41BE9A54A27B",
                "name": "Archeology"
            },
            {
                "id": "00F3C3F9-2D67-4802-81AE-CCEA5D3BA370",
                "name": "Arts"
            },
            {
                "id": "7F12224B-217A-4B07-A4A2-636B1CE7F221",
                "name": "Colonization and Settlement"
            },
            {
                "id": "1F833C99-A75D-4F9E-9256-B96523485466",
                "name": "Farming and  Agriculture"
            },
            {
                "id": "3B0D607D-9933-425A-BFA0-21529AC4734C",
                "name": "Military"
            },
            {
                "id": "6766B838-9493-4EF8-830E-2D1EFB917461",
                "name": "Indigenous and Native Warrior"
            },
            {
                "id": "BEB7E470-13B2-4E00-84B2-0402D98DAF69",
                "name": "Monuments and Memorials"
            },
            {
                "id": "A1BAF33E-EA84-4608-A888-4CEE9541F027",
                "name": "Native American Heritage"
            },
            {
                "id": "FE2C2613-B41E-4531-BC43-03EB6E45CBCF",
                "name": "Transportation"
            },
            {
                "id": "A160B3D9-1603-4D89-B82F-21FCAF9EEE3B",
                "name": "Tragic Events"
            },
            {
                "id": "CB405E14-E2A3-4C2E-A91C-AFF8AEB3DEA0",
                "name": "Massacres"
            },
            {
                "id": "27BF8807-54EA-4A3D-B073-AA7AA361CD7E",
                "name": "Wars and Conflicts"
            },
            {
                "id": "53798A16-7CDB-4F17-9C28-095F92D2ED8D",
                "name": "Indian and Frontier Wars"
            },
            {
                "id": "C9C749E3-39C3-45F7-BCC5-9A609E30AA05",
                "name": "Westward Expansion"
            },
            {
                "id": "D1722DD1-E314-4B6D-8116-DED86305C4A4",
                "name": "Homesteading"
            },
            {
                "id": "FB3641FE-67A3-4EC7-B9C4-0A0867776798",
                "name": "Ancient Seas"
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
                "id": "324C31EC-7D75-41C7-AA28-EF8ACB5B6BF5",
                "name": "Bison"
            },
            {
                "id": "2539614A-9646-446E-8251-34D3AAE068FA",
                "name": "Cats (wild)"
            },
            {
                "id": "EC707104-66CB-466F-90F8-76264F3BE578",
                "name": "Horses (wild)"
            },
            {
                "id": "393F60FB-80D6-46F7-B0FB-BBF3C90F59FD",
                "name": "Tortoises and Turtles"
            },
            {
                "id": "4DC11D06-00F1-4A01-81D0-89CCCCE4FF50",
                "name": "Climate Change"
            },
            {
                "id": "04A39AB8-DD02-432F-AE5F-BA1267D41A0D",
                "name": "Fire"
            },
            {
                "id": "F6D3A52E-608F-47D6-96DF-1FD64122A2FC",
                "name": "Fossils and Paleontology"
            },
            {
                "id": "F0F97E32-2F29-41B4-AF98-9FBE8DAB36B1",
                "name": "Geology"
            },
            {
                "id": "94262026-92F5-48E9-90EF-01CEAEFBA4FF",
                "name": "Grasslands"
            },
            {
                "id": "1AEDC86F-5792-487F-8CDF-9E92CAB97ACE",
                "name": "Prairies"
            },
            {
                "id": "A7359FC4-DAD8-45F5-AF15-7FF62F816ED3",
                "name": "Night Sky"
            },
            {
                "id": "E06F3C94-AC8A-4B1C-A247-8EBA8910D5EE",
                "name": "Astronomy"
            },
            {
                "id": "4244F489-6813-4B7A-9D0C-20CE098C8FFF",
                "name": "Rock Landscapes and Features"
            },
            {
                "id": "9C9FCBB6-360B-4743-8155-6F9341CBE01B",
                "name": "Scenic Views"
            },
            {
                "id": "5BE55D7F-BDB6-4E3D-AC35-2D8EBB974417",
                "name": "Trails"
            },
            {
                "id": "78E4F4AC-AF97-435A-8C2C-7FB8D67516ED",
                "name": "Unique Species"
            },
            {
                "id": "489D6333-FD72-44DF-83B0-3D4412DD0A75",
                "name": "Endangered"
            },
            {
                "id": "B85866E2-0897-4000-9040-605CA335804F",
                "name": "Wilderness"
            }
        ],
        "states": "SD",
        "contacts": {
            "phoneNumbers": [
                {
                    "phoneNumber": "6054335361",
                    "description": "",
                    "extension": "",
                    "type": "Voice"
                }
            ],
            "emailAddresses": [
                {
                    "description": "",
                    "emailAddress": "badl_information@nps.gov"
                }
            ]
        },
        "entranceFees": [
            {
                "cost": "30.00",
                "description": "Fee covers the entry of a private vehicle and its occupants for 7 days",
                "title": "Entrance - Private Vehicle"
            },
            {
                "cost": "25.00",
                "description": "Fee covers the entry of a motorcycle and its occupants for 7 days",
                "title": "Entrance - Motorcycle"
            },
            {
                "cost": "15.00",
                "description": "Fee covers the entry of an individual that is hiking, bicycling, etc... for 7 days",
                "title": "Entrance - Per Person"
            },
            {
                "cost": "25.00",
                "description": "Commercial sedan, 1 to 6 passenger capacity. $25 plus $15 per person - 7 days for Original Manifest",
                "title": "Commercial Entrance - Sedan"
            },
            {
                "cost": "50.00",
                "description": "Commercial van, 7 to 15 passenger capacity; $50 - 7 days for Original Manifest",
                "title": "Commercial Entrance - Van"
            },
            {
                "cost": "60.00",
                "description": "Minibus, 16 to 25 passenger capacity; $60 - 7 days for Original Manifest",
                "title": "Commercial Entrance - Mini-bus"
            },
            {
                "cost": "150.00",
                "description": "Motorcoach, 26 or more passenger capacity; $150 - 7 days for Original Manifest",
                "title": "Commercial Entrance - Motor Coach"
            }
        ],
        "entrancePasses": [
            {
                "cost": "55.00",
                "description": "This pass admits a single, private, non commercial vehicle and its occupants into the park. This pass does not include camping or give any type of discount at stores inside the park. Valid for one year from month of purchase.",
                "title": "Annual Entrance - Park"
            }
        ],
        "fees": [],
        "directionsInfo": "Badlands National Park is located 75 miles east of Rapid City, South Dakota. Physical Addresses for GPS* Park Headquarters: 25216 Ben Reifel Road, Interior, SD 57750. Northeast Entrance (I-90, Exit 131): 21020 SD Hwy 240, Interior, SD 57750. Pinnacles Entrance (I-90, Exit 110): 24240 Hwy 240, Wall, SD 57790. Interior Entrance: 20640 SD Hwy 377, Interior, SD 57750.",
        "directionsUrl": "http://www.nps.gov/badl/planyourvisit/directions.htm",
        "operatingHours": [
            {
                "exceptions": [],
                "description": "The park is open to visitors all year with the exception of weather closures.",
                "standardHours": {
                    "wednesday": "All Day",
                    "monday": "All Day",
                    "thursday": "All Day",
                    "sunday": "All Day",
                    "tuesday": "All Day",
                    "friday": "All Day",
                    "saturday": "All Day"
                },
                "name": "Badlands National Park"
            }
        ],
        "addresses": [
            {
                "postalCode": "57750",
                "city": "Interior",
                "stateCode": "SD",
                "countryCode": "US",
                "provinceTerritoryCode": "",
                "line1": "25216 Ben Reifel Road",
                "type": "Physical",
                "line3": "",
                "line2": ""
            },
            {
                "postalCode": "57750",
                "city": "Interior",
                "stateCode": "SD",
                "countryCode": "US",
                "provinceTerritoryCode": "",
                "line1": "25216 Ben Reifel Road",
                "type": "Mailing",
                "line3": "",
                "line2": ""
            }
        ],
        "images": [
            {
                "credit": "NPS Photo",
                "title": "Badlands Storm",
                "altText": "Layered badlands formations behind fields of green grass under cloudy and billowing clouds.",
                "caption": "Summer storms are frequently violent and unpredictable.",
                "url": "https://www.nps.gov/common/uploads/structured_data/3C82EE63-1DD8-B71B-0BD6EE0FDCB5D402.jpg"
            },
            {
                "credit": "NPS Photo",
                "title": "Badlands Yellow Mounds",
                "altText": "The yellow mounds are peaking out of the formations in this photo.",
                "caption": "The yellow mounds are peaking out of the formations in this photo.",
                "url": "https://www.nps.gov/common/uploads/structured_data/3C82ED5D-1DD8-B71B-0B2F33D3B39D6D1B.jpg"
            },
            {
                "credit": "NPS Photo",
                "title": "Badlands Rugged Peaks",
                "altText": "Badlands formations are very rugged and often have sharp peaks.",
                "caption": "Badlands formations are very rugged and often have sharp peaks.",
                "url": "https://www.nps.gov/common/uploads/structured_data/3C82EBFE-1DD8-B71B-0B21072718DB2A95.jpg"
            },
            {
                "credit": "NPS Photo",
                "title": "Clover Landscape",
                "altText": "Jagged badlands buttes extended in horizon amid yellow flowers under a blue sky.",
                "caption": "The park has seasonal changes in colors so plan ahead!",
                "url": "https://www.nps.gov/common/uploads/structured_data/28C2C88B-9904-7962-E60BEFC763604963.jpg"
            },
            {
                "credit": "NPS Photo/Brad Barker",
                "title": "Badlands in the Winter",
                "altText": "road leading between snow covered badlands formations",
                "caption": "Winter in Badlands National Park often creates snow covered wonderlands throughout the park.",
                "url": "https://www.nps.gov/common/uploads/structured_data/36C156B0-F6CA-1972-F3B88C971DE39767.jpg"
            }
        ],
        "weatherInfo": "The Badlands weather is variable and unpredictable with temperature extremes ranging from 116° F to -40° F. Summers are hot and dry with occasional violent thunderstorms. Hailstorms and occasional tornadoes can descend on the Badlands with sudden fury. Winters are typically cold with 12 to 24 inches of total snowfall.",
        "name": "Badlands",
        "designation": "National Park",
        "relevanceScore": 1
    }
]

test('search by amenity renders parks', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockAmenitiesSearch));

    const user = userEvent.setup();
    render(<SearchPage/>, {wrapper: BrowserRouter});

    const input = screen.getByText('Amenity');
    await waitFor(() => user.click(input));

    const amenitySpinner = await screen.getByTestId('amenitySelection');

    await waitFor(() => user.selectOptions(amenitySpinner, ['A1B0AD01-740C-41E7-8412-FBBEDD5F1443']));
    const searchButton = await screen.getByText('Search');
    await waitFor(() => user.click(searchButton));

    const firstPark = await screen.getByText('Badlands National Park');
    expect(firstPark).toBeInTheDocument();
});

const mockStateSearch = [
    {
        "id": "C08AD828-98FF-478E-A63C-614E7534274B",
        "url": "https://www.nps.gov/alca/index.htm",
        "fullName": "Alcatraz Island",
        "parkCode": "alca",
        "description": "Alcatraz reveals stories of American incarceration, justice, and our common humanity. This small island was once a fort, a military prison, and a maximum security federal penitentiary. In 1969, the Indians of All Tribes occupied Alcatraz for 19 months in the name of freedom and Native American civil rights. We invite you to explore Alcatraz's complex history and natural beauty.",
        "latitude": "37.82676234",
        "longitude": "-122.4230206",
        "latLong": "lat:37.82676234, long:-122.4230206",
        "activities": [
            {
                "id": "1DFACD97-1B9C-4F5A-80F2-05593604799E",
                "name": "Food"
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
                "id": "24380E3F-AD9D-4E38-BF13-C8EEB21893E7",
                "name": "Shopping"
            },
            {
                "id": "467DC8B8-0B7D-436D-A026-80A22358F615",
                "name": "Bookstore and Park Store"
            }
        ],
        "topics": [
            {
                "id": "7F12224B-217A-4B07-A4A2-636B1CE7F221",
                "name": "Colonization and Settlement"
            },
            {
                "id": "988B4AFC-F478-4673-B66D-E6BDB0CCFF35",
                "name": "Forts"
            },
            {
                "id": "351EE154-87AA-46B0-BBA1-ED604368ACE9",
                "name": "Incarceration"
            },
            {
                "id": "50A3D2B2-C922-4749-89F1-E986A5D520AC",
                "name": "Jails and Prisons"
            },
            {
                "id": "4C9D4777-A9DA-47D1-A0B9-F4A3C98BC1B3",
                "name": "Maritime"
            },
            {
                "id": "7424754D-EB8B-4608-A69A-50D44992931B",
                "name": "Maritime - Military"
            },
            {
                "id": "263BAC6E-4DEC-47E4-909D-DA8AD351E06E",
                "name": "Lighthouses"
            },
            {
                "id": "4B3CD083-7500-434B-A8C2-D355925E0245",
                "name": "Medicine"
            },
            {
                "id": "97716EF5-D001-449C-993A-EC15AB8FD345",
                "name": "Hospital"
            },
            {
                "id": "3B0D607D-9933-425A-BFA0-21529AC4734C",
                "name": "Military"
            },
            {
                "id": "97CCB419-196C-4B95-BB3A-621458F78415",
                "name": "US Army"
            },
            {
                "id": "A1BAF33E-EA84-4608-A888-4CEE9541F027",
                "name": "Native American Heritage"
            },
            {
                "id": "40C0866A-3890-41A4-84CA-5935DEE181AE",
                "name": "Social Movements"
            },
            {
                "id": "27BF8807-54EA-4A3D-B073-AA7AA361CD7E",
                "name": "Wars and Conflicts"
            },
            {
                "id": "B564E9AA-95E9-4648-A7D1-48F94BFBEBB5",
                "name": "Tribal Conflicts"
            },
            {
                "id": "0D00073E-18C3-46E5-8727-2F87B112DDC6",
                "name": "Animals"
            },
            {
                "id": "957EF2BD-AC6C-4B7B-BD9A-87593ADC6691",
                "name": "Birds"
            }
        ],
        "states": "CA",
        "contacts": {
            "phoneNumbers": [
                {
                    "phoneNumber": "415-561-4900",
                    "description": "",
                    "extension": "",
                    "type": "Voice"
                }
            ],
            "emailAddresses": [
                {
                    "description": "",
                    "emailAddress": "goga_alca_socialmedia@nps.gov"
                }
            ]
        },
        "entranceFees": [],
        "entrancePasses": [],
        "fees": [],
        "directionsInfo": "The Alcatraz Ferry Terminal is located on The Embarcadero near the intersection of Bay Street at Pier 33.",
        "directionsUrl": "http://home.nps.gov/alca/planyourvisit/directions.htm",
        "operatingHours": [
            {
                "exceptions": [
                    {
                        "exceptionHours": {
                            "wednesday": "Closed",
                            "monday": "Closed",
                            "thursday": "Closed",
                            "sunday": "Closed",
                            "tuesday": "Closed",
                            "friday": "Closed",
                            "saturday": "Closed"
                        },
                        "startDate": "2024-11-28",
                        "name": "Thanksgiving",
                        "endDate": "2024-11-28"
                    },
                    {
                        "exceptionHours": {
                            "wednesday": "Closed",
                            "monday": "Closed",
                            "thursday": "Closed",
                            "sunday": "Closed",
                            "tuesday": "Closed",
                            "friday": "Closed",
                            "saturday": "Closed"
                        },
                        "startDate": "2024-12-25",
                        "name": "Christmas",
                        "endDate": "2024-12-25"
                    },
                    {
                        "exceptionHours": {
                            "wednesday": "Closed",
                            "monday": "Closed",
                            "thursday": "Closed",
                            "sunday": "Closed",
                            "tuesday": "Closed",
                            "friday": "Closed",
                            "saturday": "Closed"
                        },
                        "startDate": "2025-01-01",
                        "name": "New Year's",
                        "endDate": "2025-01-01"
                    }
                ],
                "description": "Access to Alcatraz Island is via commercial ferry service. For ticket reservation call (415) 981-ROCK [415.981.7625] or go to www.alcatrazcitycruises.com. Once on the island you can stay as long as you wish up to the last ferry, which changes seasonally. Alcatraz is closed on Thanksgiving, Christmas and New Years Day. Be aware that Alcatraz often sells out in advance. In summer and around holidays tickets can sell out a month or more in advance. Tickets go on sale 90 days in advance.",
                "standardHours": {
                    "wednesday": "9:00AM - 9:30PM",
                    "monday": "9:00AM - 6:30PM",
                    "thursday": "9:00AM - 9:30PM",
                    "sunday": "9:00AM - 6:30PM",
                    "tuesday": "9:00AM - 9:30PM",
                    "friday": "9:00AM - 9:30PM",
                    "saturday": "9:00AM - 9:30PM"
                },
                "name": "Alcatraz Island"
            }
        ],
        "addresses": [
            {
                "postalCode": "94133",
                "city": "San Francisco Bay",
                "stateCode": "CA",
                "countryCode": "US",
                "provinceTerritoryCode": "",
                "line1": "Alcatraz Island",
                "type": "Physical",
                "line3": "",
                "line2": ""
            },
            {
                "postalCode": "94123",
                "city": "San Francisco",
                "stateCode": "CA",
                "countryCode": "US",
                "provinceTerritoryCode": "",
                "line1": "Alcatraz Island",
                "type": "Mailing",
                "line3": "B201 Fort Mason",
                "line2": "Golden Gate National Recreation Area"
            }
        ],
        "images": [
            {
                "credit": "NPS",
                "title": "Alcatraz Island",
                "altText": "View of the Alcatraz Lighthouse and Island from the water",
                "caption": "Alcatraz Island",
                "url": "https://www.nps.gov/common/uploads/structured_data/2514A14F-D5E3-BB31-4A0C4175BF61216A.jpg"
            },
            {
                "credit": "NPS / Dave Rauenbuehler",
                "title": "Alcatraz Cellhouse",
                "altText": "A corridor extends between two rows and three tiers of cells. Skylights let in light from overhead.",
                "caption": "Looking down Broadway in the Alcatraz Cellhouse",
                "url": "https://www.nps.gov/common/uploads/structured_data/5482A294-DB42-56E0-FCCCD03C986AE1DC.jpg"
            },
            {
                "credit": "NPS Photo",
                "title": "Alcatraz Rangers and Firetruck",
                "altText": "Alcatraz Rangers and Firetruck",
                "caption": "Alcatraz Rangers and 1934 Diamond T Firetruck",
                "url": "https://www.nps.gov/common/uploads/structured_data/A5C1D012-1DD8-B71B-0BA00C730D46F141.jpg"
            },
            {
                "credit": "NPS Photo - Golden Gate National Recreation Area, GOGA 2316a",
                "title": "Army Prisoners in the Stockade, 1902",
                "altText": "Army Prisoners in the Stockade, 1902",
                "caption": "Army Prisoners in the Stockade, 1902",
                "url": "https://www.nps.gov/common/uploads/structured_data/A61F4F58-1DD8-B71B-0B981C552798242B.jpg"
            },
            {
                "credit": "Darlyne Sheppard Alcatraz Photo Collection",
                "title": "Serving the Christmas Meal, c 1951",
                "altText": "Cook serving Christmas dinner with menu posted above.",
                "caption": "An inmate worker distributes trays near the steam table. Bars separate the kitchen from the mess hall.  The day’s menu, the Christmas meal, appears on a sign over his head. The menu includes consomme, stuffed celery, green olives and mixed sweet pickles,",
                "url": "https://www.nps.gov/common/uploads/structured_data/A64B4FF8-1DD8-B71B-0B63B232325C8081.jpg"
            }
        ],
        "weatherInfo": "The climate on Alcatraz is unpredictable and can change suddenly. Cold, foggy mornings may give way to sunny afternoons, which in turn can shift quickly back to more fog and blustery winds. The most pleasant weather usually occurs in spring and fall. Summers tend to be cool and foggy, winter is our rainy season. Temperatures on Alcatraz seldom rise above 75°F (24°C) or fall below 38°",
        "name": "Alcatraz Island",
        "designation": "",
        "relevanceScore": 1
    }
]

test('search by state renders parks', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockStateSearch));

    const user = userEvent.setup();
    render(<SearchPage/>, {wrapper: BrowserRouter});

    const input = screen.getByText('State');
    await waitFor(() => user.click(input));

    const stateSpinner = await screen.getByTestId('stateSelection');

    await waitFor(() => user.selectOptions(stateSpinner, ['CA']));
    const searchButton = await screen.getByText('Search');
    await waitFor(() => user.click(searchButton));

    const firstPark = await screen.getByText('Alcatraz Island');
    expect(firstPark).toBeInTheDocument();
});

const mockNameSearch = [
    {
        "id": "C08AD828-98FF-478E-A63C-614E7534274B",
        "url": "https://www.nps.gov/alca/index.htm",
        "fullName": "Alcatraz Island",
        "parkCode": "alca",
        "description": "Alcatraz reveals stories of American incarceration, justice, and our common humanity. This small island was once a fort, a military prison, and a maximum security federal penitentiary. In 1969, the Indians of All Tribes occupied Alcatraz for 19 months in the name of freedom and Native American civil rights. We invite you to explore Alcatraz's complex history and natural beauty.",
        "latitude": "37.82676234",
        "longitude": "-122.4230206",
        "latLong": "lat:37.82676234, long:-122.4230206",
        "activities": [
            {
                "id": "1DFACD97-1B9C-4F5A-80F2-05593604799E",
                "name": "Food"
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
                "id": "24380E3F-AD9D-4E38-BF13-C8EEB21893E7",
                "name": "Shopping"
            },
            {
                "id": "467DC8B8-0B7D-436D-A026-80A22358F615",
                "name": "Bookstore and Park Store"
            }
        ],
        "topics": [
            {
                "id": "7F12224B-217A-4B07-A4A2-636B1CE7F221",
                "name": "Colonization and Settlement"
            },
            {
                "id": "988B4AFC-F478-4673-B66D-E6BDB0CCFF35",
                "name": "Forts"
            },
            {
                "id": "351EE154-87AA-46B0-BBA1-ED604368ACE9",
                "name": "Incarceration"
            },
            {
                "id": "50A3D2B2-C922-4749-89F1-E986A5D520AC",
                "name": "Jails and Prisons"
            },
            {
                "id": "4C9D4777-A9DA-47D1-A0B9-F4A3C98BC1B3",
                "name": "Maritime"
            },
            {
                "id": "7424754D-EB8B-4608-A69A-50D44992931B",
                "name": "Maritime - Military"
            },
            {
                "id": "263BAC6E-4DEC-47E4-909D-DA8AD351E06E",
                "name": "Lighthouses"
            },
            {
                "id": "4B3CD083-7500-434B-A8C2-D355925E0245",
                "name": "Medicine"
            },
            {
                "id": "97716EF5-D001-449C-993A-EC15AB8FD345",
                "name": "Hospital"
            },
            {
                "id": "3B0D607D-9933-425A-BFA0-21529AC4734C",
                "name": "Military"
            },
            {
                "id": "97CCB419-196C-4B95-BB3A-621458F78415",
                "name": "US Army"
            },
            {
                "id": "A1BAF33E-EA84-4608-A888-4CEE9541F027",
                "name": "Native American Heritage"
            },
            {
                "id": "40C0866A-3890-41A4-84CA-5935DEE181AE",
                "name": "Social Movements"
            },
            {
                "id": "27BF8807-54EA-4A3D-B073-AA7AA361CD7E",
                "name": "Wars and Conflicts"
            },
            {
                "id": "B564E9AA-95E9-4648-A7D1-48F94BFBEBB5",
                "name": "Tribal Conflicts"
            },
            {
                "id": "0D00073E-18C3-46E5-8727-2F87B112DDC6",
                "name": "Animals"
            },
            {
                "id": "957EF2BD-AC6C-4B7B-BD9A-87593ADC6691",
                "name": "Birds"
            }
        ],
        "states": "CA",
        "contacts": {
            "phoneNumbers": [
                {
                    "phoneNumber": "415-561-4900",
                    "description": "",
                    "extension": "",
                    "type": "Voice"
                }
            ],
            "emailAddresses": [
                {
                    "description": "",
                    "emailAddress": "goga_alca_socialmedia@nps.gov"
                }
            ]
        },
        "entranceFees": [],
        "entrancePasses": [],
        "fees": [],
        "directionsInfo": "The Alcatraz Ferry Terminal is located on The Embarcadero near the intersection of Bay Street at Pier 33.",
        "directionsUrl": "http://home.nps.gov/alca/planyourvisit/directions.htm",
        "operatingHours": [
            {
                "exceptions": [
                    {
                        "exceptionHours": {
                            "wednesday": "Closed",
                            "monday": "Closed",
                            "thursday": "Closed",
                            "sunday": "Closed",
                            "tuesday": "Closed",
                            "friday": "Closed",
                            "saturday": "Closed"
                        },
                        "startDate": "2024-11-28",
                        "name": "Thanksgiving",
                        "endDate": "2024-11-28"
                    },
                    {
                        "exceptionHours": {
                            "wednesday": "Closed",
                            "monday": "Closed",
                            "thursday": "Closed",
                            "sunday": "Closed",
                            "tuesday": "Closed",
                            "friday": "Closed",
                            "saturday": "Closed"
                        },
                        "startDate": "2024-12-25",
                        "name": "Christmas",
                        "endDate": "2024-12-25"
                    },
                    {
                        "exceptionHours": {
                            "wednesday": "Closed",
                            "monday": "Closed",
                            "thursday": "Closed",
                            "sunday": "Closed",
                            "tuesday": "Closed",
                            "friday": "Closed",
                            "saturday": "Closed"
                        },
                        "startDate": "2025-01-01",
                        "name": "New Year's",
                        "endDate": "2025-01-01"
                    }
                ],
                "description": "Access to Alcatraz Island is via commercial ferry service. For ticket reservation call (415) 981-ROCK [415.981.7625] or go to www.alcatrazcitycruises.com. Once on the island you can stay as long as you wish up to the last ferry, which changes seasonally. Alcatraz is closed on Thanksgiving, Christmas and New Years Day. Be aware that Alcatraz often sells out in advance. In summer and around holidays tickets can sell out a month or more in advance. Tickets go on sale 90 days in advance.",
                "standardHours": {
                    "wednesday": "9:00AM - 9:30PM",
                    "monday": "9:00AM - 6:30PM",
                    "thursday": "9:00AM - 9:30PM",
                    "sunday": "9:00AM - 6:30PM",
                    "tuesday": "9:00AM - 9:30PM",
                    "friday": "9:00AM - 9:30PM",
                    "saturday": "9:00AM - 9:30PM"
                },
                "name": "Alcatraz Island"
            }
        ],
        "addresses": [
            {
                "postalCode": "94133",
                "city": "San Francisco Bay",
                "stateCode": "CA",
                "countryCode": "US",
                "provinceTerritoryCode": "",
                "line1": "Alcatraz Island",
                "type": "Physical",
                "line3": "",
                "line2": ""
            },
            {
                "postalCode": "94123",
                "city": "San Francisco",
                "stateCode": "CA",
                "countryCode": "US",
                "provinceTerritoryCode": "",
                "line1": "Alcatraz Island",
                "type": "Mailing",
                "line3": "B201 Fort Mason",
                "line2": "Golden Gate National Recreation Area"
            }
        ],
        "images": [
            {
                "credit": "NPS",
                "title": "Alcatraz Island",
                "altText": "View of the Alcatraz Lighthouse and Island from the water",
                "caption": "Alcatraz Island",
                "url": "https://www.nps.gov/common/uploads/structured_data/2514A14F-D5E3-BB31-4A0C4175BF61216A.jpg"
            },
            {
                "credit": "NPS / Dave Rauenbuehler",
                "title": "Alcatraz Cellhouse",
                "altText": "A corridor extends between two rows and three tiers of cells. Skylights let in light from overhead.",
                "caption": "Looking down Broadway in the Alcatraz Cellhouse",
                "url": "https://www.nps.gov/common/uploads/structured_data/5482A294-DB42-56E0-FCCCD03C986AE1DC.jpg"
            },
            {
                "credit": "NPS Photo",
                "title": "Alcatraz Rangers and Firetruck",
                "altText": "Alcatraz Rangers and Firetruck",
                "caption": "Alcatraz Rangers and 1934 Diamond T Firetruck",
                "url": "https://www.nps.gov/common/uploads/structured_data/A5C1D012-1DD8-B71B-0BA00C730D46F141.jpg"
            },
            {
                "credit": "NPS Photo - Golden Gate National Recreation Area, GOGA 2316a",
                "title": "Army Prisoners in the Stockade, 1902",
                "altText": "Army Prisoners in the Stockade, 1902",
                "caption": "Army Prisoners in the Stockade, 1902",
                "url": "https://www.nps.gov/common/uploads/structured_data/A61F4F58-1DD8-B71B-0B981C552798242B.jpg"
            },
            {
                "credit": "Darlyne Sheppard Alcatraz Photo Collection",
                "title": "Serving the Christmas Meal, c 1951",
                "altText": "Cook serving Christmas dinner with menu posted above.",
                "caption": "An inmate worker distributes trays near the steam table. Bars separate the kitchen from the mess hall.  The day’s menu, the Christmas meal, appears on a sign over his head. The menu includes consomme, stuffed celery, green olives and mixed sweet pickles,",
                "url": "https://www.nps.gov/common/uploads/structured_data/A64B4FF8-1DD8-B71B-0B63B232325C8081.jpg"
            }
        ],
        "weatherInfo": "The climate on Alcatraz is unpredictable and can change suddenly. Cold, foggy mornings may give way to sunny afternoons, which in turn can shift quickly back to more fog and blustery winds. The most pleasant weather usually occurs in spring and fall. Summers tend to be cool and foggy, winter is our rainy season. Temperatures on Alcatraz seldom rise above 75°F (24°C) or fall below 38°",
        "name": "Alcatraz Island",
        "designation": "",
        "relevanceScore": 1
    }
]

test('search by park name renders parks', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockNameSearch));

    const user = userEvent.setup();
    render(<SearchPage/>, {wrapper: BrowserRouter});

    const input = screen.getByText('Name');
    await waitFor(() => user.click(input));

    const nameInput = await screen.getByTestId('nameSelection');
    await waitFor(() => user.type(nameInput, 'Alcatraz Island'));

    const searchButton = await screen.getByText('Search');
    await waitFor(() => user.click(searchButton));

    const firstPark = await screen.getByText('Alcatraz Island');
    expect(firstPark).toBeInTheDocument();
});

test('search by all parks', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockAllParksResponse));

    const user = userEvent.setup();
    render(<SearchPage/>, {wrapper: BrowserRouter});

    const input = screen.getByText('All Parks');
    await waitFor(() => user.click(input));

    const searchButton = await screen.getByText('Search');
    await waitFor(() => user.click(searchButton));

    const firstPark = await screen.getByText('Abraham Lincoln Birthplace National Historical Park');
    expect(firstPark).toBeInTheDocument();
});


// Error Handling

test('logs an error when fetching activities fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    fetch.mockRejectOnce(new Error('Failed to fetch parks:'));

    const user = userEvent.setup();
    render(<SearchPage />, { wrapper: BrowserRouter });

    const input = screen.getByText('Activity');
    await waitFor(() => user.click(input));

    const activitySpinner = await screen.getByTestId('activitySelection');

    await waitFor(() => user.selectOptions(activitySpinner, ['09DF0950-D319-4557-A57E-04CD2F63FF42']));
    const searchButton = await screen.getByText('Search');
    await waitFor(() => user.click(searchButton));

    // Check if console.error was called
    expect(consoleSpy).toHaveBeenCalled();

    // Optionally, check if console.error was called with a specific error
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching parks:', expect.anything());

    consoleSpy.mockRestore(); // Clean up
});

test('logs an error when fetching activities response is not ok', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    fetch.mockResolvedValueOnce({
        ok: false,
    });

    const user = userEvent.setup();
    render(<SearchPage />, { wrapper: BrowserRouter });

    const input = screen.getByText('Activity');
    await waitFor(() => user.click(input));

    const activitySpinner = await screen.getByTestId('activitySelection');

    await waitFor(() => user.selectOptions(activitySpinner, ['09DF0950-D319-4557-A57E-04CD2F63FF42']));
    const searchButton = await screen.getByText('Search');
    await waitFor(() => user.click(searchButton));

    // Check if console.error was called
    expect(consoleSpy).toHaveBeenCalled();

    // Optionally, check if console.error was called with a specific error
    expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch parks');

    consoleSpy.mockRestore(); // Clean up
});



test('logs an error when fetching topics fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    fetch.mockRejectOnce(new Error('Error fetching parks:'));

    const user = userEvent.setup();
    render(<SearchPage />, { wrapper: BrowserRouter });

    const input = screen.getByText('Topic');
    await waitFor(() => user.click(input));

    const topicSpinner = await screen.getByTestId('topicSelection');

    await waitFor(() => user.selectOptions(topicSpinner, ['28AEAE85-9DDA-45B6-981B-1CFCDCC61E14']));
    const searchButton = await screen.getByText('Search');
    await waitFor(() => user.click(searchButton));

    // Check if console.error was called
    expect(consoleSpy).toHaveBeenCalled();

    // Optionally, check if console.error was called with a specific error
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching parks:', expect.anything());

    consoleSpy.mockRestore(); // Clean up
});


test('logs an error when fetching topics response is not ok', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    fetch.mockResolvedValueOnce({
        ok: false,
    });

    const user = userEvent.setup();
    render(<SearchPage />, { wrapper: BrowserRouter });

    const input = screen.getByText('Topic');
    await waitFor(() => user.click(input));

    const topicSpinner = await screen.getByTestId('topicSelection');

    await waitFor(() => user.selectOptions(topicSpinner, ['28AEAE85-9DDA-45B6-981B-1CFCDCC61E14']));
    const searchButton = await screen.getByText('Search');
    await waitFor(() => user.click(searchButton));

    // Check if console.error was called
    expect(consoleSpy).toHaveBeenCalled();

    // Optionally, check if console.error was called with a specific error
    expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch parks');

    consoleSpy.mockRestore(); // Clean up
});

test('logs an error when fetching amenity fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    fetch.mockRejectOnce(new Error('Error fetching parks:'));

    const user = userEvent.setup();
    render(<SearchPage />, { wrapper: BrowserRouter });

    const input = screen.getByText('Amenity');
    await waitFor(() => user.click(input));

    const amenitySpinner = await screen.getByTestId('amenitySelection');

    await waitFor(() => user.selectOptions(amenitySpinner, ['A1B0AD01-740C-41E7-8412-FBBEDD5F1443']));
    const searchButton = await screen.getByText('Search');
    await waitFor(() => user.click(searchButton));

    // Check if console.error was called
    expect(consoleSpy).toHaveBeenCalled();

    // Optionally, check if console.error was called with a specific error
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching parks:', expect.anything());

    consoleSpy.mockRestore(); // Clean up
});


test('logs an error when fetching amenity response is not ok', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    fetch.mockResolvedValueOnce({
        ok: false,
    });

    const user = userEvent.setup();
    render(<SearchPage />, { wrapper: BrowserRouter });

    const input = screen.getByText('Amenity');
    await waitFor(() => user.click(input));

    const amenitySpinner = await screen.getByTestId('amenitySelection');

    await waitFor(() => user.selectOptions(amenitySpinner, ['A1B0AD01-740C-41E7-8412-FBBEDD5F1443']));
    const searchButton = await screen.getByText('Search');
    await waitFor(() => user.click(searchButton));

    // Check if console.error was called
    expect(consoleSpy).toHaveBeenCalled();

    // Optionally, check if console.error was called with a specific error
    expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch parks');

    consoleSpy.mockRestore(); // Clean up
});


test('failed error for name search', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    fetch.mockRejectOnce(new Error('Error fetching parks'));

    const user = userEvent.setup();
    render(<SearchPage/>, {wrapper: BrowserRouter});

    const input = screen.getByText('Name');
    await waitFor(() => user.click(input));

    const nameInput = await screen.getByTestId('nameSelection');
    await waitFor(() => user.type(nameInput, 'Alcatraz Island'));

    const searchButton = await screen.getByText('Search');
    await waitFor(() => user.click(searchButton));

    consoleSpy.mockRestore(); // Clean up
});

test('logs an error when fetching state parks fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    fetch.mockRejectOnce(new Error('Error fetching parks:'));

    const user = userEvent.setup();
    render(<SearchPage />, { wrapper: BrowserRouter });

    const input = screen.getByText('State');
    await waitFor(() => user.click(input));

    const stateSpinner = await screen.getByTestId('stateSelection');

    await waitFor(() => user.selectOptions(stateSpinner, ['CA']));
    const searchButton = await screen.getByText('Search');
    await waitFor(() => user.click(searchButton));

    consoleSpy.mockRestore(); // Clean up
});

test('logs an error when all parks fetch fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    fetch.mockRejectOnce(new Error('Fetch Error:'));

    const user = userEvent.setup();
    render(<SearchPage />, { wrapper: BrowserRouter });

    const input = screen.getByText('All Parks');
    await waitFor(() => user.click(input));

    const searchButton = await screen.getByText('Search');
    await waitFor(() => user.click(searchButton));

    // Check if console.error was called
    expect(consoleSpy).toHaveBeenCalled();

    // Optionally, check if console.error was called with a specific error
    expect(consoleSpy).toHaveBeenCalledWith('Fetch error:', expect.anything());

    consoleSpy.mockRestore(); // Clean up
});

test('trys an empty search at each page', async () => {
    const user = userEvent.setup();
    render(<SearchPage/>, {wrapper: BrowserRouter});

    await waitFor(() => user.click(screen.getByText('Activity')));
    await waitFor(() => user.click(screen.getByText('Search')));

    await waitFor(() => user.click(screen.getByText('Topic')));
    await waitFor(() => user.click(screen.getByText('Search')));

    await waitFor(() => user.click(screen.getByText('State')));
    await waitFor(() => user.click(screen.getByText('Search')));

    await waitFor(() => user.click(screen.getByText('Amenity')));
    await waitFor(() => user.click(screen.getByText('Search')));

    await waitFor(() => user.click(screen.getByText('Name')));
    await waitFor(() => user.click(screen.getByText('Search')));
});

// test('all parks fetch call for page rendering throws error', async () => {
//     fetch.resetMocks();
//
//     const consoleSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
//     fetch.mockResponseOnce(JSON.stringify(mockActivitiesResponse));
//     fetch.mockResponseOnce(JSON.stringify(mockTopicsResponse));
//     fetch.mockResponseOnce(JSON.stringify(mockAmenitiesResponse));
//     fetch.mockRejectOnce(new Error('Fetch Error:'));
//
//     const user = userEvent.setup();
//     render(<SearchPage/>, {wrapper: BrowserRouter});
//
//     expect(consoleSpy).toHaveBeenCalled();
//     // Optionally, check if console.error was called with a specific error
//     expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch parks');
//     consoleSpy.mockRestore(); // Clean up
// });

// it('logs an error when the fetchAllParks call fails', async () => {
//     // Override the response for the fourth call to simulate a failure
//     fetch.mockResponseOnce(JSON.stringify(mockActivitiesResponse)); // 1st call succeeds
//     fetch.mockResponseOnce(JSON.stringify(mockTopicsResponse));     // 2nd call succeeds
//     fetch.mockResponseOnce(JSON.stringify(mockAmenitiesResponse));  // 3rd call succeeds
//     fetch.mockRejectOnce(new Error('Failed to fetch all parks'));   // 4th call fails
//
//     const consoleSpy = jest.spyOn(console, 'log');
//     render(<SearchPage />, {wrapper: BrowserRouter});
//
//     // Wait for the error to be caught and logged
//     await waitFor(() => expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error)));
//
//     consoleSpy.mockRestore();
// });
