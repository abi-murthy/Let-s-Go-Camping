import React from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import SearchPage from "./pages/SearchPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignUpPage"
import ProtectedRoute from "./components/ProtectedRoute";
import OpenRoute from "./components/OpenRoute";

import FavoritesPage from "./pages/FavoritesPage";
import PublicUserListPage from "./pages/PublicUserListPage";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/favoritesPage" element={<ProtectedRoute component={FavoritesPage}/>} />
                <Route path="/publicUserListPage" element={<ProtectedRoute component={PublicUserListPage}/>} />
                <Route path="/searchPage" element={<ProtectedRoute component={SearchPage} />} />
                <Route path="/loginPage" element={<OpenRoute component={LoginPage} />} />
                <Route path="/signupPage" element={<OpenRoute component={SignupPage} />} />
                <Route path="*" element={<Navigate to="/searchPage" replace />} />
            </Routes>
        </div>
    )
}

export default App