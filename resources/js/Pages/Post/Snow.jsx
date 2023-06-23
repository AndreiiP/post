
import React from "react";
import {usePage} from '@inertiajs/react'
import { InertiaLink, useForm } from "@inertiajs/inertia-react";

const Snow = () => {
    const { post } = usePage().props;
    const { data, setData, put, errors } = useForm({
        title: post.title || "",
        body: post.body || "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("posts.show", post.id));
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
                        Snow
                    </h1>
                </div>
                <div className="max-w-3xl p-8 bg-white rounded shadow">
                    <form name="createForm" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <div className="mb-4">
                                <label className="font-bold text-lg">Title</label>
                                <div>{data.title}</div>
                                <span className="text-red-600">
                                    {errors.title}
                                </span>
                            </div>
                            <div className="mb-4">
                                <label className="font-bold text-lg">Body</label>
                                <div>{data.body}</div>
                                <span className="text-red-600">
                                    {errors.body}
                                </span>
                                <span className="text-red-600">
                                    {errors.body}
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Snow;
