import Header from "../components/Header";
import React, {useEffect, useState} from "react";
import {Spinner} from "flowbite-react";
import FavoriteParkCard from "../components/FavoriteParkCard";

function FavoritesPage(){
    const [favoritesList, setFavoritesList] = useState([])
    const [showSpinner, setShowSpinner] = useState(false)
    const [listPublic, setListPublic] = useState(false)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    function ConfirmationDialog({ onConfirm, onCancel }) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
                <div className="bg-white p-4 rounded-lg shadow-xl">
                    <h2 className="text-lg font-bold">Confirm Deletion</h2>
                    <p>Are you sure you want to delete all favorites?</p>
                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            id="confirm-delete-all-button"
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={onConfirm}>
                            Confirm
                        </button>
                        <button
                            id="cancel-delete-all-button"
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            onClick={onCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const deleteAllFavorites = async () => {
        try{
            const response = await fetch("/deleteAllFavorites", {
                method: "DELETE",
                credentials: "include"
            })
            if(response.ok) {
                setFavoritesList([])
            }
        } catch(e){
            console.log(e)
        }
    }


    useEffect(() => {
        getFavorites()
        getListPublicity()

    }, []);

    const getFavorites = async () => {
        try {
            setShowSpinner(true)
            const response = await fetch("/getUserFavorites", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })
            const data = await response.json()
            if (response.ok){
                console.log(data)
                setFavoritesList(data)
                console.log(favoritesList)
            }
            setShowSpinner(false)
        }
        catch (e) {
            console.error("favorites could not be loaded")
            setShowSpinner(false)
        }
    }

    const increaseRanking = async (parkCode) => {
        try {
            const response = await fetch("/moveParkUp/" + parkCode, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok) {
                console.log("Rank increased successfully");
                getFavorites();  // Refresh the favorites to reflect the change
            } else {
                console.log("Failed to increase rank");
            }
        } catch (e) {
            console.log("Error in increaseRanking:", e);
        }
    }

    const decreaseRanking = async (parkCode) => {
        try {
            const response = await fetch("/moveParkDown/" + parkCode, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok) {
                console.log("Rank decreased successfully");
                getFavorites();  // Refresh the favorites to reflect the change
            } else {
                console.log("Failed to increase rank");
            }
        } catch (e) {
            console.log("Error in increaseRanking:", e);
        }
    }

    const getListPublicity = async() => {
        try {
            const response = await fetch("/getUserVisibility", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await response.json();
            // console.log(data)
            if (response.ok){
                setListPublic(data.visibility)
            }
            else {
                // console.log("oopsies")
            }
        } catch (e){
            console.log(e)
        }
    }

    const handlePrivacyChange = async ()=> {
        try {
            const response = await fetch("/changeListVisibility?privacy=" +!listPublic,{
                credentials: "include",
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json",
                }
            })
            // console.log(response)
            if (response.ok){
                setListPublic(prevState => !prevState)
            }
            else {
                console.log("error changing privacy")
            }


        }
        catch (e) {
            console.log(e)
        }

    }


    return(
        <div className="w-screen">
            <Header/>
            <div className="p-3 w-full">
                    <h1 className="p-5 text-3xl font-semibold">
                        Favorites
                    </h1>

                <div className="text-center ">
                    {showSpinner && <Spinner size="xl"></Spinner>}
                </div>
                <div className="flex flex-col w-full">

                    {favoritesList.length > 0 && !showSpinner && (

                        <ul className="p-4 w-full">
                            <div className="w-full flex flex-row justify-between items-center ">
                                <button
                                    className="p-2 ml-3 flex self-start font-semibold text-gray-700 rounded-[1rem] border-[2px] hover:cursor-pointer bg-gray-100 hover:bg-gray-200 "
                                    onClick={async () => getFavorites()}>
                                    Save changes
                                </button>

                                <button id="privacy-status-button" onClick={handlePrivacyChange}
                                        className="flex bg-orange-500 p-3 h-fit rounded-[1rem] hover:bg-[#2557D6]/90 mr-5">
                                    <span>Change privacy status to {listPublic ? "private" : "public"}</span>
                                </button>
                                <button
                                    id="delete-all-button"
                                    className="bg-red-600 p-3 rounded-[1rem] text-black hover:bg-red-800"
                                    onClick={() => setShowDeleteConfirmation(true)}>
                                    Delete All Favorites
                                </button>
                            </div>
                            {favoritesList.map((park, index) => (
                                <li id={`favorite-card-${park.parkCode}-${index+1}`} className="my-5" key={park.id}><FavoriteParkCard park={park}
                                                                                     increaseRanking={increaseRanking}
                                                                                     decreaseRanking={decreaseRanking}
                                                                                     getFavorites={getFavorites}/></li>
                            ))}
                        </ul>
                    )}
                </div>
                {showDeleteConfirmation &&
                    <ConfirmationDialog
                        onConfirm={() => {
                            deleteAllFavorites();
                            setShowDeleteConfirmation(false);
                        }}
                        onCancel={() => setShowDeleteConfirmation(false)}
                    />
                }
            </div>
        </div>
)
}

export default FavoritesPage
