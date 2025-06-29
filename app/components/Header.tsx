'use client'
import React from 'react'
import { signOut } from '../logout/actions'


interface HeaderProps {
  onAddClick: () => void
}

const Header: React.FC<HeaderProps> = ({ onAddClick }) => {
  return (
    <header className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 className="text-2xl font-bold text-gray-800">My Applications</h1>
      <button
        onClick={onAddClick}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        + Add Job
      </button>

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

export default Header
