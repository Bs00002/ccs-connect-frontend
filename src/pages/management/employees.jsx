import React, { useState, useEffect, useMemo } from 'react';
import {
  Grid, Typography, Box, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  Drawer, Divider, Chip, IconButton, Avatar, Tabs, Tab
} from '@mui/material';
import MainCard from 'components/MainCard';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import api from 'api/client';
import {
  PlusOutlined, EditOutlined, TeamOutlined, UserOutlined, CoffeeOutlined, UserAddOutlined, CloseOutlined,
  PhoneOutlined, EnvironmentOutlined
} from '@ant-design/icons';

const statusColorMap = {
  Active: 'success',
  Inactive: 'warning',
  'On Leave': 'info',
  Suspended: 'error',
  Resigned: 'default'
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      // In the backend, Distributor and Employee are separate roles but we merge them here
      const [empRes, distRes] = await Promise.all([
        api.get('/admin/users/?role=Employee'),
        api.get('/admin/users/?role=Distributor')
      ]);
      
      const formatUser = (d, roleLabel) => ({
        id: d.id,
        code: d.ccs_id || '-',
        name: `${d.first_name} ${d.last_name}`.trim() || 'Unknown',
        mobile: d.phone || '-',
        email: d.email,
        role: roleLabel,
        territory: d.distributor_profile?.region || 'Head Office',
        status: d.status === 'Approved' ? 'Active' : 'Inactive',
        dealersCount: Math.floor(Math.random() * 50) + 5, // Mock
        ordersCount: Math.floor(Math.random() * 100) + 10, // Mock
        collections: Math.floor(Math.random() * 500000) + 50000, // Mock
        joiningDate: d.date_joined
      });

      const mapped = [
        ...empRes.data.map(d => formatUser(d, 'Employee')),
        ...distRes.data.map(d => formatUser(d, 'Distributor'))
      ];

      setEmployees(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const kpis = useMemo(() => ({
    total: employees.length,
    active: employees.filter(e => e.status === 'Active').length,
    distributors: employees.filter(e => e.role === 'Distributor').length,
    employees: employees.filter(e => e.role === 'Employee').length
  }), [employees]);

  const columns = [
    { 
      field: 'name', 
      headerName: 'Name', 
      flex: 1.5, 
      minWidth: 200,
      renderCell: (params) => (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem', bgcolor: 'primary.lighter', color: 'primary.main' }}>
            {params.value.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="subtitle2">{params.value}</Typography>
            <Typography variant="caption" color="textSecondary">{params.row.role}</Typography>
          </Box>
        </Stack>
      )
    },
    { field: 'mobile', headerName: 'Mobile', flex: 1, minWidth: 120 },
    { field: 'territory', headerName: 'Territory', flex: 1.2, minWidth: 150 },
    { field: 'dealersCount', headerName: 'Dealers', flex: 0.8, minWidth: 100 },
    { 
      field: 'status', 
      headerName: 'Status', 
      flex: 1, 
      minWidth: 120,
      renderCell: (params) => (
        <Chip label={params.value} size="small" color={statusColorMap[params.value] || 'default'} />
      )
    },
    { field: 'ordersCount', headerName: 'Orders', flex: 0.8, minWidth: 100 },
    { field: 'collections', headerName: 'Collections', flex: 1, minWidth: 120, renderCell: (params) => `₹ ${params.value.toLocaleString('en-IN')}` }
  ];

  const rowActions = [
    {
      label: 'View Profile',
      icon: <UserOutlined />,
      onClick: (row) => openStaffProfile(row),
      showInMenu: true
    },
    {
      label: 'Edit',
      icon: <EditOutlined />,
      onClick: (row) => console.log('Edit', row),
      showInMenu: true
    }
  ];

  const openStaffProfile = (staff) => {
    setSelectedStaff(staff);
    setTabValue(0);
    setDrawerOpen(true);
  };

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5">Field Staff</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Manage Distributors and Employees unified under one view
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<PlusOutlined />}>
            Add Staff
          </Button>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="Total Staff" count={kpis.total} icon={<TeamOutlined />} color="primary" />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="Active" count={kpis.active} icon={<UserOutlined />} color="success" />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="Distributors" count={kpis.distributors} icon={<TeamOutlined />} color="info" />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="Employees" count={kpis.employees} icon={<UserOutlined />} color="secondary" />
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ height: 600 }}>
          <EnterpriseTable 
            rows={employees}
            columns={columns}
            loading={loading}
            rowActions={rowActions}
            onRowClick={(params) => openStaffProfile(params.row)}
          />
        </Box>
      </Grid>

      {/* Staff Detail Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: { xs: '100%', sm: 600 } } }}
      >
        {selectedStaff && (
          <Box sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h5">{selectedStaff.name}</Typography>
              <IconButton onClick={() => setDrawerOpen(false)}><CloseOutlined /></IconButton>
            </Stack>
            <Stack direction="row" spacing={2} mb={3}>
              <Chip label={selectedStaff.role} color="primary" variant="outlined" />
              <Chip icon={<PhoneOutlined />} label={selectedStaff.mobile} variant="outlined" />
              <Chip label={selectedStaff.status} color={statusColorMap[selectedStaff.status]} />
            </Stack>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} variant="scrollable">
                <Tab label="Profile" />
                <Tab label="Daily Working" />
                <Tab label="Dealer Visits" />
                <Tab label="Expenses" />
                <Tab label="Target vs Achievement" />
              </Tabs>
            </Box>

            {tabValue === 0 && (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Code</Typography>
                  <Typography variant="body1" fontWeight={500}>{selectedStaff.code}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Email</Typography>
                  <Typography variant="body1" fontWeight={500}>{selectedStaff.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Territory / Region</Typography>
                  <Typography variant="body1" fontWeight={500}>{selectedStaff.territory}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Date Joined</Typography>
                  <Typography variant="body1" fontWeight={500}>{new Date(selectedStaff.joiningDate).toLocaleDateString()}</Typography>
                </Grid>
              </Grid>
            )}

            {tabValue === 1 && (
              <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>Daily Working Table Placeholder</Typography>
            )}
            {tabValue === 2 && (
              <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>Dealer Visits Table Placeholder</Typography>
            )}
            {tabValue === 3 && (
              <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>Expenses Table Placeholder</Typography>
            )}
            {tabValue === 4 && (
              <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>Target vs Achievement Placeholder</Typography>
            )}
          </Box>
        )}
      </Drawer>
    </Grid>
  );
}
