import React, { useEffect, useState } from 'react';
import { addToPastes, updateToPastes } from "../Redux/pasteSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaSave } from 'react-icons/fa';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            // update
            dispatch(updateToPastes(paste));
            toast.success("Paste Updated Successfully");
        } else {
            // create
            dispatch(addToPastes(paste));
            toast.success("Paste Created Successfully");
        }

        setTitle('');
        setValue('');
        setSearchParams({});
    }

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            setTitle(paste.title);
            setValue(paste.content);
        }
    }, [pasteId]);

    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white w-full">
            <div className="flex flex-row gap-4 items-center mb-8">
                <input
                    className="p-3 rounded-lg bg-gray-800 border border-gray-700 flex-grow focus:outline-none focus:border-blue-500"
                    type="text"
                    placeholder="Enter the title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    className="p-3 bg-blue-600 rounded-lg text-blue-800
                     hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                    onClick={createPaste}
                >
                    <FaSave className="mr-2" />
                    {pasteId ? "Update Paste" : "Create Paste"}
                </button>
            </div>

            <div>
                <textarea
                    className="p-3 rounded-lg bg-gray-800 border border-gray-700 w-full focus:outline-none focus:border-blue-500"
                    value={value}
                    placeholder="Enter Content Here.."
                    onChange={(e) => setValue(e.target.value)}
                    rows={25}
                />
            </div>
        </div>
    );
};

export default Home;