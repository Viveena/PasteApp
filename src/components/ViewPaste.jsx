import React from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

const ViewPaste = () => {
    const { id } = useParams();
    const allPastes = useSelector((state) => state.paste.pastes);
    const paste = allPastes.find((p) => p._id === id);

    if (!paste) {
        return <div className="p-8 bg-gray-900 min-h-screen text-white w-full">Paste not found</div>;
    }

    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white w-full">
            <div className="mb-8">
                <input
                    className="p-3 rounded-lg bg-gray-800 border border-gray-700 w-full focus:outline-none focus:border-blue-500"
                    type="text"
                    placeholder="Enter the title"
                    value={paste.title}
                    disabled
                />
            </div>

            <div>
                <textarea
                    className="p-3 rounded-lg bg-gray-800 border border-gray-700 w-full focus:outline-none focus:border-blue-500"
                    value={paste.content}
                    disabled
                    placeholder="Enter Content Here.."
                    rows={25}
                />
            </div>
        </div>
    );
};

export default ViewPaste;