import { useState, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import { warehouseTransactions, products, formatINR } from 'data/ccsMock';

import SearchOutlined from '@ant-design/icons/SearchOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import ExportOutlined from '@ant-design/icons/ExportOutlined';
import ContainerOutlined from '@ant-design/icons/ContainerOutlined';
import InboxOutlined from '@ant-design/icons/InboxOutlined';
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';
import WarningOutlined from '@ant-design/icons/WarningOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined';
import ArrowDownOutlined from '@ant-design/icons/ArrowDownOutlined';

const txnColor = {
  Incoming: 'success',
  Outgoing: 'primary',
  Reserved: 'warning',
  Damaged: 'error',
  Return: 'secondary',
  Adjustment: 'info'
};

function TabPanel({ children, value, index }) {
  if (value !== index) return null;
  return <Box sx={{ pt: 2 }}>{children}</Box>;
}

export default function WarehousePage() {
  const [search, setSearch] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [filterType, setFilterType] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [ledgerPage, setLedgerPage] = useState(0);
  const [ledgerRows, setLedgerRows] = useState(25);

  const todayStr = '2025-07-27';
  const kpis = useMemo(() => {
    const incomingToday = warehouseTransactions.filter(t => t.date === todayStr && t.type === 'Incoming');
    const outgoingToday = warehouseTransactions.filter(t => t.date === todayStr && t.type === 'Outgoing');
    const damaged = warehouseTransactions.filter(t => t.type === 'Damaged');
    const totalStock = products.reduce((s, p) => s + p.stock, 0);
    const lowStock = products.filter(p => p.stock > 0 && p.stock <= p.reorderLevel).length;
    return {
      totalStock,
      inToday: incomingToday.reduce((s, t) => s + Math.abs(t.quantity), 0),
      inTodayValue: incomingToday.reduce((s, t) => s + t.value, 0),
      outToday: outgoingToday.reduce((s, t) => s + Math.abs(t.quantity), 0),
      outTodayValue: outgoingToday.reduce((s, t) => s + t.value, 0),
      damaged: damaged.reduce((s, t) => s + Math.abs(t.quantity), 0),
      lowStock
    };
  }, []);

  const inventoryRows = useMemo(() => {
    return products.map(p => ({
      id: p.id, sku: p.sku, name: p.name, category: p.category,
      stock: p.stock, reserved: p.reserved, damaged: p.damaged,
      reorder: p.reorderLevel, value: p.stock * p.dealerPrice,
      warehouse: 'Main Warehouse - Ahmedabad', status: p.status
    }));
  }, []);

  const filteredInventory = useMemo(() => {
    let rows = inventoryRows;
    if (filterType === 'Low Stock') rows = rows.filter(r => r.stock > 0 && r.stock <= r.reorder);
    if (filterType === 'Out of Stock') rows = rows.filter(r => r.stock === 0);
    if (filterType === 'Discontinued') rows = rows.filter(r => r.status === 'Discontinued');
    if (search) {
      const s = search.toLowerCase();
      rows = rows.filter(r => r.name.toLowerCase().includes(s) || r.sku.toLowerCase().includes(s) || r.category.toLowerCase().includes(s));
    }
    return rows;
  }, [inventoryRows, search, filterType]);

  const pagedInventory = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredInventory.slice(start, start + rowsPerPage);
  }, [filteredInventory, page, rowsPerPage]);

  const filterTxns = useMemo(() => {
    const typeMap = { 0: null, 1: 'Incoming', 2: 'Outgoing', 3: 'Reserved', 4: 'Damaged' };
    const t = typeMap[tabValue];
    let rows = t ? warehouseTransactions.filter(x => x.type === t) : warehouseTransactions;
    if (search) {
      const s = search.toLowerCase();
      rows = rows.filter(r => r.productName.toLowerCase().includes(s) || r.sku.toLowerCase().includes(s) || r.referenceNo.toLowerCase().includes(s));
    }
    return rows;
  }, [tabValue, search]);

  const pagedTxns = useMemo(() => {
    const start = page * rowsPerPage;
    return filterTxns.slice(start, start + rowsPerPage);
  }, [filterTxns, page, rowsPerPage]);

  const ledgerData = useMemo(() => {
    if (search) {
      const s = search.toLowerCase();
      return warehouseTransactions.filter(r => r.productName.toLowerCase().includes(s) || r.sku.toLowerCase().includes(s) || r.referenceNo.toLowerCase().includes(s));
    }
    return warehouseTransactions;
  }, [search]);

  const pagedLedger = useMemo(() => {
    const start = ledgerPage * ledgerRows;
    return ledgerData.slice(start, start + ledgerRows);
  }, [ledgerData, ledgerPage, ledgerRows]);

  const renderTxnTable = (rows, count, onPage, onRows, curPage, curRows) => (
    <>
      <TableContainer sx={{ width: '100%', overflowX: 'auto', '& td, & th': { whiteSpace: 'nowrap' } }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>SKU</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Batch</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Warehouse</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Qty</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Value</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Reference</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((t) => (
              <TableRow key={t.id} hover>
                <TableCell>{t.date}</TableCell>
                <TableCell>
                  <Chip label={t.type} size="small" color={txnColor[t.type]}
                    sx={{ height: 22, '& .MuiChip-label': { fontSize: '0.7rem', fontWeight: 600 } }} />
                </TableCell>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 600 }}>{t.sku}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{t.productName}</Typography>
                </TableCell>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{t.batchNo}</TableCell>
                <TableCell>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>{t.warehouse}</Typography>
                </TableCell>
                <TableCell align="right" sx={{ color: t.quantity >= 0 ? 'success.main' : 'error.main', fontWeight: 700 }}>
                  {t.quantity >= 0 ? '+' : ''}{t.quantity}
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>{formatINR(t.value)}</TableCell>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{t.referenceNo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider sx={{ mt: -0.5 }} />
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={count}
        rowsPerPage={curRows}
        page={curPage}
        onPageChange={onPage}
        onRowsPerPageChange={onRows}
        sx={{ mt: 1 }}
      />
    </>
  );

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid sx={{ mb: -1 }} size={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5">Warehouse & Inventory</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Manage stock, warehouse movements, and ledgers
            </Typography>
          </Box>
          <Stack direction="row" sx={{ gap: 1.25 }}>
            <Button size="small" variant="outlined" startIcon={<ExportOutlined />}>Export</Button>
            <Button size="small" variant="contained" startIcon={<PlusOutlined />}>Goods Inward (GRN)</Button>
          </Stack>
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Total Stock (Units)" count={kpis.totalStock.toLocaleString('en-IN')} icon={<ContainerOutlined />} color="primary" extra={`${products.length} SKUs`} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Incoming Today" count={kpis.inToday.toLocaleString('en-IN')} icon={<ArrowDownOutlined />} color="success" extra={formatINR(kpis.inTodayValue)} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Outgoing Today" count={kpis.outToday.toLocaleString('en-IN')} icon={<ArrowUpOutlined />} color="primary" extra={formatINR(kpis.outTodayValue)} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <Stack sx={{ gap: 2 }}>
          <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'error.light', bgcolor: 'error.50' }}>
            <CardContent sx={{ p: 1.5 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="caption" sx={{ color: 'error.dark', fontWeight: 700, fontSize: '0.68rem' }}>DAMAGED TOTAL</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'error.dark' }}>{kpis.damaged}</Typography>
                </Box>
                <WarningOutlined style={{ color: 'rgba(220,38,38,0.7)', fontSize: '1.4rem' }} />
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'warning.light', bgcolor: 'warning.50' }}>
            <CardContent sx={{ p: 1.5 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="caption" sx={{ color: 'warning.dark', fontWeight: 700, fontSize: '0.68rem' }}>LOW STOCK ITEMS</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'warning.dark' }}>{kpis.lowStock}</Typography>
                </Box>
                <InboxOutlined style={{ color: 'rgba(234,179,8,0.7)', fontSize: '1.4rem' }} />
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Grid>

      <Grid size={12}>
        <MainCard>
          <Stack sx={{ gap: 2 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} sx={{ gap: 2, justifyContent: 'space-between', alignItems: { md: 'center' } }}>
              <TextField
                size="small"
                placeholder="Search product, SKU, reference..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(0); setLedgerPage(0); }}
                sx={{ width: { xs: '100%', md: 360 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlined style={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                    </InputAdornment>
                  )
                }}
              />
              <Stack direction="row" sx={{ gap: 1 }}>
                <Button size="small" variant="outlined" startIcon={<ExportOutlined />}>Export CSV</Button>
                <Button size="small" variant="contained" startIcon={<PlusOutlined />}>New Transaction</Button>
              </Stack>
            </Stack>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={(e, v) => { setTabValue(v); setPage(0); }} variant="scrollable" scrollButtons="auto">
                <Tab label="Inventory" icon={<ContainerOutlined />} iconPosition="start" />
                <Tab label="Incoming" icon={<ArrowDownOutlined />} iconPosition="start" />
                <Tab label="Outgoing" icon={<ArrowUpOutlined />} iconPosition="start" />
                <Tab label="Reserved" icon={<ShoppingCartOutlined />} iconPosition="start" />
                <Tab label="Damaged" icon={<WarningOutlined />} iconPosition="start" />
                <Tab label="Stock Ledger" icon={<FileTextOutlined />} iconPosition="start" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Stack sx={{ gap: 2 }}>
                <RadioGroup row value={filterType} onChange={(e) => { setFilterType(e.target.value); setPage(0); }}>
                  <FormControlLabel value="All" control={<Radio size="small" />} label="All Products" />
                  <FormControlLabel value="Low Stock" control={<Radio size="small" />} label="Low Stock" />
                  <FormControlLabel value="Out of Stock" control={<Radio size="small" />} label="Out of Stock" />
                  <FormControlLabel value="Discontinued" control={<Radio size="small" />} label="Discontinued" />
                </RadioGroup>

                <Divider />

                <TableContainer sx={{ width: '100%', overflowX: 'auto', '& td, & th': { whiteSpace: 'nowrap' } }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>SKU</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Stock</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Reserved</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Damaged</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Reorder</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Value</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pagedInventory.map((r) => (
                        <TableRow key={r.id} hover>
                          <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 600 }}>{r.sku}</TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{r.name}</Typography>
                          </TableCell>
                          <TableCell>
                            <Chip label={r.category} size="small" variant="outlined"
                              sx={{ height: 20, '& .MuiChip-label': { fontSize: '0.65rem' } }} />
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: r.stock <= r.reorder ? 700 : 500, color: r.stock <= r.reorder ? 'warning.main' : 'inherit' }}>
                            {r.stock}
                          </TableCell>
                          <TableCell align="right">{r.reserved}</TableCell>
                          <TableCell align="right" sx={{ color: r.damaged > 0 ? 'error.main' : 'inherit' }}>{r.damaged}</TableCell>
                          <TableCell align="right">{r.reorder}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>{formatINR(r.value)}</TableCell>
                          <TableCell>
                            <Chip label={r.status} size="small"
                              color={r.status === 'Active' ? 'success' : r.status === 'Discontinued' ? 'error' : 'warning'}
                              sx={{ height: 22, '& .MuiChip-label': { fontSize: '0.7rem' } }} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Divider sx={{ mt: -0.5 }} />
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  component="div"
                  count={filteredInventory.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={(_, p) => setPage(p)}
                  onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
                  sx={{ mt: 1 }}
                />
              </Stack>
            </TabPanel>

            {[1, 2, 3, 4].map((idx) => (
              <TabPanel key={idx} value={tabValue} index={idx}>
                {renderTxnTable(
                  pagedTxns, filterTxns.length,
                  (_, p) => setPage(p),
                  (e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); },
                  page, rowsPerPage
                )}
              </TabPanel>
            ))}

            <TabPanel value={tabValue} index={5}>
              <MainCard title="Stock Ledger" subheader={`${warehouseTransactions.length} complete transactions`} content={false} sx={{ border: 0, boxShadow: 'none', p: 0 }}>
                {renderTxnTable(
                  pagedLedger, ledgerData.length,
                  (_, p) => setLedgerPage(p),
                  (e) => { setLedgerRows(parseInt(e.target.value, 10)); setLedgerPage(0); },
                  ledgerPage, ledgerRows
                )}
              </MainCard>
            </TabPanel>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
}
