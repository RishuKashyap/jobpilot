'use client'
import React, { useState } from 'react';
import type { JobCardProps } from '../types/Job';

const JobCard: React.FC<JobCardProps> = ({ job, onDelete, onEdit }) => {
    const [showNotes, setShowNotes] = useState(false);
    
    
    
    return (
    <div className="bg-white shadow rounded-lg p-4 border border-gray-100 hover:shadow-md transition">
      <h2 className="text-lg font-semibold text-gray-900">{job.title}</h2>
      <p className="text-sm text-gray-500">{job.company}</p>
      <p className="text-sm text-gray-500">Status: <span className="text-yellow-600 font-medium">{job.status}</span></p>
      <p className="mt-2 text-sm text-gray-400">Applied on: {job.date}</p>

      {/* View Notes Button */}
      {job.notes && (
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="mt-3 text-blue-600 text-sm hover:underline focus:outline-none"
        >
          {showNotes ? '🙈 Hide Notes' : '📝 View Notes'}
        </button>
      )}

      {/* Notes Content */}
      {showNotes && (
        <div className="mt-2 p-2 bg-blue-50 text-gray-700 text-sm rounded border border-blue-100">
          {job.notes}
        </div>
      )}

      <button
        onClick={onEdit}
        className="text-blue-600 hover:text-blue-800 text-sm mt-2 mr-3"
      >
        ✏️ Edit
      </button>

      {/* Delete Button */}
      <button
        onClick={() => {
          if (confirm("Are you sure you want to delete this job?")) {
            onDelete()
          }
        }}
        className="mt-4 text-red-500 hover:text-red-700 text-sm"
      >
        🗑️ Delete
      </button>
    </div>
  )
}

export default JobCard;