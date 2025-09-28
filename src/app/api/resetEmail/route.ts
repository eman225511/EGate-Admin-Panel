import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const apiUrl = searchParams.get('apiUrl')
  const key = searchParams.get('key')
  const admin = searchParams.get('admin')

  if (!apiUrl || !key || !admin) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  try {
    const response = await fetch(`${apiUrl}/resetEmail?key=${encodeURIComponent(key)}&admin=${encodeURIComponent(admin)}`, {
      method: 'GET',
    })

    const data = await response.text()
    
    return new NextResponse(data, { status: response.status })
  } catch (error) {
    console.error('Reset email error:', error)
    return NextResponse.json({ error: 'Failed to reset email' }, { status: 500 })
  }
}
