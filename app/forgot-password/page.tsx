'use client'

import { useState } from 'react'
import { createClient } from '../lib/supabase/Client';
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleReset = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) {
      setMessage('Error sending reset email.')
    } else {
      setMessage('Check your email for the reset link!')
    }
  }

  return (
    <div className="p-4">
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Your email"
        className="border p-2 mt-2 block w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleReset} className="mt-4 bg-blue-500 text-white px-4 py-2">
        Send Reset Link
      </button>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  )
}
