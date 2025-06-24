'use client'

import { useState } from 'react'
import { useEffect } from 'react';

type Job = {
  company: string
  title: string
  date: string
  status: string
  notes: string
}



export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Job>({
  company: '',
  title: '',
  date: '',
  status: '',
  notes: ''
  })

const [jobs, setJobs] = useState<Job[]>([]) // store added jobs

const handleDelete = (index: number) => {
  const updatedJobs = [...jobs]
  updatedJobs.splice(index, 1)
  setJobs(updatedJobs)
}

const [editingIndex, setEditingIndex] = useState<number | null>(null)
const handleEdit = (index: number) => {
  setFormData(jobs[index])
  setEditingIndex(index)
  setIsModalOpen(true)
}



// Load Jobs on Page Load
useEffect(() => {
  const storedJobs = localStorage.getItem('jobs')
  if (storedJobs) {
    setJobs(JSON.parse(storedJobs))
  }
}, [])

// Save Jobs When They Change
useEffect(() => {
  localStorage.setItem('jobs', JSON.stringify(jobs))
}, [jobs])



  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* TOGGLE BUTTON */}
      <button className='md:hidden' onClick={()=>{setSidebarOpen(!sidebarOpen)}}>
        MENU
      </button>

      
      {/* Sidebar */}
      <aside
        className={`w-full md:w-64 bg-gray-100 p-4 border-b md:border-r border-gray-200 
          ${sidebarOpen ? 'block' : 'hidden'} md:block`}
      >
        <h2 className="text-2xl font-bold mb-4">📋 JobPilot</h2>
        <nav className="space-y-2">
          <a href="#" className="block text-gray-700 hover:text-blue-600">Dashboard</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Saved Jobs</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Settings</a>
        </nav>
      </aside>


      


      {/* Main content */}
      <main className="flex-1 p-4">
        <header className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">My Applications</h1>
          <button 
            onClick={() => {
              setFormData({ company: '', title: '', date: '', status: '', notes: '' })
              setEditingIndex(null)
              setIsModalOpen(true)
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add Job
          </button>
        </header>

        {/* Searchbar */}
        <input
          type="text"
          placeholder="Search by company or job title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 w-full md:w-1/2 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />


        {/* Filter */}
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



        {/* Job Cards Grid and MAP function */}
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {jobs
            .filter((job) => {
              const matchesSearch =
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.company.toLowerCase().includes(searchQuery.toLowerCase())

              const matchesStatus =
                selectedStatus === '' || job.status.toLowerCase() === selectedStatus.toLowerCase()

              return matchesSearch && matchesStatus
            })
            .map((job, index) => (
              <JobCard
                key={index}
                job={job}
                onDelete={() => handleDelete(index)}
                onEdit={() => handleEdit(index)}
              />
          ))}

        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Add New Job</h2>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault()
                if (editingIndex !== null) {
                // Edit existing job
                const updatedJobs = [...jobs]
                updatedJobs[editingIndex] = formData
                setJobs(updatedJobs)
              } else {
                // Add new job
                setJobs([...jobs, formData])
              }

              // Reset everything
              setFormData({ company: '', title: '', date: '', status: '', notes: '' })
              setEditingIndex(null)
              setIsModalOpen(false)
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full border border-gray-300 text-gray-800 placeholder-gray-500 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

              />
              <input
                type="text"
                placeholder="Job Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-gray-300 text-gray-800 placeholder-gray-500 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full border border-gray-300 text-gray-800 placeholder-gray-500 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })} 
                className="w-full border border-gray-300 text-gray-800 placeholder-gray-500 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

              >
                <option value="">Select Status</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
              <textarea
                placeholder="Notes (optional)"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full border border-gray-300 text-gray-800 placeholder-gray-500 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

              ></textarea>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

function JobCard({ job, onDelete, onEdit}: { job: Job; onDelete: ()=> void ; onEdit: () => void}) {
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
