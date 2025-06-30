// app/(protected)/layout.tsx
'use client'
import React from 'react';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        
        <div className="min-h-screen flex flex-col md:flex-row">

        {/* Toggle Button for small screens */}
        <button
            className="md:hidden p-4 bg-gray-200 text-left"
            onClick={() => setSidebarOpen(!sidebarOpen)}
        >
            MENU
        </button>
        
        <Sidebar isOpen={ sidebarOpen } /> {/* Optional: add logic to toggle */}
        
        <div className="flex-1">
            <Header />
            <main className="p-4">{children}</main>
        </div>
        </div>
    );
}
