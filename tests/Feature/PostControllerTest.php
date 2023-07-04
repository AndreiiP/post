<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class PostControllerTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        $fixtureSQL = file_get_contents(__DIR__.'/fixtures/PostControllerTest.sql');
        DB::unprepared($fixtureSQL);
    }

    public function test_the_get_posts_successful_response(): void
    {
        $response = $this->get(route('posts.index', ['query' => 'Title 1']))
            ->assertOk()
            ->assertInertia(
                fn(AssertableInertia $page) => $page
                    ->component('Post/Index')
            );

        $data = $response->getOriginalContent()->getData();
        $post = $data['page']['props']['posts']['data'][0];

        $this->assertEquals([
            'id' => $post['id'],
            'title' => 'Title 1',
            'body' => 'Body 1'
        ], $post);
    }

    public function test_the_get_posts_query_return_empty_response(): void
    {
        $response = $this->get(route('posts.index', ['query' => '888']))
            ->assertOk()
            ->assertInertia(
                fn(AssertableInertia $page) => $page
                    ->component('Post/Index')
            );

        $data = $response->getOriginalContent()->getData();
        $post = $data['page']['props']['posts']['data'];

        $this->assertEquals([], $post);
    }
}
