<?php

namespace App\Services;

use App\Models\Comment;
use App\Traits\JsonResponseTrait;
use Illuminate\Http\RedirectResponse;

/**
 * Class CommentService
 * @package App\Services
 */
class CommentService {

    use JsonResponseTrait;

    /**
     * @param $request
     * @param string $postId
     * @return RedirectResponse
     */
    public function addComment($request, string $postId): \Illuminate\Http\RedirectResponse
    {
        try {
            $request->validate([
                'user_name' => 'required',
                'body' => 'required',
            ]);

            $comment = new Comment();
            $comment->post_id = $postId;
            $comment->user_name = $request->input('user_name');
            $comment->body = $request->input('body');
            $comment->save();

            return redirect()->back();

        } catch (\Throwable $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
