<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function index(){
        $totalProduct = Product::count();
        $totalCustomer = User::where('role','customer')->count();
        $totalOrder = Order::count();
        $pendingOrder = Order::where('status','pending')->count();
        $confirmedOrder = Order::where('status','confirmed')->count();
        $shippedOrder = Order::where('status','shipped')->count();
        $deliverzedOrder = Order::where('status','delivered')->count();
        $cancelledOrder = Order::where('status','cancelled')->count();
        $totalSales = Order::where('status', '!=' , 'cancelled')
            ->sum('total_amount');
        
        return response()->json([
            'message' => 'Admin dashboard retrieved successfully.',
            'data' => [
                'total_product' => $totalProduct,
                'total_customer' => $totalCustomer,
                'total_order' => $totalOrder,

                'orders' => [
                    'pending' => $pendingOrder,
                    'confirmed' => $confirmedOrder,
                    'shipped' => $shippedOrder,
                    'delivered' => $deliverzedOrder,
                    'cancelled' => $cancelledOrder,
                ],
                'teotal_sales' => $totalSales,
            ],
        ],200);
    }
}
