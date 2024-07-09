import React, {createContext, useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Header from "../components/Header";

const AuthContext = createContext({
    isLoggedIn: false,
    login: async () => {
        console.log("login failed");
    },
    logout: async () => {
        console.log("logout failed");
    }
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const validateSession = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/auth/validate', {
                    credentials: 'include',
                });
                if (response.ok) {
                    //console.log("valid")
                    setIsLoggedIn(true)
                } else {
                    console.log("nooo")
                    setIsLoggedIn(false)
                }
            } catch (error) {
                console.error('Session validation error:', error)
                setIsLoggedIn(false)
            } finally {
                setIsLoading(false);
            }
        };
            validateSession();
    }, []);



    useEffect(() => {
        let logoutTimer;

        const resetTimer = () => {
            if (isLoggedIn) {
                clearTimeout(logoutTimer);
                logoutTimer = setTimeout(() => {
                    logout();
                }, 60000);
            }
        };

        const events = ['click', 'mousemove', 'keypress', 'scroll'];
        events.forEach(event => window.addEventListener(event, resetTimer));

        resetTimer();
        return () => {
            events.forEach(event => window.removeEventListener(event, resetTimer));
            clearTimeout(logoutTimer);
        };
    }, [isLoggedIn]);


    const login = async (username, password) => {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
                credentials: 'include',
            });
            console.log(response)
            const data = await response.json()

            if (response.ok) {
                setIsLoggedIn(true);
                navigate("/SearchPage")
                return "Login successful"
            } else {
                setIsLoggedIn(false);
                return data.error
            }
        } catch (error) {
            console.log('Login error:', error);
            setIsLoggedIn(false);
            return error
        }
    };
    const logout = async () => {
        try{
            const response = await fetch('/logout', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                setIsLoggedIn(false);
            } else {
                console.error("not logged out?")
            }
        } catch (e) {
            console.error("logout failed")
            console.log(e)
        }

        setIsLoggedIn(false)
    }
    if (isLoading) {
        return (
            <div className="w-screen h-screen">
                <Header/>
            </div>
        )
    }
    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
