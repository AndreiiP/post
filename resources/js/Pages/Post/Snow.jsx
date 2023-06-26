import { useState } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { router } from '@inertiajs/react';

const Show = () => {
    const { post, errors } = usePage().props;
    const postId = window.location.pathname.split('/').pop();
    const { data, setData } = useForm({ user_name: '', body: '' });
    const [comments, setComments] = useState(post.comments || []);

    const handleAddComment = (e) => {
        e.preventDefault();

        router.post(`/posts/${postId}/comments`, {
            user_name: data.user_name,
            body: data.body,
        }, {
            onSuccess: (page) => {
                const newComment = {
                    user_name: data.user_name,
                    body: data.body,
                };
                setComments([...comments, newComment]);
                setData({ user_name: '', body: '' });
            },
            onError: (errors) => {
                console.error(errors);
            },
            preserveScroll: true,
        });
    };

    return (
        <div className="mt-20">
            <div className="container flex flex-col justify-center mx-auto">
                {/*Post block*/}
                <div>
                    <h1 className="mb-8 text-3xl font-bold">
                        <InertiaLink
                            href={route('posts.index')}
                            className="text-indigo-600 hover:text-indigo-700"
                        >
                            Posts
                        </InertiaLink>
                        <span className="font-medium text-indigo-600"> /</span>
                        Show
                    </h1>
                </div>
                <div className="max-w-3xl p-8 bg-white rounded shadow">
                    <div className="flex flex-col">
                        <div className="mb-4">
                            <label className="font-bold text-lg">Title</label>
                            <div>{post.title}</div>
                        </div>
                        <div className="mb-4">
                            <label className="font-bold text-lg">Body</label>
                            <div>{post.body}</div>
                        </div>
                    </div>
                </div>

                {/*add comment block*/}
                <div className="max-w-3xl mt-5 p-6 bg-white rounded shadow">
                    <form onSubmit={handleAddComment}>
                        <div className="mb-4">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                className="border-gray-300 rounded-lg px-4 py-2 w-full"
                                value={data.user_name}
                                onChange={(e) => setData('user_name', e.target.value)}
                            />
                        </div>
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your message
                        </label>
                        <textarea
                            id="body"
                            name="body"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Leave a comment..."
                            value={data.body}
                            onChange={(e) => setData('body', e.target.value)}
                        />
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </div>

                {/*comments block*/}
                {comments.length > 0 && (
                    <div className="max-w-3xl mb-10 p-8 mt-8 bg-white rounded shadow">
                        <h2 className="text-2xl font-bold mb-4">Comments</h2>
                        {comments.map((comment, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="font-bold">Name: {comment.user_name}</h3>
                                <p>Comment: {comment.body}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Show;
