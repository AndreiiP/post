import React, { useRef } from 'react';
import useOutsideClick from "../../../hooks/useClickOutside.jsx";

const deletePopupModal = ({ onDelete, onCancel, setShowDeleteConfirmation }) => {

    const deletePopupRef = useRef(null);

    useOutsideClick(deletePopupRef, () => {
        setShowDeleteConfirmation(false);
    });

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div ref={deletePopupRef} className="text-center bg-white p-8 rounded-lg">
                <h3 className="text-lg mb-4">Are you sure you want to delete the post?</h3>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={onDelete}
                >
                    Delete
                </button>
                <button
                    className="border border-gray-500 hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default deletePopupModal;
