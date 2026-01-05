import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { isAdmin } from '@/lib/supabase/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect admin login to home page (closure notice)
  if (pathname === '/admin/login' || pathname.startsWith('/admin/login')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Import shouldBypassAuth dynamically to avoid issues
  const { shouldBypassAuth } = await import('@/lib/supabase/auth');
  const bypassAuth = shouldBypassAuth();

  // Protect admin routes (except login - which is now redirected above)
  if (pathname.startsWith('/admin')) {
    // Bypass authentication in development if enabled
    if (bypassAuth) {
      console.log('🔓 [MIDDLEWARE] Bypassing authentication for:', pathname);
      const response = NextResponse.next();
      response.headers.set('x-pathname', pathname);
      return response;
    }

    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      // No token, redirect to home (closure notice)
      return NextResponse.redirect(new URL('/', request.url));
    }

    try {
      // Dynamically import Supabase only when needed (for admin routes)
      // Wrap in try-catch to handle missing env vars gracefully
      let supabaseAdmin, isAdmin;
      try {
        const supabaseModule = await import('@/lib/supabase/server');
        const authModule = await import('@/lib/supabase/auth');
        supabaseAdmin = supabaseModule.supabaseAdmin;
        isAdmin = authModule.isAdmin;
      } catch (importError: any) {
        // If Supabase env vars are missing, redirect to home (closure notice)
        console.error('Failed to import Supabase:', importError.message);
        const response = NextResponse.redirect(new URL('/', request.url));
        response.cookies.delete('admin_token');
        return response;
      }
      
      // Verify the token
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

      if (error || !user) {
        // Invalid token, redirect to home (closure notice)
        const response = NextResponse.redirect(new URL('/', request.url));
        response.cookies.delete('admin_token');
        return response;
      }

      // Check if user is admin
      const adminStatus = await isAdmin(user.email || '');
      if (!adminStatus) {
        // Not an admin, redirect to home (closure notice)
        const response = NextResponse.redirect(new URL('/', request.url));
        response.cookies.delete('admin_token');
        return response;
      }

      // Authenticated admin, allow access
      const response = NextResponse.next();
      response.headers.set('x-pathname', pathname);
      return response;
    } catch (error) {
      // Error verifying token, redirect to home (closure notice)
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  // Redirect all non-admin, non-home, non-api routes to home (closure notice)
  // Allow: /, /admin/*, /api/*, static files, and public assets
  const isStaticFile = 
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$/i);
  
  if (
    pathname !== '/' &&
    !pathname.startsWith('/admin') &&
    !pathname.startsWith('/api') &&
    !isStaticFile
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // For allowed routes, just add pathname header
  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

