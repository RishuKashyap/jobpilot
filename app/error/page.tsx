// app/error/page.tsx
'use client'

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center min-h-screen text-red-600">
      <p>{error.message || 'Something went wrong.'}</p>
    </div>
  )
}
