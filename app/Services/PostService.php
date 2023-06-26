<?php

namespace App\Services;

use App\Http\Requests\StorePostRequest;
use App\Models\Post;
use App\Traits\JsonResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Class PostService
 * @package App\Services
 */
class PostService {

    use JsonResponseTrait;

    /**
     * @return JsonResponse|Response
     */
    public function getPosts(): JsonResponse|Response
    {
        try {
            return Inertia::render('Post/Index', [
                'posts' => Post::orderBy('created_at', 'desc')->paginate(5)->through(fn($post) => [
                    'id' => $post->id,
                    'title' => $post->title,
                    'body' => $post->body
                ])
            ]);
        } catch (\Exception $e) {
            return $this->getErrorResponse($e->getMessage());
        }
    }

    /**
     * @param $request
     * @return JsonResponse|Response
     */
    public function searchPosts($request): JsonResponse|Response
    {
        try {
            $query = $request->input('query');

            $posts = Post::where('title', 'like', "%{$query}%")
                ->orWhere('body', 'like', "%{$query}%")
                ->get();

            return Inertia::render('Post/Index', [
                'posts' => $posts,
            ]);
        } catch (\Exception $e) {
            return $this->getErrorResponse($e->getMessage());
        }
    }

    /**
     * @return JsonResponse|Response
     */
    public function createPost(): JsonResponse|Response
    {
        try {
            return Inertia::render('Post/Create');
        } catch (\Exception $e) {
            return $this->getErrorResponse($e->getMessage());
        }
    }

    /**
     * @param StorePostRequest $request
     * @return JsonResponse|RedirectResponse
     */
    public function storePost(StorePostRequest $request): JsonResponse|RedirectResponse
    {
        try {
            Post::create($request->validated());

            return redirect()->route('posts.index');
        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            return $this->getErrorResponse($e->getMessage());
        }
    }

    /**
     * @param int $id
     * @return Response
     */
    public function showPost(int $id): Response
    {
        $post = Post::find($id);

        return Inertia::render('Post/Snow', [
            'post' => $post
        ]);
    }


    /**
     * @param Post $post
     * @return JsonResponse|Response
     */
    public function editPost(Post $post): JsonResponse|Response
    {
        try {
            return Inertia::render('Post/Edit', [
                'post' => [
                    'id' => $post->id,
                    'title' => $post->title,
                    'body' => $post->body
                ]
            ]);
        } catch (\Exception $e) {
            return $this->getErrorResponse($e->getMessage());
        }
    }

    /**
     * @param Post $post
     * @param $request
     * @return JsonResponse|RedirectResponse
     */
    public function updatePost(Post $post, $request): JsonResponse|RedirectResponse
    {
        try {
            $post->update($request->validated());
            return Redirect::route('posts.index');
        } catch (\Exception $e) {
            return $this->getErrorResponse($e->getMessage());
        }
    }

    /**
     * @param Post $post
     * @return RedirectResponse
     */
    public function deletePost(Post $post): RedirectResponse
    {
        try {
            $post->delete();
            return to_route('posts.index');
        } catch (\Throwable $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
