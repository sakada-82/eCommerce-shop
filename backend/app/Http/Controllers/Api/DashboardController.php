<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function stats()
    {
        $totalProducts = Product::count();

        $totalCustomers = User::where('role', 'customer')->count();

        $totalOrders = Order::count();

        $totalSales = Order::where('status', 'delivered')
            ->sum('total_amount');

        $recentOrders = Order::with('user')
            ->latest()
            ->take(5)
            ->get();

        $monthlySales = Order::where('status', 'delivered')
            ->select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('SUM(total_amount) as total')
            )
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy('month')
            ->get();

        return response()->json([
            'message' => 'Dashboard statistics retrieved successfully.',
            'data' => [
                'total_products' => $totalProducts,
                'total_customers' => $totalCustomers,
                'total_orders' => $totalOrders,
                'total_sales' => $totalSales,
                'recent_orders' => $recentOrders,
                'monthly_sales' => $monthlySales,
            ],
        ]);
    }
}