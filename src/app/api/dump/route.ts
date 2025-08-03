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
    const response = await fetch(`${apiUrl}/dump?admin=${encodeURIComponent(admin)}`)
    
    if (!response.ok) {
      return new NextResponse(await response.text(), {
        status: response.status,
      })
    }

    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Dump proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to connect to API' },
      { status: 500 }
    )
  }
}
