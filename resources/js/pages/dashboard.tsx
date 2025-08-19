import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChefHat, 
  Calendar, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Package,
  Utensils,
  Phone
} from 'lucide-react';

export default function Dashboard() {
  // Mock data - in a real app, this would come from props or API
  const stats = {
    todayOrders: 47,
    todayRevenue: 2340.50,
    activeReservations: 12,
    lowStockItems: 3
  };

  const recentOrders = [
    { id: 'ORD-20241201-0047', table: 'T-05', amount: 89.50, status: 'preparing', time: '2 min ago' },
    { id: 'ORD-20241201-0046', table: 'T-12', amount: 156.75, status: 'ready', time: '5 min ago' },
    { id: 'ORD-20241201-0045', table: 'Takeout', amount: 34.25, status: 'completed', time: '8 min ago' },
  ];

  const upcomingReservations = [
    { id: 1, name: 'Sarah Johnson', table: 'T-08', time: '7:30 PM', party: 4 },
    { id: 2, name: 'Mike Chen', table: 'T-15', time: '8:00 PM', party: 2 },
    { id: 3, name: 'Emily Davis', table: 'T-03', time: '8:15 PM', party: 6 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Restaurant Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Today: {new Date().toLocaleDateString()}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Today's Orders</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.todayOrders}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">+12% from yesterday</span>
                  </div>
                </div>
                <div className="bg-blue-500 p-3 rounded-full">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Today's Revenue</p>
                  <p className="text-2xl font-bold text-green-900">${stats.todayRevenue.toFixed(2)}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">+8% from yesterday</span>
                  </div>
                </div>
                <div className="bg-green-500 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Reservations</p>
                  <p className="text-2xl font-bold text-purple-900">{stats.activeReservations}</p>
                  <div className="flex items-center mt-1">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">All confirmed</span>
                  </div>
                </div>
                <div className="bg-purple-500 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">Low Stock</p>
                  <p className="text-2xl font-bold text-orange-900">{stats.lowStockItems}</p>
                  <div className="flex items-center mt-1">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mr-1" />
                    <span className="text-xs text-orange-600">Needs attention</span>
                  </div>
                </div>
                <div className="bg-orange-500 p-3 rounded-full">
                  <Package className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-xl">Recent Orders</CardTitle>
                <CardDescription>Latest orders from your restaurant</CardDescription>
              </div>
              <Button size="sm" variant="outline">
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <ShoppingCart className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.table} • ${order.amount}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Reservations */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-xl">Upcoming Reservations</CardTitle>
                <CardDescription>Reservations for today</CardDescription>
              </div>
              <Button size="sm" variant="outline">
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingReservations.map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{reservation.name}</p>
                      <p className="text-sm text-gray-600">{reservation.table} • Party of {reservation.party}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{reservation.time}</p>
                    <Button size="sm" variant="outline" className="mt-1">
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Common restaurant management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-orange-500 hover:bg-orange-600">
                <ShoppingCart className="h-6 w-6" />
                <span className="text-sm">New Order</span>
              </Button>
              
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-purple-500 hover:bg-purple-600">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">Add Reservation</span>
              </Button>
              
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-green-500 hover:bg-green-600">
                <ChefHat className="h-6 w-6" />
                <span className="text-sm">Menu Items</span>
              </Button>
              
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-blue-500 hover:bg-blue-600">
                <Utensils className="h-6 w-6" />
                <span className="text-sm">Table Status</span>
              </Button>
              
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-indigo-500 hover:bg-indigo-600">
                <Package className="h-6 w-6" />
                <span className="text-sm">Inventory</span>
              </Button>
              
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-red-500 hover:bg-red-600">
                <Users className="h-6 w-6" />
                <span className="text-sm">Staff</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}