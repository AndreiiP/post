<?php

namespace Tests\Unit\Model;

use App\Models\Post;
use PHPUnit\Framework\TestCase;

class PostTest extends TestCase
{
    public function test_post_has_title_and_body(): void
    {
        $post = new Post();
        $post->title = 'Title 1';
        $post->body = 'Some body text';

        $this->assertEquals('Title 1', $post->title);
        $this->assertEquals('Some body text', $post->body);
    }
}
