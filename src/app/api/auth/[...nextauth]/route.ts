import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

export async function GET(request: Request) {
  try {
    console.log('NextAuth GET request:', request.url)
    return await handler(request)
  } catch (error) {
    console.error('NextAuth GET error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export async function POST(request: Request) {
  try {
    console.log('NextAuth POST request:', request.url)
    return await handler(request)
  } catch (error) {
    console.error('NextAuth POST error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}