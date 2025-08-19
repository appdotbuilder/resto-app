import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  Plus, 
  Eye,
  Edit,
  Trash2,
  Clock,
  Users,
  Phone,
  MapPin
} from 'lucide-react';

interface Reservation {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  party_size: number;
  reservation_datetime: string;
  status: string;
  special_requests?: string;
  table: {
    number: string;
    capacity: number;
  };
}

interface Props {
  reservations: {
    data: Reservation[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export default function ReservationsIndex({ reservations }: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'seated': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isUpcoming = (datetime: string) => {
    return new Date(datetime) > new Date();
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reservations</h1>
            <p className="text-gray-600 mt-1">Manage table reservations and customer bookings</p>
          </div>
          <Button className="bg-purple-500 hover:bg-purple-600">
            <Plus className="h-4 w-4 mr-2" />
            New Reservation
          </Button>
        </div>

        {/* Reservations List */}
        <Card>
          <CardHeader>
            <CardTitle>All Reservations</CardTitle>
            <CardDescription>A list of all table reservations</CardDescription>
          </CardHeader>
          <CardContent>
            {reservations.data.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No reservations yet</h3>
                <p className="text-gray-600 mb-4">Start taking reservations to see them here</p>
                <Button className="bg-purple-500 hover:bg-purple-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Reservation
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {reservations.data.map((reservation) => (
                  <div key={reservation.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${isUpcoming(reservation.reservation_datetime) ? 'bg-purple-100' : 'bg-gray-100'}`}>
                          <Calendar className={`h-4 w-4 ${isUpcoming(reservation.reservation_datetime) ? 'text-purple-600' : 'text-gray-600'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{reservation.customer_name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {reservation.customer_phone}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              Party of {reservation.party_size}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              Table {reservation.table.number}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {new Date(reservation.reservation_datetime).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(reservation.reservation_datetime).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                        <Badge className={getStatusColor(reservation.status)}>
                          {reservation.status}
                        </Badge>
                      </div>
                    </div>
                    
                    {reservation.special_requests && (
                      <div className="mb-3 p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
                        <p className="text-sm text-yellow-800">
                          <strong>Special Requests:</strong> {reservation.special_requests}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {isUpcoming(reservation.reservation_datetime) ? (
                          <span className="text-green-600 font-medium">Upcoming</span>
                        ) : (
                          <span>Past reservation</span>
                        )}
                        {reservation.customer_email && (
                          <>
                            <span className="mx-2">•</span>
                            {reservation.customer_email}
                          </>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}