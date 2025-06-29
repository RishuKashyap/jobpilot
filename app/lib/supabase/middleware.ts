


// import { type NextRequest, NextResponse } from 'next/server'
// import { createServerClient } from '@supabase/ssr'

// export async function middleware(request: NextRequest) {
//   const response = NextResponse.next()

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll: () => request.cookies.getAll(),
//         setAll: (cookiesToSet) => {
//           cookiesToSet.forEach(({ name, value, options }) => {
//             response.cookies.set({ name, value, ...options })
//           })
//         },
//       },
//     }
//   )

//   await supabase.auth.getUser() // refresh session
//   return response
// }

// export const config = {
//   matcher: [
//     // No capture groups, only negative lookahead
//     '/((?!_next/static|_next/image|favicon.ico|login|auth|signup|error|.*\\.(svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
// }


import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set({ name, value, ...options })
          })
        },
      },
    }
  )

  await supabase.auth.getUser()
  return response
}
