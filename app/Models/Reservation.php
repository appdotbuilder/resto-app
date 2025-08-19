<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Reservation
 *
 * @property int $id
 * @property int $table_id
 * @property string $customer_name
 * @property string $customer_phone
 * @property string|null $customer_email
 * @property int $party_size
 * @property \Illuminate\Support\Carbon $reservation_datetime
 * @property string $status
 * @property string|null $special_requests
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Table $table
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation query()
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereCustomerEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereCustomerName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereCustomerPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation wherePartySize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereReservationDatetime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereSpecialRequests($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereTableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation confirmed()
 * @method static \Database\Factories\ReservationFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Reservation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'table_id',
        'customer_name',
        'customer_phone',
        'customer_email',
        'party_size',
        'reservation_datetime',
        'status',
        'special_requests',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'reservation_datetime' => 'datetime',
        'party_size' => 'integer',
    ];

    /**
     * Get the table that owns the reservation.
     */
    public function table(): BelongsTo
    {
        return $this->belongsTo(Table::class);
    }

    /**
     * Scope a query to only include confirmed reservations.
     */
    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirmed');
    }
}