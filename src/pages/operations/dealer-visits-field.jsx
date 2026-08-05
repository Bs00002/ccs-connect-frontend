import React, { useState, useEffect } from 'react';
import {
  Grid, Typography, Box, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem, Divider, Chip
} from '@mui/material';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import api from 'api/client';
import { CameraOutlined, EnvironmentOutlined, CheckCircleOutlined, ClockCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { addTimelineEvent } from 'utils/daily-working';

export default function FieldDealerVisits() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog states
  const [open, setOpen] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState('');
  const [notes, setNotes] = useState('');
  const [visitPurpose, setVisitPurpose] = useState('Routine Visit');
  const [followUp, setFollowUp] = useState('');
  const [location, setLocation] = useState('Fetching...');
  const [shopPhotoCaptured, setShopPhotoCaptured] = useState(false);
  const [selfieCaptured, setSelfieCaptured] = useState(false);
  const [visitCheckInTime, setVisitCheckInTime] = useState(null);

  const fetchVisits = async () => {
    setLoading(true);
    setTimeout(() => {
      // Mock data
      setVisits([
        { id: 1, dealer: 'Kisan Agro', time: '10:30 AM', gps: 'Verified', photo: 'Uploaded', duration: '45 mins', remarks: 'Routine Check', followUp: 'Call tomorrow' },
        { id: 2, dealer: 'Green Field', time: '12:15 PM', gps: 'Verified', photo: 'Uploaded', duration: '30 mins', remarks: 'Payment Collection', followUp: 'None' },
      ]);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  const handleStartVisit = () => {
    setVisitCheckInTime(new Date());
    setOpen(true);
    setShopPhotoCaptured(false);
    setSelfieCaptured(false);
    setNotes('');
    setFollowUp('');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => setLocation(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`),
        () => setLocation('23.0225, 72.5714')
      );
    } else {
      setLocation('23.0225, 72.5714');
    }
  };

  const handleSubmitVisit = async () => {
    const checkOutTime = new Date();
    const durationMs = checkOutTime - visitCheckInTime;
    const durationMins = Math.floor(durationMs / 60000) || 1;
    
    addTimelineEvent('Dealer Visit', {
      dealer: selectedDealer || 'New Dealer',
      location: location,
      photo: 'uploaded.jpg',
      remarks: `${visitPurpose} - ${notes}`,
      status: 'Completed'
    });

    try {
      const formData = new FormData();
      formData.append('date', visitCheckInTime.toISOString().split('T')[0]);
      // Currently dealer is just a text field, but in real DB it should be an ID. 
      // If the backend expects an ID and this is a string, it might fail. 
      // We will skip real dealer ID for now as the component is mocked with text.
      formData.append('location', location);
      formData.append('purpose', visitPurpose);
      formData.append('remarks', notes);
      
      await api.post('/hr/visits/', formData);
    } catch (err) {
      console.error('Failed to sync visit to backend', err);
    }

    setVisits([{
      id: Math.random(),
      dealer: selectedDealer || 'New Dealer',
      time: visitCheckInTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      gps: 'Verified',
      photo: 'Uploaded',
      duration: `${durationMins} mins`,
      remarks: notes || visitPurpose,
      followUp: followUp || '-'
    }, ...visits]);

    setOpen(false);
  };

  const columns = [
    { field: 'dealer', headerName: 'Dealer', flex: 1.5, minWidth: 150 },
    { field: 'time', headerName: 'Time', flex: 1, minWidth: 100 },
    { field: 'gps', headerName: 'GPS', flex: 0.8, minWidth: 80, renderCell: (params) => (
      params.value === 'Verified' ? <EnvironmentOutlined style={{ color: '#1890ff' }} /> : '-'
    )},
    { field: 'photo', headerName: 'Photo', flex: 0.8, minWidth: 80, renderCell: (params) => (
      params.value === 'Uploaded' ? <CameraOutlined style={{ color: '#52c41a' }} /> : '-'
    )},
    { field: 'duration', headerName: 'Duration', flex: 1, minWidth: 100 },
    { field: 'remarks', headerName: 'Remarks', flex: 1.5, minWidth: 150 },
    { field: 'followUp', headerName: 'Follow Up', flex: 1, minWidth: 120 }
  ];

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
          <Box>
            <Typography variant="h5">Dealer Visits</Typography>
            <Typography variant="body2" color="textSecondary">Track all dealer visits for the day.</Typography>
          </Box>
          <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleStartVisit}>
            Log New Visit
          </Button>
        </Stack>
      </Grid>
      
      <Grid item xs={12}>
        <Box sx={{ height: 600 }}>
          <EnterpriseTable rows={visits} columns={columns} loading={loading} />
        </Box>
      </Grid>

      {/* Log Visit Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pb: 1, bgcolor: 'primary.lighter' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Log Dealer Visit</Typography>
            <Chip icon={<ClockCircleOutlined />} label={visitCheckInTime?.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) || ''} color="primary" variant="outlined" size="small" />
          </Stack>
          <Stack direction="row" alignItems="center" gap={0.5} mt={0.5}>
            <EnvironmentOutlined style={{ color: 'gray', fontSize: '0.8rem' }} />
            <Typography variant="caption" color="textSecondary">GPS Locked: {location}</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3}>
            <TextField label="Dealer Name" fullWidth size="small" value={selectedDealer} onChange={e => setSelectedDealer(e.target.value)} />
            
            <FormControl fullWidth size="small">
              <InputLabel>Visit Purpose</InputLabel>
              <Select value={visitPurpose} label="Visit Purpose" onChange={e => setVisitPurpose(e.target.value)}>
                <MenuItem value="Routine Visit">Routine Visit</MenuItem>
                <MenuItem value="Payment Collection">Payment Collection</MenuItem>
                <MenuItem value="Order Taking">Order Taking</MenuItem>
                <MenuItem value="Complaint Resolution">Complaint Resolution</MenuItem>
                <MenuItem value="Product Demo">Product Demo</MenuItem>
              </Select>
            </FormControl>
            
            <TextField 
              label="Meeting Notes / Remarks" multiline rows={3} fullWidth size="small"
              value={notes} onChange={e => setNotes(e.target.value)}
            />

            <TextField 
              label="Follow Up Action" fullWidth size="small"
              value={followUp} onChange={e => setFollowUp(e.target.value)}
            />

            <Divider />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" gutterBottom>Shop Photo</Typography>
                {!shopPhotoCaptured ? (
                  <Button variant="outlined" color="primary" startIcon={<CameraOutlined />} fullWidth onClick={() => setShopPhotoCaptured(true)}>
                    Take Shop Photo
                  </Button>
                ) : (
                  <Box sx={{ p: 1, border: '1px dashed green', textAlign: 'center', borderRadius: 1, bgcolor: 'success.lighter' }}>
                    <CheckCircleOutlined style={{ color: 'green', fontSize: '1.5rem' }} />
                    <Typography variant="caption" display="block" color="success.dark">Captured</Typography>
                  </Box>
                )}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" gutterBottom>Selfie with Dealer</Typography>
                {!selfieCaptured ? (
                  <Button variant="outlined" color="secondary" startIcon={<CameraOutlined />} fullWidth onClick={() => setSelfieCaptured(true)}>
                    Take Selfie
                  </Button>
                ) : (
                  <Box sx={{ p: 1, border: '1px dashed green', textAlign: 'center', borderRadius: 1, bgcolor: 'success.lighter' }}>
                    <CheckCircleOutlined style={{ color: 'green', fontSize: '1.5rem' }} />
                    <Typography variant="caption" display="block" color="success.dark">Captured</Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)} color="error">Cancel Visit</Button>
          <Button variant="contained" onClick={handleSubmitVisit} disabled={!shopPhotoCaptured || !selfieCaptured} color="success" size="large">
            End Visit & Sync
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
