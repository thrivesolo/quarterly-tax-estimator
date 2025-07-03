import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { calculateTax, TaxInput } from '@/lib/taxCalculator'
import { BusinessStructure } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      businessStructure,
      currentYearIncome,
      businessExpenses,
      priorYearTaxOwed,
      selfEmploymentTax,
      quarter,
      year
    } = body

    // Validate input
    if (!businessStructure || 
        currentYearIncome === undefined || 
        businessExpenses === undefined || 
        priorYearTaxOwed === undefined ||
        selfEmploymentTax === undefined ||
        !quarter || 
        !year) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate business structure
    if (!Object.values(BusinessStructure).includes(businessStructure)) {
      return NextResponse.json(
        { message: 'Invalid business structure' },
        { status: 400 }
      )
    }

    const taxInput: TaxInput = {
      businessStructure,
      currentYearIncome: parseFloat(currentYearIncome),
      businessExpenses: parseFloat(businessExpenses),
      priorYearTaxOwed: parseFloat(priorYearTaxOwed),
      selfEmploymentTax: Boolean(selfEmploymentTax),
      quarter: parseInt(quarter),
      year: parseInt(year)
    }

    // Calculate tax
    const result = calculateTax(taxInput)

    // Save calculation to database
    const savedCalculation = await prisma.taxCalculation.upsert({
      where: {
        userId_quarter_year: {
          userId: (session.user as any).id,
          quarter: taxInput.quarter,
          year: taxInput.year
        }
      },
      update: {
        businessStructure: taxInput.businessStructure,
        currentYearIncome: taxInput.currentYearIncome,
        businessExpenses: taxInput.businessExpenses,
        priorYearTaxOwed: taxInput.priorYearTaxOwed,
        selfEmploymentTax: taxInput.selfEmploymentTax,
        recommendedPayment: result.recommendedPayment,
        calculationMethod: result.calculationMethod
      },
      create: {
        userId: (session.user as any).id,
        quarter: taxInput.quarter,
        year: taxInput.year,
        businessStructure: taxInput.businessStructure,
        currentYearIncome: taxInput.currentYearIncome,
        businessExpenses: taxInput.businessExpenses,
        priorYearTaxOwed: taxInput.priorYearTaxOwed,
        selfEmploymentTax: taxInput.selfEmploymentTax,
        recommendedPayment: result.recommendedPayment,
        calculationMethod: result.calculationMethod
      }
    })

    return NextResponse.json({
      ...result,
      calculationId: savedCalculation.id
    })

  } catch (error) {
    console.error('Tax calculation error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}