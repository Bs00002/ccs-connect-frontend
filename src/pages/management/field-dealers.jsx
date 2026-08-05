import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Stack, Button, Chip } from '@mui/material';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import { useNavigate } from 'react-router-dom';
import { PhoneOutlined, EnvironmentOutlined, ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons';
import { formatINR } from 'data/ccsMock';

export default function FieldDealers() {
  const navigate = useNavigate();
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setDealers([
        { id: 1, dealer: 'Kisan Agro', mobile: '9876543210', outstanding: 45000, lastVisit: '2 days ago', orders: 5 },
        { id: 2, dealer: 'Green Field', mobile: '9988776655', outstanding: 12000, lastVisit: '10 days ago', orders: 2 },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    { field: 'dealer', headerName: 'Dealer', flex: 1.5, minWidth: 150 },
    { field: 'mobile', headerName: 'Mobile', flex: 1, minWidth: 120 },
    { field: 'outstanding', headerName: 'Outstanding', flex: 1, minWidth: 120, renderCell: (params) => (
      <Typography color={params.value > 20000 ? 'error.main' : 'inherit'} fontWeight={500}>
        {formatINR(params.value)}
      </Typography>
    )},
    { field: 'lastVisit', headerName: 'Last Visit', flex: 1, minWidth: 120 },
    { field: 'orders', headerName: 'Orders', flex: 0.8, minWidth: 80 }
  ];

  const rowActions = [
    { label: 'Call', icon: <PhoneOutlined />, onClick: (row) => window.open(`tel:${row.mobile}`), showInMenu: true },
    { label: 'Navigate', icon: <EnvironmentOutlined />, onClick: (row) => console.log('Navigating to', row), showInMenu: true },
    { label: 'Create Order', icon: <ShoppingCartOutlined />, onClick: (row) => navigate('/field/orders/create'), showInMenu: true },
    { label: 'Collection', icon: <DollarOutlined />, onClick: (row) => navigate('/field/collections'), showInMenu: true },
  ];

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
          <Box>
            <Typography variant="h5">My Dealers</Typography>
            <Typography variant="body2" color="textSecondary">Manage your assigned dealers and take quick actions.</Typography>
          </Box>
        </Stack>
      </Grid>
      
      <Grid item xs={12}>
        <Box sx={{ height: 600 }}>
          <EnterpriseTable rows={dealers} columns={columns} loading={loading} rowActions={rowActions} />
        </Box>
      </Grid>
    </Grid>
  );
}
