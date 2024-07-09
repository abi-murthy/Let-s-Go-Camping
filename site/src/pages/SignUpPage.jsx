import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import {useNavigate} from "react-router-dom";
import {Button, Modal} from "flowbite-react";

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isFormEmpty, setIsFormEmpty] = useState(true);
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false);

    const validateForm = () => {
        if (!username || username.length < 5) {
            setError('Username must be at least 5 characters long.');
            setIsFormValid(false);
            return false;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{1,}$/;
        if (!passwordRegex.test(password)) {
            setError('Password requires one uppercase, one lowercase, and one number.');
            setIsFormValid(false);
            return false;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setIsFormValid(false);
            return false;
        }

        setError('');
        setIsFormValid(true);
        return true;
    };

    const checkIfFormEmpty = () => {
        if (!username && !password && !confirmPassword) {
            setIsFormEmpty(true);
            return true;
        }

        setIsFormEmpty(false);
        return false;
    };

    useEffect(() => {
        validateForm();
        checkIfFormEmpty();
    }, [username, password, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid) {
            // console.log('Form submitted');
            try {
                const response = await fetch('/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
                    credentials: 'include',
                })

                const data = await response.json();
                console.log(data)
                if (response.ok){
                    navigate("/LoginPage")
                } else {
                    setError(data.error)
                }


            } catch (e){
                console.log(e)
                setError("Error during signup, server error")
            }

        }

    };

    const clearForm = () => {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setOpenModal(false);
    };

    return (
        <div className="flex flex-col items-center h-screen bg-gray-100">

            <Header />
            <div className="flex h-screen min-w-full justify-center items-center">
                <div className="flex-col max-w-md w-full bg-white rounded px-8 pt-6 pb-10 mx-5">
                    <label className="block text-brown-700 text-2xl font-bold mb-4" htmlFor="Sign Up">
                        Sign Up
                    </label>
                    {error && <div className="mb-4 text-red-500" data-testid = "error-message" >{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                data-testid="username-input"
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                data-testid="initial-password-input"
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                                Confirm Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                data-testid="confirm-password-input"
                                id="confirm-password"
                                type="password"
                                placeholder="Must be same as Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <Button onClick={() => setOpenModal(true)}
                                    id="signup-cancel"
                                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline`}
                                    data-testid="signup-cancel"
                                    disabled={isFormEmpty}>
                                Cancel
                            </Button>
                            <button
                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                                id="submit-button"
                                data-testid="submit-button"
                                type="submit"
                                disabled={!isFormValid}
                                onClick={handleSubmit}>
                                Sign Up
                            </button>
                            <Modal dismissible size="md" show={openModal} onClose={() => setOpenModal(false)}>
                                <Modal.Header>Cancel Confirmation</Modal.Header>
                                <Modal.Body>
                                    <p> Are you sure you would like to cancel your sign up? This will clear your form. </p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button
                                        id="cancel-true"
                                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                                        data-testid="cancel-true"
                                        onClick={clearForm}>
                                        Yes, cancel.
                                    </button>
                                    <Button color="gray" onClick={() => setOpenModal(false)}
                                            id="cancel-false"
                                            data-testid="cancel-false">
                                        No, I changed my mind.
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
