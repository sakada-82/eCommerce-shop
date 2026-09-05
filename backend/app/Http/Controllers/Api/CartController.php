<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function addToCart(Request $request){
        $validated = $request->validate([
            'product_id' => [
                'required',
                'integer',
                'exists:products,id',
            ],
            'quantity' => [
                'required',
                'integer',
                'min:1',
            ],
        ]);

        $user = Auth::user();
        $cart = Cart::firstOrCreate([
            'user_id' => $user->id,
        ]);

        //find product
        $product = Product::findOrFail($validated['product_id']);

        //check stock
        if($validated['quantity'] > $product->stock){
            return response()->json([
                'message' => "Not enough stock.",
                'available_stock' => $product->stock,
            ],422);
        }

        //check existing cart item
        $cartItem = CartItem::where('cart_id',$cart->id)
                ->where('product_id',$product->id)
                ->first();

        if($cartItem){
            $newQuantity = $cartItem->quantity + $validated['quantity'];
            
            //check stock again
            if($newQuantity > $product->stock){
                return response()->json([
                    'message' => 'Not enough stock',
                    'available_stock' => $product->stock,
                ],422);
            }
            $cartItem -> update([
                'quantity' => $newQuantity,
            ]);
        }
        else{
            $cartItem = CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $product->id,
                'quantity' => $validated['quantity'],
            ]);
        }

        return response()->json([
            'message' => 'Product added to cart successfully.',
            'data' => $cartItem->load('product'),
        ],201);
    }

    public function index(){
        $cart = Cart::firstOrCreate([
            'user_id' => auth()->id(),
        ]);
        $cart->load('items.product');
        return response()->json([
            'message' => 'Cart retrieved successfully.',
            'data' => $cart,
        ],200);
    }
    public function update(Request $request,CartItem $item){
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);
        if($item->cart->user_id !== auth()->id()){
            return response()->json([
                'message' => 'Unauthorized.',
            ],403);
        }
        //stock
        if($validated['quantity'] > $item->product->stock){
            return response()->json([
                'message' => 'Not enough stock.',
                'available_stock' => $item->product->stock,
            ],422);
        }
        $item->update([
            'quantity' => $validated['quantity'],
        ]);
        return response()->json([
            'message' => 'Cart item update successfully.',
            'data' => $item->fresh()->load('product'),
        ],200);

    }

    public function destroy(CartItem $item){
        if($item->cart->user_id !== auth()->id()){
            return response()->json([
                'message' => 'Unauthorized',
            ],403);
        }
        $item->delete();
        return response()->json([
            'message' => 'Cart item remove successfully.',
        ],200);
    }
}
