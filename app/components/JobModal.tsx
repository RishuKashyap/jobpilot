import React from "react";
import { JobModalProps } from "../types/Job";

const JobModal: React.FC<JobModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  isEditing
}) => {
  if (!isOpen) return null;

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  onSubmit(formData); // calls the function sent from page.tsx
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {isEditing ? "Edit Job" : "Add New Job"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Company Name"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            className="w-full border border-gray-300 text-gray-800 px-3 py-2 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Job Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full border border-gray-300 text-gray-800 px-3 py-2 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            className="w-full border border-gray-300 text-gray-800 px-3 py-2 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="w-full border border-gray-300 text-gray-800 px-3 py-2 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
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
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="w-full border border-gray-300 text-gray-800 px-3 py-2 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
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
  );
};

export default JobModal;
