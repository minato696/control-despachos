// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  console.log('Middleware - Path:', pathname)
  
  // Rutas públicas que no requieren autenticación
  const publicPaths = ['/login', '/api/auth/login', '/api/auth/logout', '/api/auth/verify']
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))
  
  // Si es una ruta pública, permitir acceso
  if (isPublicPath) {
    return NextResponse.next()
  }
  
  // Obtener token de las cookies
  const token = request.cookies.get('token')?.value
  console.log('Middleware - Token exists:', !!token)
  
  // Si hay token, permitir acceso (sin validar por ahora)
  if (token) {
    return NextResponse.next()
  }
  
  // Si no hay token y no es ruta pública, redirigir a login
  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  
  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}