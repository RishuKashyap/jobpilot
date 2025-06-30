'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '../../lib/supabase/Client'
import { Job } from '../../types/Job'
import JobCard from '../../components/JobCard'

export default function RemindersPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        console.error("User not logged in")
        return
      }

      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('user_id', user.id)

      if (error) {
        console.error('Error fetching jobs:', error.message)
      } else {
        setJobs(data || [])
      }

      setLoading(false)
    }

    fetchJobs()
  }, [])

  const shouldFollowUp = (job: Job): boolean => {
    if (!job.date || !job.status) return false

    const jobDate = new Date(job.date)
    const today = new Date()
    const diffDays = Math.floor((today.getTime() - jobDate.getTime()) / (1000 * 60 * 60 * 24))

    switch (job.status.toLowerCase()) {
      case 'applied':
        return diffDays >= 7
      case 'interview':
        return diffDays >= 4
      case 'offer':
        return diffDays >= 2
      default:
        return false
    }
  }

  const followUpJobs = jobs.filter(shouldFollowUp)

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">🔔 Upcoming Reminders</h1>

      {loading ? (
        <p>Loading jobs...</p>
      ) : followUpJobs.length === 0 ? (
        <p>No follow-ups needed right now 🎉</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {followUpJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onDelete={() => {}} // optional: disable or reuse
              onEdit={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  )
}
