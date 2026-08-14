import React from 'react';
import type { AttendanceRecord } from '../../types/stitchTypes';
import { StatusBadge } from '../../components/common/StatusBadge';

interface AdminAttendanceProps {
  attendanceRecords?: AttendanceRecord[];
}

export const AdminAttendance: React.FC<AdminAttendanceProps> = ({ attendanceRecords = [] }) => {
  return (
    <div className="space-y-6 font-body text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e0e0e0] pb-4">
        <div>
          <h1 className="text-2xl font-light text-[#161616]">Human Resources & Attendance</h1>
          <p className="text-xs text-[#525252] mt-0.5">
            Company-wide field officer check-ins, monthly attendance compliance, late arrivals, and overtime hours
          </p>
        </div>
      </div>

      {/* Attendance Matrix Table */}
      <div className="bg-white border border-[#e0e0e0] overflow-x-auto shadow-xs">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-[#f4f4f4] text-[#525252] border-b border-[#e0e0e0] uppercase text-[11px] tracking-wider">
            <tr>
              <th className="p-3 font-semibold">Date</th>
              <th className="p-3 font-semibold">Day</th>
              <th className="p-3 font-semibold">Employee</th>
              <th className="p-3 font-semibold">Check In</th>
              <th className="p-3 font-semibold">Check Out</th>
              <th className="p-3 font-semibold text-right">Break</th>
              <th className="p-3 font-semibold text-right">Total Hours</th>
              <th className="p-3 font-semibold text-right">Overtime</th>
              <th className="p-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e0e0e0]">
            {(attendanceRecords || []).map((att) => (
              <tr key={att.id} className="hover:bg-[#f4f4f4]">
                <td className="p-3 font-bold text-[#161616]">{att.date}</td>
                <td className="p-3 text-[#525252]">{att.day}</td>
                <td className="p-3 font-bold text-[#0f62fe]">{att.employeeName}</td>
                <td className="p-3 font-mono text-[#161616]">{att.checkIn}</td>
                <td className="p-3 font-mono text-[#161616]">{att.checkOut}</td>
                <td className="p-3 text-right text-[#525252]">{att.breakDuration}</td>
                <td className="p-3 text-right font-bold text-[#161616]">{att.totalHours}</td>
                <td className="p-3 text-right text-[#0f62fe] font-semibold">{att.overtime}</td>
                <td className="p-3">
                  <StatusBadge status={att.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
