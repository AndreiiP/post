// SearchForm.jsx
import React, { useCallback } from 'react';
import debounce from 'lodash.throttle';
import { router } from '@inertiajs/react';

const SearchForm = ({ setPostList}) => {
    const debounceHandleSearchInputChange = useCallback(
        debounce(event => {
            let query = "?query=" + event.target.value;
            router.get(`/posts${query}`, {}, {
                onSuccess: (page) => {
                    setPostList(page.props.posts.data)
                },
                preserveState: true,
            });
        }, 300),
        [router]
    );

    return (
        <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyUp={debounceHandleSearchInputChange}
        />
    );
};

export default SearchForm;
