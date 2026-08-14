import React, { useState } from 'react';
import { Box, Typography, Grid, Button, Stack, Chip, Paper, TextField, InputAdornment, IconButton } from '@mui/material';
import { ClockCircleOutlined, CheckCircleOutlined, PushpinOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import MainCard from 'components/MainCard';

export default function FieldAttendance() {
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // History data
  const historyData = [
    { id: 1, date: '06/08/2026', loginTime: '09:00 AM', logoutTime: '06:00 PM', hours: '9h 0m', status: 'Present' },
    { id: 2, date: '05/08/2026', loginTime: '09:15 AM', logoutTime: '05:45 PM', hours: '8h 30m', status: 'Present' },
    { id: 3, date: '04/08/2026', loginTime: '-', logoutTime: '-', hours: '-', status: 'Absent' },
    { id: 4, date: '03/08/2026', loginTime: '08:55 AM', logoutTime: '06:05 PM', hours: '9h 10m', status: 'Present' },
    { id: 5, date: '02/08/2026', loginTime: '09:05 AM', logoutTime: '06:00 PM', hours: '8h 55m', status: 'Present' },
  ];

  const filteredHistory = historyData.filter(item => {
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesSearch = item.date.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const columns = [
    { field: 'date', headerName: 'Date', flex: 1.2, minWidth: 120, renderCell: (params) => <Typography fontWeight={700} color="#101828">{params.value}</Typography> },
    { field: 'loginTime', headerName: 'Check In', flex: 1, minWidth: 110, renderCell: (params) => <Typography variant="body2" color="textSecondary">{params.value}</Typography> },
    { field: 'logoutTime', headerName: 'Check Out', flex: 1, minWidth: 110, renderCell: (params) => <Typography variant="body2" color="textSecondary">{params.value}</Typography> },
    { field: 'hours', headerName: 'Working Hours', flex: 1.2, minWidth: 120, renderCell: (params) => (
      <Chip label={params.value} size="small" sx={{ bgcolor: '#f1f5f9', fontWeight: 700, borderRadius: 1.5 }} />
    )},
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 110,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          color={params.value === 'Present' ? 'success' : 'error'} 
          size="small"
          sx={{ fontWeight: 700, height: 24, fontSize: '0.72rem' }}
        />
      )
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 0.8,
      minWidth: 90,
      renderCell: () => (
        <IconButton size="small" color="success">
          <EyeOutlined />
        </IconButton>
      )
    }
  ];

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      {/* Header */}
      <Grid item xs={12}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="#101828" sx={{ letterSpacing: '-0.5px' }}>
            My Attendance
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 0.2 }}>
            Track your daily check-ins, check-outs and attendance history.
          </Typography>
        </Box>
      </Grid>

      {/* Today's Status & Monthly Summary */}
      <Grid item xs={12} md={5}>
        <MainCard title="Today's Attendance Status">
          <Stack spacing={2.5} alignItems="center" py={1.5}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                bgcolor: isCheckedIn ? '#e8f5e9' : '#f1f5f9',
                color: isCheckedIn ? '#2e7d32' : '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid',
                borderColor: isCheckedIn ? '#a5d6a7' : '#cbd5e1'
              }}
            >
              {isCheckedIn ? <CheckCircleOutlined style={{ fontSize: '2.5rem' }} /> : <ClockCircleOutlined style={{ fontSize: '2.5rem' }} />}
            </Box>
            
            <Box textAlign="center">
              <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" mb={0.5}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: isCheckedIn ? '#2e7d32' : '#d32f2f' }} />
                <Typography variant="h5" fontWeight={800} color="#101828">
                  {isCheckedIn ? 'Checked In' : 'Not Checked In'}
                </Typography>
              </Stack>
              <Typography color="textSecondary" variant="body2">
                {isCheckedIn ? 'Check-in Time: Today, 09:00 AM' : 'Press Check In to start recording today\'s field shift hours.'}
              </Typography>
            </Box>

            <Button 
              variant="contained" 
              color={isCheckedIn ? 'error' : 'success'} 
              size="large"
              startIcon={<PushpinOutlined />}
              onClick={() => setIsCheckedIn(!isCheckedIn)}
              sx={{ px: 4, py: 1.2, fontWeight: 800, borderRadius: 2, boxShadow: 'none' }}
            >
              {isCheckedIn ? 'Check Out (End Shift)' : 'Check In (Start Shift)'}
            </Button>
          </Stack>
        </MainCard>
      </Grid>

      <Grid item xs={12} md={7}>
        <MainCard title="Monthly Attendance Summary (August 2026)">
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: '#e8f5e9', border: '1px solid #c8e6c9', borderRadius: 2 }}>
                <Typography variant="caption" fontWeight={700} color="#2e7d32" sx={{ letterSpacing: '0.5px' }}>
                  PRESENT DAYS
                </Typography>
                <Typography variant="h3" fontWeight={800} color="#1b5e20" sx={{ mt: 0.5 }}>
                  18
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: '#ffebee', border: '1px solid #ffcdd2', borderRadius: 2 }}>
                <Typography variant="caption" fontWeight={700} color="#c62828" sx={{ letterSpacing: '0.5px' }}>
                  ABSENT DAYS
                </Typography>
                <Typography variant="h3" fontWeight={800} color="#b71c1c" sx={{ mt: 0.5 }}>
                  2
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: '#e8eaf6', border: '1px solid #c5cae9', borderRadius: 2 }}>
                <Typography variant="caption" fontWeight={700} color="#283593" sx={{ letterSpacing: '0.5px' }}>
                  TOTAL HOURS
                </Typography>
                <Typography variant="h3" fontWeight={800} color="#1a237e" sx={{ mt: 0.5 }}>
                  145h
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: '#fff8e1', border: '1px solid #ffe0b2', borderRadius: 2 }}>
                <Typography variant="caption" fontWeight={700} color="#f57f17" sx={{ letterSpacing: '0.5px' }}>
                  LEAVES TAKEN
                </Typography>
                <Typography variant="h3" fontWeight={800} color="#e65100" sx={{ mt: 0.5 }}>
                  1
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      {/* Attendance History Section */}
      <Grid item xs={12}>
        <MainCard
          title="Attendance History"
          secondary={
            <Stack direction="row" spacing={1.5} alignItems="center">
              <TextField
                size="small"
                placeholder="Search date..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchOutlined /></InputAdornment>,
                  style: { height: 36, fontSize: '0.85rem' }
                }}
              />
              <Stack direction="row" spacing={0.5}>
                {['All', 'Present', 'Absent'].map((filter) => (
                  <Chip
                    key={filter}
                    label={filter}
                    size="small"
                    onClick={() => setStatusFilter(filter)}
                    color={statusFilter === filter ? 'success' : 'default'}
                    variant={statusFilter === filter ? 'filled' : 'outlined'}
                    sx={{ fontWeight: 700, cursor: 'pointer' }}
                  />
                ))}
              </Stack>
            </Stack>
          }
          content={false}
        >
          <EnterpriseTable 
            rows={filteredHistory}
            columns={columns}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
}


