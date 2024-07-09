import LoginCard from "../components/LoginCard";
import Header from "../components/Header";
import React from "react";

const LoginPage = () => {
    return (
        <div>
        <Header></Header>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <LoginCard />
        </div>
        </div>
    );
};

export default LoginPage;