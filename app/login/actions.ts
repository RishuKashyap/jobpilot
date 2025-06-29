// app/login/actions.ts
'use server'

import { createClient } from '../lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    console.error('Login error:', error)
    throw new Error('Login failed. Please check your credentials.')
  }

  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    console.error('🔴 Full Supabase Signup Error:', error) // <-- Add this line
    throw new Error('Signup failed. Maybe user already exists?')
  }

  // With email confirmation ON, user is not signed in yet
  redirect('/login')
}
