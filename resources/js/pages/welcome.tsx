import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ChefHat, 
  Calendar, 
  ShoppingCart, 
  Users, 
  Clock, 
  MapPin, 
  Star,
  Utensils,
  Coffee,
  Truck,
  CreditCard
} from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string | null;
  category: {
    name: string;
  };
}

interface Stats {
  total_orders_today: number;
  active_reservations: number;
  available_tables: number;
  total_menu_items: number;
}

interface Props {
  featuredItems?: MenuItem[];
  stats?: Stats;
  [key: string]: unknown;
}

export default function Welcome({ featuredItems = [], stats }: Props) {
  const features = [
    {
      icon: <ShoppingCart className="h-6 w-6" />,
      title: "Order Management",
      description: "Streamlined ordering system for dine-in, takeout, and delivery"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Table Reservations",
      description: "Easy booking system with real-time table availability"
    },
    {
      icon: <ChefHat className="h-6 w-6" />,
      title: "Menu Management",
      description: "Dynamic menu with categories, pricing, and availability control"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Customer Management",
      description: "Track customer preferences and order history"
    },
    {
      icon: <Coffee className="h-6 w-6" />,
      title: "Inventory Tracking",
      description: "Real-time stock management with low-stock alerts"
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Payment Processing",
      description: "Multiple payment methods with integrated billing"
    }
  ];

  const quickStats = stats ? [
    { label: "Orders Today", value: stats.total_orders_today, icon: <ShoppingCart className="h-4 w-4" /> },
    { label: "Reservations", value: stats.active_reservations, icon: <Calendar className="h-4 w-4" /> },
    { label: "Available Tables", value: stats.available_tables, icon: <Utensils className="h-4 w-4" /> },
    { label: "Menu Items", value: stats.total_menu_items, icon: <ChefHat className="h-4 w-4" /> }
  ] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2 rounded-xl">
                <ChefHat className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">RestaurantPro</h1>
                <p className="text-sm text-gray-600">Complete Restaurant Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Calendar className="h-4 w-4 mr-2" />
                Book Table
              </Button>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                <Users className="h-4 w-4 mr-2" />
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">
              🍽️ Modern Restaurant System
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">RestaurantPro</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline your restaurant operations with our comprehensive management system. 
              Handle orders, reservations, inventory, and payments all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8">
                <Utensils className="h-5 w-5 mr-2" />
                View Menu
              </Button>
              <Button size="lg" variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                <Calendar className="h-5 w-5 mr-2" />
                Make Reservation
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          {quickStats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {quickStats.map((stat, index) => (
                <Card key={index} className="bg-white/60 backdrop-blur-sm border-orange-100">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2 text-orange-600">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🚀 Powerful Features</h2>
            <p className="text-lg text-gray-600">Everything you need to run a successful restaurant</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white border-orange-100 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Menu Items */}
      {featuredItems.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">⭐ Featured Dishes</h2>
              <p className="text-lg text-gray-600">Try our chef's special recommendations</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredItems.slice(0, 6).map((item) => (
                <Card key={item.id} className="bg-white border-orange-100 hover:shadow-lg transition-shadow group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge variant="outline" className="text-xs text-orange-600 border-orange-200 mb-2">
                          {item.category.name}
                        </Badge>
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                      <Button size="sm" variant="outline" className="text-orange-600 border-orange-200 hover:bg-orange-50">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service Types */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🍽️ How We Serve</h2>
            <p className="text-lg text-gray-600">Multiple ways to enjoy our delicious food</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border-orange-100 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Dine In</h3>
                <p className="text-gray-600 mb-4">Experience our cozy atmosphere and excellent service</p>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  Full service dining
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-orange-100 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Takeout</h3>
                <p className="text-gray-600 mb-4">Order ahead and pick up at your convenience</p>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  Ready in 15-20 mins
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-orange-100 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Delivery</h3>
                <p className="text-gray-600 mb-4">Fresh food delivered right to your door</p>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  30-45 mins delivery
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience Fine Dining? 🍽️
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of satisfied customers and taste the difference quality makes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 px-8">
              <Calendar className="h-5 w-5 mr-2" />
              Book a Table Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 px-8">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Order Online
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2 rounded-xl">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">RestaurantPro</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Modern restaurant management system for exceptional dining experiences
            </p>
            <p className="text-sm text-gray-500">
              © 2024 RestaurantPro. All rights reserved. Made with ❤️ for food lovers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}