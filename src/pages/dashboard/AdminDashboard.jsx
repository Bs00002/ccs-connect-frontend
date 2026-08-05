import React from 'react';
import { Grid, Typography, Box, Card, CardContent } from '@mui/material';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import {
  ShoppingCartOutlined,
  ClockCircleOutlined,
  CarOutlined,
  MoneyCollectOutlined,
  DollarOutlined,
  WarningOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  UserOutlined
} from '@ant-design/icons';

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

export default function AdminDashboard({ data }) {
  // --- MOCK DATA ---
  const kpis = {
    todaysOrders: '24',
    pendingOrders: '15',
    pendingDispatch: '8',
    waitingApproval: '5',
    todaysCollections: '₹ 1,25,000',
    outstandingPayments: '₹ 45,00,000',
    lowStock: '12',
    totalDealers: '150',
    totalEmployees: '25',
    activeUsers: '18'
  };

  const recentOrdersCols = [
    { field: 'orderNo', headerName: 'Order No', flex: 1 },
    { field: 'dealer', headerName: 'Dealer', flex: 1 },
    { field: 'amount', headerName: 'Amount', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 }
  ];
  const recentOrdersRows = [
    { id: 1, orderNo: 'ORD-001', dealer: 'Kisan Agro', amount: '₹ 45,000', status: 'Pending' },
    { id: 2, orderNo: 'ORD-002', dealer: 'Green Field', amount: '₹ 12,000', status: 'Approved' },
  ];

  const workingTodayCols = [
    { field: 'name', headerName: 'Employee', flex: 1 },
    { field: 'checkIn', headerName: 'Check In', flex: 1 },
    { field: 'visits', headerName: 'Visits', flex: 1 }
  ];
  const workingTodayRows = [
    { id: 1, name: 'Rahul Sharma', checkIn: '09:15 AM', visits: 3 },
    { id: 2, name: 'Vikram Singh', checkIn: '09:30 AM', visits: 2 },
  ];

  const pendingDispatchCols = [
    { field: 'orderNo', headerName: 'Order No', flex: 1 },
    { field: 'dealer', headerName: 'Dealer', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 }
  ];
  const pendingDispatchRows = [
    { id: 1, orderNo: 'ORD-003', dealer: 'Kisan Agro', date: '04 Aug 2026' }
  ];

  const pendingCollectionsCols = [
    { field: 'dealer', headerName: 'Dealer', flex: 1 },
    { field: 'amount', headerName: 'Amount', flex: 1 },
    { field: 'due_days', headerName: 'Days Overdue', flex: 1 }
  ];
  const pendingCollectionsRows = [
    { id: 1, dealer: 'Green Field', amount: '₹ 25,000', due_days: 12 }
  ];

  const latestVisitsCols = [
    { field: 'employee', headerName: 'Employee', flex: 1 },
    { field: 'dealer', headerName: 'Dealer', flex: 1 },
    { field: 'time', headerName: 'Time', flex: 1 }
  ];
  const latestVisitsRows = [
    { id: 1, employee: 'Rahul Sharma', dealer: 'Agro Point', time: '10:45 AM' }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Admin Operating Panel
      </Typography>

      {/* KPI Section */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard title="Today's Orders" value={kpis.todaysOrders} icon={<ShoppingCartOutlined />} color="primary.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard title="Pending Orders" value={kpis.pendingOrders} icon={<ClockCircleOutlined />} color="warning.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard title="Pending Dispatch" value={kpis.pendingDispatch} icon={<CarOutlined />} color="info.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard title="Waiting Approval" value={kpis.waitingApproval} icon={<WarningOutlined />} color="error.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard title="Today's Collections" value={kpis.todaysCollections} icon={<MoneyCollectOutlined />} color="success.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard title="Outstanding Payments" value={kpis.outstandingPayments} icon={<DollarOutlined />} color="error.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard title="Low Stock Products" value={kpis.lowStock} icon={<WarningOutlined />} color="warning.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard title="Total Dealers" value={kpis.totalDealers} icon={<TeamOutlined />} color="primary.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard title="Distributors/Employees" value={kpis.totalEmployees} icon={<UsergroupAddOutlined />} color="info.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard title="Today's Active Users" value={kpis.activeUsers} icon={<UserOutlined />} color="success.main" />
        </Grid>
      </Grid>

      {/* Charts Section (Placeholders for actual charts) */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card><CardContent><Typography variant="h6">Monthly Sales & Collections</Typography><Box height={250} bgcolor="grey.100" mt={2} display="flex" alignItems="center" justifyContent="center">Chart Placeholder</Box></CardContent></Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card><CardContent><Typography variant="h6">Outstanding Trend</Typography><Box height={250} bgcolor="grey.100" mt={2} display="flex" alignItems="center" justifyContent="center">Chart Placeholder</Box></CardContent></Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card><CardContent><Typography variant="h6">Territory Sales</Typography><Box height={250} bgcolor="grey.100" mt={2} display="flex" alignItems="center" justifyContent="center">Chart Placeholder</Box></CardContent></Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card><CardContent><Typography variant="h6">Product Sales</Typography><Box height={250} bgcolor="grey.100" mt={2} display="flex" alignItems="center" justifyContent="center">Chart Placeholder</Box></CardContent></Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card><CardContent><Typography variant="h6">Top Selling Products</Typography><Box height={250} bgcolor="grey.100" mt={2} display="flex" alignItems="center" justifyContent="center">Chart Placeholder</Box></CardContent></Card>
        </Grid>
      </Grid>

      {/* Live Tables Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <EnterpriseTable 
            title="Recent Orders"
            columns={recentOrdersCols}
            rows={recentOrdersRows}
            hideFooter
            sx={{ height: 350 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EnterpriseTable 
            title="Employees Working Today"
            columns={workingTodayCols}
            rows={workingTodayRows}
            hideFooter
            sx={{ height: 350 }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <EnterpriseTable 
            title="Pending Dispatch"
            columns={pendingDispatchCols}
            rows={pendingDispatchRows}
            hideFooter
            sx={{ height: 350 }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <EnterpriseTable 
            title="Pending Collections"
            columns={pendingCollectionsCols}
            rows={pendingCollectionsRows}
            hideFooter
            sx={{ height: 350 }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <EnterpriseTable 
            title="Latest Dealer Visits"
            columns={latestVisitsCols}
            rows={latestVisitsRows}
            hideFooter
            sx={{ height: 350 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
