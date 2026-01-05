import { NextResponse } from 'next/server';

// Redirect all product API requests to home page during temporary closure
export async function GET(request: Request) {
  return NextResponse.redirect(new URL('/', request.url), { status: 307 });
} 