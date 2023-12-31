import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

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
                        onClick={(event) => {
                            setShowDeleteConfirmation(true)
                            setPostId(id)
                            event.stopPropagation();
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

const PostTable = ({ posts, setShowDeleteConfirmation, setPostId }) => {
    return (
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
                    posts={posts}
                    setShowDeleteConfirmation={setShowDeleteConfirmation}
                    setPostId={setPostId}
                />
            </table>
        </div>
    );
};

export default PostTable;
