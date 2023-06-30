<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Models\Post;
use App\Services\PostService;
use App\Traits\JsonResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Illuminate\Http\Request;


class PostController extends Controller
{
    use JsonResponseTrait;
    protected PostService $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    /**
     * @param Request $request
     * @return JsonResponse|Response
     */
    public function index(Request $request): JsonResponse|Response
    {
        return $this->postService->getPosts($request);
    }

    /**
     * @return JsonResponse|Response
     */
    public function create(): JsonResponse|Response
    {
        return $this->postService->createPost();
    }

    /**
     * @param StorePostRequest $request
     * @return JsonResponse|RedirectResponse
     */
    public function store(StorePostRequest $request): JsonResponse|RedirectResponse
    {
        return $this->postService->storePost($request);
    }

    /**
     * @param string $id
     * @return Response|RedirectResponse
     */
    public function show(string $id): Response|RedirectResponse
    {
        return $this->postService->showPost($id);
    }

    /**
     * @param Post $post
     * @return Response|RedirectResponse
     */
    public function edit(Post $post): Response|RedirectResponse
    {
        return $this->postService->editPost($post);
    }

    /**
     * @param Post $post
     * @param StorePostRequest $request
     * @return RedirectResponse
     */
    public function update(Post $post, StorePostRequest $request): RedirectResponse
    {
        return $this->postService->updatePost($post, $request);
    }

    /**
     * @param Post $post
     * @return RedirectResponse
     */
    public function destroy(Post $post): RedirectResponse
    {
        return $this->postService->deletePost($post);
    }
}
