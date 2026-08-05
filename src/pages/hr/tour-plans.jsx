import { useState, useEffect } from 'react';
import {
  Grid, Typography, Stack, Button, Chip,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, Box, CircularProgress
} from '@mui/material';
import { PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import api from 'api/client';
import useAuth from 'hooks/useAuth';

export default function DailyTourPlan() {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    planned_locations: '',
    purpose: ''
  });

  const isManager = ['Super Admin', 'Admin', 'Sales Manager'].includes(user?.role);

  const fetchPlans = async () => {
    try {
      const res = await api.get('/hr/tour-plans/');
      setPlans(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSubmit = async () => {
    setActionLoading(true);
    try {
      await api.post('/hr/tour-plans/', formData);
      setOpen(false);
      fetchPlans();
      setFormData({ date: new Date().toISOString().split('T')[0], planned_locations: '', purpose: '' });
    } catch (err) {
      alert('Failed to submit tour plan');
    } finally {
      setActionLoading(false);
    }
  };
  
  const handleAction = async (id, status) => {
    try {
      await api.patch(`/hr/tour-plans/${id}/`, { status });
      fetchPlans();
    } catch (err) {
      alert('Action failed');
    }
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Daily Tour Plans</Typography>
          {!isManager && (
            <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => setOpen(true)}>
              Submit Plan
            </Button>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <MainCard content={false}>
          {loading ? (
            <Box sx={{ p: 5, textAlign: 'center' }}><CircularProgress /></Box>
          ) : (
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table>
                <TableHead sx={{ bgcolor: 'grey.50' }}>
                  <TableRow>
                    {isManager && <TableCell>Employee</TableCell>}
                    <TableCell>Date</TableCell>
                    <TableCell>Locations</TableCell>
                    <TableCell>Purpose</TableCell>
                    <TableCell>Status</TableCell>
                    {isManager && <TableCell align="right">Actions</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {plans.map((row) => (
                    <TableRow key={row.id} hover>
                      {isManager && <TableCell>{row.employee_name}</TableCell>}
                      <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                      <TableCell>{row.planned_locations}</TableCell>
                      <TableCell>{row.purpose}</TableCell>
                      <TableCell>
                        <Chip 
                          label={row.status} 
                          size="small"
                          color={row.status === 'Approved' ? 'success' : row.status === 'Rejected' ? 'error' : 'warning'}
                        />
                      </TableCell>
                      {isManager && (
                        <TableCell align="right">
                          {row.status === 'Pending' && (
                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                              <Button size="small" color="success" onClick={() => handleAction(row.id, 'Approved')}>Approve</Button>
                              <Button size="small" color="error" onClick={() => handleAction(row.id, 'Rejected')}>Reject</Button>
                            </Stack>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                  {plans.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={isManager ? 6 : 4} align="center" sx={{ py: 3 }}>
                        <Typography color="textSecondary">No tour plans found.</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </MainCard>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Submit Daily Tour Plan</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>Date</Typography>
              <input 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>Planned Locations / Areas</Typography>
              <input 
                type="text" 
                value={formData.planned_locations}
                onChange={(e) => setFormData({...formData, planned_locations: e.target.value})}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                placeholder="e.g. Navsari, Surat South"
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>Purpose / Remarks</Typography>
              <textarea 
                rows={3}
                value={formData.purpose}
                onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                placeholder="e.g. Meeting with 5 dealers, promoting new product XYZ"
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={actionLoading || !formData.planned_locations}>
            Submit Plan
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
