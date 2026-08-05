import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import { invoices, formatINR } from 'data/ccsMock';
import { BellOutlined, WhatsAppOutlined, PhoneOutlined, DollarOutlined } from '@ant-design/icons';
import useAuth from 'hooks/useAuth';

export default function PendingPayments() {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetch
    setTimeout(() => {
      const pending = invoices.filter(inv => inv.status === 'Unpaid' || inv.status === 'Partial' || inv.status === 'Overdue');
      setData(pending.map(p => ({
        id: p.id,
        dealer: 'Mock Dealer ' + p.id,
        invoice: p.invoiceNo,
        pending: p.outstanding || p.grandTotal,
        dueDate: p.dueDate,
        days: Math.floor(Math.random() * 30)
      })));
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    { field: 'dealer', headerName: 'Dealer', flex: 1.5, minWidth: 200 },
    { field: 'invoice', headerName: 'Invoice', flex: 1, minWidth: 120 },
    { field: 'pending', headerName: 'Pending', flex: 1, minWidth: 120, renderCell: (params) => (
      <Typography color="error.main" fontWeight={600}>{formatINR(params.value)}</Typography>
    )},
    { field: 'dueDate', headerName: 'Due Date', flex: 1, minWidth: 120 },
    { field: 'days', headerName: 'Days', flex: 0.8, minWidth: 80, renderCell: (params) => (
      <Typography color={params.value > 15 ? 'error.main' : 'inherit'}>{params.value} days</Typography>
    )}
  ];

  const rowActions = [
    { label: 'Reminder', icon: <BellOutlined />, onClick: (row) => console.log('Reminder', row), showInMenu: true },
    { label: 'WhatsApp', icon: <WhatsAppOutlined />, onClick: (row) => console.log('WhatsApp', row), showInMenu: true },
    { label: 'Call', icon: <PhoneOutlined />, onClick: (row) => console.log('Call', row), showInMenu: true },
    { label: 'Receive Payment', icon: <DollarOutlined />, onClick: (row) => console.log('Receive Payment', row), showInMenu: false }
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mb={3}>
        <Box>
          <Typography variant="h5">Pending Payments</Typography>
          <Typography variant="body2" color="textSecondary">View and track unpaid invoices and follow up with dealers.</Typography>
        </Box>
      </Stack>
      <Box sx={{ height: 600 }}>
        <EnterpriseTable 
          rows={data} 
          columns={columns} 
          loading={loading} 
          rowActions={rowActions} 
        />
      </Box>
    </Box>
  );
}
