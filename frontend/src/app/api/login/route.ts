import { NextRequest, NextResponse } from 'next/server';

// filepath: /workspaces/AI-Care-Note-Summarizer/frontend/src/app/api/login/route.ts

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, role } = body;

    if (!username || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    
    const response = await fetch(`${backendUrl}/auth/jwt/create/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username:username, password:password }),
    });
    if (!response.ok) {
      console.log(response);
      const data = await response.json();
      return NextResponse.json(
        { error: data.detail || 'Login failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    const res = NextResponse.json(data, { status: 200 });
    res.cookies.set('access_token', data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}