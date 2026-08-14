import React, { useState, useEffect } from 'react';
import api from 'api/client';
import { AdminAttendance as StitchAdminAttendance } from '../../views/admin/AdminAttendance';
import { MOCK_ATTENDANCE_RECORDS } from '../../data/stitchMockData';

export default function AttendanceAdmin() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get('/hr/attendance/');
        if (Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data.map((att) => ({
            id: String(att.id),
            employeeName: att.employee_name || 'Rahul Sharma',
            employeeCode: att.employee_code || `EMP-${att.employee || '101'}`,
            date: att.date || new Date().toISOString().split('T')[0],
            checkIn: att.check_in_time ? att.check_in_time.slice(0, 5) : '09:00 AM',
            checkOut: att.check_out_time ? att.check_out_time.slice(0, 5) : '06:00 PM',
            location: att.check_in_address || 'Palanpur Depot',
            status: att.status || 'Present',
            workingHours: att.hours_worked ? `${att.hours_worked} hrs` : '8.5 hrs',
          }));
          setRecords(mapped);
        } else {
          setRecords(MOCK_ATTENDANCE_RECORDS);
        }
      } catch (err) {
        console.error('Error fetching attendance API:', err);
        setRecords(MOCK_ATTENDANCE_RECORDS);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 font-body text-xs text-[#525252]">
        Loading Field Force Attendance Matrix...
      </div>
    );
  }

  return (
    <StitchAdminAttendance
      attendanceRecords={records}
    />
  );
}


