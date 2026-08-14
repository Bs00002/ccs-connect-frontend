import { useMemo, useState, useEffect } from 'react';
import { Grid, Box, Stack, Typography, Button, Tabs, Tab, Chip, Divider, Drawer, IconButton } from '@mui/material';

import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import DataTable from 'components/DataTable';

import { formatINR } from 'data/ccsMock';
import api from 'api/client';
import { 
  WalletOutlined, CloudSyncOutlined, CloseOutlined, FileTextOutlined, CheckCircleOutlined, SyncOutlined 
} from '@ant-design/icons';
import { IndianRupee, Eye, CheckCircle2 } from 'lucide-react';

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
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

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
        mode: c.payment ? c.payment.method : 'N/A',
        status: 'Pending' // mock status
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

  const openDrawer = (record) => {
    setSelectedRecord(record);
    setDrawerOpen(true);
  };

  const handleApprove = () => {
    alert(`Approved receipt ${selectedRecord.receiptNo}`);
    setDrawerOpen(false);
  };

  const columns = [
    { field: 'receiptNo', headerName: 'Receipt No', flex: 1, minWidth: 120, renderCell: (params) => (
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
        <Typography color="primary" fontWeight={600} sx={{ cursor: 'pointer' }} onClick={() => openDrawer(params.row)}>
          {params.value}
        </Typography>
      </Box>
    )},
    { field: 'date', headerName: 'Date', flex: 1, minWidth: 120 },
    { field: 'type', headerName: 'Type', flex: 1, minWidth: 120 },
    { field: 'amount', headerName: 'Amount', flex: 1, minWidth: 120, renderCell: (params) => (
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
        <Typography fontWeight={700}>{formatINR(params.value)}</Typography>
      </Box>
    )},
    { field: 'mode', headerName: 'Mode', flex: 1, minWidth: 120, renderCell: (params) => (
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
        <Chip label={params.value} color={MODE_COLOR[params.value] || 'info'} size="small" variant="outlined" />
      </Box>
    )},
    { field: 'referenceNo', headerName: 'Reference', flex: 1, minWidth: 150, renderCell: (params) => (
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        <Typography variant="caption" fontFamily="monospace">{params.value}</Typography>
      </Box>
    )},
    { field: 'collectedBy', headerName: 'Collected By', flex: 1.5, minWidth: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 100,
      align: 'center',
      renderCell: (params) => (
        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
          <IconButton size="small" color="primary" onClick={() => openDrawer(params.row)}>
            <Eye size={18} />
          </IconButton>
        </Stack>
      )
    }
  ];

  return (
    <Stack spacing={3}>
      <Grid container rowSpacing={3} columnSpacing={2.75}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>Collections & Payments</Typography>
              <Typography variant="body2" color="textSecondary">
                Track receipts, bank deposits and clearance status
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Button variant="contained" startIcon={<WalletOutlined />}>New Receipt</Button>
              <Button variant="outlined" startIcon={<CloudSyncOutlined />}>Bank Reconcile</Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <AnalyticEcommerce
            title="Total Handled"
            count={formatINR(kpis.monthCollected).replace('₹', '')}
            prefix="₹"
            color="success"
            icon={<IndianRupee size={20} />}
          />
        </Grid>
        
        <Grid item xs={12} md={9}>
          <MainCard title="Mode-wise Summary">
            <Grid container spacing={2}>
              {Object.entries(kpis.byMode).filter(([_, amt]) => amt > 0).map(([mode, amt]) => (
                <Grid key={mode} item xs={6} sm={4} md={2.4}>
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

      <MainCard content={false}>
        <Box sx={{ px: 2, pt: 2 }}>
          <Stack direction="row" justifyContent="space-between" sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              variant="scrollable"
              scrollButtons="auto"
            >
              {TABS.map((t) => (
                <Tab key={t} label={t} />
              ))}
            </Tabs>
            <Chip label={`${filtered.length} records`} variant="outlined" size="small" />
          </Stack>
        </Box>
        <Divider />
        <DataTable 
          rows={filtered}
          columns={columns}
          loading={loading}
        />
      </MainCard>

      {/* Detail & Approval Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: { xs: '100%', sm: 500 }, bgcolor: '#F8FAFC' } }}
      >
        {selectedRecord && (
          <Box sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                <Box>
                  <Typography variant="h5">{selectedRecord.receiptNo}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>{selectedRecord.date}</Typography>
                </Box>
                <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'white' }}><CloseOutlined /></IconButton>
              </Stack>
            </Box>

            <Box sx={{ p: 3, flex: 1, overflowY: 'auto' }}>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12}>
                  <MainCard content={false} sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.lighter', borderColor: 'primary.light' }}>
                    <Typography variant="subtitle2" color="primary.main" textTransform="uppercase">Amount</Typography>
                    <Typography variant="h3" fontWeight={700} color="primary.main" mt={1}>{formatINR(selectedRecord.amount)}</Typography>
                    <Chip label={selectedRecord.mode} color={MODE_COLOR[selectedRecord.mode] || 'info'} sx={{ mt: 2 }} />
                  </MainCard>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="textSecondary">Collected By</Typography>
                  <Typography variant="body1" fontWeight={600}>{selectedRecord.collectedBy}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="textSecondary">Type</Typography>
                  <Typography variant="body1" fontWeight={600}>{selectedRecord.type}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="textSecondary">Reference / Transaction No</Typography>
                  <Typography variant="body1" fontFamily="monospace" sx={{ p: 1, bgcolor: 'grey.100', borderRadius: 1, mt: 0.5 }}>
                    {selectedRecord.referenceNo}
                  </Typography>
                </Grid>
              </Grid>

              <MainCard title="Reconciliation Status" sx={{ mb: 4 }}>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <SyncOutlined style={{ fontSize: 20, color: 'orange' }} spin />
                    <Box>
                      <Typography variant="subtitle2">Pending Bank Clearance</Typography>
                      <Typography variant="caption" color="textSecondary">Waiting for funds to reflect in account</Typography>
                    </Box>
                  </Box>
                </Stack>
              </MainCard>
            </Box>

            {/* Admin actions matching Spec */}
            <Box sx={{ p: 3, bgcolor: 'white', borderTop: '1px solid', borderColor: 'divider' }}>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" color="primary" fullWidth startIcon={<FileTextOutlined />}>Download Receipt</Button>
                <Button variant="contained" color="success" fullWidth startIcon={<CheckCircle2 size={16} />} onClick={handleApprove}>Approve & Reconcile</Button>
              </Stack>
            </Box>
          </Box>
        )}
      </Drawer>
    </Stack>
  );
}
