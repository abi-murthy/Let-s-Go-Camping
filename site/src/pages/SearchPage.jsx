import React, { useState, useEffect } from 'react'
import { Button } from 'flowbite-react'
import { Spinner } from 'flowbite-react'
import ParkCard from "../components/ParkCard";
import Header from "../components/Header";
const SearchPage = () => {
    const states = [
        {id: 1, stateCode: "AL"},
        {id: 2, stateCode: "AK"},
        {id: 3, stateCode: "AZ"},
        {id: 4, stateCode: "AR"},
        {id: 5, stateCode: "CA"},
        {id: 6, stateCode: "CO"},
        {id: 7, stateCode: "CT"},
        {id: 8, stateCode: "DE"},
        {id: 9, stateCode: "FL"},
        {id: 10, stateCode: "GA"},
        {id: 11, stateCode: "HI"},
        {id: 12, stateCode: "ID"},
        {id: 13, stateCode: "IL"},
        {id: 14, stateCode: "IN"},
        {id: 15, stateCode: "IA"},
        {id: 16, stateCode: "KS"},
        {id: 17, stateCode: "KY"},
        {id: 18, stateCode: "LA"},
        {id: 19, stateCode: "ME"},
        {id: 20, stateCode: "MD"},
        {id: 21, stateCode: "MA"},
        {id: 22, stateCode: "MI"},
        {id: 23, stateCode: "MN"},
        {id: 24, stateCode: "MS"},
        {id: 25, stateCode: "MO"},
        {id: 26, stateCode: "MT"},
        {id: 27, stateCode: "NE"},
        {id: 28, stateCode: "NV"},
        {id: 29, stateCode: "NH"},
        {id: 30, stateCode: "NJ"},
        {id: 31, stateCode: "NM"},
        {id: 32, stateCode: "NY"},
        {id: 33, stateCode: "NC"},
        {id: 34, stateCode: "ND"},
        {id: 35, stateCode: "OH"},
        {id: 36, stateCode: "OK"},
        {id: 37, stateCode: "OR"},
        {id: 38, stateCode: "PA"},
        {id: 39, stateCode: "RI"},
        {id: 40, stateCode: "SC"},
        {id: 41, stateCode: "SD"},
        {id: 42, stateCode: "TN"},
        {id: 43, stateCode: "TX"},
        {id: 44, stateCode: "UT"},
        {id: 45, stateCode: "VT"},
        {id: 46, stateCode: "VA"},
        {id: 47, stateCode: "WA"},
        {id: 48, stateCode: "WV"},
        {id: 49, stateCode: "WI"},
        {id: 50, stateCode: "WY"}
    ]


    const [parks, setParks] = useState([])
    const [searchType, setSearchType] = useState(0)

    const [activities, setActivities] = useState([])
    const [selectedActivity, setSelectedActivity] = useState('')

    const [topics, setTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState('')

    const [amenities, setAmenities] = useState([])
    const [selectedAmenity, setSelectedAmenity] = useState('')

    const [nameInput, setNameInput] = useState('')

    const [selectedState, setSelectedState] = useState("")

    const [showSpinner, setShowSpinner] = useState(false)

    const [searchHeading, setSearchHeading] = useState("")


    const [displayedParks, setDisplayedParks] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = 10;


    useEffect(() => {
        fetchActivities()
        fetchTopics()
        fetchAmenities()
        fetchAllParks()
            .then()
    }, [])

    const loadMoreParks = () => {
        if (displayedParks.length >= parks.length) {
            setHasMore(false);
            return;
        }
        const nextParks = parks.slice(displayedParks.length, displayedParks.length + pageSize);
        setDisplayedParks([...displayedParks, ...nextParks]);
        setHasMore(displayedParks.length + pageSize < parks.length);
    };

    const fetchActivities = () => {
        fetch("/activities", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json()) // Convert the response to JSON
            .then(data => {
                setActivities(data)
            })
    }

    const fetchTopics = () => {
        fetch("/topics", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            // Convert the response to JSON
            .then(data => {
                setTopics(data);
//                 console.log(data)
            });
    };

    const fetchAmenities = () => {
        fetch("/amenities", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json()) // Convert the response to JSON
            .then(data => {
                setAmenities(data);
//                 console.log(data)
            });
    };



    const fetchAllParks = async () => {
        setParks([])
        setDisplayedParks([])
        setShowSpinner(true)
        fetch("/search/allParks", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                setParks(data);
                setDisplayedParks(data.slice(0, pageSize)); // Directly update displayed parks
                setHasMore(data.length > pageSize);
                setSearchHeading("Showing all parks")
            })
            .catch(error => {
                console.error('Fetch error:', error);
            })
            .finally(() => {
                setShowSpinner(false)
            });
    }

    const fetchParks = async () => {
        // console.log(searchType)
        if (searchType === 0) await fetchParksByState()
        else if (searchType === 1) await fetchParksByActivity()
        else if (searchType === 2) await fetchParksByName()
        else if (searchType === 3) await fetchParksByTopics()
        else if (searchType === 4) await fetchParksByAmenities()
        else await fetchAllParks()
    }

    const fetchParksByActivity = async () => {
        // console.log("Fetching by activity")
        // console.log(activities)

        const activityName = activities.find(act => act.id === selectedActivity || act.name === selectedActivity)?.name
        if (!activityName) return
        // console.log("Activity Found!")
        setParks([])
        setDisplayedParks([])

        setShowSpinner(true)

        try {
            // console.log(activityName)
            const response = await fetch(`/activities/parks?q=${encodeURIComponent(activityName)}`)
            if (response.ok) {
                const data = await response.json()
//                 const parksWithID = data[0].parks.map(park=>({...park, id:park.parkCode}))
//                 console.log(parksWithID)
//                 console.log(data)
                setParks(data)
                setDisplayedParks(data.slice(0, pageSize)); // Directly update displayed parks
                setHasMore(data.length > pageSize);
                // console.log(data)
                setSearchHeading("Showing parks by activity: " + activityName)
            } else {
                console.error('Failed to fetch parks')
            }
        } catch (error) {
            console.error('Error fetching parks:', error)
        }
        finally{
            setShowSpinner(false)
        }
    }

    const fetchParksByTopics = async () => {
        const topicName = topics.find(act => act.id === selectedTopic)?.name;
        if (!topicName) return;
        setParks([])
        setDisplayedParks([])

        setShowSpinner(true)
        try {
            const response = await fetch(`/topics/parks?q=${encodeURIComponent(topicName)}`);
            if (response.ok) {
                const data = await response.json();
//                 const parks = data[0].parks.map(park=>({...park, id:park.parkCode}))
//                 console.log(data)
                setParks(data);
                setDisplayedParks(data.slice(0, pageSize)); // Directly update displayed parks
                setHasMore(data.length > pageSize);
                setSearchHeading("Showing parks by topic: " + topicName)
            } else {
                console.error('Failed to fetch parks');
            }
        } catch (error) {
            console.error('Error fetching parks:', error);
        }  finally{
            setShowSpinner(false)
        }
    };

    const fetchParksByAmenities = async () => {
        const amenityName = amenities.find(amenity => amenity.id === selectedAmenity || amenity.name === selectedAmenity)?.name;
        if (!amenityName) return;
        setParks([])
        setDisplayedParks([])

        setShowSpinner(true)
        try {
            const response = await fetch(`/amenities/parks?id=${encodeURIComponent(selectedAmenity)}`);
            if (response.ok) {
                const data = await response.json();


                setParks(data);
                setDisplayedParks(data.slice(0, pageSize)); // Directly update displayed parks
                setHasMore(data.length > pageSize);
                setSearchHeading("Showing parks by amenity: " + amenityName)
            } else {
                console.error('Failed to fetch parks');
            }
        } catch (error) {
            console.error('Error fetching parks:', error);
        }  finally{
            setShowSpinner(false)
        }
    };



    const fetchParksByName = async () => {
        if (nameInput === "") return
        setParks([])
        setDisplayedParks([])

        setShowSpinner(true)
        try {
            const response = await fetch(`/search/name?name=${encodeURIComponent(nameInput)}`);
            if(response.ok){
                const data = await response.json();
                setParks(data);
                setDisplayedParks(data.slice(0, pageSize)); // Directly update displayed parks
                setHasMore(data.length > pageSize);
                setSearchHeading("Showing parks for search: \"" + nameInput + "\"")

            }
            // console.log(response);
        } catch (e) {
            console.log(e)
        }
        finally {
            setShowSpinner(false)
        }
    };


    const fetchParksByAmenitiesSync = async (amty) => {
        // console.log(amenities)
        const amenityName = amenities.find(amenity => amenity.id === amty || amenity.name === amty)?.name;
        if (!amenityName) return;
        setShowSpinner(true)
        try {
            // console.log(selectedAmenity)
            const response = await fetch(`/amenities/parks?id=${encodeURIComponent(amty)}`);
            if (response.ok) {
                const data = await response.json();
                setParks(data);
                setDisplayedParks(data.slice(0, pageSize)); // Directly update displayed parks
                setHasMore(data.length > pageSize);
                setSearchHeading("Showing parks by amenity: " + amenityName)
            } else {
                console.error('Failed to fetch parks');
            }
        } catch (error) {
            console.error('Error fetching parks:', error);
        }  finally{
            setShowSpinner(false)
        }
    };


    const fetchParksByActivitySync = async (activ) => {
        // console.log("Fetching by activity")
        // console.log(activities)
        const activityName = activities.find(act => act.id === activ || act.name === activ)?.name
        if (!activityName) return
        // console.log("Activity Found!")
        setShowSpinner(true)

        try {
            // console.log(activityName)
            const response = await fetch(`/activities/parks?q=${encodeURIComponent(activ)}`)
            if (response.ok) {
                const data = await response.json()
                setParks(data)
                setDisplayedParks(data.slice(0, pageSize)); // Directly update displayed parks
                setHasMore(data.length > pageSize);
                // console.log(data)
                setSearchHeading("Showing parks by activity: " + activityName)
            } else {
                console.error('Failed to fetch parks')
            }
        } catch (error) {
            console.error('Error fetching parks:', error)
        }
        finally{
            setShowSpinner(false)
        }
    }


    const fetchParksByState = async () => {
        if (selectedState === "") return
        setShowSpinner(true)
        try {
            const response = await fetch(`/search/state/${selectedState}`)
            if (response.ok){
                const data = await response.json()
                // console.log(data)
                setParks(data)
                setDisplayedParks(data.slice(0, pageSize)); // Directly update displayed parks
                setHasMore(data.length > pageSize);
                setSearchHeading("Showing parks by state: " + selectedState)
            }
        } catch (e) {
            console.log(e)
        }
        finally {
            setShowSpinner(false)
        }
    }

    const fetchParksByStateSync = async (state) => {
        if (state === "") return
        setShowSpinner(true)
        try {
            const response = await fetch(`/search/state/${state}`)
            if (response.ok){
                const data = await response.json()
                // console.log(data)
                setParks(data)
                setDisplayedParks(data.slice(0, pageSize)); // Directly update displayed parks
                setHasMore(data.length > pageSize);
                setSearchHeading("Showing parks by state: " + state)
            }
        } catch (e) {
            console.log(e)
        }
        finally {
            setShowSpinner(false)
        }
    }

    const handleActivityClick = async (activityName) => {
        console.log("Handle Activity Click: " + activityName)
        const trimmedName = activityName.trim().toLowerCase();
        // console.log(activities)
        const activity = activities.find(a => a.name.toLowerCase() === trimmedName);
        if (activity) {
            setSelectedActivity(activityName);
            setSearchType(1);
            // if (searchType !== 1){
            //     setSearchType(1)
            // }
            // await fetchParks();
            await fetchParksByActivitySync(activityName)
        } else {
            console.log("Activity not found:", activityName);
        }
    };

    const handleAmenityClick = async (amenityName) => {
        const trimmedName = amenityName.trim().toLowerCase();

        const amenity = amenities.find(a => a.name.toLowerCase() === trimmedName);

        if (amenity) {
            setSelectedAmenity(amenity.id);
            setSearchType(4);
            if (searchType !== 4){
                setSearchType(4)
            }
            await fetchParksByAmenitiesSync(amenity.id)
        } else {
            console.log("Amenity not found:", amenityName);
        }
    };

    const handleStateClick = async (state) => {
        if (state){}
        setSelectedState(state)
        setSearchType(0)
        await fetchParksByStateSync(state)
    }

    return (

        <div>
            <Header></Header>
            <div className="m-3">

                <div className="m-3">
                    <div className="p-2">Search By:</div>
                    <Button.Group className="p-2">
                        <Button id="stateSelector" color="gray" onClick={() => setSearchType(0)}>State</Button>
                        <Button id="activitySelector" color="gray" onClick={() => setSearchType(1)}>Activity</Button>
                        <Button id="nameSelector" color="gray" onClick={() => setSearchType(2)}>Name</Button>
                    </Button.Group>

                    <Button.Group className="p-2">
                        <Button id="topicSelector" color="gray" onClick={() => setSearchType(3)}>Topic</Button>
                        <Button id="amenitySelector" color="gray" onClick={() => setSearchType(4)}>Amenity</Button>
                        <Button id="allParkSelector" color="gray" onClick={() => setSearchType(5)}>All Parks</Button>
                    </Button.Group>


                    <div className="w-full flex p-2 justify-between gap-4 " data-testid="spinnerSelects">
                        {searchType === 0 && (
                            <select
                                id="stateSelection"
                                data-testid="stateSelection"
                                className="flex-initial w-9/12  hover:bg-gray-100 rounded p-3  appearance-none"
                                onChange={(e) => setSelectedState(e.target.value)} value={selectedState}>
                                <option className="" value="">Select a state</option>
                                {states.map(state => (
                                    <option key={state.id} data-testid="state-option"
                                            value={state.stateCode}>{state.stateCode}</option>
                                ))}
                            </select>
                        )}
                        {searchType === 1 && (
                            <select
                                id="activitySelection"
                                data-testid="activitySelection"
                                className="flex-initial w-9/12 flex-1 hover:bg-gray-100 rounded p-3 appearance-none"
                                onChange={(e) => setSelectedActivity(e.target.value)} value={selectedActivity}>
                                <option className="" value="">Select an activity</option>
                                {activities.map(activity => (
                                    <option key={activity.id} data-testid="activity-option"
                                            value={activity.id}>{activity.name}</option>
                                ))}
                            </select>
                        )}
                        {searchType === 2 && (
                            <input
                                id="nameSelection"
                                data-testid="nameSelection"
                                className="flex-initial w-9/12 p-3 flex-1 rounded"
                                type="text"
                                placeholder="Enter park name"
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                            />
                        )}
                        {searchType === 3 && (
                            <select
                                id="topicSelection"
                                data-testid="topicSelection"
                                className="flex-initial w-9/12 hover:bg-gray-100 rounded p-3 appearance-none"
                                onChange={(e) => setSelectedTopic(e.target.value)} value={selectedTopic}>
                                <option className="" value="">Select a topic</option>
                                {topics.map(topic => (
                                    <option key={topic.id} data-testid="topic-option"
                                            value={topic.id}>{topic.name}</option>
                                ))}
                            </select>
                        )}
                        {searchType === 4 && (
                            <select
                                id="amenitySelection"
                                data-testid="amenitySelection"
                                className="flex-initial w-9/12 hover:bg-gray-100 rounded p-3 appearance-none"
                                onChange={(e) => setSelectedAmenity(e.target.value)} value={selectedAmenity}>
                                <option className="" value="">Select an amenity</option>
                                {amenities.map(amenity => (
                                    <option key={amenity.id} data-testid="amenity-option"
                                            value={amenity.id}>{amenity.name}</option>
                                ))}
                            </select>
                        )}

                        <button
                            id="submit-button"
                            data-testid="submit-button"
                            className="flex-grow bg-emerald-800 hover:bg-emerald-900 text-white font-bold p-3 rounded"
                            onClick={fetchParks}>Search
                        </button>

                    </div>
                    <div className="text-center mt-4">
                        {showSpinner && <Spinner size="xl"></Spinner>}
                    </div>
                    {!showSpinner &&
                        <h1 className="p-4 ml-6 text-3xl font-semibold">
                            {searchHeading}
                        </h1>
                    }

                    <div>
                        {displayedParks.length > 0 && !showSpinner && (
                            <ul id="parks-list" className="p-4">
                                {displayedParks.map(park => (
                                    <li className="my-5" key={park.id}>
                                        <ParkCard park={park} onActivityClick={handleActivityClick}
                                                  onAmenityClick={handleAmenityClick} onStateClick={handleStateClick}/>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {displayedParks.length === 0 && !showSpinner && (
                            <div className="text-center text-lg text-gray-500">
                                No search results.
                            </div>
                        )}
                        {hasMore && (
                            <button

                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                id="load-more-button"
                                onClick={loadMoreParks}>
                                Load More
                            </button>
                        )}
                        {!hasMore && parks.length > 0 && (
                            <div className="text-center text-lg text-gray-500">
                                No more results to load.
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>

    )
}

export default SearchPage