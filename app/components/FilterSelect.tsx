'use client'
import React from 'react'

interface FilterSelectProps {
  selectedStatus: string
  setSelectedStatus: (value: string) => void
}

const FilterSelect: React.FC<FilterSelectProps> = ({ selectedStatus, setSelectedStatus }) => {
  return (
    <select
      value={selectedStatus}
      onChange={(e) => setSelectedStatus(e.target.value)}
      className="mb-4 ml-0 md:ml-4 w-full md:w-1/4 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Filter by Status</option>
      <option value="applied">Applied</option>
      <option value="interview">Interview</option>
      <option value="offer">Offer</option>
      <option value="rejected">Rejected</option>
    </select>
  )
}

export default FilterSelect
