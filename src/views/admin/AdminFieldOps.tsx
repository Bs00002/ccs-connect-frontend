import React from 'react';
import type { FieldActivity } from '../../types/stitchTypes';

interface AdminFieldOpsProps {
  fieldActivities?: FieldActivity[];
}

export const AdminFieldOps: React.FC<AdminFieldOpsProps> = ({ fieldActivities = [] }) => {
  return (
    <div className="space-y-6 font-body text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e0e0e0] pb-4">
        <div>
          <h1 className="text-2xl font-light text-[#161616]">Field Operations & Officer Tracking</h1>
          <p className="text-xs text-[#525252] mt-0.5">
            Real-time dealer store visits, GPS check-in logs, market order collection, and field force productivity
          </p>
        </div>
      </div>

      {/* Field Activity Logs */}
      <div className="bg-white border border-[#e0e0e0] overflow-x-auto shadow-xs">
        <div className="p-3 bg-[#f4f4f4] border-b border-[#e0e0e0] font-bold text-xs text-[#161616] uppercase tracking-wider">
          Daily Field Visit Logs & Check-ins
        </div>
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-[#f4f4f4] text-[#525252] border-b border-[#e0e0e0] uppercase text-[11px] tracking-wider">
            <tr>
              <th className="p-3 font-semibold">Field Officer</th>
              <th className="p-3 font-semibold">Timestamp</th>
              <th className="p-3 font-semibold">Action Performed</th>
              <th className="p-3 font-semibold">Dealer Store</th>
              <th className="p-3 font-semibold">GPS Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e0e0e0]">
            {(fieldActivities || []).map((fa) => (
              <tr key={fa.id} className="hover:bg-[#f4f4f4]">
                <td className="p-3 font-bold text-[#161616]">{fa.employeeName}</td>
                <td className="p-3 text-[#525252] font-semibold">{fa.time} • {fa.date}</td>
                <td className="p-3 text-[#0f62fe] font-bold">{fa.action}</td>
                <td className="p-3 text-[#161616] font-medium">{fa.dealerName || 'General Market'}</td>
                <td className="p-3 text-[#525252]">📍 {fa.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
