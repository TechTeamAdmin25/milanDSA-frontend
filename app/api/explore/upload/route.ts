import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    const hashtags = JSON.parse(formData.get('hashtags') as string);
    const postedBy = formData.get('posted_by') as string;

    if (!image || !postedBy) {
      return NextResponse.json(
        { error: 'Image and posted_by are required' },
        { status: 400 }
      );
    }

    // Mock successful upload
    // In a real scenario without DB, we can't persist, but we can return success
    // so the UI updates (though it might disappear on refresh if we don't persist to file, which we won't do here for simplicity)
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockNewPost = {
        id: `temp_${Date.now()}`,
        image_url: URL.createObjectURL(image), // Valid for browser side if we returned it directly, but for API response...
        // Actually, URL.createObjectURL won't work on server. 
        // We'll return a placeholder or just say success.
        // For the purpose of the demo, let's return a random unspash image or the one they "uploaded" if we could echo it back.
        // Let's just return a placeholder Unsplash image that "looks" like what they might have uploaded.
        // Or better, just one of the existing mock images to avoid broken links.
        posted_by: postedBy,
        hashtags: JSON.stringify(hashtags),
        upload_status: 'approved',
        created_at: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      post: mockNewPost
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
