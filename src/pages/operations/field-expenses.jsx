import React, { useState, useEffect } from 'react';
import {
  Grid, Typography, Box, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment, Chip, Paper, IconButton
} from '@mui/material';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import MainCard from 'components/MainCard';
import { CameraOutlined, PlusOutlined, DollarOutlined, ClockCircleOutlined, CheckCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { formatINR } from 'data/ccsMock';

export default function FieldExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [rideKm, setRideKm] = useState('');
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [billCaptured, setBillCaptured] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setExpenses([
        { id: 1, category: 'Bike Fuel', rideKm: '40 km', amount: 350, date: 'Today', bill: 'Uploaded', status: 'Pending', remarks: 'Dealer visits in Palanpur' },
        { id: 2, category: 'Field Meal', rideKm: '-', amount: 200, date: 'Yesterday', bill: 'Uploaded', status: 'Approved', remarks: 'Lunch expense during client meeting' }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleSubmit = () => {
    if (!category || !amount) {
      alert("Please fill required fields (Type and Amount).");
      return;
    }
    
    setExpenses([{
      id: Math.random(),
      category,
      rideKm: rideKm ? `${rideKm} km` : '-',
      amount: parseFloat(amount),
      date: 'Today',
      remarks: remark || '-',
      bill: billCaptured ? 'Uploaded' : '-',
      status: 'Pending'
    }, ...expenses]);

    setOpen(false);
    setCategory('');
    setRideKm('');
    setAmount('');
    setRemark('');
    setBillCaptured(false);
  };

  const columns = [
    { field: 'category', headerName: 'Expense Type', flex: 1.4, minWidth: 140, renderCell: (params) => <Typography fontWeight={700} color="#101828">{params.value}</Typography> },
    { field: 'rideKm', headerName: 'Travel (KM)', flex: 1, minWidth: 100, renderCell: (params) => <Typography variant="body2" color="textSecondary">{params.value}</Typography> },
    { field: 'amount', headerName: 'Amount', flex: 1.2, minWidth: 120, renderCell: (params) => (
      <Typography fontWeight={800} color="#d32f2f">{formatINR(params.value)}</Typography>
    )},
    { field: 'date', headerName: 'Date', flex: 1, minWidth: 100, renderCell: (params) => <Typography variant="body2" color="textSecondary">{params.value}</Typography> },
    { field: 'bill', headerName: 'Receipt', flex: 1, minWidth: 110, renderCell: (params) => (
      params.value === 'Uploaded' ? (
        <Chip label="Receipt Attached" size="small" color="success" variant="outlined" icon={<CameraOutlined />} sx={{ fontWeight: 600, height: 24, fontSize: '0.72rem' }} />
      ) : '-'
    )},
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 120, renderCell: (params) => (
      <Chip label={params.value} size="small" color={params.value === 'Approved' ? 'success' : 'warning'} sx={{ fontWeight: 700, height: 24, fontSize: '0.72rem' }} />
    )},
    { field: 'action', headerName: 'Action', flex: 0.8, minWidth: 90, renderCell: () => (
      <IconButton size="small" color="success"><EyeOutlined /></IconButton>
    )}
  ];

  const categories = ['Bike Fuel', 'Car Fuel', 'Bus Travel', 'Train Travel', 'Field Meal', 'Other'];
  const isTravel = ['Bike Fuel', 'Car Fuel', 'Bus Travel', 'Train Travel'].includes(category);

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      {/* Header */}
      <Grid item xs={12}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={2}>
          <Box>
            <Typography variant="h4" fontWeight={800} color="#101828" sx={{ letterSpacing: '-0.5px' }}>
              My Expenses
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 0.2 }}>
              Track your field travel and daily expenses.
            </Typography>
          </Box>
          <Button variant="contained" color="success" startIcon={<PlusOutlined />} onClick={() => setOpen(true)} sx={{ fontWeight: 800, px: 3, py: 1, boxShadow: 'none' }}>
            + Add Expense
          </Button>
        </Stack>
      </Grid>

      {/* KPI Cards Row */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #eaecf0', borderRadius: 2 }}>
          <Typography variant="caption" fontWeight={700} color="textSecondary">TOTAL EXPENSES</Typography>
          <Typography variant="h4" fontWeight={800} color="#101828" sx={{ mt: 0.5 }}>₹550</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #ffe0b2', bgcolor: '#fff8e1', borderRadius: 2 }}>
          <Typography variant="caption" fontWeight={700} color="#f57f17">PENDING APPROVAL</Typography>
          <Typography variant="h4" fontWeight={800} color="#e65100" sx={{ mt: 0.5 }}>₹350</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #c8e6c9', bgcolor: '#e8f5e9', borderRadius: 2 }}>
          <Typography variant="caption" fontWeight={700} color="#2e7d32">APPROVED</Typography>
          <Typography variant="h4" fontWeight={800} color="#1b5e20" sx={{ mt: 0.5 }}>₹200</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #c5cae9', bgcolor: '#e8eaf6', borderRadius: 2 }}>
          <Typography variant="caption" fontWeight={700} color="#283593">LOGGED THIS MONTH</Typography>
          <Typography variant="h4" fontWeight={800} color="#1a237e" sx={{ mt: 0.5 }}>2 Items</Typography>
        </Paper>
      </Grid>
      
      {/* Table Section */}
      <Grid item xs={12}>
        <MainCard title="Expense History Table" content={false}>
          <EnterpriseTable rows={expenses} columns={columns} loading={loading} />
        </MainCard>
      </Grid>

      {/* Add Expense Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Add New Expense Log</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} py={1}>
            <FormControl fullWidth size="small">
              <InputLabel>Expense Category</InputLabel>
              <Select value={category} label="Expense Category" onChange={e => setCategory(e.target.value)}>
                {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
            </FormControl>
            
            {isTravel && (
              <TextField 
                label="Total Ride KM" type="number" fullWidth size="small"
                value={rideKm} onChange={e => setRideKm(e.target.value)}
                InputProps={{ endAdornment: <InputAdornment position="end">km</InputAdornment> }}
              />
            )}

            <TextField 
              label="Expense Amount" type="number" fullWidth size="small"
              value={amount} onChange={e => setAmount(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
            />

            <TextField 
              label="Remarks / Purpose" fullWidth size="small" multiline rows={2}
              placeholder="Add details about this expense..."
              value={remark} onChange={e => setRemark(e.target.value)}
            />

            <Box>
              <Typography variant="subtitle2" fontWeight={700} gutterBottom>Upload Receipt / Bill (Optional)</Typography>
              {!billCaptured ? (
                <Button variant="outlined" color="success" startIcon={<CameraOutlined />} fullWidth onClick={() => setBillCaptured(true)} sx={{ py: 1.2, fontWeight: 700 }}>
                  Capture / Attach Bill
                </Button>
              ) : (
                <Paper elevation={0} sx={{ p: 1.5, border: '1px solid #a5d6a7', textAlign: 'center', borderRadius: 1.5, bgcolor: '#e8f5e9' }}>
                  <Typography variant="caption" display="block" color="#2e7d32" fontWeight={800}>
                    ✓ Receipt Attached successfully.
                  </Typography>
                </Paper>
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setOpen(false)} color="inherit">Cancel</Button>
          <Button variant="contained" color="success" onClick={handleSubmit} sx={{ fontWeight: 800, px: 3 }}>
            Submit Expense
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}


