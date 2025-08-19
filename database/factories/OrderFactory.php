<?php

namespace Database\Factories;

use App\Models\Table;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 15, 200);
        $taxAmount = $subtotal * 0.08; // 8% tax
        $tipAmount = $subtotal * fake()->randomFloat(2, 0.10, 0.25); // 10-25% tip
        $totalAmount = $subtotal + $taxAmount + $tipAmount;

        return [
            'order_number' => 'ORD-' . date('Ymd') . '-' . fake()->unique()->numberBetween(1000, 9999),
            'table_id' => fake()->optional(0.8)->randomElement(Table::pluck('id')->toArray()),
            'user_id' => fake()->optional()->randomElement(User::pluck('id')->toArray()),
            'type' => fake()->randomElement(['dine_in', 'takeout', 'delivery']),
            'status' => fake()->randomElement(['pending', 'confirmed', 'preparing', 'ready', 'served', 'paid']),
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'tip_amount' => $tipAmount,
            'total_amount' => $totalAmount,
            'payment_status' => fake()->randomElement(['pending', 'paid', 'partial']),
            'payment_method' => fake()->randomElement(['cash', 'card', 'mobile']),
            'special_instructions' => fake()->optional()->sentence(),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}