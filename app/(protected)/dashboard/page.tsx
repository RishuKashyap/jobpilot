'use client'
import React from 'react';
import { useState } from 'react'
import { useEffect } from 'react';
import { createClient } from '../../lib/supabase/Client'
import SearchBar from '../../components/SearchBar';
import FilterSelect from '../../components/FilterSelect';
import JobCard from '../../components/JobCard';
import JobModal from '../../components/JobModal';
import { Job } from '../../types/Job';
import Papa from 'papaparse';

const DashboardPage = () => {
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
        const supabase = createClient(); // ✅ works without any issue
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
    const supabase = createClient();
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

// handle exportcsv
    const handleExportCSV = () => {
  const formattedJobs = jobs.map(({ company, title, status, date, notes }) => ({
  Company: company,
  Title: title,
  Status: status,
  Date: new Date(date).toLocaleDateString('en-GB'),
  Notes: notes,
}));


  const csv = Papa.unparse(formattedJobs);

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'job_applications.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

    
    
// handleFormSubmit

   const handleFormSubmit = async (formData: Job) => {
  if (editingIndex !== null && jobs[editingIndex]?.id) {
    const supabase = createClient();
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
    const supabase = createClient();
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

        {/* Main Content */}
        <main className="flex-1 p-4">

        {/* Searchbar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Filter */}
        <FilterSelect selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />

        <button
            onClick={() => {
            setFormData({ company: '', title: '', date: '', status: '', notes: '' })
            setEditingIndex(null)
            setIsModalOpen(true)
            }}
            className="mb-4 md:ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
            + Add Job
        </button>

        
        <button
          onClick={() => handleExportCSV()}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition ml-4"
        >
          ⬇️ Export CSV
        </button>


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

export default DashboardPage;




