import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, Grid } from '@mui/material';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import { formatINR } from 'data/ccsMock';
import { FileTextOutlined, WalletOutlined, CheckCircleOutlined } from '@ant-design/icons';
import api from 'api/client';

export default function DealerPayments() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get('/orders/invoices/');
        // Filter out fully paid invoices for the "Pending Payments" view if needed, 
        // but since this is "Payments", let's show all or just pending based on requirement. 
        // We'll show all invoices that have a balance due.
        const pending = res.data.filter(inv => parseFloat(inv.balance_due) > 0);
        
        setData(pending.map(p => ({
          id: p.id,
          invoice: p.invoice_number,
          totalAmount: parseFloat(p.total_amount),
          pending: parseFloat(p.balance_due),
          status: p.status,
          date: new Date(p.created_at).toLocaleDateString()
        })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const columns = [
    { field: 'invoice', headerName: 'Invoice', flex: 1, minWidth: 120 },
    { field: 'date', headerName: 'Date', flex: 1, minWidth: 120 },
    { field: 'totalAmount', headerName: 'Total Amount', flex: 1, minWidth: 120, renderCell: (params) => formatINR(params.value) },
    { field: 'pending', headerName: 'Pending Amount', flex: 1, minWidth: 120, renderCell: (params) => (
      <Typography color="error.main" fontWeight={600}>{formatINR(params.value)}</Typography>
    )},
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 120 }
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mb={3}>
        <Box>
          <Typography variant="h5">My Payments</Typography>
          <Typography variant="body2" color="textSecondary">Track your pending payments and outstanding balances.</Typography>
        </Box>
      </Stack>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={4}>
          <AnalyticEcommerce title="Total Pending Invoices" count={data.length} icon={<FileTextOutlined />} color="primary" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AnalyticEcommerce title="Total Outstanding" count={formatINR(data.reduce((sum, item) => sum + item.pending, 0))} icon={<WalletOutlined />} color="error" />
        </Grid>
      </Grid>
      <Box sx={{ height: 600 }}>
        <EnterpriseTable 
          rows={data} 
          columns={columns} 
          loading={loading} 
        />
      </Box>
    </Box>
  );
}
