import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShoppingCart, 
  Clock, 
  Star,
  Filter,
  Search,
  ChefHat,
  ArrowLeft
} from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string | null;
  is_available: boolean;
  is_featured: boolean;
  preparation_time: number | null;
  allergens: string[] | null;
}

interface Category {
  id: number;
  name: string;
  description: string;
  menu_items: MenuItem[];
}

interface Props {
  categories: Category[];
  [key: string]: unknown;
}

export default function Menu({ categories = [] }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(category => {
    if (selectedCategory === 'all') return true;
    return category.name.toLowerCase() === selectedCategory.toLowerCase();
  });

  const getAllergenBadgeColor = (allergen: string) => {
    const colors: { [key: string]: string } = {
      'dairy': 'bg-blue-100 text-blue-800',
      'gluten': 'bg-yellow-100 text-yellow-800',
      'nuts': 'bg-orange-100 text-orange-800',
      'fish': 'bg-cyan-100 text-cyan-800',
      'eggs': 'bg-purple-100 text-purple-800',
      'shellfish': 'bg-red-100 text-red-800',
      'soy': 'bg-green-100 text-green-800',
      'sulfites': 'bg-pink-100 text-pink-800'
    };
    return colors[allergen] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2 rounded-xl">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Our Menu</h1>
                  <p className="text-sm text-gray-600">Delicious dishes crafted with care</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart (0)
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <section className="py-6 bg-white/50 backdrop-blur-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
                className={selectedCategory === 'all' ? 'bg-orange-500 hover:bg-orange-600' : ''}
              >
                All Items
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.name.toLowerCase() ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.name.toLowerCase())}
                  className={selectedCategory === category.name.toLowerCase() ? 'bg-orange-500 hover:bg-orange-600' : ''}
                >
                  {category.name}
                </Button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16">
              <ChefHat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No menu items found</h3>
              <p className="text-gray-600">Try adjusting your search or category filter.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((category) => (
                <section key={category.id}>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h2>
                    <p className="text-lg text-gray-600">{category.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.menu_items
                      .filter(item => 
                        searchTerm === '' || 
                        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((item) => (
                      <Card key={item.id} className="bg-white hover:shadow-lg transition-shadow group overflow-hidden">
                        {item.image && (
                          <div className="h-48 bg-gray-200">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {item.is_featured && (
                                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                                    ⭐ Featured
                                  </Badge>
                                )}
                                {!item.is_available && (
                                  <Badge variant="outline" className="text-red-600 border-red-200">
                                    Unavailable
                                  </Badge>
                                )}
                              </div>
                              <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">
                                {item.name}
                              </CardTitle>
                            </div>
                            <div className="text-lg font-bold text-orange-600">
                              ${item.price}
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0">
                          {item.description && (
                            <CardDescription className="text-gray-600 mb-4">
                              {item.description}
                            </CardDescription>
                          )}
                          
                          <div className="space-y-3">
                            {item.preparation_time && (
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-2" />
                                {item.preparation_time} minutes
                              </div>
                            )}
                            
                            {item.allergens && item.allergens.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {item.allergens.map((allergen, index) => (
                                  <Badge 
                                    key={index} 
                                    className={`text-xs ${getAllergenBadgeColor(allergen)}`}
                                  >
                                    {allergen}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center text-yellow-500">
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <span className="text-sm text-gray-600 ml-1">(4.9)</span>
                              </div>
                              
                              <Button 
                                size="sm" 
                                disabled={!item.is_available}
                                className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
                              >
                                <ShoppingCart className="h-4 w-4 mr-1" />
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}