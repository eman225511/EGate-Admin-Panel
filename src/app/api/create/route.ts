import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const apiUrl = searchParams.get('apiUrl')
  const admin = searchParams.get('admin')

  if (!apiUrl || !admin) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    )
  }

  try {
    // Generate random key using /make endpoint
    const response = await fetch(`${apiUrl}/make?admin=${encodeURIComponent(admin)}`)
    
    const data = await response.text()
    
    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  } catch (error) {
    console.error('Create key proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to create key' },
      { status: 500 }
    )
  }
}
