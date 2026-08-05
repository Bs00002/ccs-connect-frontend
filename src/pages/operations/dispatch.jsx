import React, { useState, useEffect, useMemo } from 'react';
import {
  Grid, Typography, Box, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  Drawer, Divider, Chip, IconButton, TextField, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import MainCard from 'components/MainCard';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import api from 'api/client';
import {
  PlusOutlined, EyeOutlined, TruckOutlined, SendOutlined, CheckCircleOutlined,
  ContainerOutlined, FileTextOutlined, CloseOutlined, EnvironmentOutlined, UploadOutlined
} from '@ant-design/icons';
import { formatINR } from 'data/ccsMock';

const statusColorMap = {
  'Approved': 'warning',
  'Ready Dispatch': 'secondary',
  'Dispatched': 'primary',
  'In Transit': 'primary',
  'Delivered': 'success'
};

export default function DispatchPage() {
  const [dispatches, setDispatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDispatch, setSelectedDispatch] = useState(null);
  
  // Form state
  const [transport, setTransport] = useState('');
  const [lrNumber, setLrNumber] = useState('');
  const [lrFile, setLrFile] = useState(null);

  const fetchDispatches = async () => {
    setLoading(true);
    try {
      // Fetch only approved, dispatched, delivered orders
      const res = await api.get('/orders/orders/');
      const validStatuses = ['Approved', 'Ready Dispatch', 'Dispatched', 'In Transit', 'Delivered'];
      const filtered = res.data.filter(o => validStatuses.includes(o.status));
      
      const mapped = filtered.map(o => {
        return {
          id: o.id,
          orderNumber: o.order_number,
          dealerName: o.dealer_name,
          grandTotal: parseFloat(o.grand_total || 0),
          status: o.status,
          lrNumber: o.lr_number || '',
          transport: o.transport_details || '',
          date: new Date(o.created_at).toLocaleDateString()
        };
      });
      setDispatches(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDispatches();
  }, []);

  const kpis = useMemo(() => ({
    pending: dispatches.filter(d => d.status === 'Approved' || d.status === 'Ready Dispatch').length,
    inTransit: dispatches.filter(d => d.status === 'Dispatched' || d.status === 'In Transit').length,
    delivered: dispatches.filter(d => d.status === 'Delivered').length,
  }), [dispatches]);

  const columns = [
    { field: 'orderNumber', headerName: 'Order', flex: 1, minWidth: 120, renderCell: (params) => (
      <Typography color="primary" fontWeight={600} sx={{ cursor: 'pointer' }} onClick={() => openDispatchDetail(params.row)}>
        {params.value}
      </Typography>
    )},
    { field: 'dealerName', headerName: 'Dealer', flex: 1.5, minWidth: 150 },
    { field: 'transport', headerName: 'Transport Details', flex: 1.5, minWidth: 150, renderCell: (params) => params.value || '-' },
    { field: 'lrNumber', headerName: 'LR', flex: 1, minWidth: 120, renderCell: (params) => params.value || '-' },
    { field: 'date', headerName: 'Order Date', flex: 1, minWidth: 120 },
    { 
      field: 'status', 
      headerName: 'Status', 
      flex: 1, 
      minWidth: 120,
      renderCell: (params) => (
        <Chip label={params.value} size="small" color={statusColorMap[params.value] || 'default'} />
      )
    }
  ];

  const rowActions = [
    {
      label: 'Manage Dispatch',
      icon: <TruckOutlined />,
      onClick: (row) => openDispatchDetail(row),
      showInMenu: true
    }
  ];

  const openDispatchDetail = (dispatchRow) => {
    setSelectedDispatch(dispatchRow);
    setTransport(dispatchRow.transport);
    setLrNumber(dispatchRow.lrNumber);
    setLrFile(null);
    setDrawerOpen(true);
  };

  const handleUpdateDispatch = async () => {
    if (!selectedDispatch) return;
    try {
      const formData = new FormData();
      formData.append('transport_details', transport);
      formData.append('lr_number', lrNumber);
      if (lrFile) {
        formData.append('lr_receipt_upload', lrFile);
      }

      await api.post(`/orders/orders/${selectedDispatch.id}/dispatch_details/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setDrawerOpen(false);
      fetchDispatches();
      alert("Dispatch details updated and LR uploaded successfully.");
    } catch(err) {
      alert("Failed to update dispatch details.");
    }
  }

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5">Dispatch & Freight Management</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Manage shipments, transport assignment, and LR tracking
            </Typography>
          </Box>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={4}>
        <AnalyticEcommerce title="Pending Dispatch" count={kpis.pending} icon={<ContainerOutlined />} color="warning" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <AnalyticEcommerce title="Dispatched / In Transit" count={kpis.inTransit} icon={<TruckOutlined />} color="primary" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <AnalyticEcommerce title="Delivered" count={kpis.delivered} icon={<CheckCircleOutlined />} color="success" />
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ height: 600 }}>
          <EnterpriseTable 
            rows={dispatches}
            columns={columns}
            loading={loading}
            rowActions={rowActions}
            onRowClick={(params) => openDispatchDetail(params.row)}
            checkboxSelection
          />
        </Box>
      </Grid>

      {/* Dispatch Detail Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: { xs: '100%', sm: 600 } } }}
      >
        {selectedDispatch && (
          <Box sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Box>
                <Typography variant="h5" color="primary">{selectedDispatch.orderNumber}</Typography>
                <Typography variant="body2" color="textSecondary">{selectedDispatch.dealerName}</Typography>
              </Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip label={selectedDispatch.status} color={statusColorMap[selectedDispatch.status]} />
                <IconButton onClick={() => setDrawerOpen(false)}><CloseOutlined /></IconButton>
              </Stack>
            </Stack>
            <Divider sx={{ mb: 3 }} />

            <Typography variant="h6" gutterBottom>Assign Transport</Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <TextField 
                  fullWidth size="small" label="Transport Details (Agency, Vehicle, Driver)" 
                  value={transport} onChange={e => setTransport(e.target.value)} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  fullWidth size="small" label="LR Number" 
                  value={lrNumber} onChange={e => setLrNumber(e.target.value)} 
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" component="label" startIcon={<UploadOutlined />} fullWidth>
                  Upload LR Receipt (PDF/Image)
                  <input type="file" hidden onChange={e => setLrFile(e.target.files[0])} />
                </Button>
                {lrFile && <Typography variant="caption" color="success.main" display="block" mt={1}>Selected: {lrFile.name}</Typography>}
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom>Freight Tracking</Typography>
            <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 4 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <EnvironmentOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                <Box>
                  <Typography variant="subtitle2">Current Status: {selectedDispatch.status}</Typography>
                </Box>
              </Stack>
            </Box>

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={() => setDrawerOpen(false)}>Cancel</Button>
              <Button variant="contained" color="primary" onClick={handleUpdateDispatch}>Update Dispatch Info</Button>
            </Stack>
          </Box>
        )}
      </Drawer>
    </Grid>
  );
}
