'use client'

import { useState } from "react";

export default function SidebarDemo(){
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return(
        <div>
            <button className="border-2 border-indigo-300" onClick={()=>{setSidebarOpen(!sidebarOpen)}}>
                ☰ Menu
            </button>

            {sidebarOpen && (
                <div className="p-10 border-2 border-indigo-600">
                    <p>This is the sidebar</p>
                </div>
            )}
        </div>
    )
}