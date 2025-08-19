<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use App\Models\Reservation;
use App\Models\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservations = Reservation::with('table')
            ->latest('reservation_datetime')
            ->paginate(15);

        return Inertia::render('reservations/index', [
            'reservations' => $reservations
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tables = Table::orderBy('number')->get();

        return Inertia::render('reservations/create', [
            'tables' => $tables
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReservationRequest $request)
    {
        $reservation = Reservation::create($request->validated());

        // Update table status to reserved
        Table::find($reservation->table_id)->update(['status' => 'reserved']);

        return redirect()->route('reservations.show', $reservation)
            ->with('success', 'Reservation created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        $reservation->load('table');

        return Inertia::render('reservations/show', [
            'reservation' => $reservation
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reservation $reservation)
    {
        $tables = Table::orderBy('number')->get();

        return Inertia::render('reservations/edit', [
            'reservation' => $reservation,
            'tables' => $tables
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReservationRequest $request, Reservation $reservation)
    {
        $oldTableId = $reservation->table_id;
        $reservation->update($request->validated());

        // Update table statuses
        if ($oldTableId !== $reservation->table_id) {
            // Free the old table
            Table::find($oldTableId)->update(['status' => 'available']);
            // Reserve the new table
            Table::find($reservation->table_id)->update(['status' => 'reserved']);
        }

        return redirect()->route('reservations.show', $reservation)
            ->with('success', 'Reservation updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        // Free the table
        Table::find($reservation->table_id)->update(['status' => 'available']);
        
        $reservation->delete();

        return redirect()->route('reservations.index')
            ->with('success', 'Reservation cancelled successfully.');
    }
}