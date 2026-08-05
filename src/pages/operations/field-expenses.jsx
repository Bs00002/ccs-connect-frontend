import React, { useState, useEffect } from 'react';
import {
  Grid, Typography, Box, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment, Chip
} from '@mui/material';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import { CameraOutlined, PlusOutlined } from '@ant-design/icons';
import { formatINR } from 'data/ccsMock';
import { addTimelineEvent } from 'utils/daily-working';

export default function FieldExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [billCaptured, setBillCaptured] = useState(false);

  useEffect(() => {
    // Mock fetch
    setLoading(true);
    setTimeout(() => {
      setExpenses([
        { id: 1, category: 'Travel (Bus/Train)', amount: 450, bill: 'Uploaded', status: 'Approved' },
        { id: 2, category: 'Food', amount: 200, bill: 'Uploaded', status: 'Pending' }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleSubmit = () => {
    if (!category || !amount) {
      alert("Please fill required fields.");
      return;
    }
    
    addTimelineEvent('Expense', {
      dealer: '-',
      amount: parseFloat(amount),
      remarks: `${category} - ${remark}`,
      photo: billCaptured ? 'bill.jpg' : null,
      status: 'Completed'
    });

    setExpenses([{
      id: Math.random(),
      category,
      amount: parseFloat(amount),
      bill: billCaptured ? 'Uploaded' : '-',
      status: 'Pending'
    }, ...expenses]);

    setOpen(false);
    setCategory('');
    setAmount('');
    setRemark('');
    setBillCaptured(false);
  };

  const columns = [
    { field: 'category', headerName: 'Expense Category', flex: 1.5, minWidth: 150 },
    { field: 'amount', headerName: 'Amount', flex: 1, minWidth: 120, renderCell: (params) => (
      <Typography fontWeight={600} color="error.main">{formatINR(params.value)}</Typography>
    )},
    { field: 'bill', headerName: 'Bill', flex: 1, minWidth: 100, renderCell: (params) => (
      params.value === 'Uploaded' ? <CameraOutlined style={{ color: '#52c41a' }} /> : '-'
    )},
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 120, renderCell: (params) => (
      <Chip label={params.value} size="small" color={params.value === 'Approved' ? 'success' : 'warning'} />
    )}
  ];

  const categories = [
    'Travel (Bus/Train/Cab/Auto)',
    'Fuel / Mileage',
    'Food',
    'Hotel / Stay',
    'Phone / Internet',
    'Courier / Postage',
    'Stationery / Photocopy',
    'Miscellaneous'
  ];

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
          <Box>
            <Typography variant="h5">Expenses</Typography>
            <Typography variant="body2" color="textSecondary">Log your daily expenses for approval.</Typography>
          </Box>
          <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => setOpen(true)}>
            Add Expense
          </Button>
        </Stack>
      </Grid>
      
      <Grid item xs={12}>
        <Box sx={{ height: 600 }}>
          <EnterpriseTable rows={expenses} columns={columns} loading={loading} />
        </Box>
      </Grid>

      {/* Add Expense Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Expense</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Expense Category</InputLabel>
              <Select value={category} label="Expense Category" onChange={e => setCategory(e.target.value)}>
                {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
            </FormControl>
            
            <TextField 
              label="Amount" type="number" fullWidth size="small"
              value={amount} onChange={e => setAmount(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
            />

            <TextField 
              label="Remarks (Optional)" fullWidth size="small" multiline rows={2}
              value={remark} onChange={e => setRemark(e.target.value)}
            />

            <Box>
              <Typography variant="subtitle2" gutterBottom>Upload Bill / Receipt</Typography>
              {!billCaptured ? (
                <Button variant="outlined" color="primary" startIcon={<CameraOutlined />} fullWidth onClick={() => setBillCaptured(true)}>
                  Capture Bill
                </Button>
              ) : (
                <Box sx={{ p: 1, border: '1px dashed green', textAlign: 'center', borderRadius: 1, bgcolor: 'success.lighter' }}>
                  <Typography variant="caption" display="block" color="success.dark">Bill Captured</Typography>
                </Box>
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            Submit Expense
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
