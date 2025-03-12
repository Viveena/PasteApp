import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../Redux/pasteSlice';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaCopy, FaShareAlt, FaSearch, FaStreetView, FaEye } from 'react-icons/fa';

const Paste = () => {
    const pastes = useSelector((state) => state.paste.pastes);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    const filteredData = pastes.filter(
        (paste) => paste.title.toLowerCase().includes(search.toLowerCase())
    );

    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId));
        toast.success("Paste Deleted Successfully");
    }

    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white w-full">
            <div className="flex flex-row gap-4 items-center mb-8">
                <FaSearch className="text-gray-400" />
                <input
                    className="p-3 rounded-lg bg-gray-800 border border-gray-700 flex-grow focus:outline-none focus:border-blue-500"
                    type="search"
                    placeholder="Search here"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredData.length > 0 && filteredData.map((paste) => (
                    <div key={paste._id} className="p-6 rounded-lg bg-gray-800 border border-gray-700">
                        <div className="font-bold text-lg mb-4">{paste.title}</div>
                        <div className="text-gray-300 mb-6">{paste.content}</div>
                        <div className="flex flex-row gap-4 items-center text-gray-400">
                            <button className="hover:text-blue-500 transition duration-300">
                                <a href={`/?pasteId=${paste._id}`}>
                                    <FaEdit />
                                </a>
                            </button>
                            <button className="hover:text-blue-500 transition duration-300">
                                <a href={`/pastes/${paste._id}`}>
                                    <FaEye />
                                </a>
                            </button>
                            <button
                                className="hover:text-red-500 transition duration-300"
                                onClick={() => handleDelete(paste._id)}
                            >
                                <FaTrash />
                            </button>
                            <button
                                className="hover:text-green-500 transition duration-300"
                                onClick={() => {
                                    navigator.clipboard.writeText(paste.content);
                                    toast.success("Copied to clipboard");
                                }}
                            >
                                <FaCopy />
                            </button>
                        </div>
                        <div className="text-sm text-gray-500 mt-4">
                            Created: {new Date(paste.createdAt).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Paste;