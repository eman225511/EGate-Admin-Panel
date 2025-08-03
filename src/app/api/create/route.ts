import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { apiUrl, admin, key, hwid } = body

    if (!apiUrl || !admin) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    let url: URL
    
    if (key) {
      // Create specific key
      url = new URL(`${apiUrl}/create`)
      url.searchParams.set('admin', admin)
      url.searchParams.set('key', key)
      if (hwid) {
        url.searchParams.set('hwid', hwid)
      }
    } else {
      // Generate random key
      url = new URL(`${apiUrl}/make`)
      url.searchParams.set('admin', admin)
    }

    const response = await fetch(url.toString(), {
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
    console.error('Create key proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to create key' },
      { status: 500 }
    )
  }
}
