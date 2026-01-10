import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // Allow anonymous feedback
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    category: {
      type: String,
      required: true,
      enum: ['general', 'feature', 'bug', 'suggestion', 'support'],
      default: 'general',
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'resolved'],
      default: 'pending',
    },
    isPublic: {
      type: Boolean,
      default: true, // Show on public feedback page
    },
    adminResponse: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
FeedbackSchema.index({ createdAt: -1 });
FeedbackSchema.index({ rating: -1 });
FeedbackSchema.index({ isPublic: 1 });

export default mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);

