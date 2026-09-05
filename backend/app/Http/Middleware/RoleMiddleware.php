<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(
    Request $request,
    Closure $next,
    string $role
    ): Response {

        if (!$request->user()) {
            return response()->json([
                'message' => 'Unauthenticated.'
            ], 401);
        }

        $user = $request->user();

        // Admin can access everything
        if ($user->role === 'admin') {
            return $next($request);
        }

        // Other roles must match the required role
        if ($user->role !== $role) {
            return response()->json([
                'message' => 'Forbidden. You do not have permission.'
            ], 403);
        }

        return $next($request);
    }
}
