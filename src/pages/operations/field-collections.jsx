import React, { useState, useEffect } from 'react';
import {
  Grid, Typography, Box, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment
} from '@mui/material';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import { CameraOutlined, PlusOutlined } from '@ant-design/icons';
import { formatINR } from 'data/ccsMock';
import api from 'api/client';
import { addTimelineEvent } from 'utils/daily-working';

export default function FieldCollections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog
  const [open, setOpen] = useState(false);
  const [dealers, setDealers] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState('');
  const [invoice, setInvoice] = useState('');
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState('Cash');
  const [receiptCaptured, setReceiptCaptured] = useState(false);

  useEffect(() => {
    // Mock fetch
    setLoading(true);
    setTimeout(() => {
      setCollections([
        { id: 1, dealer: 'Kisan Agro', invoice: 'INV-2023-001', amount: 45000, mode: 'Cash', receipt: 'Uploaded' },
        { id: 2, dealer: 'Green Field', invoice: 'INV-2023-005', amount: 12000, mode: 'UPI', receipt: 'Uploaded' }
      ]);
      setDealers([
        { id: 1, name: 'Kisan Agro' },
        { id: 2, name: 'Green Field' }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleSubmit = () => {
    if (!selectedDealer || !amount || !mode) {
      alert("Please fill required fields.");
      return;
    }
    
    addTimelineEvent('Collection', {
      dealer: dealers.find(d => d.id === selectedDealer)?.name || selectedDealer,
      amount: parseFloat(amount),
      remarks: `Mode: ${mode} - Inv: ${invoice}`,
      photo: receiptCaptured ? 'receipt.jpg' : null,
      status: 'Completed'
    });

    setCollections([{
      id: Math.random(),
      dealer: dealers.find(d => d.id === selectedDealer)?.name || selectedDealer,
      invoice: invoice || '-',
      amount: parseFloat(amount),
      mode,
      receipt: receiptCaptured ? 'Uploaded' : '-'
    }, ...collections]);

    setOpen(false);
    setSelectedDealer('');
    setInvoice('');
    setAmount('');
    setMode('Cash');
    setReceiptCaptured(false);
  };

  const columns = [
    { field: 'dealer', headerName: 'Dealer', flex: 1.5, minWidth: 150 },
    { field: 'invoice', headerName: 'Invoice', flex: 1, minWidth: 120 },
    { field: 'amount', headerName: 'Amount', flex: 1, minWidth: 120, renderCell: (params) => (
      <Typography fontWeight={600} color="success.main">{formatINR(params.value)}</Typography>
    )},
    { field: 'mode', headerName: 'Mode', flex: 1, minWidth: 100 },
    { field: 'receipt', headerName: 'Receipt', flex: 1, minWidth: 100, renderCell: (params) => (
      params.value === 'Uploaded' ? <CameraOutlined style={{ color: '#52c41a' }} /> : '-'
    )}
  ];

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
          <Box>
            <Typography variant="h5">Collections</Typography>
            <Typography variant="body2" color="textSecondary">Manage all payment collections from dealers.</Typography>
          </Box>
          <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => setOpen(true)}>
            Collect Payment
          </Button>
        </Stack>
      </Grid>
      
      <Grid item xs={12}>
        <Box sx={{ height: 600 }}>
          <EnterpriseTable rows={collections} columns={columns} loading={loading} />
        </Box>
      </Grid>

      {/* Collect Payment Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Collect Payment</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Select Dealer</InputLabel>
              <Select value={selectedDealer} label="Select Dealer" onChange={e => setSelectedDealer(e.target.value)}>
                {dealers.map(d => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)}
              </Select>
            </FormControl>
            
            <TextField 
              label="Invoice Number (Optional)" fullWidth size="small"
              value={invoice} onChange={e => setInvoice(e.target.value)}
            />

            <TextField 
              label="Amount" type="number" fullWidth size="small"
              value={amount} onChange={e => setAmount(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
            />

            <FormControl fullWidth size="small">
              <InputLabel>Payment Mode</InputLabel>
              <Select value={mode} label="Payment Mode" onChange={e => setMode(e.target.value)}>
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="UPI">UPI</MenuItem>
                <MenuItem value="Cheque">Cheque</MenuItem>
                <MenuItem value="Bank">Bank Transfer</MenuItem>
              </Select>
            </FormControl>

            <Box>
              <Typography variant="subtitle2" gutterBottom>Upload Receipt / Cheque</Typography>
              {!receiptCaptured ? (
                <Button variant="outlined" color="primary" startIcon={<CameraOutlined />} fullWidth onClick={() => setReceiptCaptured(true)}>
                  Capture Document
                </Button>
              ) : (
                <Box sx={{ p: 1, border: '1px dashed green', textAlign: 'center', borderRadius: 1, bgcolor: 'success.lighter' }}>
                  <Typography variant="caption" display="block" color="success.dark">Document Captured</Typography>
                </Box>
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} color="success">
            Submit Collection
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
