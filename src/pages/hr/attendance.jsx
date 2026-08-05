import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid, Typography, Box, Stack,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import { CameraOutlined } from '@ant-design/icons';

export default function AttendanceAdmin() {
  const navigate = useNavigate();

  // Mocking the data exactly as shown in the legacy screenshot
  const [teamData] = useState([
    {
      sno: 1, name: 'RINKOO KUMAR VERMA', id: 'CCS692130415', 
      loginImage: null, logoutImage: null, loginTime: '', logoutTime: '', 
      status: 'Absent', hours: '0.00', reason: '', date: '03/08/2026'
    },
    {
      sno: 2, name: 'RINKOO KUMAR VERMA', id: 'CCS692130415', 
      loginImage: 'mock_login.jpg', logoutImage: null, loginTime: '03/08/2026 10:24 AM', logoutTime: '', 
      status: 'Running', hours: '0.00', reason: '', date: '03/08/2026'
    },
    {
      sno: 3, name: 'RINKOO KUMAR VERMA', id: 'CCS692130415', 
      loginImage: null, logoutImage: null, loginTime: '', logoutTime: '', 
      status: 'Absent', hours: '0.00', reason: '', date: '02/08/2026'
    },
    {
      sno: 4, name: 'RINKOO KUMAR VERMA', id: 'CCS692130415', 
      loginImage: null, logoutImage: null, loginTime: '', logoutTime: '', 
      status: 'Absent', hours: '0.00', reason: '', date: '02/08/2026'
    },
    {
      sno: 5, name: 'RINKOO KUMAR VERMA', id: 'CCS692130415', 
      loginImage: null, logoutImage: null, loginTime: '', logoutTime: '', 
      status: 'Absent', hours: '0.00', reason: '', date: '01/08/2026'
    },
    {
      sno: 6, name: 'RINKOO KUMAR VERMA', id: 'CCS692130415', 
      loginImage: null, logoutImage: null, loginTime: '', logoutTime: '', 
      status: 'Absent', hours: '0.00', reason: '', date: '01/08/2026'
    },
    {
      sno: 7, name: 'RINKOO KUMAR VERMA', id: 'CCS692130415', 
      loginImage: null, logoutImage: null, loginTime: '', logoutTime: '', 
      status: 'Absent', hours: '0.00', reason: '', date: '31/07/2026'
    },
    {
      sno: 8, name: 'RINKOO KUMAR VERMA', id: 'CCS692130415', 
      loginImage: null, logoutImage: null, loginTime: '', logoutTime: '', 
      status: 'Absent', hours: '0.00', reason: '', date: '30/07/2026'
    },
    {
      sno: 9, name: 'RINKOO KUMAR VERMA', id: 'CCS692130415', 
      loginImage: 'mock_login.jpg', logoutImage: 'mock_logout.jpg', loginTime: '30/07/2026 07:01 AM', logoutTime: '30/07/2026 04:57 PM', 
      status: 'Present', hours: '9.94', reason: 'Present', date: '30/07/2026'
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Running': return '#faad14'; // Orange
      case 'Present': return '#52c41a'; // Green
      case 'Absent': return '#f5222d'; // Red
      default: return '#000000';
    }
  };

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Box>
          <Typography variant="h5" mb={1}>Attendance</Typography>
          <Typography variant="body2" color="textSecondary" mb={2}>Total 61 Attendance</Typography>
          
          {/* Summary Row exactly as requested */}
          <Stack direction="row" justifyContent="space-between" sx={{ pb: 1, borderBottom: '1px solid #d9d9d9', mb: 2 }}>
            <Typography variant="subtitle2" fontWeight="bold">Present : - 39</Typography>
            <Typography variant="subtitle2" fontWeight="bold">Abesent : - 19</Typography>
            <Typography variant="subtitle2" fontWeight="bold">Idol : - 1</Typography>
            <Typography variant="subtitle2" fontWeight="bold">Half Day : - 1</Typography>
            <Typography variant="subtitle2" fontWeight="bold">Running : - 1</Typography>
          </Stack>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ height: 600 }}>
          <EnterpriseTable 
            rows={teamData.map(r => ({ ...r, id: r.sno }))}
            columns={[
              { field: 'sno', headerName: 'S.No.', width: 70 },
              { field: 'name', headerName: 'Sales Man Name', flex: 1.5, minWidth: 200, renderCell: (params) => (
                <Box sx={{ cursor: 'pointer' }} onClick={() => navigate(`/app/attendance/${params.row.sno}`)}>
                  <Typography variant="body2" color="primary" fontWeight="bold">{params.value}</Typography>
                  <Typography variant="caption" color="primary">{params.row.id}</Typography>
                </Box>
              )},
              { field: 'loginImage', headerName: 'Login Image', width: 100, align: 'center', renderCell: (params) => (
                params.value ? <Box sx={{ width: 40, height: 40, bgcolor: 'grey.300', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1 }}><CameraOutlined /></Box> : null
              )},
              { field: 'logoutImage', headerName: 'Logout Image', width: 100, align: 'center', renderCell: (params) => (
                params.value ? <Box sx={{ width: 40, height: 40, bgcolor: 'grey.300', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1 }}><CameraOutlined /></Box> : null
              )},
              { field: 'loginTime', headerName: 'Login Time', flex: 1, minWidth: 150 },
              { field: 'logoutTime', headerName: 'Logout Time', flex: 1, minWidth: 150 },
              { field: 'status', headerName: 'Status', width: 100, renderCell: (params) => (
                <Typography variant="body2" fontWeight="bold" sx={{ color: getStatusColor(params.value) }}>{params.value}</Typography>
              )},
              { field: 'hours', headerName: 'Working Hours', width: 120, renderCell: (params) => (
                <Typography variant="body2" sx={{ color: getStatusColor(params.row.status) }}>{params.value}</Typography>
              )},
              { field: 'date', headerName: 'Date', width: 120 }
            ]}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
