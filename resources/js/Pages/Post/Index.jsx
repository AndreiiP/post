import { usePage } from "@inertiajs/react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { useState } from 'react';
import axios from "axios";
import DeletePopupModal from "../components/modals/deletePopupModal.jsx";
import useClickOutside from "../../hooks/useClickOutside.jsx";
import SearchForm from "./components/searchForm.jsx";
import PostTable from "./components/postTable.jsx";
import Pagination from "./components/pagination.jsx";

const Index = () => {
    const { posts, errors } = usePage().props;
    const [postList, setPostList] = useState(posts.data);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [postId, setPostId] = useState(0);

    const handleClickOutside = () => {
        setShowDeleteConfirmation(false);
    };
    const popupRef = useClickOutside(handleClickOutside)

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
                    <SearchForm
                        setPostList={setPostList}
                    />
                </div>
                <PostTable
                    posts={postList}
                    setShowDeleteConfirmation={setShowDeleteConfirmation}
                    setPostId={setPostId}
                />
                <Pagination
                    links={posts.links}
                />
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
