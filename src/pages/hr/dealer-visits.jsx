import { useState, useEffect } from 'react';
import {
  Grid, Typography, Box, Stack, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Divider
} from '@mui/material';
import MainCard from 'components/MainCard';
import api from 'api/client';
import useAuth from 'hooks/useAuth';
import { PlusOutlined, CameraOutlined, EnvironmentOutlined } from '@ant-design/icons';

export default function DealerVisitsPage() {
  const { user } = useAuth();
  const isAdmin = ['Super Admin', 'Admin'].includes(user.role);
  
  const [visits, setVisits] = useState([]);
  const [dealers, setDealers] = useState([]);
  
  const [open, setOpen] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState('');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState('');
  
  const fetchData = async () => {
    try {
      const [visitsRes, dealersRes] = await Promise.all([
        api.get('/hr/visits/'),
        api.get('/admin/users/?role=Dealer')
      ]);
      setVisits(visitsRes.data);
      setDealers(dealersRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => setLocation(`${pos.coords.latitude}, ${pos.coords.longitude}`)
      );
    }
  }, []);

  const handleStartVisit = async () => {
    if (!selectedDealer) return alert('Please select a dealer');
    
    const formData = new FormData();
    formData.append('dealer', selectedDealer);
    formData.append('notes', notes);
    formData.append('location', location);
    formData.append('start_time', new Date().toLocaleTimeString('en-US', {hour12: false}));
    
    // Simulate photo
    const mockFile = new File(["mock content"], "visit.jpg", { type: "image/jpeg" });
    formData.append('photo', mockFile);

    try {
      await api.post('/hr/visits/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setOpen(false);
      setSelectedDealer('');
      setNotes('');
      fetchData();
      alert('Visit started successfully');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to start visit');
    }
  };

  const handleEndVisit = async (id) => {
    try {
      await api.patch(`/hr/visits/${id}/`, {
        end_time: new Date().toLocaleTimeString('en-US', {hour12: false})
      });
      fetchData();
      alert('Visit ended');
    } catch (err) {
      alert('Failed to end visit');
    }
  };

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" flexWrap="wrap" gap={2}>
          <Box>
            <Typography variant="h5">Dealer Visits</Typography>
            <Typography variant="body2" color="textSecondary">
              Log your field visits and capture notes
            </Typography>
          </Box>
          {!isAdmin && (
            <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => setOpen(true)}>
              Start New Visit
            </Button>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <MainCard content={false}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  {isAdmin && <TableCell>Employee</TableCell>}
                  <TableCell>Dealer</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                  <TableCell>Notes</TableCell>
                  {!isAdmin && <TableCell align="right">Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {visits.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.date}</TableCell>
                    {isAdmin && <TableCell>{row.employee_name}</TableCell>}
                    <TableCell>{row.dealer_name}</TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" gap={0.5}>
                        <EnvironmentOutlined style={{ color: 'gray' }} /> {row.location || 'Unknown'}
                      </Stack>
                    </TableCell>
                    <TableCell>{row.start_time}</TableCell>
                    <TableCell>{row.end_time || '-'}</TableCell>
                    <TableCell sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {row.notes}
                    </TableCell>
                    {!isAdmin && (
                      <TableCell align="right">
                        {!row.end_time ? (
                          <Button size="small" variant="outlined" color="error" onClick={() => handleEndVisit(row.id)}>
                            End Visit
                          </Button>
                        ) : (
                          <Typography variant="caption" color="success.main">Completed</Typography>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
                {visits.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={isAdmin ? 7 : 7} align="center" sx={{ py: 3 }}>No visits found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Start Dealer Visit</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Select Dealer</InputLabel>
              <Select value={selectedDealer} label="Select Dealer" onChange={e => setSelectedDealer(e.target.value)}>
                {dealers.map(d => <MenuItem key={d.id} value={d.id}>{d.username}</MenuItem>)}
              </Select>
            </FormControl>
            
            <FormControl fullWidth size="small">
              <InputLabel>Visit Type</InputLabel>
              <Select defaultValue="" label="Visit Type" onChange={() => {}}>
                <MenuItem value="Order">Order</MenuItem>
                <MenuItem value="Collection">Collection</MenuItem>
                <MenuItem value="Complaint">Complaint</MenuItem>
                <MenuItem value="Promotion">Promotion</MenuItem>
                <MenuItem value="Follow-up">Follow-up</MenuItem>
              </Select>
            </FormControl>
            
            <TextField 
              label="Meeting Notes / Objective" multiline rows={3} fullWidth
              value={notes} onChange={e => setNotes(e.target.value)}
            />
            
            <Divider />
            <Box>
              <Typography variant="subtitle2" gutterBottom>Capture Photo</Typography>
              <Button variant="outlined" startIcon={<CameraOutlined />}>Take Selfie with Shop</Button>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleStartVisit}>Start Visit</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
