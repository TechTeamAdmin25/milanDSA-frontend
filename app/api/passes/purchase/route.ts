import { NextResponse } from 'next/server'



export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, passType } = body

    if (!email || !passType) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 })
    }

    const domain = email.split('@')[1]?.toLowerCase()
    
    // 1. SRM Restricted Pass Check
    // "For single-day and pro-show passes, verify the email domain as @srmist.edu.in."
    if (passType === 'single' || passType === 'pro') {
      if (!domain?.endsWith('srmist.edu.in')) {
        return NextResponse.json({ 
          success: false, 
          message: 'This pass is exclusively for SRM Verified Students only (@srmist.edu.in).' 
        }, { status: 403 })
      }
    }

    // 2. Events Pass Check - Open to all users (Verified by Login)
    if (passType === 'events') {
        // No domain restriction for events pass
    }

    // Success
    return NextResponse.json({ success: true, message: 'Verification Successful' })

  } catch {
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
  }
}
