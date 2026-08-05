import React, { useState, useEffect, useMemo } from 'react';
import {
  Grid, Typography, Box, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  Drawer, Divider, Chip, IconButton, Avatar, Tabs, Tab, Stepper, Step, StepLabel, StepContent
} from '@mui/material';
import MainCard from 'components/MainCard';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import api from 'api/client';
import useAuth from 'hooks/useAuth';
import { formatINR } from 'data/ccsMock';
import {
  PlusOutlined, EyeOutlined, ShoppingCartOutlined, CheckCircleOutlined,
  ClockCircleOutlined, CarOutlined, CloseOutlined, PrinterOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const statusColorMap = {
  'Draft': 'default',
  'Submitted': 'warning',
  'Pending Approval': 'warning',
  'Approved': 'info',
  'Packed': 'secondary',
  'Ready Dispatch': 'secondary',
  'Loaded': 'primary',
  'In Transit': 'primary',
  'Delivered': 'success',
  'Invoice Generated': 'success',
  'Payment Complete': 'success',
  'Rejected': 'error',
  'Cancelled': 'error'
};

const orderStages = [
  'Submitted', 'Pending Approval', 'Approved', 'Packed', 'Ready Dispatch', 
  'Loaded', 'In Transit', 'Delivered', 'Invoice Generated', 'Payment Complete'
];

export default function OrdersList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'Super Admin' || user?.role === 'Admin';
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get('/orders/orders/');
      const mapped = res.data.map(o => ({
        id: o.id,
        orderNumber: o.order_number,
        date: new Date(o.created_at).toLocaleDateString(),
        dealerName: o.dealer_name,
        distributor: o.created_by_name || '-',
        cases: o.items ? o.items.reduce((acc, item) => acc + item.quantity, 0) : 0,
        grandTotal: parseFloat(o.grand_total || 0),
        status: o.status || 'Pending',
        items: o.items || []
      }));
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

  const kpis = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => o.status === 'Pending Approval' || o.status === 'Submitted' || o.status === 'Pending').length,
    inProduction: orders.filter(o => o.status === 'Packed' || o.status === 'Approved').length,
    dispatched: orders.filter(o => o.status === 'Dispatched' || o.status === 'Delivered' || o.status === 'In Transit').length
  }), [orders]);

  const columns = [
    { field: 'orderNumber', headerName: 'Order', flex: 1, minWidth: 120, renderCell: (params) => (
      <Typography color="primary" fontWeight={600} sx={{ cursor: 'pointer' }} onClick={() => openOrderDetail(params.row)}>
        {params.value}
      </Typography>
    )},
    { field: 'dealerName', headerName: 'Dealer', flex: 1.5, minWidth: 200 },
    { field: 'distributor', headerName: 'Created By', flex: 1.5, minWidth: 150 },
    { field: 'cases', headerName: 'Items Qty', flex: 0.8, minWidth: 80 },
    { field: 'grandTotal', headerName: 'Amount', flex: 1, minWidth: 120, renderCell: (params) => (
      <Typography fontWeight={600}>{formatINR(params.value)}</Typography>
    )},
    { 
      field: 'status', 
      headerName: 'Status', 
      flex: 1, 
      minWidth: 120,
      renderCell: (params) => (
        <Chip label={params.value} size="small" color={statusColorMap[params.value] || 'default'} />
      )
    }
  ];

  const rowActions = [
    {
      label: 'View Details',
      icon: <EyeOutlined />,
      onClick: (row) => openOrderDetail(row),
      showInMenu: true
    },
    {
      label: 'Print Invoice',
      icon: <PrinterOutlined />,
      onClick: (row) => console.log('Print', row),
      showInMenu: true
    }
  ];

  const fetchTimeline = async (orderId) => {
    try {
      const res = await api.get(`/orders/orders/${orderId}/timeline/`);
      setTimeline(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const openOrderDetail = (order) => {
    setSelectedOrder(order);
    setTimeline([]);
    fetchTimeline(order.id);
    setTabValue(0);
    setDrawerOpen(true);
  };

  const advanceStage = async () => {
    if (!selectedOrder) return;
    const currentIdx = orderStages.indexOf(selectedOrder.status);
    let nextStage = orderStages[currentIdx + 1];
    
    if (selectedOrder.status === 'Pending Approval') nextStage = 'Approved';
    if (!nextStage) return;

    try {
      if (nextStage === 'Approved') {
         await api.post(`/orders/orders/${selectedOrder.id}/approve/`);
      } else {
         await api.post(`/orders/orders/${selectedOrder.id}/update_status/`, { status: nextStage });
      }
      fetchOrders();
      setDrawerOpen(false);
    } catch(err) {
      alert(err.response?.data?.error || "Error updating stage");
    }
  };

  const rejectOrder = async () => {
    if (!selectedOrder) return;
    try {
      await api.post(`/orders/orders/${selectedOrder.id}/cancel/`);
      fetchOrders();
      setDrawerOpen(false);
    } catch(err) {
      alert(err.response?.data?.error || "Error rejecting order");
    }
  }

  const getActiveStep = (status) => {
    const idx = orderStages.indexOf(status);
    return idx >= 0 ? idx : 0;
  };

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5">Orders</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Manage sales orders, track status, and initiate dispatch
            </Typography>
          </Box>
          {user?.role !== 'Dealer' && (
            <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigate('/field/orders/create')}>
              Create Order
            </Button>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="Total Orders" count={kpis.total} icon={<ShoppingCartOutlined />} color="primary" />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="Pending Approval" count={kpis.pending} icon={<ClockCircleOutlined />} color="warning" />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="In Production" count={kpis.inProduction} icon={<CheckCircleOutlined />} color="info" />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="Dispatched / Delivered" count={kpis.dispatched} icon={<CarOutlined />} color="success" />
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ height: 600 }}>
          <EnterpriseTable 
            rows={orders}
            columns={columns}
            loading={loading}
            rowActions={rowActions}
            onRowClick={(params) => openOrderDetail(params.row)}
            checkboxSelection
          />
        </Box>
      </Grid>

      {/* Order Detail Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: { xs: '100%', sm: 600, md: 800 } } }}
      >
        {selectedOrder && (
          <Box sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Box>
                <Typography variant="h5" color="primary">{selectedOrder.orderNumber}</Typography>
                <Typography variant="body2" color="textSecondary">{selectedOrder.date}</Typography>
              </Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip label={selectedOrder.status} color={statusColorMap[selectedOrder.status]} />
                <IconButton onClick={() => setDrawerOpen(false)}><CloseOutlined /></IconButton>
              </Stack>
            </Stack>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Dealer Information</Typography>
                <Typography variant="body1" fontWeight={600}>{selectedOrder.dealerName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Grand Total</Typography>
                <Typography variant="h6" fontWeight={700} color="primary">{formatINR(selectedOrder.grandTotal)}</Typography>
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom>Order Items</Typography>
            <EnterpriseTable 
              rows={selectedOrder.items.map((it, idx) => ({ ...it, id: idx }))}
              columns={[
                { field: 'product_name', headerName: 'Product', flex: 2, minWidth: 200 },
                { field: 'quantity', headerName: 'Quantity', flex: 1, minWidth: 100 },
                { field: 'rate', headerName: 'Unit Price', flex: 1, minWidth: 120, renderCell: (params) => formatINR(params.value) },
                { field: 'total', headerName: 'Total', flex: 1, minWidth: 120, renderCell: (params) => formatINR(params.value) }
              ]}
              hideFooter
              sx={{ height: 250, mb: 3 }}
            />

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Timeline Tracker</Typography>
            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, mb: 4 }}>
              <Stepper activeStep={getActiveStep(selectedOrder.status)} alternativeLabel>
                {orderStages.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {timeline.length > 0 && (
                <Box mt={3}>
                  <Typography variant="subtitle2" color="textSecondary">Recent Events:</Typography>
                  {timeline.map(t => (
                    <Typography key={t.id} variant="caption" display="block">
                       - <b>{t.status}</b> by {t.created_by_name} at {new Date(t.timestamp || t.created_at).toLocaleString()}
                       {t.remarks ? ` (${t.remarks})` : ''}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>

            {/* Admin actions (Update status) */}
            {isAdmin && selectedOrder.status !== 'Cancelled' && selectedOrder.status !== 'Payment Complete' && (
              <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
                <Button variant="outlined" color="error" onClick={rejectOrder}>Cancel Order</Button>
                <Button variant="contained" color="primary" onClick={advanceStage}>Advance Stage</Button>
              </Stack>
            )}
          </Box>
        )}
      </Drawer>
    </Grid>
  );
}
