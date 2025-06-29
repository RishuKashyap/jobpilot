import { createClient } from '../lib/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient() // ✅ await here!

  const {
    data: { user },
  } = await supabase.auth.getUser() // ✅ this now works

  if (!user) {
    redirect('/login')
  }

  return <>{children}</>
}
