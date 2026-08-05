import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Grid, Typography, Box, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip
} from '@mui/material';
import MainCard from 'components/MainCard';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import { formatINR } from 'data/ccsMock';
import useAuth from 'hooks/useAuth';
import { getTimeline, getDaySummary, checkIn, checkOut, isCheckedIn } from 'utils/daily-working';

import { 
  CarryOutOutlined, EnvironmentOutlined, ShoppingCartOutlined, 
  WalletOutlined, FundOutlined, ClockCircleOutlined, CameraOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';

export default function DailyWorkingAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'Super Admin' || user?.role === 'Admin';
  
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [summary, setSummary] = useState(null);
  const [isCurrentlyCheckedIn, setIsCurrentlyCheckedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [openCheckIn, setOpenCheckIn] = useState(false);
  const [openCheckOut, setOpenCheckOut] = useState(false);
  const [notes, setNotes] = useState('');
  const [tomorrowPlan, setTomorrowPlan] = useState('');

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      const events = getTimeline();
      // Map events to match table schema
      const mappedEvents = events.map(e => ({
        ...e,
        product: e.type === 'Order' ? 'Sample Crop Product' : '-',
        qty: e.type === 'Order' ? '5 Cases' : '-',
        collection: e.type === 'Collection' ? formatINR(e.amount) : '-',
        expense: e.type === 'Expense' ? formatINR(e.amount) : '-',
        gps: e.location ? 'Verified' : 'No',
        photo: e.photo ? 'Uploaded' : 'No'
      }));
      setTimelineEvents(mappedEvents);
      setSummary(getDaySummary());
      setIsCurrentlyCheckedIn(isCheckedIn());
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleCheckIn = () => {
    checkIn('23.0225, 72.5714', 'selfie.jpg', '85%', notes);
    setOpenCheckIn(false);
    setNotes('');
    loadData();
  };

  const handleCheckOut = () => {
    checkOut(notes, tomorrowPlan);
    setOpenCheckOut(false);
    setNotes('');
    setTomorrowPlan('');
    loadData();
  };

  const columns = [
    { field: 'time', headerName: 'Time', flex: 1, minWidth: 100 },
    { field: 'type', headerName: 'Activity', flex: 1, minWidth: 120 },
    { field: 'dealer', headerName: 'Dealer', flex: 1.5, minWidth: 150, renderCell: (params) => params.value || '-' },
    { field: 'product', headerName: 'Product', flex: 1, minWidth: 120 },
    { field: 'qty', headerName: 'Qty', flex: 1, minWidth: 80 },
    { field: 'collection', headerName: 'Collection', flex: 1, minWidth: 100 },
    { field: 'expense', headerName: 'Expense', flex: 1, minWidth: 100 },
    { field: 'gps', headerName: 'GPS', flex: 0.8, minWidth: 80, renderCell: (params) => (
      params.value === 'Verified' ? <EnvironmentOutlined style={{ color: '#1890ff' }} /> : '-'
    ) },
    { field: 'photo', headerName: 'Photo', flex: 0.8, minWidth: 80, renderCell: (params) => (
      params.value === 'Uploaded' ? <CameraOutlined style={{ color: '#52c41a' }} /> : '-'
    ) },
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 100, renderCell: (params) => (
      <Chip label={params.value || 'Completed'} size="small" color={params.value === 'Running' ? 'primary' : 'default'} />
    ) }
  ];

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" spacing={2}>
            {isAdmin && <IconButton onClick={() => navigate(-1)}><ArrowLeftOutlined /></IconButton>}
            <Box>
              <Typography variant="h5">{isAdmin ? `Employee Daily Working Log (ID: ${id})` : 'Daily Working'}</Typography>
              <Typography variant="body2" color="textSecondary">Everything visible in one unified timeline table.</Typography>
            </Box>
          </Stack>
          
          {!isAdmin && (
            <Stack direction="row" spacing={2}>
              {!isCurrentlyCheckedIn && timelineEvents.length === 0 && (
                <Button variant="contained" color="primary" startIcon={<ClockCircleOutlined />} onClick={() => setOpenCheckIn(true)}>
                  Check In
                </Button>
              )}
              {isCurrentlyCheckedIn && (
                <Button variant="contained" color="secondary" startIcon={<CarryOutOutlined />} onClick={() => setOpenCheckOut(true)}>
                  Check Out (End Day)
                </Button>
              )}
            </Stack>
          )}
        </Stack>
      </Grid>

      {/* Top Metrics Cards */}
      <Grid item xs={12} sm={6} md={2.4}>
        <AnalyticEcommerce title="Dealer Visits" count={summary?.visits || 0} icon={<EnvironmentOutlined />} color="info.main" />
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <AnalyticEcommerce title="Orders" count={summary?.orders || 0} icon={<ShoppingCartOutlined />} color="success.main" />
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <AnalyticEcommerce title="Collections" count={formatINR(summary?.collections || 0)} icon={<WalletOutlined />} color="warning.main" />
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <AnalyticEcommerce title="Expenses" count={formatINR(summary?.expenses || 0)} icon={<FundOutlined />} color="error.main" />
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <AnalyticEcommerce title="Distance" count="45 km" icon={<EnvironmentOutlined />} color="primary.main" />
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ height: 600 }}>
          <EnterpriseTable 
            rows={timelineEvents} 
            columns={columns} 
            loading={loading}
          />
        </Box>
      </Grid>

      {/* Check In Modal */}
      <Dialog open={openCheckIn} onClose={() => setOpenCheckIn(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Start Your Day</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Typography variant="body2" color="textSecondary">
              Your GPS location and a selfie will be recorded for attendance.
            </Typography>
            <Box sx={{ border: '1px dashed grey', p: 2, textAlign: 'center', borderRadius: 1 }}>
              <CameraOutlined style={{ fontSize: '2rem', color: 'gray' }} />
              <Typography display="block" variant="caption">Take Selfie</Typography>
            </Box>
            <TextField 
              label="Today's Objectives (Optional)" fullWidth multiline rows={3} 
              value={notes} onChange={e => setNotes(e.target.value)} 
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCheckIn(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleCheckIn}>Check In</Button>
        </DialogActions>
      </Dialog>

      {/* Check Out Modal */}
      <Dialog open={openCheckOut} onClose={() => setOpenCheckOut(false)} maxWidth="sm" fullWidth>
        <DialogTitle>End of Day Report</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField 
              label="Today's Remarks" fullWidth multiline rows={3} required
              value={notes} onChange={e => setNotes(e.target.value)} 
            />
            <TextField 
              label="Tomorrow's Plan" fullWidth multiline rows={3} required
              value={tomorrowPlan} onChange={e => setTomorrowPlan(e.target.value)} 
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCheckOut(false)}>Cancel</Button>
          <Button variant="contained" color="secondary" onClick={handleCheckOut} disabled={!notes || !tomorrowPlan}>
            Submit Report & Check Out
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
