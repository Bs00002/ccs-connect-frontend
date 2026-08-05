import { useState, useEffect } from 'react';
import {
  Grid, Typography, Stack, Button, Chip, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Avatar, Box, Divider, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions,
  Drawer, CircularProgress
} from '@mui/material';

import MainCard from 'components/MainCard';
import {
  CheckCircleOutlined, CloseCircleOutlined, StopOutlined,
  EyeOutlined, FileTextOutlined, IdcardOutlined
} from '@ant-design/icons';
import api from 'api/client';

export default function RegistrationApproval() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [creditLimit, setCreditLimit] = useState(0);

  const fetchPendingUsers = async () => {
    setLoading(true);
    try {
      // Fetching from Django API
      const res = await api.get('/admin/approvals/');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const handleAction = async (userId, action, data = {}) => {
    setActionLoading(true);
    try {
      await api.post(`/admin/approvals/${userId}/${action}/`, data);
      setDrawerOpen(false);
      fetchPendingUsers();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const openDetails = async (userId) => {
    try {
      const res = await api.get(`/admin/approvals/${userId}/`);
      setSelectedUser(res.data);
      setDrawerOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h5">Registration Approvals</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Review pending registrations for Dealers, Distributors, and Employees.
            </Typography>
          </Box>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <MainCard content={false}>
          {loading ? (
            <Box sx={{ p: 5, textAlign: 'center' }}><CircularProgress /></Box>
          ) : (
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table sx={{ minWidth: 800 }}>
                <TableHead sx={{ bgcolor: 'grey.50' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date Applied</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>KYC Status</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>
                        <Stack direction="row" alignItems="center" sx={{ gap: 1.5 }}>
                          <Avatar sx={{ bgcolor: 'primary.lighter', color: 'primary.main' }}>
                            {row.username.charAt(0).toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{row.username}</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>{row.email} | {row.phone}</Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell><Chip label={row.role} size="small" color="primary" variant="outlined" /></TableCell>
                      <TableCell>{new Date(row.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Chip label={row.kyc_status} size="small" color={row.kyc_status === 'Approved' ? 'success' : 'warning'} />
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Review">
                          <IconButton size="small" color="info" onClick={() => openDetails(row.id)}>
                            <EyeOutlined />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                  {users.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>No pending registrations.</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </MainCard>
      </Grid>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {selectedUser && (
          <Box sx={{ width: 450, p: 3 }}>
            <Typography variant="h5" gutterBottom>Review Registration</Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Profile Details</Typography>
            <Stack spacing={1} sx={{ mt: 1, mb: 3 }}>
              <Typography variant="body2"><b>Email:</b> {selectedUser.email}</Typography>
              <Typography variant="body2"><b>Username:</b> {selectedUser.username}</Typography>
              <Typography variant="body2"><b>Phone:</b> {selectedUser.phone}</Typography>
              <Typography variant="body2"><b>Role:</b> {selectedUser.role}</Typography>
              {selectedUser.profile?.company_name && (
                <Typography variant="body2"><b>Company:</b> {selectedUser.profile.company_name}</Typography>
              )}
            </Stack>

            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>KYC Documents</Typography>
            <Stack spacing={2} sx={{ mt: 1, mb: 4 }}>
              {selectedUser.kyc?.aadhaar ? (
                <Button variant="outlined" startIcon={<IdcardOutlined />} href={selectedUser.kyc.aadhaar} target="_blank">View Aadhaar</Button>
              ) : <Typography variant="caption" color="error">No Aadhaar Uploaded</Typography>}
              
              {selectedUser.kyc?.pan ? (
                <Button variant="outlined" startIcon={<FileTextOutlined />} href={selectedUser.kyc.pan} target="_blank">View PAN</Button>
              ) : <Typography variant="caption" color="error">No PAN Uploaded</Typography>}

              {selectedUser.kyc?.gst ? (
                <Button variant="outlined" startIcon={<FileTextOutlined />} href={selectedUser.kyc.gst} target="_blank">View GST</Button>
              ) : null}
            </Stack>

            {selectedUser.role === 'Dealer' && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>Set Credit Limit</Typography>
                <input 
                  type="number" 
                  value={creditLimit}
                  onChange={(e) => setCreditLimit(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                  placeholder="Enter credit limit (e.g. 50000)"
                />
              </Box>
            )}
            
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button 
                variant="contained" color="error" 
                startIcon={<CloseCircleOutlined />} 
                disabled={actionLoading}
                onClick={() => handleAction(selectedUser.id, 'reject')}
              >
                Reject
              </Button>
              <Button 
                variant="contained" color="success" 
                startIcon={<CheckCircleOutlined />} 
                disabled={actionLoading}
                onClick={() => handleAction(selectedUser.id, 'approve', { credit_limit: creditLimit })}
              >
                Approve
              </Button>
            </Stack>
          </Box>
        )}
      </Drawer>
    </Grid>
  );
}
