'use client'

import { useState } from 'react'
import { createClient } from '../lib/supabase/Client'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleUpdatePassword = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })
    if (error) {
      setMessage('Error updating password.')
    } else {
      setMessage('Password updated! Redirecting...')
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
  }

  return (
    <div className="p-4">
      <h2>Reset Your Password</h2>
      <input
        type="password"
        placeholder="New password"
        className="border p-2 mt-2 block w-full"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleUpdatePassword} className="mt-4 bg-green-600 text-white px-4 py-2">
        Update Password
      </button>
      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  )
}
