import {Button, Modal} from 'flowbite-react';

import { Carousel } from 'flowbite-react'
import { Tabs } from 'flowbite-react';
import React, {useState} from "react";


function ParkCard({park, onActivityClick, onAmenityClick, onStateClick}) {
    const { activities, entranceFees, url, description, fullName, images, isFavorite, parkCode} = park
    //const [activities, setActivities] = useState([])
    const [amenities, setAmenities] = useState([])
    const [showConfirmModal, setShowConfirmModal] = useState(false);

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
    const [showAddedMessage, setShowAddedMessage] = useState(false);
    const {line1, line2, line3, city, postalCode, stateCode} =park.addresses[0]
    let address = line1
    if (line2) address+=", "+line2
    if (line3) address+=", " +line3
    address+=", " + city +", " + stateCode + " " + postalCode
    // console.log(activities)
    // console.log(entranceFees)
    // console.log(line1)
    let activityListString = activities.map((activity)=>(
        activity.name
    )).toString().replaceAll(',', ', ')

    let amenitiesListString = amenities.map(amenityNode => (
        amenityNode.map(amenity => (amenity.name))
    )).toString().replaceAll(',', ', ')

    // console.log(activityList)
    // console.log(entranceFees)

    const handleAddFavorite = async () => {
        if (!isFavoritePark) {
            setShowConfirmModal(true);
        } else {
            alert('This park has already been added to your favorites.');
        }
    };

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
    const confirmAddFavorite = async () => {
        try {
            const favoriteResponse = await fetch("/addUserFavorite?parkCode=" + parkCode, {
                method: 'POST',
                credentials: 'include',
            });
            if (favoriteResponse.ok) {
                setIsFavoritePark(true);
                setShowAddedMessage(true);
                setTimeout(() => setShowAddedMessage(false), 6000);  // Message disappears after 3 seconds
            } else {
                alert("Failed to add to favorites");
            }
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
        setShowConfirmModal(false);
    };


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
                // console.log(data)
                setAmenities(data);
            });
    };

    const handleSeeMoreClick = () => {
        if (!isExpanded) {
            fetchParkAmenities(); // Fetch amenities before expanding
        }
        setIsExpanded(!isExpanded); // Toggle expanded state
    };


    let clickableActivitiesList = activityListString.split(', ').map((activity, index) => (
        <React.Fragment key={index}>
            {index > 0 && ', '}
            <span
                id={`${parkCode}-${activity}`}
                key={activity.id}
                onMouseEnter={(e) => e.target.style.color = 'blue'}
                onMouseLeave={(e) => e.target.style.color = 'black'}
                onClick={() => onActivityClick(activity)}
                className='cursor-pointer'
            >{activity}</span>
        </React.Fragment>


    ));





    let clickableAmenitiesList = amenitiesListString.split(', ').map((amenity, index) => (
        <React.Fragment key={index}>
            {index > 0 && ', '}
            <span
                id={`${parkCode}-${amenity}`}
                key={amenity.id}
                onMouseEnter={(e) => e.target.style.color = 'blue'}
                onMouseLeave={(e) => e.target.style.color = 'black'}
                onClick={() => onAmenityClick(amenity)}
                className='cursor-pointer'
            >{amenity}</span>
        </React.Fragment>
    ));

    // const handleActivityClick = (activityId) => {
    //     onActivityClick(activityId); // Call the callback function from props
    // };



    // Map activities to clickable elements
    // let activitiesList = activities.map(activity => (
    //     <span key={activity.id} onClick={() => handleActivityClick(activity.name)} className="cursor-pointer text-blue-500 hover:underline">{activity.name}, </span>
    // ));

    return (
        <div id={`${parkCode}-park-card`} className="relative rounded-[2.5rem] w-full overflow-hidden shadow-lg p-5 bg-orange-50" >
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
                    <div id={"name-for-"+parkCode} data-testid="title-button" className="flex hover:cursor-pointer" onClick={handleSeeMoreClick}>

                        {fullName}

                    </div>
                    <div  className="flex">
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
                        {/*        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}*/}
                        {/*             stroke="currentColor" className="w-6 h-6">*/}
                        {/*            <path strokeLinecap="round" strokeLinejoin="round"*/}
                        {/*                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>*/}
                        {/*        </svg>*/}
                        {/*    )}*/}
                        {/*</button>*/}
                        <Button data-testid="favorite-button" id={"add-favorite-"+parkCode} onClick={handleAddFavorite} gradientDuoTone="pinkToOrange">
                            {isFavoritePark ? 'Favorite Added' : 'Add to Favorites'}
                        </Button>
                    </div>
                    {showConfirmModal && (
                        <Modal show={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
                            <Modal.Header>
                                Confirm Addition
                            </Modal.Header>
                            <Modal.Body>
                                <p>Are you sure you want to add this park to your favorites?</p>
                                <div className="flex justify-end space-x-2">
                                    <Button id="cancel-add-favorite" color="failure" onClick={() => setShowConfirmModal(false)}>Cancel</Button>
                                    <Button data-testid="confirm-add-button" id="confirm-add-favorite" onClick={confirmAddFavorite}>Confirm</Button>
                                </div>
                            </Modal.Body>
                        </Modal>
                    )}
                </div>
                {showAddedMessage && (
                    <div id="add-confirmation-message" className="text-green-500">
                        Park has been added to favorites!
                    </div>
                )}
                <p className="font-thin text-lg">
                    {description}                </p>
                {isExpanded && (
                    <div className="bg-pink-100 p-2 rounded-[0.5rem] mt-4">

                        <div className="flex my-3">
                            <a href={url} id={`${parkCode}-park-url`} className="font-medium hover:cursor-pointer hover:underline text-green-600"> Click Here to
                                Learn More About {fullName}! </a>
                            <br></br>
                        </div>

                        <Tabs theme={customTheme} aria-label="Default tabs" style="underline">
                            <Tabs.Item active title="Activities">
                                <span
                                    className="font-medium text-gray-800 dark:text-white">{clickableActivitiesList.length > 0 ? clickableActivitiesList :
                                    <p>No activities listed :(</p>}</span>
                            </Tabs.Item>

                            {/*<Tabs.Item active title="Activities">*/}
                            {/*    <span className="font-medium text-gray-800 dark:text-white">*/}
                            {/*        {activitiesList.length > 0 ? activitiesList : <p>No activities listed :(</p>}*/}
                            {/*    </span>*/}
                            {/*</Tabs.Item>*/}

                           {/* <Tabs.Item active title="Amenities">*/}
                           {/*<span className="font-medium text-gray-800 dark:text-white">*/}
                           {/*    {amenitiesList.length > 0 ? amenitiesList :*/}
                           {/*        <p>No amenities listed :(</p>}*/}
                           {/*</span>*/}
                           {/* </Tabs.Item>*/}

                            <Tabs.Item active title="Amenities">
                                <span
                                    className="font-medium text-gray-800 dark:text-white">{clickableAmenitiesList.length > 0 ? clickableAmenitiesList :
                                    <p>No amenities listed :(</p>}</span>
                            </Tabs.Item>

                            <Tabs.Item title="Location">
                                <span className="font-medium text-gray-800 dark:text-white">Address: {address}</span>
                                <p onMouseEnter={(e) => e.target.style.color = 'blue'}
                                      onMouseLeave={(e) => e.target.style.color = 'black'}
                                      onClick={() => onStateClick(stateCode)}
                                      id={`${parkCode}-${stateCode}-button`}
                                        className='cursor-pointer'
                                      >{stateCode}</p>
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
                        id={`${parkCode}-see-more-button`}
                        data-testid="see-more-button"
                        onClick={handleSeeMoreClick}
                        gradientDuoTone="pinkToOrange"
                        fullSized="true">
                        {isExpanded ? 'See Less' : 'See More'}
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default ParkCard