import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // 1. Exchange the code for a session
    const { data: { session } } = await supabase.auth.exchangeCodeForSession(code);

    if (session?.user?.email) {
        // 2. CHECK THE DOMAIN
        const email = session.user.email;
        
        if (!email.endsWith('@srmist.edu.in')) {
            // 3. UNAUTHORIZED: Sign them out immediately
            await supabase.auth.signOut();
            
            // 4. Redirect back to login with an error
            return NextResponse.redirect(`${requestUrl.origin}/login?error=InvalidDomain`);
        }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}