import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
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
    const response = await fetch(`${apiUrl}/info?admin=${encodeURIComponent(admin)}&key=${encodeURIComponent(key)}`)
    
    if (!response.ok) {
      return new NextResponse(await response.text(), {
        status: response.status,
      })
    }

    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Info key proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to get key info' },
      { status: 500 }
    )
  }
}
