import { useState, useEffect } from 'react';
import {
  Grid, Typography, Box, Stack, Button, Chip, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, IconButton
} from '@mui/material';
import MainCard from 'components/MainCard';
import api from 'api/client';
import useAuth from 'hooks/useAuth';
import { formatINR } from 'data/ccsMock';
import { PlusOutlined, UploadOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const statusColorMap = {
  Pending: 'warning',
  Approved: 'success',
  Rejected: 'error'
};

export default function ExpensesPage() {
  const { user } = useAuth();
  const isAdmin = ['Super Admin', 'Admin'].includes(user.role);
  
  const [expenses, setExpenses] = useState([]);
  const [open, setOpen] = useState(false);
  
  // Form state
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('Travel');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  
  const fetchExpenses = async () => {
    try {
      const res = await api.get('/hr/expenses/');
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmitExpense = async () => {
    if (!amount || isNaN(amount) || amount <= 0) return alert('Enter a valid amount');
    
    const formData = new FormData();
    formData.append('date', date);
    formData.append('category', category);
    formData.append('amount', amount);
    formData.append('description', description);
    
    // Simulate bill upload
    const mockFile = new File(["mock bill content"], "bill.pdf", { type: "application/pdf" });
    formData.append('bill', mockFile);

    try {
      await api.post('/hr/expenses/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setOpen(false);
      setAmount('');
      setDescription('');
      fetchExpenses();
      alert('Expense submitted successfully');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to submit expense');
    }
  };

  const handleAdminAction = async (id, action) => {
    try {
      await api.post(`/hr/expenses/${id}/${action}/`);
      fetchExpenses();
    } catch (err) {
      alert(`Failed to ${action} expense`);
    }
  };

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" flexWrap="wrap" gap={2}>
          <Box>
            <Typography variant="h5">{isAdmin ? 'Expense Approvals' : 'My Expenses'}</Typography>
            <Typography variant="body2" color="textSecondary">
              {isAdmin ? 'Review and approve employee expenses' : 'Submit and track your expense claims'}
            </Typography>
          </Box>
          {!isAdmin && (
            <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => setOpen(true)}>
              Claim Expense
            </Button>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <MainCard content={false}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  {isAdmin && <TableCell>Employee</TableCell>}
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Status</TableCell>
                  {isAdmin && <TableCell align="right">Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.date}</TableCell>
                    {isAdmin && <TableCell>{row.employee_name}</TableCell>}
                    <TableCell>{row.category}</TableCell>
                    <TableCell sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {row.description}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>{formatINR(row.amount)}</TableCell>
                    <TableCell>
                      <Chip label={row.status} size="small" color={statusColorMap[row.status]} />
                      {row.status !== 'Pending' && row.approved_by_name && (
                        <Typography variant="caption" display="block" color="textSecondary" sx={{ mt: 0.5 }}>
                          by {row.approved_by_name}
                        </Typography>
                      )}
                    </TableCell>
                    {isAdmin && (
                      <TableCell align="right">
                        {row.status === 'Pending' && (
                          <Stack direction="row" justifyContent="flex-end" gap={0.5}>
                            <IconButton size="small" color="success" onClick={() => handleAdminAction(row.id, 'approve')}>
                              <CheckOutlined />
                            </IconButton>
                            <IconButton size="small" color="error" onClick={() => handleAdminAction(row.id, 'reject')}>
                              <CloseOutlined />
                            </IconButton>
                          </Stack>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
                {expenses.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={isAdmin ? 7 : 6} align="center" sx={{ py: 3 }}>No expenses found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Claim Expense</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3}>
            <Stack direction="row" gap={2}>
              <TextField 
                label="Date" type="date" size="small" fullWidth
                value={date} onChange={e => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select value={category} label="Category" onChange={e => setCategory(e.target.value)}>
                  <MenuItem value="Fuel">Fuel</MenuItem>
                  <MenuItem value="Food">Food</MenuItem>
                  <MenuItem value="Hotel">Hotel</MenuItem>
                  <MenuItem value="Travel">Travel</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            
            <TextField 
              label="Amount (₹)" type="number" size="small" fullWidth
              value={amount} onChange={e => setAmount(e.target.value)}
            />
            
            <TextField 
              label="Description / Purpose" multiline rows={3} fullWidth
              value={description} onChange={e => setDescription(e.target.value)}
            />
            
            <Button variant="outlined" startIcon={<UploadOutlined />} component="label" fullWidth>
              Upload Bill / Receipt
              <input type="file" hidden />
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitExpense}>Submit Claim</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
