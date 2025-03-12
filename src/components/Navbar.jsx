import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPaste } from 'react-icons/fa';

const Navbar = () => {
    return (
        <div className="p-4 bg-gray-800 text-white flex flex-row gap-8 justify-center w-full">
            <NavLink
                to="/"
                className="flex items-center gap-2 hover:text-blue-500 transition duration-300 text-lg"
            >
                <FaHome />
                Home
            </NavLink>

            <NavLink
                to="/pastes"
                className="flex items-center gap-2 hover:text-blue-500 transition duration-300 text-lg"
            >
                <FaPaste />
                Pastes
            </NavLink>
        </div>
    );
};

export default Navbar;