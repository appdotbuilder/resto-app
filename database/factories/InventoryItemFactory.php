<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InventoryItem>
 */
class InventoryItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $currentStock = fake()->randomFloat(2, 5, 100);
        $minimumStock = fake()->randomFloat(2, 1, 20);
        
        return [
            'name' => fake()->words(2, true),
            'sku' => fake()->unique()->regexify('[A-Z]{3}-[0-9]{3}'),
            'description' => fake()->sentence(),
            'unit' => fake()->randomElement(['kg', 'lbs', 'liters', 'pieces', 'boxes']),
            'current_stock' => $currentStock,
            'minimum_stock' => $minimumStock,
            'maximum_stock' => fake()->randomFloat(2, 50, 200),
            'cost_per_unit' => fake()->randomFloat(2, 1, 50),
            'supplier' => fake()->company(),
            'expiry_date' => fake()->optional()->dateTimeBetween('now', '+1 year'),
            'status' => $currentStock <= $minimumStock ? 'low_stock' : 'in_stock',
        ];
    }
}