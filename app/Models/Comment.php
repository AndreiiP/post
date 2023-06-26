<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Comment
 *
* @property int $post_id
* @property string $user_name
* @property string $body
 */
class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['user_name', 'body'];
}
