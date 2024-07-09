import React from 'react';

function UserCard({ user, onSelectUser, isSelected }) {
    return (
        <div className={`p-4 border rounded-lg m-3 ${isSelected ? 'bg-blue-100' : 'bg-white'}`}>
            <h3 className="text-lg font-bold">{user.username}</h3>
            <ul className="list-disc pl-5">
                {user.favorites.map((park, index) => (
                    <li key={index}>{park.parkName}</li>
                ))}
            </ul>
            <button
                className="mt-2 p-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => onSelectUser(user.username)}>
                {isSelected ? 'Unselect' : 'Select'}
            </button>
        </div>
    );
}

export default UserCard;
