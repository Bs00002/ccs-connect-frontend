import React, { useState, useEffect, useMemo } from 'react';
import {
  Grid, Typography, Box, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem, Chip, IconButton
} from '@mui/material';
import DataTable from 'components/DataTable';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MainCard from 'components/MainCard';
import api from 'api/client';
import { LinkOutlined, EditOutlined } from '@ant-design/icons';
import { StopCircle, CalendarClock, Target, Layers } from 'lucide-react';

export default function AssignmentsAdmin() {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [newAssignee, setNewAssignee] = useState('');

  // Mock list of employees
  const employeesList = [
    { id: 1, name: 'Rahul Sharma (Distributor)' },
    { id: 2, name: 'Vikram Singh (Distributor)' },
    { id: 3, name: 'Amit Patel (Employee)' }
  ];

  const fetchDealers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/users/?role=Dealer');
      const mapped = res.data.map((d, index) => ({
        id: d.id || `assign-${index}`,
        code: d.ccs_id || '-',
        shopName: d.dealer_profile?.company_name || 'No Shop Name',
        ownerName: `${d.first_name || ''} ${d.last_name || ''}`.trim() || 'Unknown',
        distributor: d.dealer_profile?.assigned_distributor_name || null,
        city: d.dealer_profile?.city || '-',
      }));
      setDealers(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDealers();
  }, []);

  const kpis = useMemo(() => {
    const total = dealers.length;
    const assigned = dealers.filter(d => d.distributor).length;
    const unassigned = total - assigned;
    return { total, assigned, unassigned };
  }, [dealers]);

  const handleAction = (action, dealer) => {
    if (action === 'Remove') {
      alert(`Dealer ${dealer.shopName} removed from assignment.`);
    } else {
      setSelectedDealer(dealer);
      setNewAssignee('');
      setDialogOpen(true);
    }
  };

  const columns = [
    { field: 'shopName', headerName: 'Dealer / Shop Name', flex: 1.5, minWidth: 200 },
    { field: 'ownerName', headerName: 'Owner', flex: 1, minWidth: 150 },
    { field: 'city', headerName: 'City', flex: 1, minWidth: 130 },
    { 
      field: 'distributor', 
      headerName: 'Assigned To', 
      flex: 1.5, 
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          {params.value ? 
            <Chip label={params.value} color="primary" variant="outlined" size="small" /> : 
            <Chip label="Unassigned" color="default" size="small" />}
        </Box>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 150,
      align: 'center',
      renderCell: (params) => (
        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
          <IconButton size="small" color="primary" onClick={() => handleAction('Transfer', params.row)}>
            <LinkOutlined />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => handleAction('Remove', params.row)}>
            <StopCircle size={18} />
          </IconButton>
        </Stack>
      )
    }
  ];

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Assignment & Tasks</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Assign Dealers and manage Field Executive Tasks.
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<Target size={16} />}>
            Create Task
          </Button>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AnalyticEcommerce title="Total Dealerships" count={kpis.total} icon={<Layers size={20} />} color="primary" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <AnalyticEcommerce title="Assigned" count={kpis.assigned} icon={<LinkOutlined />} color="success" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <AnalyticEcommerce title="Unassigned" count={kpis.unassigned} icon={<StopCircle size={20} />} color="warning" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <AnalyticEcommerce title="Today's Field Tasks" count={24} icon={<CalendarClock size={20} />} color="secondary" />
      </Grid>

      <Grid item xs={12}>
        <MainCard content={false}>
          <DataTable 
            rows={dealers}
            columns={columns}
            loading={loading}
          />
        </MainCard>
      </Grid>

      {/* Assignment Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Assign Dealer</DialogTitle>
        <DialogContent dividers>
          {selectedDealer && (
            <Box>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Dealer
              </Typography>
              <Typography variant="h6" gutterBottom>
                {selectedDealer.shopName}
              </Typography>
              
              <FormControl fullWidth sx={{ mt: 3 }}>
                <InputLabel>Select Distributor / Employee</InputLabel>
                <Select
                  value={newAssignee}
                  label="Select Distributor / Employee"
                  onChange={(e) => setNewAssignee(e.target.value)}
                >
                  {employeesList.map(emp => (
                    <MenuItem key={emp.id} value={emp.name}>{emp.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)} color="inherit">Cancel</Button>
          <Button 
            onClick={() => {
              alert(`Successfully assigned ${selectedDealer?.shopName} to ${newAssignee}`);
              setDialogOpen(false);
            }} 
            variant="contained"
            disabled={!newAssignee}
          >
            Confirm Assignment
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
