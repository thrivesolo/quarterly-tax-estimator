import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sendEmail, generateReminderEmail } from '@/lib/email'

export async function POST() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || !(session.user as any).id || !session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Send a test reminder email
    const emailHtml = generateReminderEmail(
      session.user.name || 'Taxpayer',
      1,
      2024,
      1500,
      '2024-04-15'
    )

    const emailResult = await sendEmail({
      to: session.user.email,
      subject: 'Test: Q1 2024 Tax Payment Due Soon - $1,500',
      html: emailHtml
    })

    if (emailResult.success) {
      return NextResponse.json({ 
        message: 'Test reminder sent successfully',
        messageId: emailResult.messageId
      })
    } else {
      return NextResponse.json(
        { message: 'Failed to send test reminder', error: emailResult.error },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Test reminder error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}