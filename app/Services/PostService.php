<?php

namespace App\Services;

use App\Http\Requests\StorePostRequest;
use App\Models\Post;
use App\Traits\JsonResponseTrait;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
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
     * @param $request
     * @return JsonResponse|Response
     */
    public function getPosts($request): JsonResponse|Response
    {
        try {
            $query = $request->input('query');
            $posts = $this->preparePosts($query, 5);

            return Inertia::render('Post/Index', [
                'posts' => $posts,
            ]);
        } catch (\Exception $e) {
            return $this->getErrorResponse($e->getMessage());
        }
    }

    /**
     * @param $query
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    protected function preparePosts($query, int $perPage = 5): \Illuminate\Contracts\Pagination\LengthAwarePaginator
    {
        $queryBuilder = Post::query();
        if ($query) {
            $queryBuilder->where('title', 'like', "%{$query}%")
                ->orWhere('body', 'like', "%{$query}%");
        }

        return $queryBuilder->orderBy('created_at', 'desc')->paginate($perPage)->through(function ($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'body' => $post->body,
            ];
        });
    }

    /**
     * @return Response|RedirectResponse
     */
    public function createPost(): Response|RedirectResponse
    {
        try {
            return Inertia::render('Post/Create');
        } catch (\Throwable $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
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
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * @param int $id
     * @return Response|RedirectResponse
     */
    public function showPost(int $id): Response|RedirectResponse
    {
        try {
            $post = Post::with('comments')->find($id);
            return Inertia::render('Post/Snow', [
                'post' => $post
            ]);
        } catch (\Throwable $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * @param Post $post
     * @return Response|RedirectResponse
     */
    public function editPost(Post $post): Response|RedirectResponse
    {
        try {
            return Inertia::render('Post/Edit', [
                'post' => [
                    'id' => $post->id,
                    'title' => $post->title,
                    'body' => $post->body
                ]
            ]);
        } catch (\Throwable $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * @param Post $post
     * @param $request
     * @return RedirectResponse
     */
    public function updatePost(Post $post, $request): RedirectResponse
    {
        try {
            $post->update($request->validated());
            return to_route('posts.index');
        } catch (\Throwable $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
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
