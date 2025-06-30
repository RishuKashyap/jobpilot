'use client'
import React from 'react'
import { signOut } from '../logout/actions'



const Header = () => {
  return (
    <header className="mt-4 ml-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 className="text-2xl font-bold text-gray-800">My Applications</h1>
      

      <form action={signOut}>
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </form>

    </header>
  )
}

export default Header;
