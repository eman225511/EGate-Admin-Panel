import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const apiUrl = searchParams.get('apiUrl')
  const admin = searchParams.get('admin')

  if (!apiUrl || !admin) {
    return NextResponse.json(
      { error: 'Missing apiUrl or admin parameter' },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(`${apiUrl}/ping?admin=${encodeURIComponent(admin)}`)
    const data = await response.text()
    
    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  } catch (error) {
    console.error('Ping proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to connect to API' },
      { status: 500 }
    )
  }
}
