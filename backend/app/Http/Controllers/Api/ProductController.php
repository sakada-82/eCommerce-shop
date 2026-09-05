<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('category')
                ->latest()
                ->get()
                ->map(function ($product) {
                    $product->image_url = $product->image
                        ? url('storage/'. $product->image)
                        : null;
                    return $product;
                });

        return response()->json([
            'message' => 'Products retrieved successfully',
            'data' => $products,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => [
                'required',
                'integer',
                'exists:categories,id',
            ],

            'name' => [
                'required',
                'string',
                'min:2',
                'max:150',
            ],

            'price' => [
                'required',
                'numeric',
                'min:0',
            ],

            'stock' => [
                'required',
                'integer',
                'min:0',
            ],

            'description' => [
                'nullable',
                'string',
                'max:2000',
            ],
            'image' => [
                'nullable',
                'image',
                'mimes:jpeg,png,jpg,gif,webp',
                'max:2048',
            ],
        ]);
        $imagePath = null;

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')
                ->store('products', 'public');
        }else{
            $imagePath = null;
        }

        $product = Product::create($validated);

        return response()->json([
            'message' => 'Product created successfully',
            'data' => $product->load('category'),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product->load('category');
        $product->image_url = $product->image
            ? url('storage/'. $product->image)
            : null;

        
        return response()->json([
            'message' => 'Product retrieved successfully.',
            'data' => $product->load('category'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => [
                'required',
                'integer',
                'exists:categories,id',
            ],

            'name' => [
                'required',
                'string',
                'min:2',
                'max:150',
            ],

            'price' => [
                'required',
                'numeric',
                'min:0',
            ],

            'stock' => [
                'required',
                'integer',
                'min:0',
            ],

            'description' => [
                'nullable',
                'string',
                'max:2000',
            ],
            
            'image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],
        ]);

        //upload new image
        if ($request->hasFile('image')) {

            // Keep old image path
            $oldImage = $product->image;

            // Upload new image
            $newImage = $request->file('image')
                ->store('products', 'public');

            // Set new image
            $validated['image'] = $newImage;

            // Delete old image
            if ($oldImage) {

                $exists = Storage::disk('public')->exists($oldImage);

                if ($exists) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
        }

        $product->update($validated);

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => $product->fresh()->load('category'),
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //delete iamge
        if($product->image && Storage::disk('public')->exists($product->image)){
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully',
        ], 200);
    }
}
