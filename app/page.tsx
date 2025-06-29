// app/page.tsx
import { createClient } from './lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard') // ✅ user logged in
  } else {
    redirect('/login') // 🚪 user not logged in
  }

  // (This return won't be reached but needed for type checking)
  return null
}
