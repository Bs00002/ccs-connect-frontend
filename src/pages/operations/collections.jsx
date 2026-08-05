import { useMemo, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Divider from '@mui/material/Divider';

import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

import WalletOutlined from '@ant-design/icons/WalletOutlined';
import SafetyOutlined from '@ant-design/icons/SafetyOutlined';
import CloudSyncOutlined from '@ant-design/icons/CloudSyncOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import InboxOutlined from '@ant-design/icons/InboxOutlined';
import CheckSquareOutlined from '@ant-design/icons/CheckSquareOutlined';

import { formatINR } from 'data/ccsMock';
import api from 'api/client';

const TABS = ['All', 'Collection', 'Adjustment', 'Payment'];

const MODE_COLOR = {
  Cash: 'success',
  Cheque: 'warning',
  NEFT: 'primary',
  RTGS: 'info',
  UPI: 'secondary',
  DD: 'default',
  Card: 'inherit'
};

export default function CollectionsPage() {
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCollections = async () => {
    setLoading(true);
    try {
      const res = await api.get('/wallet/ledger/');
      const mapped = res.data.map(c => ({
        id: c.id,
        receiptNo: `REC-${c.id}`,
        date: new Date(c.created_at).toLocaleDateString(),
        amount: parseFloat(c.amount),
        type: c.type,
        referenceNo: c.reference || '-',
        collectedBy: c.created_by_name || 'System',
        mode: c.payment ? c.payment.method : 'N/A'
      }));
      setCollections(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const filtered = useMemo(() => {
    if (tab === 0) return collections;
    return collections.filter((c) => c.type === TABS[tab]);
  }, [tab, collections]);

  const kpis = useMemo(() => {
    const monthCollected = collections.reduce((s, c) => s + (c.amount || 0), 0);
    const byMode = { Cash: 0, Cheque: 0, NEFT: 0, RTGS: 0, UPI: 0, DD: 0, Card: 0, 'N/A': 0 };
    collections.forEach((c) => { 
      if (byMode[c.mode] !== undefined) byMode[c.mode] += c.amount; 
      else byMode['N/A'] += c.amount;
    });
    return { monthCollected, byMode };
  }, [collections]);

  const pageData = useMemo(
    () => filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filtered, page, rowsPerPage]
  );

  return (
    <Stack spacing={2.75}>
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>Collections &amp; Payments</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Track receipts, bank deposits and clearance status
            </Typography>
          </Box>
          <Stack direction="row" sx={{ gap: 1 }}>
            <Button variant="contained" startIcon={<WalletOutlined />}>New Receipt</Button>
            <Button variant="outlined" startIcon={<CloudSyncOutlined />}>Bank Reconcile</Button>
          </Stack>
        </Stack>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <AnalyticEcommerce
            title="Total Handled"
            count={formatINR(kpis.monthCollected).replace('₹', '')}
            prefix="₹"
            color="success"
            icon={<WalletOutlined />}
            percentage={14.7}
          />
        </Grid>
        
        <Grid size={12}>
          <MainCard title="Mode-wise Summary">
            <Grid container spacing={2}>
              {Object.entries(kpis.byMode).filter(([_, amt]) => amt > 0).map(([mode, amt]) => (
                <Grid key={mode} size={{ xs: 6, sm: 4, md: 2 }}>
                  <Box sx={{ p: 2, bgcolor: `${MODE_COLOR[mode] || 'info'}.lighter`, borderRadius: 1.5, textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: `${MODE_COLOR[mode] || 'info'}.dark`, fontWeight: 600 }}>{mode}</Typography>
                    <Typography variant="h6" sx={{ mt: 0.5, fontWeight: 700, color: `${MODE_COLOR[mode] || 'info'}.dark` }}>
                      {formatINR(amt)}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </MainCard>
        </Grid>
      </Grid>

      <MainCard>
        <Stack direction="row" justifyContent="space-between" sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => { setTab(v); setPage(0); }}
            variant="scrollable"
            scrollButtons="auto"
          >
            {TABS.map((t) => (
              <Tab key={t} label={t} />
            ))}
          </Tabs>
          <Chip label={`${filtered.length} records`} variant="outlined" size="small" />
        </Stack>
        <Divider sx={{ my: 1 }} />
        <TableContainer>
          <Table size="small" sx={{ minWidth: 1000 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Receipt No</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600, align: 'right' }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Mode</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Reference</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Collected By</TableCell>
                <TableCell sx={{ fontWeight: 600, align: 'right' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageData.map((row) => (
                <TableRow key={row.id} hover sx={{ '& > td': { py: 1.25 } }}>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>{row.receiptNo}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>{formatINR(row.amount)}</TableCell>
                  <TableCell>
                    <Chip label={row.mode} color={MODE_COLOR[row.mode] || 'info'} size="small" variant="combined" />
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem', maxWidth: 180 }}>
                    <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.referenceNo}</Box>
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{row.collectedBy}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end" sx={{ gap: 0.5 }}>
                      <Button size="small" variant="text" color="primary" startIcon={<FileTextOutlined />} sx={{ minWidth: 'auto', px: 1 }}>Receipt</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(0); }}
          rowsPerPageOptions={[8, 16, 25, 50]}
        />
      </MainCard>
    </Stack>
  );
}
