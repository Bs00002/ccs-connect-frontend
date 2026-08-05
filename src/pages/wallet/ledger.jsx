import { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent, Stack, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button } from '@mui/material';
import MainCard from 'components/MainCard';
import { formatINR } from 'data/ccsMock';
import api from 'api/client';
import useAuth from 'hooks/useAuth';
import { WalletOutlined, DollarOutlined, HistoryOutlined } from '@ant-design/icons';

const MetricCard = ({ title, count, icon, color }) => (
  <Card sx={{ bgcolor: `${color}.lighter`, color: `${color}.main`, height: '100%' }}>
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="subtitle1" color="textSecondary">{title}</Typography>
          <Typography variant="h4" color="textPrimary" sx={{ mt: 1 }}>{count}</Typography>
        </Box>
        <Box sx={{ fontSize: '2.5rem', opacity: 0.8 }}>{icon}</Box>
      </Stack>
    </CardContent>
  </Card>
);

export default function LedgerPage() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const res = await api.get('/wallets/my_wallet/');
      setWallet(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!wallet) return <Typography color="error">Wallet not configured for this account.</Typography>;

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Typography variant="h5">My Ledger</Typography>
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <MetricCard title="Credit Limit" count={formatINR(wallet.credit_limit)} icon={<WalletOutlined />} color="primary" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MetricCard title="Outstanding Amount" count={formatINR(wallet.outstanding_amount)} icon={<DollarOutlined />} color="error" />
      </Grid>

      <Grid item xs={12}>
        <MainCard title="Ledger History" secondary={<HistoryOutlined />}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Reference</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wallet.ledger_entries?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{new Date(row.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Chip label={row.type} color={row.type === 'Collection' ? 'success' : 'error'} size="small" />
                    </TableCell>
                    <TableCell>{row.reference || '-'}</TableCell>
                    <TableCell align="right">{formatINR(row.amount)}</TableCell>
                  </TableRow>
                ))}
                {!wallet.ledger_entries?.length && <TableRow><TableCell colSpan={4} align="center">No transactions</TableCell></TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </Grid>
    </Grid>
  );
}
