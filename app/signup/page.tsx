// app/signup/page.tsx
import { signup } from '../login/actions'

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form className="flex flex-col gap-4 w-full max-w-sm">
        <h1 className="text-xl font-semibold text-center">Create Account 📝</h1>

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

        <button formAction={signup} className="bg-blue-600 text-white py-2 rounded">
          Sign Up
        </button>

        <a href="/login" className="text-sm text-blue-600 text-center underline">
          Already have an account? Log in
        </a>
      </form>
    </div>
  )
}
