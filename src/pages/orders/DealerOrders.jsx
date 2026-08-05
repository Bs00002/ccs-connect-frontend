import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import api from 'api/client';
import { formatINR } from 'data/ccsMock';

export default function DealerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get('/orders/orders/');
      // Map API response to match the approved dealer fields
      // In a real scenario, the backend should return flattened items or we flatten them here
      const mapped = [];
      res.data.forEach(o => {
        if (o.items && o.items.length > 0) {
          o.items.forEach(item => {
            mapped.push({
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
      setOrders(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    { field: 'distributorName', headerName: 'Distributor Name', flex: 1.5, minWidth: 150 },
    { field: 'distributorMobile', headerName: 'Distributor Mobile', flex: 1, minWidth: 150 },
    { field: 'productName', headerName: 'Product Name', flex: 1.5, minWidth: 200, renderCell: (params) => (
      <Typography fontWeight={500} color="primary">{params.value}</Typography>
    )},
    { field: 'quantity', headerName: 'Quantity', flex: 0.8, minWidth: 100 },
    { field: 'totalAmount', headerName: 'Total Amount', flex: 1, minWidth: 120, renderCell: (params) => (
      <Typography fontWeight={600}>{formatINR(params.value)}</Typography>
    )},
    { field: 'orderDate', headerName: 'Order Date', flex: 1, minWidth: 120 }
  ];

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Box>
          <Typography variant="h5" sx={{ mb: 1 }}>My Orders</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            View your order history and details.
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ height: 600 }}>
          <EnterpriseTable 
            rows={orders}
            columns={columns}
            loading={loading}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
