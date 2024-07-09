import React, { useState} from 'react'
import {useAuth} from "../hoooks/AuthContext";

const LoginCard = () => {
    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)
    const {login} = useAuth()
    const [loading, setLoading] = useState(false)


    function validateUsername(username) {
        return username.trim() !== ''
    }

    function validatePassword(password) {
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        return hasUpper && hasLower && hasNumber;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasAttemptedSubmit(true)
        setLoading(true)

        let isValid = true
        if (!validateUsername(username)) {
            setUsernameError("Invalid username format")
            isValid = false
        } else {
            setUsernameError('')
        }

        if(!validatePassword(password)) {
            setPasswordError("Invalid password format")
            isValid = false
        } else {
            setPasswordError('')
        }

        if(isValid) {
            console.log('Form submitted')
            try {
                const msg = await login(username, password)
                setPasswordError(msg)
            }
            catch (e) {
                setPasswordError("Login Failed")
            }
            finally {
                setLoading(false)
            }
        }
        setLoading(false)
    }

    return (
        <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <form onSubmit={handleSubmit}>
                <h1 className="block justify-center text-gray-700 text-2xl font-bold mb-2">Login</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" value={username}
                           onChange={(e) => setUsername(e.target.value)}/>
                    {hasAttemptedSubmit && usernameError && <p className="text-red-500 text-xs italic" data-testid="username-error-message">{usernameError}</p>}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    {hasAttemptedSubmit && passwordError && <p className="text-red-500 text-xs italic" data-testid="pass-error-message">{passwordError}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" id="submit-button" type="submit" data-testid="Button" disabled={loading}>
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginCard;