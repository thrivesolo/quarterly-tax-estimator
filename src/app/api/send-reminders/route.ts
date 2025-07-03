import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail, generateReminderEmail } from '@/lib/email'
import { getQuarterlyDueDates } from '@/lib/taxCalculator'

export async function POST(request: NextRequest) {
  try {
    // This endpoint should be protected in production (API key, cron service, etc.)
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const now = new Date()
    const currentYear = now.getFullYear()
    
    // Get due dates for current year
    const dueDates = getQuarterlyDueDates(currentYear)
    
    // Find users who need reminders (7 days before due date)
    const reminderDate = new Date()
    reminderDate.setDate(reminderDate.getDate() + 7)
    
    for (const [quarter, dueDate] of Object.entries(dueDates)) {
      const quarterNum = parseInt(quarter)
      const due = new Date(dueDate)
      
      // Check if reminder should be sent (7 days before due date)
      if (Math.abs(reminderDate.getTime() - due.getTime()) < 24 * 60 * 60 * 1000) {
        
        // Find users with calculations for this quarter who haven't been reminded
        const usersToRemind = await prisma.user.findMany({
          where: {
            taxCalculations: {
              some: {
                quarter: quarterNum,
                year: currentYear
              }
            },
            emailReminders: {
              none: {
                quarter: quarterNum,
                year: currentYear,
                sent: true
              }
            }
          },
          include: {
            taxCalculations: {
              where: {
                quarter: quarterNum,
                year: currentYear
              },
              orderBy: {
                updatedAt: 'desc'
              },
              take: 1
            }
          }
        })

        // Send reminders
        for (const user of usersToRemind) {
          const calculation = user.taxCalculations[0]
          
          if (calculation && user.email) {
            const emailHtml = generateReminderEmail(
              user.name || 'Taxpayer',
              quarterNum,
              currentYear,
              Number(calculation.recommendedPayment),
              dueDate
            )

            const emailResult = await sendEmail({
              to: user.email,
              subject: `Q${quarterNum} ${currentYear} Tax Payment Due Soon - $${Number(calculation.recommendedPayment).toLocaleString()}`,
              html: emailHtml
            })

            // Record the reminder
            await prisma.emailReminder.create({
              data: {
                userId: user.id,
                quarter: quarterNum,
                year: currentYear,
                amount: calculation.recommendedPayment,
                dueDate: due,
                sent: emailResult.success,
                sentAt: emailResult.success ? new Date() : null
              }
            })

            console.log(`Reminder sent to ${user.email} for Q${quarterNum} ${currentYear}`)
          }
        }
      }
    }

    return NextResponse.json({ 
      message: 'Reminders processed successfully',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Reminder processing error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}