import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const ReportsPanel = ({ reports = [], onResolve }) => (
  <Card className="p-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">User Reports</h2>
    {reports.length === 0 ? (
      <p className="text-sm text-gray-600">No pending reports.</p>
    ) : (
      <ul className="space-y-4">
        {reports.map(r => (
          <li key={r.id} className="flex items-start justify-between">
            <div>
              <p className="font-medium text-gray-900">{r.subject}</p>
              <p className="text-sm text-gray-600">{r.message}</p>
            </div>
            <Button size="sm" onClick={() => onResolve(r.id)}>
              Resolve
            </Button>
          </li>
        ))}
      </ul>
    )}
  </Card>
);
export default ReportsPanel;
