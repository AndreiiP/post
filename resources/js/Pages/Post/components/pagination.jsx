import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

const Pagination = ({ links }) => {

    return (
        <div className="flex justify-center mt-6">
            {links.map((link, index) => (
                <InertiaLink
                    key={index}
                    href={link.url}
                    className={`px-4 py-2 mx-1 text-sm rounded ${
                        link.active ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"
                    }`}
                >
                    {link.label === "Next &raquo;" ? "»" : link.label === "&laquo; Previous" ? "«" : link.label}
                </InertiaLink>
            ))}
        </div>
    );
};

export default Pagination;
