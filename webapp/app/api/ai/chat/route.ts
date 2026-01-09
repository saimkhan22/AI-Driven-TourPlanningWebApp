import { NextRequest, NextResponse } from 'next/server';
import { getChatResponse } from '@/lib/openaiService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const response = await getChatResponse(message);

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error('Error in AI chat API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get AI response' },
      { status: 500 }
    );
  }
}

