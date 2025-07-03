import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const calculations = await prisma.taxCalculation.findMany({
      where: {
        userId: (session.user as any).id
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        quarter: true,
        year: true,
        recommendedPayment: true,
        calculationMethod: true,
        createdAt: true
      }
    })

    return NextResponse.json(calculations)

  } catch (error) {
    console.error('Fetch calculations error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}