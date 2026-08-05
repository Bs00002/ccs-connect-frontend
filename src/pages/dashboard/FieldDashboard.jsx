import React from 'react';
import { Grid, Typography, Card, CardContent, Box, Button } from '@mui/material';
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  ShoppingCartOutlined,
  MoneyCollectOutlined,
  DollarOutlined,
  CarOutlined,
  CalendarOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, icon, color = 'primary.main' }) => (
  <Card sx={{ height: '100%' }}>
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

export default function FieldDashboard({ data }) {
  const navigate = useNavigate();

  // Mock data to visualize the KPI cards if backend 'data' is not provided
  const mockData = {
    status: 'Checked In',
    workingHours: '4h 30m',
    visits: 5,
    orders: 2,
    collections: '₹ 45,000',
    expenses: '₹ 450',
    distance: '32 km',
    pendingFollowUps: 3
  };

  const dashboardData = data || mockData;

  const quickActions = [
    { label: 'Check In', icon: <CheckCircleOutlined />, route: '/field/daily-working', color: 'success' },
    { label: 'Dealer Visit', icon: <EnvironmentOutlined />, route: '/field/visits', color: 'primary' },
    { label: 'Create Order', icon: <ShoppingCartOutlined />, route: '/field/orders/create', color: 'info' },
    { label: 'Collection', icon: <MoneyCollectOutlined />, route: '/field/collections', color: 'warning' },
    { label: 'Expense', icon: <DollarOutlined />, route: '/field/expenses', color: 'error' },
    { label: 'Check Out', icon: <ClockCircleOutlined />, route: '/field/daily-report', color: 'secondary' },
  ];

  const pendingCollectionsCols = [
    { field: 'dealer', headerName: 'Dealer', flex: 1 },
    { field: 'invoice', headerName: 'Invoice No', flex: 1 },
    { field: 'amount', headerName: 'Amount', flex: 1 },
    { field: 'due', headerName: 'Due Date', flex: 1 },
  ];

  const pendingCollectionsRows = [
    { id: 1, dealer: 'Agro Point', invoice: 'INV-2023-001', amount: '₹ 15,000', due: 'Today' },
    { id: 2, dealer: 'Kisan Kendra', invoice: 'INV-2023-005', amount: '₹ 22,500', due: 'Tomorrow' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Field Operations Dashboard
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {quickActions.map((action, idx) => (
          <Button
            key={idx}
            variant="contained"
            color={action.color}
            startIcon={action.icon}
            onClick={() => navigate(action.route)}
            sx={{ px: 3, py: 1.5, borderRadius: 2 }}
          >
            {action.label}
          </Button>
        ))}
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Status" value={dashboardData.status} icon={<CheckCircleOutlined />} color="success.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Working Hours" value={dashboardData.workingHours} icon={<ClockCircleOutlined />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Dealer Visits" value={dashboardData.visits} icon={<EnvironmentOutlined />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Orders Created" value={dashboardData.orders} icon={<ShoppingCartOutlined />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Collections" value={dashboardData.collections} icon={<MoneyCollectOutlined />} color="warning.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Expenses" value={dashboardData.expenses} icon={<DollarOutlined />} color="error.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Distance Travelled" value={dashboardData.distance} icon={<CarOutlined />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Pending Follow Ups" value={dashboardData.pendingFollowUps} icon={<CalendarOutlined />} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <EnterpriseTable 
            title="Pending Collections"
            columns={pendingCollectionsCols}
            rows={pendingCollectionsRows}
            hideFooter
            sx={{ height: 300 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', minHeight: 300 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Today's Route Map
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography color="textSecondary">Map Integration Placeholder</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
