import nodemailer from 'nodemailer'

if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.warn('Email configuration incomplete. Email features will not work.')
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface EmailData {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailData) {
  try {
    const info = await transporter.sendMail({
      from: `"Quarterly Tax Estimator" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    })

    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

export function generateReminderEmail(
  userName: string,
  quarter: number,
  year: number,
  amount: number,
  dueDate: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Quarterly Tax Payment Reminder</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f7fafc;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white;">
        <!-- Header -->
        <div style="background-color: #3182ce; color: white; padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Quarterly Tax Payment Reminder</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 32px;">
          <p style="font-size: 16px; color: #2d3748; margin-bottom: 16px;">
            Hi ${userName},
          </p>
          
          <p style="font-size: 16px; color: #2d3748; margin-bottom: 24px;">
            This is a friendly reminder that your Q${quarter} ${year} estimated tax payment is due soon.
          </p>
          
          <!-- Payment Details -->
          <div style="background-color: #ebf8ff; border: 1px solid #bee3f8; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
            <h2 style="margin: 0 0 16px 0; font-size: 18px; color: #2b6cb0;">Payment Details</h2>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: #4a5568;">Quarter:</span>
              <span style="font-weight: bold; color: #2d3748;">Q${quarter} ${year}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: #4a5568;">Recommended Amount:</span>
              <span style="font-weight: bold; color: #2d3748; font-size: 18px;">$${amount.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #4a5568;">Due Date:</span>
              <span style="font-weight: bold; color: #e53e3e;">${new Date(dueDate).toLocaleDateString()}</span>
            </div>
          </div>
          
          <!-- CTA Button -->
          <div style="text-align: center; margin-bottom: 32px;">
            <a href="https://www.irs.gov/payments/direct-pay" 
               style="display: inline-block; background-color: #48bb78; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Pay with IRS Direct Pay →
            </a>
          </div>
          
          <p style="font-size: 14px; color: #718096; margin-bottom: 16px;">
            <strong>Important:</strong> This reminder is based on your previous calculation. Tax situations can change, so consider recalculating if your income or expenses have changed significantly.
          </p>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXTAUTH_URL}/calculator" 
               style="color: #3182ce; text-decoration: none;">
              Recalculate Your Payment →
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f7fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; font-size: 12px; color: #718096;">
            This is not tax advice. Consult a licensed tax professional for guidance on your specific situation.
          </p>
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #718096;">
            Quarterly Tax Estimator | 
            <a href="${process.env.NEXTAUTH_URL}/unsubscribe" style="color: #3182ce;">Unsubscribe</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}