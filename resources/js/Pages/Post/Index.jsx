import { usePage } from "@inertiajs/react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { useState } from 'react';
import axios from "axios";
import DeletePopupModal from "./components/deletePopupModal.jsx";
import PostSearchForm from "./components/postSearchForm.jsx";
import PostTable from "./components/postTable.jsx";
import Pagination from "./components/pagination.jsx";
import ErrorPopupModal from "./components/errorPopupModal.jsx";

const Index = () => {
    const { posts } = usePage().props;
    const [postList, setPostList] = useState(posts.data);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [postId, setPostId] = useState(0);

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
            setShowDeleteConfirmation(false)
            setShowErrorPopup(true)
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
                    <PostSearchForm
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
                <div className="modal-wrapper">
                    <DeletePopupModal
                        onDelete={handleDelete}
                        onCancel={handleCancelDelete}
                        setShowDeleteConfirmation={setShowDeleteConfirmation}
                    />
                </div>
            )}
            {showErrorPopup && (
                <div className="modal-wrapper">
                    <ErrorPopupModal
                        setErrorPopup={setShowErrorPopup}
                        errorMessage={"An error occurred, please try again later"}
                    />
                </div>
            )}
        </>
    );
};

export default Index;
