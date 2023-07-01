import { router, usePage } from "@inertiajs/react";
import { InertiaLink } from "@inertiajs/inertia-react";
import debounce from 'lodash.throttle';
import { useCallback } from 'react';

const PostList = ({posts}) => {
    const handleDelete = (postId) => {
        router.delete(`/posts/${postId}`, {
            onBefore: () => {
                confirm('Are you sure you want to delete this post?')
            },
            preserveState: true,
            onError: (errors) => {
                console.error(errors);
            }
        });
    };

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
                        onClick={() => handleDelete(id)}
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
    const data = posts.data;

    const debounceHandleSearchInputChange = useCallback(
        debounce(event => {
            let query = "?query=" + event.target.value;
            router.get(`/posts${query}`, {}, {
                preserveState: true,
            });
        }, 300),
        [router]
    );

    return (
        <div>
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
                        <PostList posts={data} />
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
        </div>
    );
};

export default Index;
