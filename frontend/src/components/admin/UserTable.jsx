import React from 'react';
import { ArrowUpDown } from 'lucide-react';
const headings = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'createdAt', label: 'Joined' }
];

const UserTable = ({ users = [], onSort, sortKey, sortDir }) => (
  <div className="overflow-x-auto rounded-xl border border-gray-200">
    <table className="min-w-full divide-y divide-gray-200 text-sm">
      <thead className="bg-gray-50">
        <tr>
          {headings.map(h => (
            <th key={h.key} className="px-4 py-3 text-left font-semibold text-gray-700">
              <button
                onClick={() => onSort(h.key)}
                className="flex items-center space-x-1 group"
              >
                <span>{h.label}</span>
                <ArrowUpDown
                  className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition ${
                    sortKey === h.key ? 'text-primary-600' : 'text-gray-400'
                  }`}
                />
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {users.map(u => (
          <tr key={u.id} className="hover:bg-gray-50">
            <td className="px-4 py-3">{u.name}</td>
            <td className="px-4 py-3">{u.email}</td>
            <td className="px-4 py-3 capitalize">{u.role}</td>
            <td className="px-4 py-3">{new Date(u.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default UserTable;
