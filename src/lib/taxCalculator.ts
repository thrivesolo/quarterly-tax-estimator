import { BusinessStructure } from '@prisma/client'

export interface TaxInput {
  businessStructure: BusinessStructure
  currentYearIncome: number
  businessExpenses: number
  priorYearTaxOwed: number
  selfEmploymentTax: boolean
  quarter: number
  year: number
}

export interface TaxCalculationResult {
  recommendedPayment: number
  calculationMethod: 'safe_harbor' | 'current_year'
  breakdown: {
    incomeTax: number
    selfEmploymentTax: number
    total: number
  }
  safeHarborAmount: number
  currentYearAmount: number
  nextDueDate: string
}

// Tax rates for 2024 (update annually)
const TAX_BRACKETS_2024 = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191850, rate: 0.24 },
  { min: 191850, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 }
]

const SELF_EMPLOYMENT_TAX_RATE = 0.1413 // 14.13% (Social Security + Medicare)
const SELF_EMPLOYMENT_DEDUCTION = 0.9235 // 92.35% of SE income subject to SE tax

// Quarterly due dates for 2024
const QUARTERLY_DUE_DATES = {
  1: '2024-04-15', // Q1
  2: '2024-06-17', // Q2
  3: '2024-09-16', // Q3
  4: '2025-01-15'  // Q4
}

export function calculateTax(input: TaxInput): TaxCalculationResult {
  const netIncome = input.currentYearIncome - input.businessExpenses
  
  // Calculate safe harbor amount (110% of prior year tax if AGI > $150k, otherwise 100%)
  const safeHarborPercentage = input.currentYearIncome > 150000 ? 1.10 : 1.00
  const safeHarborAmount = (input.priorYearTaxOwed * safeHarborPercentage) / 4

  // Calculate current year estimated tax
  const currentYearAmount = calculateCurrentYearTax(input, netIncome) / 4

  // Choose the lower of safe harbor or current year method
  const recommendedPayment = Math.min(safeHarborAmount, currentYearAmount)
  const calculationMethod = safeHarborAmount <= currentYearAmount ? 'safe_harbor' : 'current_year'

  // Calculate breakdown for current year method
  const breakdown = calculateTaxBreakdown(input, netIncome)

  // Get next due date
  const nextDueDate = QUARTERLY_DUE_DATES[input.quarter as keyof typeof QUARTERLY_DUE_DATES]

  return {
    recommendedPayment: Math.round(recommendedPayment),
    calculationMethod,
    breakdown,
    safeHarborAmount: Math.round(safeHarborAmount),
    currentYearAmount: Math.round(currentYearAmount),
    nextDueDate
  }
}

function calculateCurrentYearTax(input: TaxInput, netIncome: number): number {
  // Calculate federal income tax using brackets
  const incomeTax = calculateIncomeTax(netIncome, input.businessStructure)
  
  // Calculate self-employment tax if applicable
  const selfEmploymentTax = input.selfEmploymentTax 
    ? calculateSelfEmploymentTax(netIncome)
    : 0

  return incomeTax + selfEmploymentTax
}

function calculateIncomeTax(income: number, businessStructure: BusinessStructure): number {
  // Different deductions based on business structure
  let adjustedIncome = income
  
  // Apply standard deduction (2024 amounts)
  const standardDeduction = 14600 // Single filer standard deduction
  
  // For S-Corps, income is not subject to self-employment tax
  // but passes through to personal return
  if (businessStructure === BusinessStructure.S_CORP) {
    adjustedIncome = Math.max(0, income - standardDeduction)
  } else {
    // For sole props, partnerships, LLCs - apply SE tax deduction
    const seDeduction = income * SELF_EMPLOYMENT_DEDUCTION * SELF_EMPLOYMENT_TAX_RATE * 0.5
    adjustedIncome = Math.max(0, income - standardDeduction - seDeduction)
  }

  // Calculate tax using brackets
  let tax = 0
  for (const bracket of TAX_BRACKETS_2024) {
    if (adjustedIncome <= bracket.min) break
    
    const taxableInThisBracket = Math.min(adjustedIncome, bracket.max) - bracket.min
    tax += taxableInThisBracket * bracket.rate
  }

  return tax
}

function calculateSelfEmploymentTax(netIncome: number): number {
  if (netIncome <= 0) return 0
  
  const seTaxableIncome = netIncome * SELF_EMPLOYMENT_DEDUCTION
  return seTaxableIncome * SELF_EMPLOYMENT_TAX_RATE
}

function calculateTaxBreakdown(input: TaxInput, netIncome: number): TaxCalculationResult['breakdown'] {
  const incomeTax = calculateIncomeTax(netIncome, input.businessStructure)
  const selfEmploymentTax = input.selfEmploymentTax 
    ? calculateSelfEmploymentTax(netIncome)
    : 0
  
  return {
    incomeTax: Math.round(incomeTax),
    selfEmploymentTax: Math.round(selfEmploymentTax),
    total: Math.round(incomeTax + selfEmploymentTax)
  }
}

export function getQuarterlyDueDates(year: number) {
  // This should be updated annually
  return {
    1: `${year}-04-15`,
    2: `${year}-06-17`, 
    3: `${year}-09-16`,
    4: `${year + 1}-01-15`
  }
}

export function getCurrentQuarter(): number {
  const now = new Date()
  const month = now.getMonth() + 1 // JavaScript months are 0-indexed
  
  if (month >= 1 && month <= 3) return 1
  if (month >= 4 && month <= 6) return 2
  if (month >= 7 && month <= 9) return 3
  return 4
}