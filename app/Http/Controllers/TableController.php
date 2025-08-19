<?php

namespace App\Http\Controllers;

use App\Models\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TableController extends Controller
{
    /**
     * Display available tables for reservation.
     */
    public function index()
    {
        $tables = Table::available()
            ->orderBy('number')
            ->get();

        return Inertia::render('tables', [
            'tables' => $tables
        ]);
    }
}