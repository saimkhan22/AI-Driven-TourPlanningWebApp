import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Feedback from '@/models/Feedback';


export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '50');
    const rating = searchParams.get('rating');

    let query: any = { isPublic: true };

    if (rating) {
      query.rating = parseInt(rating);
    }

    const feedbacks = await Feedback.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('-email -userId') // Don't expose email and userId publicly
      .lean();

    // Calculate statistics
    const stats = await Feedback.aggregate([
      { $match: { isPublic: true } },
      {
        $group: {
          _id: null,
          totalFeedback: { $sum: 1 },
          averageRating: { $avg: '$rating' },
          fiveStars: { $sum: { $cond: [{ $eq: ['$rating', 5] }, 1, 0] } },
          fourStars: { $sum: { $cond: [{ $eq: ['$rating', 4] }, 1, 0] } },
          threeStars: { $sum: { $cond: [{ $eq: ['$rating', 3] }, 1, 0] } },
          twoStars: { $sum: { $cond: [{ $eq: ['$rating', 2] }, 1, 0] } },
          oneStar: { $sum: { $cond: [{ $eq: ['$rating', 1] }, 1, 0] } },
        },
      },
    ]);

    return NextResponse.json({
      success: true,
      feedbacks,
      stats: stats[0] || {
        totalFeedback: 0,
        averageRating: 0,
        fiveStars: 0,
        fourStars: 0,
        threeStars: 0,
        twoStars: 0,
        oneStar: 0,
      },
    });
  } catch (error: any) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Submit new feedback
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, rating, category, subject, message, isPublic } = body;

    // Validation
    if (!name || !email || !rating || !category || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Create feedback
    const feedback = await Feedback.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      rating,
      category,
      subject: subject.trim(),
      message: message.trim(),
      isPublic: isPublic !== false, // Default to true
    });

    console.log('✅ Feedback submitted:', { id: feedback._id, rating, category });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your feedback!',
      feedback: {
        id: feedback._id,
        rating: feedback.rating,
        category: feedback.category,
      },
    });
  } catch (error: any) {
    console.error('❌ Error submitting feedback:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit feedback. Please try again.' },
      { status: 500 }
    );
  }
}

