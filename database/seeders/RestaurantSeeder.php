<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\MenuItem;
use App\Models\Table;
use App\Models\InventoryItem;
use App\Models\User;
use Illuminate\Database\Seeder;

class RestaurantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample users
        User::create([
            'name' => 'Restaurant Manager',
            'email' => 'manager@restaurant.com',
            'role' => 'manager',
            'phone' => '+1-555-0001',
            'password' => bcrypt('password'),
        ]);

        User::create([
            'name' => 'Head Chef',
            'email' => 'chef@restaurant.com',
            'role' => 'staff',
            'phone' => '+1-555-0002',
            'password' => bcrypt('password'),
        ]);

        User::create([
            'name' => 'John Customer',
            'email' => 'customer@example.com',
            'role' => 'customer',
            'phone' => '+1-555-0003',
            'password' => bcrypt('password'),
        ]);

        // Create categories
        $appetizers = Category::create([
            'name' => 'Appetizers',
            'description' => 'Start your meal with our delicious appetizers',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        $mains = Category::create([
            'name' => 'Main Courses',
            'description' => 'Hearty and satisfying main dishes',
            'is_active' => true,
            'sort_order' => 2,
        ]);

        $desserts = Category::create([
            'name' => 'Desserts',
            'description' => 'Sweet endings to your perfect meal',
            'is_active' => true,
            'sort_order' => 3,
        ]);

        $beverages = Category::create([
            'name' => 'Beverages',
            'description' => 'Refreshing drinks and specialty coffees',
            'is_active' => true,
            'sort_order' => 4,
        ]);

        // Create menu items
        MenuItem::create([
            'category_id' => $appetizers->id,
            'name' => 'Truffle Arancini',
            'description' => 'Crispy risotto balls filled with truffle and parmesan, served with marinara sauce',
            'price' => 14.99,
            'is_available' => true,
            'is_featured' => true,
            'preparation_time' => 15,
            'allergens' => ['dairy', 'gluten'],
        ]);

        MenuItem::create([
            'category_id' => $appetizers->id,
            'name' => 'Burrata Caprese',
            'description' => 'Creamy burrata cheese with heirloom tomatoes, basil, and balsamic glaze',
            'price' => 16.99,
            'is_available' => true,
            'is_featured' => true,
            'preparation_time' => 10,
            'allergens' => ['dairy'],
        ]);

        MenuItem::create([
            'category_id' => $mains->id,
            'name' => 'Grilled Salmon',
            'description' => 'Atlantic salmon grilled to perfection, served with roasted vegetables and lemon butter',
            'price' => 28.99,
            'is_available' => true,
            'is_featured' => true,
            'preparation_time' => 25,
            'allergens' => ['fish', 'dairy'],
        ]);

        MenuItem::create([
            'category_id' => $mains->id,
            'name' => 'Ribeye Steak',
            'description' => 'Prime ribeye steak cooked to your preference with garlic mashed potatoes',
            'price' => 34.99,
            'is_available' => true,
            'is_featured' => true,
            'preparation_time' => 20,
            'allergens' => ['dairy'],
        ]);

        MenuItem::create([
            'category_id' => $mains->id,
            'name' => 'Mushroom Risotto',
            'description' => 'Creamy arborio rice with wild mushrooms, truffle oil, and parmesan',
            'price' => 22.99,
            'is_available' => true,
            'is_featured' => false,
            'preparation_time' => 30,
            'allergens' => ['dairy', 'gluten'],
        ]);

        MenuItem::create([
            'category_id' => $desserts->id,
            'name' => 'Chocolate Lava Cake',
            'description' => 'Warm chocolate cake with molten center, served with vanilla ice cream',
            'price' => 9.99,
            'is_available' => true,
            'is_featured' => true,
            'preparation_time' => 12,
            'allergens' => ['dairy', 'eggs', 'gluten'],
        ]);

        MenuItem::create([
            'category_id' => $beverages->id,
            'name' => 'House Wine Selection',
            'description' => 'Curated selection of red and white wines',
            'price' => 8.99,
            'is_available' => true,
            'is_featured' => false,
            'preparation_time' => 2,
            'allergens' => ['sulfites'],
        ]);

        // Create tables
        for ($i = 1; $i <= 20; $i++) {
            Table::create([
                'number' => 'T-' . str_pad((string)$i, 2, '0', STR_PAD_LEFT),
                'capacity' => $i <= 10 ? 2 : ($i <= 16 ? 4 : 6),
                'status' => 'available',
                'location' => $i <= 8 ? 'Main Floor' : ($i <= 16 ? 'Upper Floor' : 'Patio'),
            ]);
        }

        // Create inventory items
        InventoryItem::create([
            'name' => 'Atlantic Salmon',
            'sku' => 'FISH-001',
            'description' => 'Fresh Atlantic salmon fillets',
            'unit' => 'kg',
            'current_stock' => 25.5,
            'minimum_stock' => 10.0,
            'maximum_stock' => 50.0,
            'cost_per_unit' => 24.99,
            'supplier' => 'Ocean Fresh Seafood',
            'expiry_date' => now()->addDays(3),
            'status' => 'in_stock',
        ]);

        InventoryItem::create([
            'name' => 'Ribeye Steaks',
            'sku' => 'MEAT-001',
            'description' => 'Prime ribeye steaks, 12oz portions',
            'unit' => 'pieces',
            'current_stock' => 45,
            'minimum_stock' => 20,
            'maximum_stock' => 100,
            'cost_per_unit' => 18.50,
            'supplier' => 'Premium Meats Co',
            'expiry_date' => now()->addDays(5),
            'status' => 'in_stock',
        ]);

        InventoryItem::create([
            'name' => 'Arborio Rice',
            'sku' => 'GRAIN-001',
            'description' => 'Premium arborio rice for risotto',
            'unit' => 'kg',
            'current_stock' => 8.2,
            'minimum_stock' => 15.0,
            'maximum_stock' => 30.0,
            'cost_per_unit' => 4.99,
            'supplier' => 'Italian Imports',
            'expiry_date' => now()->addMonths(6),
            'status' => 'low_stock',
        ]);

        InventoryItem::create([
            'name' => 'Truffle Oil',
            'sku' => 'OIL-001',
            'description' => 'Extra virgin olive oil infused with black truffle',
            'unit' => 'liters',
            'current_stock' => 2.5,
            'minimum_stock' => 1.0,
            'maximum_stock' => 5.0,
            'cost_per_unit' => 45.00,
            'supplier' => 'Gourmet Ingredients Ltd',
            'expiry_date' => now()->addMonths(12),
            'status' => 'in_stock',
        ]);
    }
}