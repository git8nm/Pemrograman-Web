<?php

namespace App\Http\Controllers\Api;

// Import model Post
use App\Models\Post;
use Illuminate\Http\Request;
// Import resource PostResource
use App\Http\Controllers\Controller;
// Import Http request
use App\Http\Resources\PostResource;
// Import facade Validator
use Illuminate\Support\Facades\Validator;
// Import facade Storage
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Get all posts
        $posts = Post::latest()->paginate(5);
        // Return collection of posts as a resource
        return new PostResource(true, 'List Data Posts', $posts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param mixed $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Determine if the request is JSON or form-data
        $isFormData = $request->isMethod('post') && $request->hasFile('image');

        // Define validation rules
        $validator = Validator::make($request->all(), [
            'image' => $isFormData ? 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048' : 'nullable',
            'title' => 'required|string',
            'content' => 'required|string',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Handle image upload if present
        $imageName = $isFormData ? $request->file('image')->storeAs('public/posts', $request->file('image')->hashName()) : null;

        // Create post
        $post = Post::create([
            'image' => $isFormData ? basename($imageName) : $request->input('image'),
            'title' => $request->title,
            'content' => $request->content,
        ]);

        // Return response
        return new PostResource(true, 'Data Post Berhasil Ditambahkan!', $post);
    }

    /**
     * Display the specified resource.
     *
     * @param mixed $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        // Find post by ID
        $post = Post::findOrFail($id);
        // Return single post as a resource
        return new PostResource(true, 'Detail Data Post!', $post);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param mixed $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        // Determine if the request is form-data or raw JSON
        $isFormData = $request->hasFile('image');

        // Define validation rules
        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => $isFormData ? 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048' : 'nullable',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Handle image upload if present
        if ($isFormData) {
            // Upload new image and delete old one
            $image = $request->file('image');
            $image->storeAs('public/posts', $image->hashName());
            Storage::delete('public/posts/' . basename($post->image));
            $post->image = $image->hashName();
        }

        // Update post
        $post->update([
            'title' => $request->title ?? $post->title,
            'content' => $request->content ?? $post->content,
            'image' => $isFormData ? $post->image : $post->image,
        ]);

        // Return response
        return new PostResource(true, 'Data Post Berhasil Diubah!', $post);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);

        // Delete the post and the associated image
        Storage::delete('public/posts/' . basename($post->image));
        $post->delete();

        return response()->json(['success' => true, 'message' => 'Post deleted successfully'], 200);
    }
}
