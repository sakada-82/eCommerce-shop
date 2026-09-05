<?php

use App\Http\Controllers\Api\AdminDashboardController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\CustomerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register',[AuthController::class,'register']);
Route::post('/login', [AuthController::class , 'login']);

 //product
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{product}', [ProductController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/me', [AuthController::class, 'me']);
    //category
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{category}', [CategoryController::class, 'show']);

    

    Route::middleware('role:admin')->group(function () {

        Route::post('/categories', [CategoryController::class, 'store']);
        Route::put('/categories/{category}', [CategoryController::class, 'update']);
        Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);
        //Admin check order
        Route::get('/admin/orders',[OrderController::class, 'adminIndex']);
        //admin updata status
        Route::put('/admin/orders/{order}/status', [OrderController::class, 'updateStatus']);

        //cancel
        Route::put('/admin/orders/{order}/cancel',[
            OrderController::class,
            'cancel'
        ]);
        Route::get('/admin/dashboard/stats', [
            DashboardController::class,
            'stats'
        ]);

        Route::get('/admin/orders', [
            OrderController::class,
            'adminIndex'
        ]);

        Route::get('/admin/orders/{order}', [
            OrderController::class,
            'adminShow'
        ]);

        Route::put('/admin/orders/{order}/status', [
            OrderController::class,
            'updateStatus'
        ]);

        });
         Route::get('/admin/customers', [
            CustomerController::class,
            'index'
        ]);
        Route::get('/admin/customers/{customer}', [
            CustomerController::class,
            'show'
        ]);

    //customer cancel
    Route::put('/orders/{order}/cancel',[
        OrderController::class,
        'customerCancel'
    ]);

   

    Route::middleware('role:admin')->group(function () {
        Route::post('/products', [ProductController::class, 'store']);
        Route::put('/products/{product}', [ProductController::class, 'update']);
        Route::delete('/products/{product}', [ProductController::class, 'destroy']);
    });

    //cart
    Route::get('/cart',[CartController::class,'index']);
    //update cart
    Route::put('/cart/items/{item}',[CartController::class,'update']);
    //delete cart
    Route::delete('/cart/items/{item}',[CartController::class,'destroy']);
    //add cart
    Route::post('/cart/items',[CartController::class,'addToCart']);

    //checkout
    Route::post('/checkout', [OrderController::class, 'checkout']);

    //order 
    Route::get('/orders',[OrderController::class,'index']);
    //order detail
    Route::get('/orders/{order}',[OrderController::class,'show']);
    

    Route::middleware('role:admin')->group(function(){
        Route::get('/admin/dashboard',[AdminDashboardController::class,'index']);
    });
    Route::middleware('role:customer')->group(function(){
        Route::get('/customer/dashboard',function(){
            return response()->json([
                'message' => 'Welcome Customer',
            ]);
        });
        Route::put('/orders/{order}/cancel', [
            OrderController::class,
            'cancel'
        ]);
    });

});


