import React, { useEffect, useState } from 'react';
import {Tooltip} from "flowbite-react";
import PublicPageCard from "./PublicPageCard";

function ParkFavoritesSection({ parkName, usernames, totalSelectedUsers }) {
    const [parkDetails, setParkDetails] = useState(null);
    const [usernamesCSV, setUsernamesCSV] = useState("")

    const fetchParkDetails = async () => {
        const response = await fetch(`/search/name?name=${encodeURIComponent(parkName)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        console.log(response)
        if (response.ok) {
            const data = await response.json();
            setParkDetails(data.length > 0 ? data[0] : null); // Assuming the API returns an array of parks
        } else {
            console.error("Failed to fetch park details");
        }
    };

    useEffect(() => {
        fetchParkDetails();
    }, [parkName]);

    useEffect(() => {
        if (usernames) {
            setUsernamesCSV(usernames.join(', '));
        }
    }, [usernames]);


    return (
        <div className="border p-4 rounded-lg shadow m-3">
            <h3 className="text-lg font-bold" data-testid={`title-${parkName}`}>{parkName}</h3>
            <div>
                {usernames && (
                    <Tooltip id={"tooltip"+parkName} data-testid={`tooltip-${parkName}`} content={usernamesCSV}>
                        <p className="cursor-pointer">
                            {usernames.length}/{totalSelectedUsers} of selected users like this park
                        </p>
                    </Tooltip>
                )}

            </div>
            {/*<p className="text-sm mt-2">Usernames: {usernamesCSV}</p>*/}
            {parkDetails ? <PublicPageCard classname="py-3" park={parkDetails} /> : <p className="p-5">Loading park details...</p>}
        </div>
    );
}

export default ParkFavoritesSection;

