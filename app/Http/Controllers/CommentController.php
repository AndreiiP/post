<?php

namespace App\Http\Controllers;

use App\Services\CommentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    protected CommentService $commentService;

    public function __construct(CommentService $commentService)
    {
        $this->commentService = $commentService;
    }

    /**
     * @param Request $request
     * @param string $postId
     * @return RedirectResponse
     */
    public function store(Request $request, string $postId): \Illuminate\Http\RedirectResponse
    {
        return $this->commentService->addComment($request, $postId);
    }
}
