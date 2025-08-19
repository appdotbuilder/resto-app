<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    /**
     * Display the menu.
     */
    public function index()
    {
        $categories = Category::with(['menuItems' => function ($query) {
            $query->available()->orderBy('name');
        }])
        ->active()
        ->orderBy('sort_order')
        ->get();

        return Inertia::render('menu', [
            'categories' => $categories
        ]);
    }
}