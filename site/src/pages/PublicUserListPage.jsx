import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import UserCard from "../components/UserCard";
import Modal from "../components/Modal"
import ParkFavoritesSection from "../components/ParkFavoritesSection";
import ParkCard from "../components/ParkCard";

function PublicUserListPage() {
    const [usersList, setUsersList] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showSpinner, setShowSpinner] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [suggestedParkDetails, setSuggestedParkDetails] = useState(null)

    useEffect(() => {
        fetchUsersAndFavorites();
    }, []);




    const fetchUsersAndFavorites = async () => {
        setShowSpinner(true);
        try {
            const response = await fetch("/listUserFavorites", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            // console.log(response)
            const data = await response.json();
            // console.log(data)
            if (response.ok) {
                const users = Object.keys(data).map(username => ({
                    username: username,
                    favorites: data[username].map(parkName => ({ parkName })),
                }));
                // console.log(users);
                setUsersList(users);
            } else {
                console.error("Could not fetch users and favorites");
            }
        } catch (e) {
            console.error("An error occurred while fetching users and their favorites", e);
        } finally {
            setShowSpinner(false);
        }
    };

    const validateUsers = () => {
        const publicUsernames = usersList.map(user => user.username);
        const invalidUsers = selectedUsers.filter(user => !publicUsernames.includes(user));
        if (invalidUsers.length > 0) {
            setErrorMessage('Some selected users are private or do not exist.');
            setSelectedUsers([]);
            return false;
        }
        setErrorMessage('');
        return true;
    };


    const handleSelectUser = (username) => {
        const isSelected = selectedUsers.includes(username);
        setSelectedUsers(isSelected
            ? selectedUsers.filter(user => user !== username)
            : [...selectedUsers, username]);
    };

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchInput && !selectedUsers.includes(searchInput)) {
            setSelectedUsers([...selectedUsers, searchInput]);
        }
        setSearchInput('');
    };



    const handleCompareFavorites = async () => {
        console.log("Comparing favorites for: ", selectedUsers);
        if (!validateUsers()) return;
        setIsLoading(true);
        try {
            const response = await fetch("/commonFavorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(selectedUsers),
            });
            if (response.ok) {
                const data = await response.json();
                // console.log(data)
                const sortedEntries = Object.entries(data).sort((a, b) => b[1].length - a[1].length);
                const sortedData = Object.fromEntries(sortedEntries);
                const content = (
                    <div>
                        {Object.entries(sortedData).map(([parkName, usernames], index) => (
                            <ParkFavoritesSection
                                key={index}
                                parkName={parkName}
                                usernames={usernames}
                                totalSelectedUsers={selectedUsers.length}
                            />
                        ))}
                    </div>
                );
                setModalContent(content);
                setIsModalOpen(true);
                console.log("Common favorites response:", data);
            } else {
                console.error("Failed to fetch common favorites:", response.statusText);
            }
        } catch (error) {
            console.error("An error occurred while fetching common favorites:", error);
        }
        finally {
            setIsLoading(false)
        }
    };

    const handleSuggestPark = async () => {
        if (!validateUsers()) return;
        setIsLoading(true);
        try {
            const response = await fetch("/suggestFavoritePark", {  // Adjust this to your actual endpoint
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(selectedUsers),
            });
            if (response.ok) {
                const suggestedParkName = await response.text();
                const content = (
                    <div>
                            <ParkFavoritesSection
                                parkName={suggestedParkName}
                            />
                    </div>
                );
                setModalContent(
                    content
                )
                setIsModalOpen(true);
            } else {
                console.log("Failed to fetch suggestion:", response.statusText);
                const msg = await response.text()
                setModalContent(
                    <div data-testid="failed-suggestion-message">
                        {msg}
                    </div>
                )
                setIsModalOpen(true);

            }
        } catch (error) {
            console.error("An error occurred while fetching park suggestion:", error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="w-screen">
            <Header/>
            <div className="p-3 w-full">
                <h1 className="p-5 text-3xl font-semibold">Users & Their Favorites</h1>
                {errorMessage && (
                    <div className="pl-5 text-red-500 mb-4">
                        {errorMessage}
                    </div>
                )}
                <div className="pl-5 mb-4">
                    Current Selection: {selectedUsers.join(', ')}
                </div>
                <form onSubmit={handleSearchSubmit} className="pl-5 mb-4">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={handleInputChange}
                        placeholder="Enter username"
                        className="text-black mr-2"
                        id={"searchbar"}
                    />
                    <button id="search-enter" type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Add User
                    </button>
                </form>
                <button
                    className="mb-4 ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
                    id={"compare-favorites-button"}
                    onClick={handleCompareFavorites} disabled={isLoading || selectedUsers.length === 0}>
                    Compare Favorites
                </button>
                <button
                    id={"suggest-button"}
                    className="mb-4 ml-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={handleSuggestPark}
                    disabled={isLoading || selectedUsers.length === 0}>
                    Suggest a Park
                </button>
                {showSpinner && (
                    <div className="text-center">
                        <Spinner size="xl"/>
                    </div>
                )}
                <div className="flex flex-wrap justify-center">
                    {usersList.length > 0 && !showSpinner && (
                        usersList.map((user, index) => (
                            <UserCard
                                key={index}
                                user={user}
                                onSelectUser={handleSelectUser}
                                isSelected={selectedUsers.includes(user.username)}
                            />
                        ))
                    )}
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} content={modalContent}/>
        </div>

    );
}

export default PublicUserListPage;
