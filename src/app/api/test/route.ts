export async function GET() {
  return new Response(JSON.stringify({
    message: 'API endpoint working',
    timestamp: new Date().toISOString(),
    env: {
      nodeEnv: process.env.NODE_ENV,
      hasDbUrl: !!process.env.DATABASE_URL,
      hasAuthSecret: !!process.env.NEXTAUTH_SECRET,
      hasAuthUrl: !!process.env.NEXTAUTH_URL,
      authUrl: process.env.NEXTAUTH_URL
    }
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}