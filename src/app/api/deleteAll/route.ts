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
    const response = await fetch(`${apiUrl}/deleteAll?admin=${encodeURIComponent(admin)}`)
    
    const data = await response.text()
    
    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  } catch (error) {
    console.error('Delete all keys proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to delete all keys' },
      { status: 500 }
    )
  }
}
