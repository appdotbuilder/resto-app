<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Table>
 */
class TableFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'number' => 'T-' . fake()->unique()->numberBetween(1, 100),
            'capacity' => fake()->randomElement([2, 4, 6, 8]),
            'status' => fake()->randomElement(['available', 'occupied', 'reserved']),
            'location' => fake()->randomElement(['Main Floor', 'Upper Floor', 'Patio', 'Private Room']),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}