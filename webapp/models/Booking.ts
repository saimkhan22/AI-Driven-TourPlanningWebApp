import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId;
  tripId?: mongoose.Types.ObjectId;
  bookingType: 'hotel' | 'vehicle';
  itemId: string;
  itemName: string;
  location: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema<IBooking> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tripId: {
      type: Schema.Types.ObjectId,
      ref: 'Trip',
    },
    bookingType: {
      type: String,
      enum: ['hotel', 'vehicle'],
      required: true,
    },
    itemId: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      default: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending',
    },
    contactInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    specialRequests: {
      type: String,
    },
  },
  { timestamps: true }
);

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;

