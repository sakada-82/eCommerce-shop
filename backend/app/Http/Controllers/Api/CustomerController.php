<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = User::where('role', 'customer')
            ->withCount('orders')
            ->latest()
            ->get();

        return response()->json([
            'message' => 'Customers retrieved successfully.',
            'data' => $customers
        ]);
    }
    public function show(User $customer)
    {
        if ($customer->role !== 'customer') {
            return response()->json([
                'message' => 'Customer not found.'
            ], 404);
        }

        $customer->load([
            'orders' => function ($query) {
                $query->latest();
            }
        ]);

        $totalSpent = $customer->orders()
            ->where('status', 'delivered')
            ->sum('total_amount');

        return response()->json([
            'message' => 'Customer retrieved successfully.',
            'data' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'email' => $customer->email,
                'created_at' => $customer->created_at,
                'total_orders' => $customer->orders->count(),
                'total_spent' => $totalSpent,
                'orders' => $customer->orders,
            ]
        ]);
    }
}
