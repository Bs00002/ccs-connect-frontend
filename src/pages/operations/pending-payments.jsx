import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import { formatINR } from 'data/ccsMock';
import { PlusOutlined, FileDoneOutlined, WalletOutlined } from '@ant-design/icons';
import useAuth from 'hooks/useAuth';

export default function PaymentsAdmin() {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Mock fetch for payments history
    setTimeout(() => {
      setData([
        { id: 1, dealer: 'Green Field', invoice: 'INV-1001', amount: 50000, method: 'Bank', date: '2026-08-05', status: 'Completed', outstanding: 15000 },
        { id: 2, dealer: 'Agro Point', invoice: 'INV-1002', amount: 15000, method: 'UPI', date: '2026-08-04', status: 'Completed', outstanding: 0 },
        { id: 3, dealer: 'Kisan Kendra', invoice: 'INV-1003', amount: 35000, method: 'Cash', date: '2026-08-06', status: 'Pending', outstanding: 35000 },
        { id: 4, dealer: 'Sardar Agro', invoice: 'INV-1004', amount: 100000, method: 'Online', date: '2026-08-02', status: 'Failed', outstanding: 120000 }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    { field: 'dealer', headerName: 'Dealer', flex: 1.5, minWidth: 200 },
    { field: 'invoice', headerName: 'Invoice', flex: 1, minWidth: 120 },
    { field: 'amount', headerName: 'Amount', flex: 1, minWidth: 120, renderCell: (params) => (
      <Typography fontWeight={600}>{formatINR(params.value)}</Typography>
    )},
    { field: 'method', headerName: 'Method', flex: 1, minWidth: 120 },
    { field: 'date', headerName: 'Date', flex: 1, minWidth: 120 },
    { field: 'outstanding', headerName: 'Outstanding', flex: 1, minWidth: 120, renderCell: (params) => (
      <Typography color="error.main" fontWeight={600}>{formatINR(params.value)}</Typography>
    )},
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 120, renderCell: (params) => {
      let color = 'text.primary';
      if (params.value === 'Completed') color = 'success.main';
      if (params.value === 'Pending') color = 'warning.main';
      if (params.value === 'Failed') color = 'error.main';
      return <Typography color={color} fontWeight={600}>{params.value}</Typography>;
    }}
  ];

  const rowActions = [
    { label: 'View Receipt', icon: <FileDoneOutlined />, onClick: (row) => console.log('View', row), showInMenu: true }
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mb={3} sx={{ flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5">Payments</Typography>
          <Typography variant="body2" color="textSecondary">Manage all payment modes (Cash, UPI, Card, Bank, Online) and track collections.</Typography>
        </Box>
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => setOpenDialog(true)}>
          Record Payment
        </Button>
      </Stack>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={4}>
          <AnalyticEcommerce title="Total Collected" count={formatINR(65000)} icon={<WalletOutlined />} color="primary" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AnalyticEcommerce title="Pending Confirmations" count={formatINR(35000)} icon={<WalletOutlined />} color="warning" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AnalyticEcommerce title="Outstanding Balance" count={formatINR(170000)} icon={<WalletOutlined />} color="error" />
        </Grid>
      </Grid>

      <Box sx={{ height: 600 }}>
        <EnterpriseTable 
          rows={data} 
          columns={columns} 
          loading={loading} 
          rowActions={rowActions} 
        />
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Record Payment</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Dealer</InputLabel>
                <Select label="Dealer" defaultValue="">
                  <MenuItem value="1">Green Field</MenuItem>
                  <MenuItem value="2">Agro Point</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Invoice No." size="small" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Amount" type="number" size="small" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Payment Method</InputLabel>
                <Select label="Payment Method" defaultValue="">
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="UPI">UPI</MenuItem>
                  <MenuItem value="Card">Card</MenuItem>
                  <MenuItem value="Bank">Bank Transfer</MenuItem>
                  <MenuItem value="Online">Online Gateway</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Transaction ID / Ref" size="small" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">Cancel</Button>
          <Button onClick={() => setOpenDialog(false)} variant="contained" color="primary">Save Payment</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
