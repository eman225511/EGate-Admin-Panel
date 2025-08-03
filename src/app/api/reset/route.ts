import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const apiUrl = searchParams.get('apiUrl')
  const admin = searchParams.get('admin')
  const key = searchParams.get('key')

  if (!apiUrl || !admin || !key) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(`${apiUrl}/reset?admin=${encodeURIComponent(admin)}&key=${encodeURIComponent(key)}`, {
      method: 'POST',
    })
    
    const data = await response.text()
    
    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  } catch (error) {
    console.error('Reset key proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to reset key' },
      { status: 500 }
    )
  }
}
