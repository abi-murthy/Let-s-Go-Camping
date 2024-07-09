import {Navbar} from "flowbite-react";
import {NavbarLink} from "flowbite-react";
import React from "react";
import logo from "../styles/campLogo.png"
import {useAuth} from "../hoooks/AuthContext";


function Header() {
    const {isLoggedIn, logout} = useAuth()
    return (
        <Navbar className="p-8 bg-green-800 w-full" fluid>
            <Navbar.Brand href="https://flowbite-react.com">
                <img src={logo} className="h-[48px] m-3 rounded-full text-lg" alt="Let's Go Camping Logo"/>
                <div className="flex flex-col">
                    <span
                        className="flex self-center text-yellow-400 whitespace-nowrap text-2xl font-semibold dark:text-white">Let&lsquo;s Go Camping!</span>
                    <span className="flex text-gray-100 text-sm">Team 29</span>
                </div>
            </Navbar.Brand>
        <Navbar.Toggle/>
        {isLoggedIn ? (
            <Navbar.Collapse>
                <NavbarLink id="search-link" href="/SearchPage" className="text-white">Search</NavbarLink>
                <NavbarLink id="public-user-link" href="/PublicUserListPage" className="text-white">Public Users' Lists</NavbarLink>
                <NavbarLink id="favorites-link" href="/FavoritesPage" className="text-white">Favorites</NavbarLink>
                <NavbarLink id="logout-link" className="text-white" onClick={async () => await logout()} href="#">Logout</NavbarLink>
            </Navbar.Collapse>
        ) : (
            <Navbar.Collapse>
                <NavbarLink id="signup-link" className="text-white" href="/SignUpPage">Sign Up</NavbarLink>
                <NavbarLink id="login-link" className="text-white" href="/LoginPage">Login</NavbarLink>
            </Navbar.Collapse>
        )}
        </Navbar>)
}

export default Header
