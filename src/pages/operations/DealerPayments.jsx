import React, { useState } from 'react';
import { Grid, Typography, Box, Stack, Chip, TextField, InputAdornment, Paper } from '@mui/material';
import DataTable from 'components/DataTable';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import { formatINR } from 'data/ccsMock';
import { SearchOutlined, CheckCircleOutlined, WalletOutlined } from '@ant-design/icons';
import { IndianRupee, CreditCard, Landmark, CheckCircle2, Clock } from 'lucide-react';

const mockPaymentHistory = [
  { id: 1, date: '2026-08-06', amount: 16250, mode: 'UPI / GPay', status: 'Completed', refNo: 'UPI-9840291029', bank: 'HDFC Bank', remarks: 'Payment for ORD-2026-101' },
  { id: 2, date: '2026-08-04', amount: 5000, mode: 'Bank Transfer (NEFT)', status: 'Completed', refNo: 'NEFT-8492019482', bank: 'ICICI Bank', remarks: 'Advance against balance' },
  { id: 3, date: '2026-08-02', amount: 3200, mode: 'Cheque', status: 'Pending Clearance', refNo: 'CHQ-482019', bank: 'State Bank of India', remarks: 'Cheque deposit under process' },
  { id: 4, date: '2026-07-28', amount: 24500, mode: 'Cash', status: 'Completed', refNo: 'CSH-02941', bank: 'Cash Deposit', remarks: 'Depot counter payment' }
];

export default function DealerPayments() {
  const [payments, setPayments] = useState(mockPaymentHistory);
  const [search, setSearch] = useState('');

  const completedTotal = payments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingTotal = payments.filter(p => p.status !== 'Completed').reduce((sum, p) => sum + p.amount, 0);

  const filteredPayments = payments.filter(p =>
    p.mode.toLowerCase().includes(search.toLowerCase()) ||
    p.refNo.toLowerCase().includes(search.toLowerCase()) ||
    p.remarks.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: 'date', headerName: 'Payment Date', flex: 1, minWidth: 110 },
    {
      field: 'amount',
      headerName: 'Amount Paid',
      flex: 1.2,
      minWidth: 120,
      renderCell: (params) => (
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <Typography fontWeight={700} color="success.main">{formatINR(params.value)}</Typography>
        </Box>
      )
    },
    {
      field: 'mode',
      headerName: 'Payment Method',
      flex: 1.5,
      minWidth: 160,
      renderCell: (params) => (
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <Chip label={params.value} size="small" color="primary" variant="outlined" />
        </Box>
      )
    },
    { field: 'refNo', headerName: 'Reference / UTR No', flex: 1.5, minWidth: 150 },
    { field: 'bank', headerName: 'Bank Name', flex: 1.2, minWidth: 140 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1.2,
      minWidth: 120,
      renderCell: (params) => (
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <Chip
            label={params.value}
            size="small"
            color={params.value === 'Completed' ? 'success' : 'warning'}
          />
        </Box>
      )
    },
    { field: 'remarks', headerName: 'Remarks', flex: 2, minWidth: 200 }
  ];

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5" fontWeight={700}>Payment Logs & Transaction History</Typography>
            <Typography variant="body2" color="textSecondary">
              Track completed payments, pending clearances, and transaction modes (Cash, UPI, Bank, Cheque).
            </Typography>
          </Box>
          <Chip icon={<CheckCircleOutlined />} label="Statement Verified" color="success" sx={{ fontWeight: 600 }} />
        </Stack>
      </Grid>

      {/* KPI Cards */}
      <Grid item xs={12} sm={6}>
        <AnalyticEcommerce title="Completed Payments" count={formatINR(completedTotal)} icon={<CheckCircle2 size={20} />} color="success" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <AnalyticEcommerce title="Pending Clearance" count={formatINR(pendingTotal)} icon={<Clock size={20} />} color="warning" />
      </Grid>

      {/* Filter Toolbar */}
      <Grid item xs={12}>
        <MainCard content={false} sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search by method, UTR or reference..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchOutlined /></InputAdornment> }}
              />
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      {/* Payment History Table */}
      <Grid item xs={12}>
        <MainCard title="Payment History List" content={false}>
          <DataTable
            rows={filteredPayments}
            columns={columns}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
}
