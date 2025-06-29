'use client'
import React from 'react';
import { useState } from 'react'
import { useEffect } from 'react';
// import { supabase } from '../lib/supabase/Client';
import { createClient } from '../lib/supabase/Client'

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import FilterSelect from '../components/FilterSelect';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';


import { Job } from '../types/Job';



export default function DashboardPage(){
    const supabase = createClient(); // ✅ works without any issue

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
    });
    const [jobs, setJobs] = useState<Job[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

// fetch jobs code
    useEffect(() => {
    const fetchJobs = async () => {
        const { data, error } = await supabase.from('jobs').select('*');
        if (error) {
        console.error('Error fetching jobs:', error.message);
        } else {
        setJobs(data || []);
        }
    };
    fetchJobs();
    }, []);

// handleDelete

    const handleDelete = async (id: number) => {
    const { error } = await supabase.from('jobs').delete().eq('id', id);
    if (error) {
        console.error("Delete failed:", error);
    } else {
        setJobs(jobs.filter(job => job.id !== id));
    }
    };

// handleEdit

    const handleEdit = (index: number) => {
    setFormData(jobs[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
    };

// handleFormSubmit

   const handleFormSubmit = async (formData: Job) => {
  if (editingIndex !== null && jobs[editingIndex]?.id) {
    const jobId = jobs[editingIndex].id;
    const { error } = await supabase
      .from("jobs")
      .update(formData)
      .eq("id", jobId);

    if (!error) {
      const updatedJobs = [...jobs];
      updatedJobs[editingIndex] = { ...formData, id: jobId };
      setJobs(updatedJobs);
    }
  } else {
    // ✅ Get current user to get their ID
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Unable to get current user:", userError?.message);
      return;
    }

    // ✅ Attach user_id to the formData
    const jobWithUser = {
      ...formData,
      user_id: user.id, // 👈 this is the important part
    };

    const { data, error } = await supabase
      .from("jobs")
      .insert([jobWithUser])
      .select();

    if (!error && data) {
      setJobs([...jobs, data[0]]);
    }
  }

  setIsModalOpen(false);
  setEditingIndex(null);
  setFormData({ company: "", title: "", date: "", status: "", notes: "" });
};




    return(
        <div className="min-h-screen flex flex-col md:flex-row">

        {/* Toggle Button for small screens */}
        <button
        className="md:hidden p-4 bg-gray-200 text-left"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        >
        MENU
        </button>

        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 p-4">

        <Header
        onAddClick={() => {
            setFormData({ company: '', title: '', date: '', status: '', notes: '' })
            setEditingIndex(null)
            setIsModalOpen(true)
        }}
        />

        

        {/* Searchbar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Filter */}
        <FilterSelect selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />


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
                key={job.id}
                job={job}
                onDelete={() => handleDelete(job.id!)}
                onEdit={() => handleEdit(index)}
              />

          ))}

        </div>

        </main>

        <JobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEditing={editingIndex !== null}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleFormSubmit}
        />


        </div>
    );
}




