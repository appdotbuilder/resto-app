<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'table_id' => 'required|exists:tables,id',
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|max:20',
            'customer_email' => 'nullable|email|max:255',
            'party_size' => 'required|integer|min:1|max:20',
            'reservation_datetime' => 'required|date',
            'status' => 'required|in:pending,confirmed,seated,completed,cancelled',
            'special_requests' => 'nullable|string|max:500',
            'notes' => 'nullable|string|max:500',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'table_id.required' => 'Please select a table.',
            'table_id.exists' => 'Selected table does not exist.',
            'customer_name.required' => 'Customer name is required.',
            'customer_phone.required' => 'Customer phone number is required.',
            'customer_email.email' => 'Please provide a valid email address.',
            'party_size.required' => 'Party size is required.',
            'party_size.min' => 'Party size must be at least 1 person.',
            'party_size.max' => 'Party size cannot exceed 20 people.',
            'reservation_datetime.required' => 'Reservation date and time is required.',
            'status.required' => 'Reservation status is required.',
            'status.in' => 'Selected reservation status is invalid.',
        ];
    }
}