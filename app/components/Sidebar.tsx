import React from "react";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside
      className={`bg-gray-100 p-4 border-b md:border-r border-gray-200 
        ${isOpen ? 'block' : 'hidden'} md:block w-full md:w-64`}
    >
      <h2 className="text-2xl font-bold mb-4">📋 JobPilot</h2>
      <nav className="space-y-2">
        <a href="#" className="block text-gray-700 hover:text-blue-600">Dashboard</a>
        <a href="#" className="block text-gray-700 hover:text-blue-600">Saved Jobs</a>
        <a href="#" className="block text-gray-700 hover:text-blue-600">Settings</a>
      </nav>
    </aside>
  );
};

export default Sidebar;

