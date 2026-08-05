import { useState, useEffect } from 'react';
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import MainCard from 'components/MainCard';
import { formatINR } from 'data/ccsMock';
import api from 'api/client';

export default function CollectionsPage() {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  
  const [form, setForm] = useState({ amount: '', reference: '', notes: '' });

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    try {
      const res = await api.get('/wallets/');
      setWallets(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (wallet) => {
    setSelectedWallet(wallet);
    setForm({ amount: '', reference: '', notes: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedWallet(null);
  };

  const handleSubmit = async () => {
    try {
      await api.post(`/wallets/${selectedWallet.id}/add_collection/`, form);
      fetchWallets();
      handleClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add collection.");
    }
  };

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5">Dealer Collections & Wallets</Typography>
      </Grid>

      <Grid item xs={12}>
        <MainCard content={false}>
          {loading ? <Typography p={3}>Loading...</Typography> : 
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Dealer</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">Credit Limit</TableCell>
                  <TableCell align="right">Outstanding</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wallets.map((w) => (
                  <TableRow key={w.id}>
                    <TableCell>{w.dealer_name}</TableCell>
                    <TableCell>{w.dealer_email}</TableCell>
                    <TableCell align="right">{formatINR(w.credit_limit)}</TableCell>
                    <TableCell align="right">
                      <Typography color={w.outstanding_amount > w.credit_limit ? 'error' : 'textPrimary'}>
                        {formatINR(w.outstanding_amount)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="outlined" size="small" onClick={() => handleOpen(w)}>Add Collection</Button>
                    </TableCell>
                  </TableRow>
                ))}
                {!wallets.length && <TableRow><TableCell colSpan={5} align="center">No wallets found</TableCell></TableRow>}
              </TableBody>
            </Table>
          </TableContainer>}
        </MainCard>
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Collection for {selectedWallet?.dealer_name}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Amount" 
                type="number"
                value={form.amount} 
                onChange={(e) => setForm({...form, amount: e.target.value})} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Reference (e.g. UTR Number)" 
                value={form.reference} 
                onChange={(e) => setForm({...form, reference: e.target.value})} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                multiline
                rows={2}
                label="Notes" 
                value={form.notes} 
                onChange={(e) => setForm({...form, notes: e.target.value})} 
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={!form.amount}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
