export async function GET() {
  try {
    const debug = {
      nodeEnv: process.env.NODE_ENV,
      hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      nextAuthUrl: process.env.NEXTAUTH_URL,
      // Don't log actual secrets, just check if they exist
      databaseUrlPrefix: process.env.DATABASE_URL?.split('://')[0] || 'missing',
      timestamp: new Date().toISOString()
    }
    
    console.log('Debug info:', debug)
    
    return new Response(JSON.stringify(debug), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Debug endpoint error:', error)
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}