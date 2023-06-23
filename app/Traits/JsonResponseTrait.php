<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

trait JsonResponseTrait {

    /**
     * @param $message
     * @param int $statusCode
     * @return JsonResponse
     */
    public function getErrorResponse($message, int $statusCode = Response::HTTP_INTERNAL_SERVER_ERROR): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'error' => true,
            'message' => $message
        ], $statusCode);
    }
}
