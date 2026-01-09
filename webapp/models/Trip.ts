import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITrip extends Document {
  userId: mongoose.Types.ObjectId;
  destination: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  budget: number;
  travelers: number;
  interests: string[];
  vehicle?: string;
  itinerary: any;
  estimatedCost: {
    accommodation: number;
    transportation: number;
    food: number;
    activities: number;
    total: number;
  };
  status: 'planned' | 'booked' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const TripSchema: Schema<ITrip> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    travelers: {
      type: Number,
      required: true,
      default: 1,
    },
    interests: {
      type: [String],
      default: [],
    },
    vehicle: {
      type: String,
      required: false,
    },
    itinerary: {
      type: Schema.Types.Mixed,
      default: {},
    },
    estimatedCost: {
      accommodation: { type: Number, default: 0 },
      transportation: { type: Number, default: 0 },
      food: { type: Number, default: 0 },
      activities: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
    status: {
      type: String,
      enum: ['planned', 'booked', 'completed', 'cancelled'],
      default: 'planned',
    },
  },
  { timestamps: true }
);

const Trip: Model<ITrip> =
  mongoose.models.Trip || mongoose.model<ITrip>('Trip', TripSchema);

export default Trip;

