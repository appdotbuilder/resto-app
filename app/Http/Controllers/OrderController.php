<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\MenuItem;
use App\Models\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with(['table', 'user', 'orderItems.menuItem'])
            ->latest()
            ->paginate(15);

        return Inertia::render('orders/index', [
            'orders' => $orders
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $menuItems = MenuItem::with('category')
            ->available()
            ->get()
            ->groupBy('category.name');

        $tables = Table::available()->get();

        return Inertia::render('orders/create', [
            'menuItems' => $menuItems,
            'tables' => $tables
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $validated = $request->validated();
        
        // Generate order number
        $orderNumber = 'ORD-' . date('Ymd') . '-' . str_pad((string)(Order::whereDate('created_at', today())->count() + 1), 4, '0', STR_PAD_LEFT);
        
        $order = Order::create([
            'order_number' => $orderNumber,
            'table_id' => $validated['table_id'] ?? null,
            'user_id' => auth()->id(),
            'type' => $validated['type'],
            'status' => 'pending',
            'subtotal' => $validated['subtotal'],
            'tax_amount' => $validated['tax_amount'],
            'total_amount' => $validated['total_amount'],
            'special_instructions' => $validated['special_instructions'] ?? null,
        ]);

        // Create order items
        foreach ($validated['items'] as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'menu_item_id' => $item['menu_item_id'],
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
                'total_price' => $item['total_price'],
                'special_instructions' => $item['special_instructions'] ?? null,
            ]);
        }

        // Update table status if dine-in order
        if ($order->table_id) {
            Table::find($order->table_id)->update(['status' => 'occupied']);
        }

        return redirect()->route('orders.show', $order)
            ->with('success', 'Order created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load(['table', 'user', 'orderItems.menuItem.category']);

        return Inertia::render('orders/show', [
            'order' => $order
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        $order->load(['orderItems.menuItem']);
        
        $menuItems = MenuItem::with('category')
            ->available()
            ->get()
            ->groupBy('category.name');

        $tables = Table::available()->get();

        return Inertia::render('orders/edit', [
            'order' => $order,
            'menuItems' => $menuItems,
            'tables' => $tables
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        $validated = $request->validated();

        $order->update([
            'status' => $validated['status'],
            'payment_status' => $validated['payment_status'] ?? $order->payment_status,
            'payment_method' => $validated['payment_method'] ?? $order->payment_method,
            'notes' => $validated['notes'] ?? $order->notes,
        ]);

        return redirect()->route('orders.show', $order)
            ->with('success', 'Order updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        // Release table if it was occupied by this order
        if ($order->table_id && $order->status !== 'cancelled') {
            Table::find($order->table_id)->update(['status' => 'available']);
        }

        $order->delete();

        return redirect()->route('orders.index')
            ->with('success', 'Order deleted successfully.');
    }
}