<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class OrderController extends Controller
{
    public function checkout(Request $request){
        $user = Auth::user();

        try{
            $order = DB::transaction(function () use($user) {

                //get user's cart
                $cart = Cart::where('user_id',$user->id)
                    ->with('items.product')
                    ->first();
                
                //check cart
                if(!$cart || $cart->items->isEmpty()){
                    throw new \Exception("You cart is Empty.");
                }
                $totalAmount = 0;

                //check stock first
                foreach($cart->items as $item){
                    $product = Product::where('id' , $item->product_id)
                            ->lockForUpdate()
                            ->first();
                    if(!$product){
                        throw new \Exception(
                            "Product {$item->product_id} not found."
                        );
                    }
                    if($item->quantity > $product->stock){
                        throw new \Exception("Not enough stock for {$product->name}.");
                    }

                    //calculate
                    $totalAmount += $product->price * $item->quantity;
                }

                //create order
                $order = Order::create([
                    'user_id' => $user->id,
                    'total_amount' => $totalAmount,
                    'status' => 'pending',
                ]); 

                // create order item
                foreach($cart->items as $item){
                    $product = Product::where('id',$item->product_id)
                            ->lockForUpdate()
                            ->first();

                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'quantity' => $item->quantity,
                        'price' => $product->price,
                    ]);

                    $product->decrement(
                        'stock',
                        $item->quantity
                    );
                }

                // clear cart
                $cart->items()->delete();
                return $order;
            });

            return response()->json([
                'message' => 'Order placed successfully.',
                'data' => $order->load('items.product'),
            ],201);


        }catch(\Exception $e){
            return response()->json([
                'message' => $e->getMessage(),
            ],422);

        }
    }

    public function index()
    {
        $user = User::findOrFail(Auth::id());
        $orders = $user
            ->orders()
            ->with('items.product')
            ->latest()
            ->get();

        return response()->json([
            'message' => 'Orders retrieved successfully.',
            'data' => OrderResource::collection($orders),
        ], 200);
    }
    public function show($id){

        
        $order = Order::with('items.product', 'user')->find($id);
        

        if (!$order) {
            return response()->json([
                'message' => 'Order not found'
            ], 404);
        }

        if ($order->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        return response()->json([
            'message' => 'Order retrieved successfully.',
            'data' => new OrderResource($order),
        ], 200);
    }

    public function adminIndex(Request $request){
        $query = Order::with([
        'user',
        'items.product'
        ])->latest();

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Search by Order ID
        if ($request->filled('order_id')) {
            $query->where('id', $request->order_id);
        }

        // Search by customer name/email
        if ($request->filled('search')) {
            $search = $request->search;

            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Pagination
        $orders = $query->paginate(10);

        return response()->json([
            'message' => 'Orders retrieved successfully.',
            'data' => OrderResource::collection($orders),
        ],200);
    }

    public function adminShow(Order $order)
    {
        $order->load([
            'user',
            'items.product'
        ]);

        return response()->json([
            'message' => 'Order retrieved successfully.',
            'data' => $order
        ]);
    }

    public function updateStatus(Request $request , Order $order){
        $validated = $request->validate([
            'status' => [
                'required',
                Rule::in([
                    'pending',
                    'confirmed',
                    'shipped',
                    'delivered',
                    'cancelled',
                ]),
            ],
        ]);

        if (
            $validated['status'] === 'cancelled' &&
            $order->status !== 'cancelled'
        ) {
            foreach ($order->items as $item) {
                $product = $item->product;

                $product->increment('stock', $item->quantity);
            }
        }

        $order->update([
            'status' => $validated['status'],
        ]);
        return response()->json([
            'message' => 'Order status update successfully.',
            'data' => $order->fresh(),
        ],200);
    }

    public function cancel(Order $order){
       // Customer អាច cancel តែ order របស់ខ្លួន
        if ($order->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'Unauthorized.'
            ], 403);
        }

        // Cancel បានតែ pending
        if ($order->status !== 'pending') {
            return response()->json([
                'message' => 'Only pending orders can be cancelled.'
            ], 422);
        }

        DB::transaction(function() use ($order){
            $order->load('items.product');
            foreach($order->items as $item){
                $product = $item->product;
                $product->increment('stock', $item->quantity);

            }
            $order->update([
                'status' => 'cancelled',
            ]);
        });

        return response()->json([
            'message' => "Order cancelled and stock restore successfully.",
            'data' => $order->fresh()->load('items.product')
        ],200);

    }

    public function customerCancel(Order $order){
        if($order->user_id !== auth()->id()){
            return response()->json([
                'message' => "You are not allowed to cancel this order.",
            ],403);
        }
        if($order->status === 'cancelled'){
            return response()->json([
                'message' => 'Order is already cancelled.'
            ],400);
        }
        if(in_array($order->status,['shipped','delivered','cancelled'])){
            return response()->json([
                'message' => 'This order cannot be cancelled',
            ],400);
        }
        DB::transaction(function () use ($order){
            $order->load('items.product');
            foreach($order->items as $item){
                $item->product->increment('stock', $item->quantity);
            }
            $order->update([
                'status' => 'cancelled',
            ]);
        });

        return response()->json([
            'message' => 'Order cancelled and stock restore successfully.',
            'data' => $order->fresh()->load('items.product'),

        ],200);

    }

    
}
