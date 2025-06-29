'use client'
import React from 'react'

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (value: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search by company or job title..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="mb-4 w-full md:w-1/2 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}

export default SearchBar
