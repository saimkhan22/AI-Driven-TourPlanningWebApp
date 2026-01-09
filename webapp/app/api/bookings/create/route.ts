import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      tripId,
      bookingType,
      itemId,
      itemName,
      location,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      contactInfo,
      specialRequests,
    } = body;

    const booking = await Booking.create({
      userId: token,
      tripId,
      bookingType,
      itemId,
      itemName,
      location,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests,
      totalPrice,
      contactInfo,
      specialRequests,
      status: 'pending',
      paymentStatus: 'pending',
    });

    return NextResponse.json({
      message: 'Booking created successfully',
      booking,
    });
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create booking' },
      { status: 500 }
    );
  }
}

