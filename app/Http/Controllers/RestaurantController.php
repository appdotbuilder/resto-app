<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\Reservation;
use App\Models\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RestaurantController extends Controller
{
    /**
     * Display the main restaurant dashboard.
     */
    public function index()
    {
        $featuredItems = MenuItem::with('category')
            ->featured()
            ->available()
            ->take(6)
            ->get();

        $stats = [
            'total_orders_today' => Order::whereDate('created_at', today())->count(),
            'active_reservations' => Reservation::where('status', 'confirmed')
                ->where('reservation_datetime', '>=', now())
                ->count(),
            'available_tables' => Table::available()->count(),
            'total_menu_items' => MenuItem::available()->count(),
        ];

        return Inertia::render('welcome', [
            'featuredItems' => $featuredItems,
            'stats' => $stats
        ]);
    }


}