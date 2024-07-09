import {Button} from 'flowbite-react';

import { Carousel } from 'flowbite-react'
import { Tabs } from 'flowbite-react';
import React, {useState} from "react";


function PublicPageCard(park) {
    console.log(park)
    const { activities, entranceFees, description, fullName, images, isFavorite, parkCode} = park.park
    const [amenities, setAmenities] = useState([])

    const [isExpanded, setIsExpanded] = useState(false)
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
    const {line1, line2, line3, city, postalCode, stateCode} =park.park.addresses[0]
    let address = line1
    if (line2) address+=", "+line2
    if (line3) address+=", " +line3
    address+=", " + city +", " + stateCode + " " + postalCode
    // console.log(activities)
    // console.log(entranceFees)
    // console.log(line1)
    let activityList = activities.map((activity)=>(
        activity.name
    )).toString().replaceAll(',', ', ')

    let amenitiesList = amenities.map(amenityNode => (
        amenityNode.map(amenity => (amenity.name))
    )).toString().replaceAll(',', ', ')

    // console.log(activityList)
    // console.log(entranceFees)

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
            } else {
                console.error("Failed to toggle favorite");
            }

        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    }

    const fetchParkAmenities = () => {
        fetch("/amenities/" + parkCode, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            // Convert the response to JSON
            .then(data => {
                console.log(data)
                setAmenities(data);
            });
    };

    const handleSeeMoreClick = () => {
        if (!isExpanded) {
            fetchParkAmenities(); // Fetch amenities before expanding
        }
        setIsExpanded(!isExpanded); // Toggle expanded state
    };

    return (
        <div className="relative rounded-[2.5rem] w-full overflow-hidden shadow-lg p-5 bg-orange-50" data-testid="title-button" onClick={handleSeeMoreClick}>
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel onClick={(e) => e.stopPropagation()} theme={customThemeCarousel} className="px-3 mt-3">
                    {images.map((image)=> (
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
                    <div id={"title-"+parkCode} className="flex">
                        {fullName}
                    </div>
                </div>
                <p className="font-thin text-lg">
                    {description}                </p>
                {isExpanded && (
                    <div className="bg-pink-100 p-2 rounded-[0.5rem] mt-4">
                        <Tabs onClick={(e) => e.stopPropagation()} theme={customTheme} aria-label="Default tabs" style="underline">
                            <Tabs.Item id={"activity-tab"+parkCode} active title="Activities">
                                <span
                                    className="font-medium text-gray-800 dark:text-white">{activityList.length > 0 ? activityList :
                                    <p>No activities listed :(</p>}</span>
                            </Tabs.Item>
                            <Tabs.Item id={"amenity-tab"+parkCode} active title="Amenities">
                                <span
                                    className="font-medium text-gray-800 dark:text-white">{amenitiesList.length > 0 ? amenitiesList :
                                    <p>No amenities listed :(</p>}</span>
                            </Tabs.Item>
                            <Tabs.Item id={"location-tab"+parkCode} title="Location">
                                <span className="font-medium text-gray-800 dark:text-white">Address: {address}</span>
                            </Tabs.Item>
                            <Tabs.Item id={"fee-tab"+parkCode} title="Entrance Fee">
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
                        // onClick={handleSeeMoreClick}
                        id={"expand"+parkCode}

                        gradientDuoTone="pinkToOrange"
                        fullSized="true">
                        {isExpanded ? 'See Less' : 'See More'}

                    </Button>
                </div>
            </div>

        </div>
    )
}

export default PublicPageCard

