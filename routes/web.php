<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::location('posts');

});

Route::resource('posts', PostController::class);

Route::post('comments', [CommentController::class, 'store'])->name('comments.store');
Route::post('/posts/{id}/comments', [CommentController::class, 'store']);

