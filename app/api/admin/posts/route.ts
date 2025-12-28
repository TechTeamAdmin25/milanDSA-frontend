import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // 'pending', 'approved', 'denied', or null for all

    // Build query
    let query = supabase
      .from('explore_posts_manager')
      .select('*')
      .order('created_at', { ascending: false });

    // Filter by status if provided
    if (status) {
      query = query.eq('upload_status', status);
    }

    const { data: posts, error: postsError } = await query;

    if (postsError) {
      console.error('Fetch posts error:', postsError);
      return NextResponse.json(
        { error: 'Failed to fetch posts' },
        { status: 500 }
      );
    }

    // Get stats for all statuses
    const { data: stats, error: statsError } = await supabase
      .from('explore_posts_manager')
      .select('upload_status')
      .then(({ data, error }) => {
        if (error) return { data: null, error };

        const statusCounts = {
          pending: 0,
          approved: 0,
          denied: 0
        };

        data?.forEach(post => {
          const status = post.upload_status as keyof typeof statusCounts;
          if (status in statusCounts) {
            statusCounts[status]++;
          }
        });

        return { data: statusCounts, error: null };
      });

    if (statsError) {
      console.error('Fetch stats error:', statsError);
    }

    return NextResponse.json({
      success: true,
      posts: posts || [],
      stats: stats || { pending: 0, approved: 0, denied: 0 }
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { postId, status } = await request.json();

    if (!postId || !status) {
      return NextResponse.json(
        { error: 'Post ID and status are required' },
        { status: 400 }
      );
    }

    if (!['pending', 'approved', 'denied'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be pending, approved, or denied' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Update post status
    const { data: updatedPost, error: updateError } = await supabase
      .from('explore_posts_manager')
      .update({ upload_status: status })
      .eq('id', postId)
      .select()
      .single();

    if (updateError) {
      console.error('Update post error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update post status' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      post: updatedPost,
      message: `Post status updated to ${status}`
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
