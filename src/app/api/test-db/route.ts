import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('Testing database connection...')
    
    // Test basic database connection
    await prisma.$connect()
    console.log('Database connected successfully')
    
    // Test a simple query
    const userCount = await prisma.user.count()
    console.log('User count:', userCount)
    
    return new Response(JSON.stringify({ 
      status: 'ok', 
      userCount,
      message: 'Database connection successful' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return new Response(JSON.stringify({ 
      status: 'error', 
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Database connection failed' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  } finally {
    await prisma.$disconnect()
  }
}