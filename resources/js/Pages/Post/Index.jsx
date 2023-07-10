import { router, usePage } from "@inertiajs/react";
import { InertiaLink } from "@inertiajs/inertia-react";
import debounce from 'lodash.throttle';
import {useCallback, useEffect, useRef, useState} from 'react';
import axios from "axios";
import DeletePopupModal from "../components/modals/deletePopupModal.jsx";
import useClickOutside from "../../hooks/useClickOutside.jsx";

const PostList = ({ posts, setShowDeleteConfirmation, setPostId }) => {

    return (
        <tbody>
        {posts.map(({ id, title, body }) => (
            <tr key={id} className="">
                <td className="border-t">
                    <InertiaLink
                        href={route("posts.edit", id)}
                        className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                    >
                        {id}
                    </InertiaLink>
                </td>
                <td className="border-t">
                    <InertiaLink
                        href={route("posts.edit", id)}
                        className="flex truncate items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                        style={{ maxWidth: "250px" }}
                    >
                        {title}
                    </InertiaLink>
                </td>
                <td className="border-t">
                    <InertiaLink
                        tabIndex="1"
                        className="flex items-center px-6 py-4 truncate"
                        href={route("posts.edit", id)}
                        style={{ maxWidth: "350px" }}
                    >
                        {body.length > 200 ? `${body.substring(0, 200)}...` : body}
                    </InertiaLink>
                </td>
                <td className="border-t">
                    <InertiaLink
                        tabIndex="1"
                        className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                        href={route("posts.edit", id)}
                    >
                        Edit
                    </InertiaLink>
                    <InertiaLink
                        tabIndex="2"
                        className="ml-3 px-4 py-2 text-sm text-white bg-blue-900 rounded"
                        href={route("posts.show", id)}
                    >
                        Show
                    </InertiaLink>
                    <button
                        tabIndex="3"
                        className="ml-3 px-4 py-2 text-sm text-white bg-red-500 rounded"
                        onClick={() => {
                            setShowDeleteConfirmation(true)
                            setPostId(id)
                        }}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ))}
        {posts.length === 0 && (
            <tr>
                <td className="px-6 py-4 border-t" colSpan="4">
                    No posts found.
                </td>
            </tr>
        )}
        </tbody>
    );
};

const Index = () => {
    const { posts, errors } = usePage().props;
    const [postList, setPostList] = useState(posts.data);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [postId, setPostId] = useState(0);

    const handleClickOutside = () => {
        setShowDeleteConfirmation(false);
    };
    const popupRef = useClickOutside(handleClickOutside)

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

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/posts/${postId}`);
            if (response.status === 200) {
                const newPostList = postList.filter(post => post.id !== postId);
                setPostList(newPostList)
                updateUrl(newPostList)
                setShowDeleteConfirmation(false)
            }
        } catch (error) {
            console.error(error);
        }
    };

    function updateUrl(newPostList) {
        if (newPostList.length === 0) {
            const url = new URL(window.location.href);
            const currentPage = url.searchParams.get("page");
            const newPage = currentPage - 1 || currentPage;

            url.searchParams.set("page", newPage.toString());
            window.history.pushState(null, "", url.toString());
            window.location.reload();
        }
    }

    return (
        <>
            <div className="container mx-auto">
                <h1 className="mb-8 text-3xl font-bold text-center">Posts</h1>
                <div className="flex items-center justify-between mb-6">
                    <InertiaLink
                        className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                        href={route("posts.create")}
                    >
                        Create Post
                    </InertiaLink>

                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyUp={debounceHandleSearchInputChange}
                    />
                </div>

                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-white bg-gray-600">
                        <tr className="font-bold text-left">
                            <th className="px-6 pt-5 pb-4">#</th>
                            <th className="px-6 pt-5 pb-4">Title</th>
                            <th className="px-6 pt-5 pb-4">Description</th>
                            <th className="px-6 pt-5 pb-4">Action</th>
                        </tr>
                        </thead>
                        <PostList
                            posts={postList}
                            setShowDeleteConfirmation={setShowDeleteConfirmation}
                            setPostId={setPostId}
                        />
                    </table>
                </div>
                <div className="flex justify-center mt-6">
                    {posts.links.map((link, index) => (
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
            </div>
            {showDeleteConfirmation && (
                <div ref={popupRef} className="modal-wrapper">
                    <DeletePopupModal
                        onDelete={handleDelete}
                        onCancel={handleCancelDelete}
                    />
                </div>
            )}
        </>
    );
};

export default Index;
