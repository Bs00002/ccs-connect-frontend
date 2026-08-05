import { useState, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import MainCard from 'components/MainCard';
import { products, warehouseTransactions, formatINR } from 'data/ccsMock';

import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import PrinterOutlined from '@ant-design/icons/PrinterOutlined';
import FilePdfOutlined from '@ant-design/icons/FilePdfOutlined';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import ContainerOutlined from '@ant-design/icons/ContainerOutlined';
import InboxOutlined from '@ant-design/icons/InboxOutlined';
import WarningOutlined from '@ant-design/icons/WarningOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';
import TagOutlined from '@ant-design/icons/TagOutlined';
import CheckSquareOutlined from '@ant-design/icons/CheckSquareOutlined';
import HistoryOutlined from '@ant-design/icons/HistoryOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';

function TabPanel({ children, value, index }) {
  if (value !== index) return null;
  return <Box sx={{ pt: 3 }}>{children}</Box>;
}

const warehouseNames = [
  'Main Warehouse - Ahmedabad',
  'Regional Warehouse - Rajkot',
  'Regional Warehouse - Nagpur',
  'Regional Warehouse - Amritsar',
  'Regional Warehouse - Jaipur'
];

const txnStatusColor = {
  Incoming: 'success',
  Outgoing: 'primary',
  Reserved: 'warning',
  Damaged: 'error',
  Return: 'secondary',
  Adjustment: 'info'
};

export default function ProductDetailPage() {
  const product = products[1];
  const [tabValue, setTabValue] = useState(0);

  const productTxns = useMemo(() => {
    return warehouseTransactions.filter(t => t.productId === product.id);
  }, [product.id]);

  const stockPerWarehouse = useMemo(() => {
    const split = Math.floor(product.stock / warehouseNames.length);
    const rem = product.stock - split * warehouseNames.length;
    return warehouseNames.map((w, i) => ({
      name: w,
      stock: split + (i === 0 ? rem : 0),
      reserved: Math.floor((product.reserved / warehouseNames.length) * (i + 1) / 2),
      damaged: i === 0 ? product.damaged : 0,
      reorderLevel: Math.floor(product.reorderLevel / warehouseNames.length)
    }));
  }, [product]);

  const timeline = [
    { title: 'Product Created', desc: 'New SKU created in master', time: '2024-08-15 11:20', by: 'Admin', color: 'primary' },
    { title: 'First Stock Inward', desc: 'GRN-2341 - 2,500 units received', time: '2024-09-02 14:30', by: 'Warehouse', color: 'success' },
    { title: 'Price Updated', desc: 'MRP revised from ₹780 to ₹890', time: '2024-12-10 09:45', by: 'Accounts', color: 'warning' },
    { title: 'Batch Expiring', desc: 'Batch B2024-185 expiring in 30 days', time: '2025-06-27 08:00', by: 'System', color: 'error' }
  ];

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid size={12}>
        <Stack direction="row" sx={{ gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <IconButton size="small" sx={{ border: 1, borderColor: 'divider', borderRadius: 1.5 }}>
            <ArrowLeftOutlined />
          </IconButton>
          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
              <Typography variant="h5">{product.name}</Typography>
              <Chip label={product.category} size="small" color="primary" variant="outlined"
                sx={{ height: 22, '& .MuiChip-label': { fontSize: '0.7rem' } }} />
              <Chip label={product.status} size="small"
                color={product.status === 'Active' ? 'success' : product.status === 'Discontinued' ? 'error' : 'warning'}
                sx={{ height: 22, '& .MuiChip-label': { fontSize: '0.7rem' } }} />
            </Stack>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
              {product.code} · SKU: {product.sku} · Batch: {product.batchNo} · Expiry: {product.expiryDate}
            </Typography>
          </Box>
          <Stack direction="row" sx={{ gap: 1 }}>
            <Button size="small" variant="outlined" startIcon={<PrinterOutlined />}>Print</Button>
            <Button size="small" variant="outlined" startIcon={<FilePdfOutlined />}>Export PDF</Button>
            <Button size="small" variant="contained" startIcon={<EditOutlined />}>Edit Product</Button>
          </Stack>
        </Stack>
      </Grid>

      <Grid size={12}>
        <MainCard>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} variant="scrollable" scrollButtons="auto">
              <Tab label="Overview" icon={<ShoppingCartOutlined />} iconPosition="start" />
              <Tab label="Specifications" icon={<TagOutlined />} iconPosition="start" />
              <Tab label="Inventory" icon={<ContainerOutlined />} iconPosition="start" />
              <Tab label="Pricing" icon={<FileTextOutlined />} iconPosition="start" />
              <Tab label="Documents" icon={<FilePdfOutlined />} iconPosition="start" />
              <Tab label="Timeline" icon={<HistoryOutlined />} iconPosition="start" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <MainCard contentSX={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 280 }}>
                  <Avatar
                    sx={{
                      width: 180,
                      height: 180,
                      borderRadius: 3,
                      bgcolor: 'primary.lighter',
                      color: 'primary.dark',
                      fontSize: '3.5rem',
                      fontWeight: 800
                    }}
                  >
                    {product.name.slice(0, 2).toUpperCase()}
                  </Avatar>
                </MainCard>
                <Box sx={{ mt: 2 }}>
                  <MainCard title="Packaging Sizes">
                    <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
                      {product.packaging.map((p, i) => (
                        <Chip key={i} label={p} color="primary" variant="outlined" icon={<ContainerOutlined />}
                          sx={{ height: 28 }} />
                      ))}
                    </Stack>
                  </MainCard>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <MainCard title="Product Information">
                      <Stack sx={{ gap: 1.75 }}>
                        <Box>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem', fontWeight: 600 }}>Composition</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{product.composition}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem', fontWeight: 600 }}>Technical Name</Typography>
                          <Typography variant="body2">{product.technicalName}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem', fontWeight: 600 }}>Recommended Dosage</Typography>
                          <Typography variant="body2">{product.dosage}</Typography>
                        </Box>
                        <Divider />
                        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 2 }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem', fontWeight: 600 }}>Target Crops</Typography>
                            <Box sx={{ mt: 0.75 }}>
                              <Stack direction="row" sx={{ gap: 0.5, flexWrap: 'wrap' }}>
                                {product.crop.map((c, i) => (
                                  <Chip key={i} label={c} size="small" color="success" variant="outlined"
                                    sx={{ height: 20, '& .MuiChip-label': { fontSize: '0.65rem' } }} />
                                ))}
                              </Stack>
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem', fontWeight: 600 }}>Target Pests / Diseases</Typography>
                            <Box sx={{ mt: 0.75 }}>
                              <Stack direction="row" sx={{ gap: 0.5, flexWrap: 'wrap' }}>
                                {product.disease.map((c, i) => (
                                  <Chip key={i} label={c} size="small" color="warning" variant="outlined"
                                    sx={{ height: 20, '& .MuiChip-label': { fontSize: '0.65rem' } }} />
                                ))}
                              </Stack>
                            </Box>
                          </Box>
                        </Stack>
                      </Stack>
                    </MainCard>
                  </Grid>
                  <Grid size={12}>
                    <MainCard title="Key Benefits">
                      <List disablePadding dense>
                        {product.benefits.map((b, i) => (
                          <ListItem key={i} sx={{ px: 0 }}>
                            <ListItemAvatar sx={{ minWidth: 32 }}>
                              <CheckSquareOutlined style={{ color: '#1677ff', fontSize: '0.9rem' }} />
                            </ListItemAvatar>
                            <ListItemText primary={b} primaryTypographyProps={{ variant: 'body2' }} />
                          </ListItem>
                        ))}
                      </List>
                    </MainCard>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={2.5}>
              {[
                { label: 'HSN Code', value: product.hsn },
                { label: 'GST Rate', value: `${product.gst}%` },
                { label: 'Batch No.', value: product.batchNo },
                { label: 'Manufacturing Date', value: '2024-06-15' },
                { label: 'Expiry Date', value: product.expiryDate },
                { label: 'Unit of Measure', value: 'Nos / Bottles' },
                { label: 'Country of Origin', value: 'India' },
                { label: 'Manufacturer', value: 'Chitra Crop Science Pvt. Ltd.' },
                { label: 'Registration No.', value: 'CIB/RC/' + (20000 + Math.floor(Math.random() * 5000)) },
                { label: 'Chemical Group', value: product.category },
                { label: 'Mode of Action', value: 'Contact / Systemic' },
                { label: 'Formulation Type', value: product.technicalName.split(' ').slice(-1)[0] }
              ].map((s, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Card variant="outlined" sx={{ borderRadius: 2 }}>
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.3px' }}>
                        {s.label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>{s.value}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'primary.light', bgcolor: 'primary.50' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'primary.dark', fontWeight: 600 }}>TOTAL STOCK</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.dark', mt: 0.5 }}>{product.stock}</Typography>
                      </Box>
                      <ContainerOutlined style={{ fontSize: '2rem', color: 'rgba(22,119,255,0.6)' }} />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'warning.light', bgcolor: 'warning.50' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'warning.dark', fontWeight: 600 }}>RESERVED</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.dark', mt: 0.5 }}>{product.reserved}</Typography>
                      </Box>
                      <ShoppingCartOutlined style={{ fontSize: '2rem', color: 'rgba(234,179,8,0.6)' }} />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'error.light', bgcolor: 'error.50' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'error.dark', fontWeight: 600 }}>DAMAGED</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'error.dark', mt: 0.5 }}>{product.damaged}</Typography>
                      </Box>
                      <WarningOutlined style={{ fontSize: '2rem', color: 'rgba(220,38,38,0.6)' }} />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'success.light', bgcolor: 'success.50' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'success.dark', fontWeight: 600 }}>REORDER LEVEL</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.dark', mt: 0.5 }}>{product.reorderLevel}</Typography>
                      </Box>
                      <InboxOutlined style={{ fontSize: '2rem', color: 'rgba(22,163,74,0.6)' }} />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={12}>
                <MainCard title="Warehouse-wise Stock">
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Warehouse</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>Stock</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>Reserved</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>Damaged</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>Reorder Level</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stockPerWarehouse.map((w, i) => (
                          <TableRow key={i} hover>
                            <TableCell>
                              <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                                <ContainerOutlined style={{ color: 'primary.main' }} />
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>{w.name}</Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" sx={{ fontWeight: w.stock <= w.reorderLevel ? 700 : 500, color: w.stock <= w.reorderLevel ? 'warning.main' : 'inherit' }}>
                                {w.stock}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">{w.reserved}</TableCell>
                            <TableCell align="right" sx={{ color: w.damaged > 0 ? 'error.main' : 'inherit' }}>{w.damaged}</TableCell>
                            <TableCell align="right">{w.reorderLevel}</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600 }}>{formatINR(w.stock * product.distributorPrice)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </MainCard>
              </Grid>

              <Grid size={12}>
                <MainCard title="Recent Transactions" subheader={`${productTxns.length} movements recorded`}>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Reference</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Warehouse</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>Qty</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>Value</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Remarks</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {productTxns.slice(0, 10).map((t) => (
                          <TableRow key={t.id} hover>
                            <TableCell>{t.date}</TableCell>
                            <TableCell>
                              <Chip label={t.type} size="small" color={txnStatusColor[t.type] || 'default'}
                                sx={{ height: 22, '& .MuiChip-label': { fontSize: '0.7rem', fontWeight: 600 } }} />
                            </TableCell>
                            <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{t.referenceNo}</TableCell>
                            <TableCell>{t.warehouse}</TableCell>
                            <TableCell align="right" sx={{ color: t.quantity >= 0 ? 'success.main' : 'error.main', fontWeight: 600 }}>
                              {t.quantity >= 0 ? '+' : ''}{t.quantity}
                            </TableCell>
                            <TableCell align="right">{formatINR(t.value)}</TableCell>
                            <TableCell>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>{t.remarks || '-'}</Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </MainCard>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={2.5}>
              {[
                { label: 'MRP', value: formatINR(product.mrp), sub: 'Max Retail Price', color: 'primary', icon: <TagOutlined /> },
                { label: 'Distributor Price', value: formatINR(product.distributorPrice), sub: `Distributor Margin ${Math.round((1 - product.distributorPrice / product.mrp) * 100)}%`, color: 'info', icon: <ShoppingCartOutlined /> },
                { label: 'Dealer Price', value: formatINR(product.dealerPrice), sub: `Dealer Margin ${Math.round((1 - product.dealerPrice / product.mrp) * 100)}%`, color: 'success', icon: <ContainerOutlined /> },
                { label: 'GST Rate', value: `${product.gst}%`, sub: 'CGST + SGST / IGST', color: 'warning', icon: <FileTextOutlined /> }
              ].map((p, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, lg: 3 }}>
                  <Card variant="outlined" sx={{ borderRadius: 2 }}>
                    <CardContent sx={{ p: 2.25 }}>
                      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>{p.label}</Typography>
                          <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.75 }}>{p.value}</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{p.sub}</Typography>
                        </Box>
                        <Box sx={{ width: 38, height: 38, borderRadius: 1.5, bgcolor: `${p.color}.lighter`, color: `${p.color}.dark`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {p.icon}
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Grid size={{ xs: 12, md: 6 }}>
                <MainCard title="Price Breakup">
                  <TableContainer>
                    <Table size="small">
                      <TableBody>
                        {[
                          ['MRP / Unit', formatINR(product.mrp)],
                          ['HSN Code', product.hsn],
                          ['GST Rate', `${product.gst}% (${Math.round(product.gst / 2)}% CGST + ${Math.round(product.gst / 2)}% SGST)`],
                          ['GST Amount / Unit', formatINR(Math.round(product.dealerPrice * product.gst / 100))],
                          ['Base Price (Dealer)', formatINR(product.dealerPrice)],
                          ['Distributor Buy Price', formatINR(product.distributorPrice)],
                          ['Gross Margin (Dist.)', formatINR(product.dealerPrice - product.distributorPrice)],
                          ['Margin % (Dist.)', `${Math.round((1 - product.distributorPrice / product.dealerPrice) * 100)}%`]
                        ].map((r, i) => (
                          <TableRow key={i}>
                            <TableCell sx={{ py: 1.2, border: 0 }}>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>{r[0]}</Typography>
                            </TableCell>
                            <TableCell align="right" sx={{ py: 1.2, border: 0 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>{r[1]}</Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </MainCard>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <MainCard title="Pack Pricing">
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Pack</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>MRP</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>Dealer</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>Distributor</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {product.packaging.map((pk, i) => {
                          const factor = [1, 1.8, 3, 9, 0.4, 0.9, 1.8, 3.5, 9, 18, 45, 120][i % 12] || 1;
                          return (
                            <TableRow key={i}>
                              <TableCell sx={{ py: 1.2 }}>
                                <Chip label={pk} size="small" variant="outlined" sx={{ height: 22 }} />
                              </TableCell>
                              <TableCell align="right" sx={{ py: 1.2, fontWeight: 600 }}>{formatINR(Math.round(product.mrp * factor))}</TableCell>
                              <TableCell align="right" sx={{ py: 1.2 }}>{formatINR(Math.round(product.dealerPrice * factor))}</TableCell>
                              <TableCell align="right" sx={{ py: 1.2 }}>{formatINR(Math.round(product.distributorPrice * factor))}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </MainCard>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={4}>
            <Grid container spacing={2.5}>
              <Grid size={12}>
                <MainCard
                  title="Product Documents"
                  secondary={
                    <Button size="small" variant="contained" startIcon={<UploadOutlined />}>Upload</Button>
                  }
                >
                  <Stack sx={{ gap: 1 }}>
                    {[
                      { name: 'Product Label - Front.pdf', type: 'PDF', size: '1.2 MB', date: '2024-08-15' },
                      { name: 'Product Label - Back.pdf', type: 'PDF', size: '980 KB', date: '2024-08-15' },
                      { name: 'CIB Registration Certificate.pdf', type: 'PDF', size: '2.3 MB', date: '2024-07-10' },
                      { name: 'MSDS - Safety Data Sheet.pdf', type: 'PDF', size: '560 KB', date: '2024-06-28' },
                      { name: 'Technical Datasheet.pdf', type: 'PDF', size: '720 KB', date: '2024-06-15' },
                      { name: 'Bio-Efficacy Report.pdf', type: 'PDF', size: '1.8 MB', date: '2024-05-20' }
                    ].map((doc, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1.5, border: 1, borderColor: 'divider', borderRadius: 1.5 }}>
                        <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center' }}>
                          <Box sx={{ width: 42, height: 42, borderRadius: 1.25, bgcolor: 'error.50', color: 'error.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FilePdfOutlined style={{ fontSize: '1.3rem' }} />
                          </Box>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{doc.name}</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              {doc.type} · {doc.size} · Uploaded {doc.date}
                            </Typography>
                          </Box>
                        </Stack>
                        <Stack direction="row" sx={{ gap: 0.5 }}>
                          <Tooltip title="Download">
                            <IconButton size="small" color="primary"><FileTextOutlined /></IconButton>
                          </Tooltip>
                          <Tooltip title="View">
                            <IconButton size="small" color="info"><EyeOutlined /></IconButton>
                          </Tooltip>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                </MainCard>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={5}>
            <MainCard title="Product Activity Timeline">
              <List disablePadding>
                {timeline.map((ev, i) => (
                  <ListItem key={i} alignItems="flex-start" sx={{ px: 0, pb: 2.5, '&:before': { content: i < timeline.length - 1 ? "''" : 'none', position: 'absolute', left: 19, top: 44, bottom: 0, width: 2, bgcolor: 'divider' } }}>
                    <ListItemAvatar sx={{ minWidth: 40 }}>
                      <Avatar sx={{ width: 36, height: 36, bgcolor: `${ev.color}.lighter`, color: `${ev.color}.dark` }}>
                        <HistoryOutlined style={{ fontSize: '0.95rem' }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{ev.title}</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{ev.time}</Typography>
                        </Stack>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>{ev.desc}</Typography>
                          <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 500, mt: 0.25, display: 'block' }}>by {ev.by}</Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </MainCard>
          </TabPanel>
        </MainCard>
      </Grid>
    </Grid>
  );
}
