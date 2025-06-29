// import { type NextRequest } from 'next/server'
// import { updateSession } from './app/lib/supabase/middleware'

// export async function middleware(request: NextRequest) {
//   return await updateSession(request)
// }

// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
// }

// middleware.ts
import { type NextRequest } from 'next/server'
import { updateSession } from './app/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|login|signup|auth/confirm).*)',
  ],
}
