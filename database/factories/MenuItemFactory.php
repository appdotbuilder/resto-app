<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MenuItem>
 */
class MenuItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => Category::factory(),
            'name' => fake()->words(3, true),
            'description' => fake()->sentence(10),
            'price' => fake()->randomFloat(2, 8, 50),
            'is_available' => fake()->boolean(90),
            'is_featured' => fake()->boolean(20),
            'preparation_time' => fake()->numberBetween(5, 45),
            'allergens' => fake()->randomElements(['dairy', 'gluten', 'nuts', 'fish', 'eggs'], fake()->numberBetween(0, 3)),
        ];
    }
}