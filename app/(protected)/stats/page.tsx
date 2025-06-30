'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '../../lib/supabase/Client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

interface Job {
  id: number
  status: string
}

const StatsPage = () => {
  const [data, setData] = useState([
    { name: 'Applied', count: 0 },
    { name: 'Interview', count: 0 },
    { name: 'Offer', count: 0 },
    { name: 'Rejected', count: 0 },
  ])

  useEffect(() => {
    const fetchJobs = async () => {
      const supabase = createClient()
      const { data: jobs, error } = await supabase.from('jobs').select('id, status')
      if (error) {
        console.error('Error fetching jobs:', error.message)
        return
      }

      const statusCount = {
        applied: 0,
        interview: 0,
        offer: 0,
        rejected: 0,
      }

      jobs.forEach((job: Job) => {
        const status = job.status.toLowerCase()
        if (status in statusCount) {
          statusCount[status as keyof typeof statusCount]++
        }
      })

      setData([
        { name: 'Applied', count: statusCount.applied },
        { name: 'Interview', count: statusCount.interview },
        { name: 'Offer', count: statusCount.offer },
        { name: 'Rejected', count: statusCount.rejected },
      ])
    }

    fetchJobs()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Job Application Stats</h1>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatsPage
