
import React, { useState } from "react";
import { router, usePage } from '@inertiajs/react'
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import axios from "axios";
import DeletePopupModal from '../components/modals/DeletePopupModal.jsx';

const Edit = () => {
    const { post } = usePage().props;
    const { data, setData, put, errors } = useForm({
        title: post.title || "",
        body: post.body || "",
    });
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        put(route("posts.update", post.id));
    }

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    async function handleDelete(e) {
        e.preventDefault();

        try {
            const response = await axios.delete(`/posts/${post.id}`);
            if (response.status === 200) {
                return router.visit(route('posts.index'));
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="mt-20">
            <div className="container flex flex-col justify-center mx-auto">
                <div>
                    <h1 className="mb-8 text-3xl font-bold">
                        <InertiaLink
                            href={route("posts.index")}
                            className="text-indigo-600 hover:text-indigo-700"
                        >
                            Posts
                        </InertiaLink>
                        <span className="font-medium text-indigo-600"> /</span>
                        Edit
                    </h1>
                </div>
                <div className="max-w-3xl p-8 bg-white rounded shadow">
                    <form name="createForm" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <div className="mb-4">
                                <label className="">Title</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2"
                                    label="Title"
                                    name="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                />
                                <span className="text-red-600">
                                    {errors.title}
                                </span>
                            </div>
                            <div className="mb-4">
                                <label className="">Body</label>
                                <textarea
                                    type="text"
                                    className="w-full h-48 rounded"
                                    label="body"
                                    name="body"
                                    errors={errors.body}
                                    value={data.body}
                                    onChange={(e) =>
                                        setData("body", e.target.value)
                                    }
                                />
                                <span className="text-red-600">
                                    {errors.body}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-green-500 rounded"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirmation(true)}
                                tabIndex="-1"
                                type="button"
                                className="px-4 py-2 text-white bg-red-500 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </form>
                </div>
            </div>


            {showDeleteConfirmation && (
                <div className="modal-wrapper">
                    <DeletePopupModal
                        onDelete={handleDelete}
                        onCancel={handleCancelDelete}
                    />
                </div>
            )}
        </div>
    );
};

export default Edit;
