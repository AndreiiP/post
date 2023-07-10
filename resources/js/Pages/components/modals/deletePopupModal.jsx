import React from 'react';

const deletePopupModal = ({ onDelete, onCancel }) => {
    return (
        <div className="modal-overlay">
            <div className="text-center modal-content rounded-lg">
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
