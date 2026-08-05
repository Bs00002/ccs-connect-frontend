import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Card, CardContent } from '@mui/material';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import {
  ShoppingCartOutlined,
  FileTextOutlined,
  WalletOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import api from 'api/client';
import { formatINR } from 'data/ccsMock';

const StatCard = ({ title, value, icon, color = 'primary.main' }) => (
  <Card sx={{ height: '100%', minHeight: 100 }}>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography color="textSecondary" variant="subtitle2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4">{value}</Typography>
        </Box>
        <Box sx={{ color, fontSize: '2rem' }}>{icon}</Box>
      </Box>
    </CardContent>
  </Card>
);

export default function DealerDashboard() {
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, invoicesRes] = await Promise.all([
          api.get('/orders/orders/'),
          api.get('/orders/invoices/')
        ]);
        
        // Map Orders
        const mappedOrders = [];
        ordersRes.data.forEach(o => {
          if (o.items && o.items.length > 0) {
            o.items.forEach(item => {
              mappedOrders.push({
                id: `${o.id}-${item.id || Math.random()}`,
                distributorName: o.created_by_name || '-',
                distributorMobile: o.created_by_mobile || '-',
                productName: item.product_name,
                quantity: item.quantity,
                totalAmount: parseFloat(item.total || 0),
                orderDate: new Date(o.created_at).toLocaleDateString()
              });
            });
          }
        });
        setOrders(mappedOrders.slice(0, 5));

        // Map Invoices
        const mappedInvoices = invoicesRes.data.map(i => ({
          id: i.id,
          invoiceNumber: i.invoice_number,
          totalAmount: parseFloat(i.total_amount),
          pendingAmount: parseFloat(i.balance_due),
          status: i.status,
          date: new Date(i.created_at).toLocaleDateString()
        }));
        setInvoices(mappedInvoices.slice(0, 5));

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalOutstanding = invoices.reduce((sum, inv) => sum + (inv.pendingAmount || 0), 0);
  const pendingInvoicesCount = invoices.filter(i => i.status !== 'Paid').length;

  const recentOrdersCols = [
    { field: 'distributorName', headerName: 'Distributor', flex: 1 },
    { field: 'productName', headerName: 'Product', flex: 1.5 },
    { field: 'quantity', headerName: 'Qty', flex: 0.5 },
    { field: 'totalAmount', headerName: 'Amount', flex: 1, renderCell: (params) => formatINR(params.value) },
    { field: 'orderDate', headerName: 'Date', flex: 1 }
  ];

  const recentInvoicesCols = [
    { field: 'invoiceNumber', headerName: 'Invoice No', flex: 1 },
    { field: 'totalAmount', headerName: 'Total', flex: 1, renderCell: (params) => formatINR(params.value) },
    { field: 'pendingAmount', headerName: 'Pending', flex: 1, renderCell: (params) => formatINR(params.value) },
    { field: 'status', headerName: 'Status', flex: 1 }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Dealer Portal
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Outstanding" value={formatINR(totalOutstanding)} icon={<WalletOutlined />} color="error.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Pending Invoices" value={pendingInvoicesCount} icon={<ExclamationCircleOutlined />} color="warning.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Recent Orders" value={orders.length} icon={<ShoppingCartOutlined />} color="primary.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Invoices" value={invoices.length} icon={<FileTextOutlined />} color="info.main" />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <EnterpriseTable 
            title="Recent Orders"
            columns={recentOrdersCols}
            rows={orders}
            hideFooter
            loading={loading}
            sx={{ height: 350 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EnterpriseTable 
            title="Recent Invoices"
            columns={recentInvoicesCols}
            rows={invoices}
            hideFooter
            loading={loading}
            sx={{ height: 350 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
