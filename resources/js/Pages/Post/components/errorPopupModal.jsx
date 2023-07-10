import React from 'react';

const errorPopupModal = ({ setErrorPopup, errorMessage }) => {

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center bg-white p-8 rounded-lg">
                <h3 className="text-lg mb-4">{ errorMessage }</h3>
                <button
                    className="border border-gray-500 hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded"
                    onClick={()=> setErrorPopup(false)}
                >
                    Ok
                </button>
            </div>
        </div>
    );
};

export default errorPopupModal;
