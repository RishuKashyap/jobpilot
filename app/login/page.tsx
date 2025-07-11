// app/login/page.tsx
import { login } from './actions'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form className="flex flex-col gap-4 w-full max-w-sm">
        <h1 className="text-xl font-semibold text-center">Welcome 👋</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border px-4 py-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="border px-4 py-2 rounded"
        />

        <button formAction={login} className="bg-blue-600 text-white py-2 rounded">
          Log In
        </button>

        <p className="text-sm mt-2">
          <a href="/forgot-password" className="text-blue-600 underline">Forgot your password?</a>
        </p>


        <a href="/signup" className="text-sm text-blue-600 text-center underline">
        <p>Don&apos;t have an account?</p>

        </a>
      </form>
    </div>
  )
}
