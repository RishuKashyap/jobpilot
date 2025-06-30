'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const pathname = usePathname()

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Stats', path: '/stats' },
    { name: 'Follow-Ups', path: '/reminders' },
    { name: 'Saved Jobs', path: '/saved' }, // optional placeholder
    { name: 'Settings', path: '/settings' }, // optional placeholder
  ]

  return (
    <aside
      className={`bg-gray-100 p-4 border-b md:border-r border-gray-200 
        ${isOpen ? 'block' : 'hidden'} md:block w-full md:w-64`}
    >
      <h2 className="text-2xl font-bold mb-4">📋 JobPilot</h2>
      <nav className="space-y-2">
        {navLinks.map(({ name, path }) => (
          <Link
            key={path}
            href={path}
            className={`block px-2 py-1 rounded text-gray-700 hover:text-blue-600 hover:bg-gray-200 ${
              pathname === path ? 'text-blue-700 font-semibold bg-blue-100' : ''
            }`}
          >
            {name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
