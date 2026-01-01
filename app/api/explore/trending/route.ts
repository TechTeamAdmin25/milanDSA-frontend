import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const MOCK_TRENDING = [
  { hashtag: 'milan2026', count: 1250 },
  { hashtag: 'concert', count: 850 },
  { hashtag: 'djnight', count: 620 },
  { hashtag: 'dance', count: 450 },
  { hashtag: 'fashion', count: 380 },
  { hashtag: 'tech', count: 210 },
  { hashtag: 'food', count: 150 },
];

export async function GET(request: NextRequest) {
  try {
     return NextResponse.json({
        success: true,
        trending: MOCK_TRENDING
      });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

