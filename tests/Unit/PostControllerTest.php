<?php

namespace Tests\Unit;

use App\Http\Controllers\PostController;
use App\Http\Requests\StorePostRequest;
use App\Services\PostService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Mockery;
use PHPUnit\Framework\TestCase;

class PostControllerTest extends TestCase
{
    public function testPostIndex()
    {
        $postService = Mockery::mock(PostService::class);

        $postData = [
            [
                'id' => 1,
                'title' => 'Test title 1',
                'body' => 'Test body 1',
            ],
            [
                'id' => 2,
                'title' => 'Test title 2',
                'body' => 'Test body 2',
            ],
        ];
        $postService->shouldReceive('getPosts')->andReturn(new JsonResponse([
            'errors' => null,
            'posts' => $postData,
        ]));

        $controller = new PostController($postService);

        $response = $controller->index();

        $responseData = $response->getData(true);
        $this->assertNull($responseData['errors']);
        $this->assertEquals($postData, $responseData['posts']);
    }

    public function testPostStore()
    {
        $postService = $this->getMockBuilder(PostService::class)
            ->disableOriginalConstructor()
            ->getMock();

        $url = env('APP_URL').'/posts';

        $postService->expects($this->once())
            ->method('storePost')
            ->with($this->isInstanceOf(Request::class))
            ->willReturn(new RedirectResponse($url));

        $controller = new PostController($postService);

        $request = $this->getMockBuilder(StorePostRequest::class)
            ->disableOriginalConstructor()
            ->getMock();

        $response = $controller->store($request);

        $this->assertEquals($url, $response->getTargetUrl());
    }
}
