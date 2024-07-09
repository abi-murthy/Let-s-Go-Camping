import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hoooks/AuthContext';

const OpenRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Component {...rest} />;
    }
    console.log("NAVIGATING TO SEARCH AS LOGGED IN DOESNT NEED TO SIGNIN OR SIGNUP")
    return <Navigate to="/SearchPage"/>;

};

export default OpenRoute;