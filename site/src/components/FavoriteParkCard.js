import {Button} from 'flowbite-react';

import {Carousel} from 'flowbite-react'
import {Tabs} from 'flowbite-react';
import React, {useState} from "react";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

function FavoriteParkCard({park, increaseRanking, decreaseRanking, getFavorites}) {
    const {activities, entranceFees, description, fullName, images, isFavorite, parkCode, ranking} = park
    // if (isFavorite) {
    //     console.log(fullName, parkCode)
    // }
    const [amenities, setAmenities] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false);

    const customTheme = {
        "tablist": {
            "base": "flex text-center",
            "styles": {
                "default": "flex-wrap border-b border-gray-200 dark:border-gray-700",
                "underline": "flex-wrap -mb-px border-b border-gray-200 dark:border-gray-700",
                "pills": "flex-wrap font-medium text-sm text-gray-500 dark:text-gray-400 space-x-2",
                "fullWidth": "w-full text-sm font-medium divide-x divide-gray-200 shadow grid grid-flow-col dark:divide-gray-700 dark:text-gray-400 rounded-none"
            },
            "tabitem": {
                "base": "flex-grow items-center justify-center p-4 text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:outline-none",
                "styles": {
                    "default": {
                        "base": "rounded-t-lg",
                        "active": {
                            "on": "bg-gray-100 text-cyan-600 dark:bg-gray-800 dark:text-cyan-500",
                            "off": "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                        }
                    },
                    "underline": {
                        "base": "rounded-t-lg",
                        "active": {
                            "on": "text-green-600 rounded-t-lg border-b-2 border-orange-600 active dark:text-cyan-500 dark:border-cyan-500",
                            "off": "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                        }
                    },
                    "pills": {
                        "base": "",
                        "active": {
                            "on": "rounded-lg bg-cyan-600 text-white",
                            "off": "rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                        }
                    },
                    "fullWidth": {
                        "base": "ml-0 first:ml-0 w-full rounded-none flex",
                        "active": {
                            "on": "p-4 text-gray-900 bg-gray-100 active dark:bg-gray-700 dark:text-white rounded-none",
                            "off": "bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded-none"
                        }
                    }
                },

            }
        },
        "tabitemcontainer": {
            "base": "p-3",
        },
        "tabpanel": "py-3"
    }



    const unfavoritePark = async () => {
        try {
            const response = await fetch(`/deleteUserFavorite?parkCode=${parkCode}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) {
                console.log("Removed from favorites");
                getFavorites();  // Refresh the favorites list
                setShowConfirmation(false);  // Close the confirmation dialog
            } else {
                console.error("Failed to remove from favorites");
            }
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setShowConfirmation(true);  // Show the confirmation dialog
    };

    const handleCancel = () => {
        setShowConfirmation(false);  // Hide the confirmation dialog
    };







    const {line1, line2, line3, city, postalCode, stateCode} = park.addresses[0]
    let address = line1
    if (line2) address += ", " + line2
    if (line3) address += ", " + line3
    address += ", " + city + ", " + stateCode + " " + postalCode
    // console.log(activities)
    // console.log(entranceFees)
    // console.log(line1)
    let activityList = activities.map((activity) => (
        activity.name
    )).toString().replaceAll(',', ', ')
    // console.log(activityList)
    // console.log(entranceFees)

    let amenitiesList = amenities.map(amenityNode => (
        amenityNode.map(amenity => (amenity.name))
    )).toString().replaceAll(',', ', ')

    const customThemeCarousel = {
        "control": {
            "base": "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
            "icon": "h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
        },
        "scrollContainer": {
            "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
            "snap": "snap-x"
        }
    }
    const handleSeeMoreClick = () => {
        if (!isExpanded) {
            fetchParkAmenities(); // Fetch amenities before expanding
        }
        setIsExpanded(!isExpanded); // Toggle expanded state
    };

    const fetchParkAmenities = async () => {
        const response = await fetch("/amenities/" + parkCode, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        console.log(response)
        const data = await response.json();
        setAmenities(data);
    };


    const handleCarouselClick = (e) => {
        e.stopPropagation(); // Prevent click from bubbling up to the card level
    };

    const [isFavoritePark, setIsFavoritePark] = useState(isFavorite)
    const toggleFavorite = async (e) => {
        e.stopPropagation()
        try {
            const apiEndpoint = isFavoritePark ? "/deleteUserFavorite" : "/addUserFavorite";

            const favoriteResponse = await fetch(apiEndpoint + `?parkCode=${parkCode}`, {
                method: isFavoritePark ? 'DELETE' : 'POST', // Use DELETE to remove, POST to add
                credentials: 'include',
            });
            if (favoriteResponse.ok) {
                setIsFavoritePark(!isFavoritePark);
                console.log(isFavoritePark ? "Removed from favorites" : "Added to favorites");
                getFavorites()
            } else {
                console.error("Failed to toggle favorite");
            }

        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    }

    return (
        <div className="relative rounded-[2.5rem] w-full overflow-hidden shadow-lg p-5 bg-orange-50" onClick={handleSeeMoreClick}>
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel onClick={handleCarouselClick} theme={customThemeCarousel} className="px-3 mt-3">
                    {images.map((image) => (
                        <div key={image.url} className="flex justify-center align-middle overflow-y-clip">
                            <img className="w-full pointer-events-none object-fill"
                                 src={image.url}
                                 alt={image.altText}/>
                        </div>
                    ))}
                </Carousel>
            </div>
            <div className="px-3">
                <div className="flex justify-between items-center font-semibold text-2xl py-3 md:w-full">
                    <div className="flex">
                        {fullName}
                    </div>
                    <div className="flex">
                        {/*<button*/}
                        {/*    data-testid="favorite-button"*/}
                        {/*    onClick={toggleFavorite}*/}
                        {/*    className={`transition-colors duration-200 ${*/}
                        {/*        isFavoritePark*/}
                        {/*            ? "text-red-500 hover:text-red-600" // Active/favorite style*/}
                        {/*            : "text-gray-400 hover:text-gray-500" // Default/non-favorite style*/}
                        {/*    }`}*/}
                        {/*>*/}
                        {/*    {isFavoritePark ? (*/}
                        {/*        // Filled heart for when it is a favorite*/}
                        {/*        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"*/}
                        {/*             className="w-6 h-6">*/}
                        {/*            <path*/}
                        {/*                d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>*/}
                        {/*        </svg>*/}
                        {/*    ) : (*/}
                        {/*        // Outline heart for when it is not a favorite*/}
                        {/*        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"*/}
                        {/*             strokeWidth={1.5}*/}
                        {/*             stroke="currentColor" className="w-6 h-6">*/}
                        {/*            <path strokeLinecap="round" strokeLinejoin="round"*/}
                        {/*                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>*/}
                        {/*        </svg>*/}
                        {/*    )}*/}
                        {/*</button>*/}
                        <button id={`delete-button-${park.parkCode}`} data-testid="favorite-button" onClick={handleDeleteClick} className="text-red-500 hover:text-red-600">
                            <ExclamationTriangleIcon className="h-6 w-6"/>
                        </button>
                    </div>
                </div>
                <p className="font-thin text-lg">
                    {description}                </p>
                {showConfirmation && (
                    <div onClick={handleCarouselClick} className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center">
                        <div className="text-center">
                            <p>Are you sure you want to remove this from your favorites?</p>
                            <Button id={`confirm-delete-button-${park.parkCode}`} data-testid="confirm-delete-button" onClick={unfavoritePark} color="failure">
                                Confirm
                            </Button>
                            <Button id={`cancel-delete-button-${park.parkCode}`} onClick={handleCancel} color="gray">
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}
                {isExpanded && (
                    <div className="bg-pink-100 p-2 rounded-[0.5rem] mt-4">
                        <Tabs onClick={(e) => e.stopPropagation()} theme={customTheme} aria-label="Default tabs" style="underline">
                            <Tabs.Item active title="Activities">
                                <span
                                    className="font-medium text-gray-800 dark:text-white">{activityList.length > 0 ? activityList :
                                    <p>No activities listed :(</p>}</span>
                            </Tabs.Item>
                            <Tabs.Item active title="Amenities">
                           <span
                               className="font-medium text-gray-800 dark:text-white">{amenitiesList.length > 0 ? amenitiesList :
                               <p>No amenities listed :(</p>}</span>
                            </Tabs.Item>
                            <Tabs.Item title="Location">
                                <span className="font-medium text-gray-800 dark:text-white">Address: {address}</span>
                            </Tabs.Item>
                            <Tabs.Item title="Entrance Fee">
                                <span className="font-medium text-gray-800 dark:text-white">Fees: </span>
                                {
                                    entranceFees.length > 0 ? (
                                        entranceFees.map((fee) => (
                                            <div key={fee.title}>
                                                <p className="font-semibold text-red-400">Cost: {fee.cost}</p>
                                                <p>Description: {fee.description}</p>
                                                <br/>
                                            </div>
                                        ))
                                    ) : (
                                        <span className="text-green-400">No fees here!</span>
                                    )
                                }
                            </Tabs.Item>
                        </Tabs>
                    </div>
                )}

                {/*<div className="pt-3 text-2xl"><Button onClick={() => setIsExpanded((prevState) => !prevState)}*/}
                {/*                                       gradientDuoTone="pinkToOrange" fullSized="true">See More</Button>*/}
                {/*</div>*/}

                <div className="pt-3 text-2xl">
                    <Button
                        // onClick={() => setIsExpanded((prevState) => !prevState)}
                        gradientDuoTone="pinkToOrange"
                        fullSized="true">
                        {isExpanded ? 'See Less' : 'See More'}
                    </Button>
                </div>
            </div>
            <div className="flex justify-center items-center space-x-2 my-2" onClick={handleCarouselClick}>
                <button
                    onClick={() => decreaseRanking(parkCode)}
                    aria-label="Decrease rank"
                    className="p-2 rounded-full border border-gray-300 shadow-sm hover:bg-gray-100"
                    id={`decrease-button-${park.parkCode}`}
                    data-testid="decrease-ranking-button"
                >
                    <ChevronDownIcon className="h-5 w-5"/>
                </button>
                <span>{ranking}</span>
                <button
                    onClick={() => increaseRanking(parkCode)}
                    aria-label="Increase rank"
                    className="p-2 rounded-full border border-gray-300 shadow-sm hover:bg-gray-100"
                    id={`increase-button-${park.parkCode}`}
                    data-testid="increase-ranking-button"
                >
                    <ChevronUpIcon className="h-5 w-5"/>
                </button>
            </div>
        </div>
    )
}

export default FavoriteParkCard