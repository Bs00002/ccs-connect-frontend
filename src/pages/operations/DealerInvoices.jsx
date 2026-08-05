import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Stack } from '@mui/material';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import { formatINR } from 'data/ccsMock';
import api from 'api/client';
import { FileTextOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';

export default function DealerInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await api.get('/orders/invoices/');
      const mapped = res.data.map(i => ({
        id: i.id,
        invoiceNumber: i.invoice_number,
        total: parseFloat(i.total_amount),
        paid: parseFloat(i.total_amount) - parseFloat(i.balance_due),
        pending: parseFloat(i.balance_due),
        status: i.status,
        date: new Date(i.created_at).toLocaleDateString()
      }));
      setInvoices(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const columns = [
    { field: 'invoiceNumber', headerName: 'Invoice No', flex: 1, minWidth: 120 },
    { field: 'date', headerName: 'Date', flex: 1, minWidth: 120 },
    { field: 'total', headerName: 'Amount', flex: 1, minWidth: 120, renderCell: (params) => formatINR(params.value) },
    { field: 'paid', headerName: 'Paid', flex: 1, minWidth: 120, renderCell: (params) => formatINR(params.value || 0) },
    { field: 'pending', headerName: 'Pending', flex: 1, minWidth: 120, renderCell: (params) => formatINR(params.value || 0) },
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 120 }
  ];

  const rowActions = [
    { label: 'View Invoice', icon: <FileTextOutlined />, onClick: (row) => console.log('View', row), showInMenu: true },
    { label: 'Download PDF', icon: <FileTextOutlined />, onClick: (row) => console.log('Download', row), showInMenu: true },
    { label: 'Print', icon: <FileTextOutlined />, onClick: (row) => console.log('Print', row), showInMenu: true }
  ];

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
          <Box>
            <Typography variant="h5">My Invoices</Typography>
            <Typography variant="body2" color="textSecondary">View and download your invoices.</Typography>
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={4}>
        <AnalyticEcommerce title="Total Invoices" count={invoices.length} icon={<FileTextOutlined />} color="primary" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <AnalyticEcommerce title="Paid Invoices" count={invoices.filter(i => i.status === 'Paid').length} icon={<CheckCircleOutlined />} color="success" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <AnalyticEcommerce title="Pending Invoices" count={invoices.filter(i => i.status === 'Unpaid' || i.status === 'Partial').length} icon={<WarningOutlined />} color="warning" />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ height: 600 }}>
          <EnterpriseTable rows={invoices} columns={columns} loading={loading} rowActions={rowActions} />
        </Box>
      </Grid>
    </Grid>
  );
}
