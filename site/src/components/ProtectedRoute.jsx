import React from 'react';
import { Navigate} from 'react-router-dom';
import { useAuth } from '../hoooks/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn} = useAuth();

    if (isLoggedIn) {
        return <Component {...rest} />;
    }
    console.log("NAVIGATING TO LOGIN AS USER NOT LOGGED IN")

    return <Navigate to="/loginPage"/>;

};

export default ProtectedRoute;