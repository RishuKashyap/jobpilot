// app/error/error.tsx

'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">Something went wrong!</h2>
      <p className="mb-4">{error.message}</p>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
}

