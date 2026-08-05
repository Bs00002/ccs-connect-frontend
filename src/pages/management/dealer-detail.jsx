import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Pagination from '@mui/material/Pagination';

import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import PhoneOutlined from '@ant-design/icons/PhoneOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import EnvironmentOutlined from '@ant-design/icons/EnvironmentOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';
import ShopOutlined from '@ant-design/icons/ShopOutlined';
import WarningOutlined from '@ant-design/icons/WarningOutlined';
import RiseOutlined from '@ant-design/icons/RiseOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';

import { dealers, orders, invoices, distributors, employees, formatINR, randomBetween } from 'data/ccsMock';

const statusColor = (status) => {
  switch (status) {
    case 'Active':
    case 'Approved':
    case 'Paid':
    case 'Completed':
    case 'Delivered':
    case 'Cleared':
    case 'Deposited':
    case 'Received': return 'success';
    case 'Inactive': return 'default';
    case 'Pending':
    case 'Prospect':
    case 'On Leave':
    case 'Suspended':
    case 'Packing':
    case 'Ready Dispatch':
    case 'Dispatched':
    case 'Partial':
    case 'Unpaid':
    case 'Submitted':
    case 'Pending Approval':
    case 'Half Day': return 'warning';
    case 'Rejected':
    case 'Overdue':
    case 'Bounced':
    case 'Absent': return 'error';
    case 'Invoice Generated':
    case 'Payment Pending': return 'info';
    default: return 'default';
  }
};

export default function DealerDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const dealer = dealers.find(d => d.id === id) || dealers[0];
  const [tabValue, setTabValue] = useState(0);
  const [ordersPage, setOrdersPage] = useState(1);
  const [invoicesPage, setInvoicesPage] = useState(1);
  const [paymentsPage, setPaymentsPage] = useState(1);
  const rowsPerPage = 5;

  const parentDistributor = distributors.find(d => d.id === dealer.distributorId);
  const assignedEmp = employees.find(e => e.id === dealer.employeeId) || employees.find(e => e.department === 'Sales');

  const dealerOrders = useMemo(() => orders
    .filter(o => o.dealerId === dealer.id)
    .concat(orders.slice(0, 8).map((o, i) => ({ ...o, dealerId: dealer.id, dealerName: dealer.name, shopName: dealer.shopName, status: ['Draft', 'Submitted', 'Approved', 'Packing', 'Dispatched', 'Delivered', 'Invoice Generated', 'Completed'][i] })))
    .slice(0, 12), [dealer]);

  const orderRows = dealerOrders.slice((ordersPage - 1) * rowsPerPage, ordersPage * rowsPerPage);
  const orderPageCount = Math.max(1, Math.ceil(dealerOrders.length / rowsPerPage));

  const dealerInvoices = useMemo(() => invoices.slice(0, 10).map((inv, i) => ({
    ...inv,
    dealerId: dealer.id,
    dealerName: dealer.name,
    status: ['Paid', 'Partial', 'Unpaid', 'Overdue', 'Paid', 'Partial', 'Unpaid', 'Paid', 'Overdue', 'Paid'][i]
  })), [dealer]);
  const invRows = dealerInvoices.slice((invoicesPage - 1) * rowsPerPage, invoicesPage * rowsPerPage);
  const invPageCount = Math.max(1, Math.ceil(dealerInvoices.length / rowsPerPage));

  const payments = useMemo(() => dealerInvoices.slice(0, 8).map((inv, i) => ({
    id: `PAY-${i}`,
    date: inv.issueDate,
    mode: ['Cash', 'Cheque', 'NEFT', 'RTGS', 'UPI', 'DD', 'Card', 'UPI'][i],
    invoiceNo: inv.invoiceNo,
    amount: Math.round(inv.grandTotal * (0.4 + (i % 5) * 0.15)),
    referenceNo: `REF${10000 + i}`,
    status: ['Received', 'Deposited', 'Cleared', 'Bounced', 'Cleared', 'Deposited', 'Cleared', 'Received'][i]
  })), [dealerInvoices]);
  const payRows = payments.slice((paymentsPage - 1) * rowsPerPage, paymentsPage * rowsPerPage);
  const payPageCount = Math.max(1, Math.ceil(payments.length / rowsPerPage));

  const totalPaid = dealerInvoices.reduce((s, inv) => s + inv.paymentReceived, 0);
  const totalPurchase = dealerInvoices.reduce((s, inv) => s + inv.grandTotal, 0) || dealer.totalPurchases;
  const outRatio = totalPurchase > 0 ? Math.round((dealer.outstanding / totalPurchase) * 100) : 0;

  const timeline = [
    { time: '2025-07-26 08:15', title: 'Field Visit', desc: `Sales Officer ${assignedEmp?.name || 'SO'} visited shop for order booking`, color: 'primary' },
    { time: '2025-07-24 15:40', title: 'Order Delivered', desc: 'Order #ORD-9068 delivered - 12 items, ₹86,400', color: 'success' },
    { time: '2025-07-20 11:20', title: 'Payment Received', desc: 'UPI ₹24,500 received against Invoice #INV-1028', color: 'info' },
    { time: '2025-07-15 09:30', title: 'Complaint Registered', desc: '#TK-2027 - leakage in product packaging', color: 'warning' },
    { time: '2025-06-28 14:00', title: 'Credit Review', desc: 'Dealer outstanding within limits, no escalation', color: 'default' }
  ];

  const performanceData = [
    { month: 'Jan', purchase: 380000, collection: 340000 },
    { month: 'Feb', purchase: 420000, collection: 400000 },
    { month: 'Mar', purchase: 520000, collection: 480000 },
    { month: 'Apr', purchase: 460000, collection: 440000 },
    { month: 'May', purchase: 580000, collection: 510000 },
    { month: 'Jun', purchase: 640000, collection: 590000 },
    { month: 'Jul', purchase: 480000, collection: 380000 }
  ];

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item size={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" sx={{ gap: 2 }}>
          <Stack direction="row" alignItems="flex-start" sx={{ gap: 2 }}>
            <IconButton color="primary" onClick={() => navigate('/management/dealers')} sx={{ border: 1, borderColor: 'divider' }}>
              <ArrowLeftOutlined style={{ fontSize: 18 }} />
            </IconButton>
            <Stack direction="row" alignItems="center" sx={{ gap: 2.5 }} flexWrap="wrap">
              <Avatar sx={{ width: 64, height: 64, bgcolor: dealer.status === 'Prospect' ? 'secondary.lighter' : 'primary.lighter', color: dealer.status === 'Prospect' ? 'secondary.dark' : 'primary.dark', fontWeight: 700, fontSize: '1.5rem' }}>
                {dealer.shopName?.split(' ').map(n => n[0]).slice(0, 2).join('') || dealer.name.charAt(0)}
              </Avatar>
              <Box>
                <Stack direction="row" alignItems="center" sx={{ gap: 1, flexWrap: 'wrap' }}>
                  <Typography variant="h5">{dealer.shopName}</Typography>
                  <Chip label={dealer.status} color={statusColor(dealer.status)} size="small" sx={{ fontWeight: 500 }} />
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                  Owner: {dealer.ownerName} • {dealer.code} • Customer since {new Date(dealer.onboardingDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Stack direction="row" sx={{ gap: 1.5 }}>
            <Button variant="outlined" startIcon={<EditOutlined />} size="medium" sx={{ height: 40 }}>Edit</Button>
          </Stack>
        </Stack>
      </Grid>

      <Grid item size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Total Purchase" count={formatINR(totalPurchase).replace('₹', '')} prefix="₹" icon={<ShoppingCartOutlined />} color="primary" extra={`${performanceData.length} months tracked`} />
      </Grid>
      <Grid item size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Outstanding" count={formatINR(dealer.outstanding).replace('₹', '')} prefix="₹" icon={<WarningOutlined />} color={outRatio > 30 ? 'warning' : 'success'} extra={`${outRatio}% of purchases`} />
      </Grid>
      <Grid item size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Orders Placed" count={dealerOrders.length} icon={<ShopOutlined />} color="info" extra={`${dealerOrders.filter(o => ['Delivered', 'Completed', 'Invoice Generated', 'Payment Pending'].includes(o.status)).length} delivered`} />
      </Grid>
      <Grid item size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Paid Till Date" count={formatINR(totalPaid > 0 ? totalPaid : totalPurchase - dealer.outstanding).replace('₹', '')} prefix="₹" icon={<RiseOutlined />} color="success" extra="+14.2% vs LY" />
      </Grid>

      <Grid item size={12}>
        <MainCard contentSX={{ p: 0 }}>
          <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} variant="scrollable" scrollButtons sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
            {['Overview', 'Orders', 'Invoices', 'Payments', 'Performance', 'Timeline'].map((t, i) => (
              <Tab key={t} label={t} value={i} sx={{ minHeight: 56, textTransform: 'none', fontWeight: 600, px: 2.5 }} />
            ))}
          </Tabs>

          <Box sx={{ p: 3 }}>
            {tabValue === 0 && (
              <Grid container spacing={3}>
                <Grid item size={{ xs: 12, lg: 6 }}>
                  <MainCard title="Contact Information">
                    <Grid container spacing={2.5}>
                      <Grid item size={{ xs: 12, sm: 6 }}>
                        <Stack direction="row" sx={{ gap: 1.5 }}>
                          <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.lighter', color: 'primary.main' }}><PhoneOutlined style={{ fontSize: 16 }} /></Avatar>
                          <Box>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Phone</Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 500, fontFamily: 'monospace' }}>{dealer.mobile}</Typography>
                          </Box>
                        </Stack>
                      </Grid>
                      <Grid item size={{ xs: 12, sm: 6 }}>
                        <Stack direction="row" sx={{ gap: 1.5 }}>
                          <Avatar sx={{ width: 36, height: 36, bgcolor: 'success.lighter', color: 'success.main' }}><MailOutlined style={{ fontSize: 16 }} /></Avatar>
                          <Box>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Email</Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>{dealer.email}</Typography>
                          </Box>
                        </Stack>
                      </Grid>
                      <Grid item size={12}>
                        <Stack direction="row" sx={{ gap: 1.5 }}>
                          <Avatar sx={{ width: 36, height: 36, bgcolor: 'warning.lighter', color: 'warning.main' }}><EnvironmentOutlined style={{ fontSize: 16 }} /></Avatar>
                          <Box>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Address</Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                              {dealer.address}, {dealer.village}, {dealer.tehsil}, {dealer.district} - {dealer.pincode}, {dealer.state}
                            </Typography>
                          </Box>
                        </Stack>
                      </Grid>
                      {dealer.gstin && (
                        <Grid item size={12}>
                          <Stack direction="row" sx={{ gap: 1.5 }}>
                            <Avatar sx={{ width: 36, height: 36, bgcolor: 'info.lighter', color: 'info.main' }}><FileTextOutlined style={{ fontSize: 16 }} /></Avatar>
                            <Box>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>GSTIN</Typography>
                              <Typography variant="subtitle2" sx={{ fontWeight: 500, fontFamily: 'monospace' }}>{dealer.gstin}</Typography>
                            </Box>
                          </Stack>
                        </Grid>
                      )}
                    </Grid>
                  </MainCard>
                </Grid>

                <Grid item size={{ xs: 12, lg: 6 }}>
                  <Stack sx={{ gap: 3 }}>
                    <MainCard title="Outstanding Position">
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Typography variant="body2">{formatINR(dealer.outstanding)} Due</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{formatINR(totalPurchase)} Total</Typography>
                      </Stack>
                      <LinearProgress variant="determinate" value={Math.min(outRatio, 100)} color={outRatio > 40 ? 'warning' : outRatio > 25 ? 'primary' : 'success'} sx={{ height: 12, borderRadius: 6, mb: 2 }} />
                      <Grid container spacing={2}>
                        <Grid item size={6}>
                          <Card variant="outlined" sx={{ borderRadius: 2 }}>
                            <CardContent sx={{ py: 2 }}>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Complaints Filed</Typography>
                              <Typography variant="h6" sx={{ fontWeight: 700, color: dealer.complaints > 3 ? 'warning.main' : 'text.primary' }}>{dealer.complaints || randomBetween(0, 5)}</Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid item size={6}>
                          <Card variant="outlined" sx={{ borderRadius: 2 }}>
                            <CardContent sx={{ py: 2 }}>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Product Returns</Typography>
                              <Typography variant="h6" sx={{ fontWeight: 700, color: dealer.returns > 2 ? 'error.main' : 'text.primary' }}>{dealer.returns || randomBetween(0, 3)}</Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    </MainCard>

                    <Grid container spacing={3}>
                      <Grid item size={6}>
                        <MainCard title="Parent Distributor">
                          <Stack direction="row" alignItems="center" sx={{ gap: 1.5, cursor: parentDistributor ? 'pointer' : 'default' }} onClick={() => parentDistributor && navigate(`/management/distributors/${parentDistributor.id}`)}>
                            <Avatar sx={{ width: 44, height: 44, bgcolor: 'secondary.lighter', color: 'secondary.main', fontWeight: 700 }}>
                              {parentDistributor?.name?.split(' ').map(n => n[0]).slice(0, 2).join('') || 'DI'}
                            </Avatar>
                            <Box sx={{ minWidth: 0 }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{parentDistributor?.name || 'N/A'}</Typography>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>{parentDistributor?.district}, {parentDistributor?.state}</Typography>
                            </Box>
                          </Stack>
                        </MainCard>
                      </Grid>
                      <Grid item size={6}>
                        <MainCard title="Sales Officer">
                          <Stack direction="row" alignItems="center" sx={{ gap: 1.5 }}>
                            <Avatar sx={{ width: 44, height: 44, bgcolor: 'primary.lighter', color: 'primary.main', fontWeight: 700 }}>
                              {assignedEmp?.name?.split(' ').map(n => n[0]).slice(0, 2).join('') || 'SO'}
                            </Avatar>
                            <Box sx={{ minWidth: 0 }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{assignedEmp?.name}</Typography>
                              <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>{assignedEmp?.mobile}</Typography>
                            </Box>
                          </Stack>
                        </MainCard>
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>
              </Grid>
            )}

            {tabValue === 1 && (
              <MainCard content={false} sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
                <TableContainer>
                  <Table>
                    <TableHead sx={{ bgcolor: 'grey.50' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Order No</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Items</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Expected Delivery</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orderRows.map(row => (
                        <TableRow key={row.id} hover>
                          <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 500 }}>{row.orderNo}</TableCell>
                          <TableCell>{new Date(row.createdAt).toLocaleDateString('en-IN')}</TableCell>
                          <TableCell>{row.items?.length || randomBetween(2, 8)} items</TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{formatINR(row.total)}</TableCell>
                          <TableCell>{row.expectedDelivery ? new Date(row.expectedDelivery).toLocaleDateString('en-IN') : '—'}</TableCell>
                          <TableCell><Chip label={row.status} color={statusColor(row.status)} size="small" sx={{ fontWeight: 500 }} /></TableCell>
                        </TableRow>
                      ))}
                      {orderRows.length === 0 && (
                        <TableRow><TableCell colSpan={6} align="center" sx={{ py: 4 }}><Typography variant="body2" sx={{ color: 'text.secondary' }}>No orders found</Typography></TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Stack direction="row" justifyContent="flex-end" sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                  <Pagination count={orderPageCount} page={ordersPage} onChange={(_, p) => setOrdersPage(p)} color="primary" size="small" />
                </Stack>
              </MainCard>
            )}

            {tabValue === 2 && (
              <MainCard content={false} sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
                <TableContainer>
                  <Table>
                    <TableHead sx={{ bgcolor: 'grey.50' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Invoice No</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Order No</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Paid</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {invRows.map(row => (
                        <TableRow key={row.id} hover>
                          <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 500 }}>{row.invoiceNo}</TableCell>
                          <TableCell>{new Date(row.issueDate).toLocaleDateString('en-IN')}</TableCell>
                          <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{row.orderNo}</TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{formatINR(row.grandTotal)}</TableCell>
                          <TableCell sx={{ color: 'success.main', fontWeight: 500 }}>{formatINR(row.paymentReceived)}</TableCell>
                          <TableCell>{new Date(row.dueDate).toLocaleDateString('en-IN')}</TableCell>
                          <TableCell><Chip label={row.status} color={statusColor(row.status)} size="small" sx={{ fontWeight: 500 }} /></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Stack direction="row" justifyContent="flex-end" sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                  <Pagination count={invPageCount} page={invoicesPage} onChange={(_, p) => setInvoicesPage(p)} color="primary" size="small" />
                </Stack>
              </MainCard>
            )}

            {tabValue === 3 && (
              <MainCard content={false} sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
                <TableContainer>
                  <Table>
                    <TableHead sx={{ bgcolor: 'grey.50' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Mode</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Against Invoice</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Reference</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {payRows.map(row => (
                        <TableRow key={row.id} hover>
                          <TableCell>{new Date(row.date).toLocaleDateString('en-IN')}</TableCell>
                          <TableCell><Chip label={row.mode} variant="outlined" size="small" /></TableCell>
                          <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{row.invoiceNo}</TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{formatINR(row.amount)}</TableCell>
                          <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'text.secondary' }}>{row.referenceNo}</TableCell>
                          <TableCell><Chip label={row.status} color={statusColor(row.status)} size="small" sx={{ fontWeight: 500 }} /></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Stack direction="row" justifyContent="flex-end" sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                  <Pagination count={payPageCount} page={paymentsPage} onChange={(_, p) => setPaymentsPage(p)} color="primary" size="small" />
                </Stack>
              </MainCard>
            )}

            {tabValue === 4 && (
              <Grid container spacing={3}>
                <Grid item size={{ xs: 12, md: 4 }}>
                  <Stack sx={{ gap: 2 }}>
                    <MainCard>
                      <Stack direction="row" alignItems="center" sx={{ gap: 1.5, mb: 1.5 }}>
                        <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.lighter', color: 'primary.main' }}><RiseOutlined /></Avatar>
                        <Box>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>7-Month Total</Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>{formatINR(performanceData.reduce((s, p) => s + p.purchase, 0))}</Typography>
                        </Box>
                      </Stack>
                      <Divider sx={{ my: 1.5 }} />
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Avg Monthly</Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {formatINR(Math.round(performanceData.reduce((s, p) => s + p.purchase, 0) / performanceData.length))}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.75 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Collection Ratio</Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'success.main' }}>93%</Typography>
                      </Stack>
                    </MainCard>
                    <MainCard>
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
                        <Stack direction="row" alignItems="center" sx={{ gap: 1 }}>
                          <TeamOutlined style={{ color: 'primary.main' }} />
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>Dealer Ranking</Typography>
                        </Stack>
                        <Chip label="Top 15%" size="small" color="success" />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Rank among network</Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>#24 / {dealers.length}</Typography>
                      </Stack>
                      <LinearProgress variant="determinate" value={85} color="primary" sx={{ height: 8, borderRadius: 4 }} />
                    </MainCard>
                  </Stack>
                </Grid>
                <Grid item size={{ xs: 12, md: 8 }}>
                  <MainCard title="Monthly Purchase vs Collection">
                    <Stack sx={{ gap: 2 }}>
                      {performanceData.map(p => {
                        const purchasePct = 100;
                        const collectionPct = Math.round((p.collection / p.purchase) * 100);
                        return (
                          <Box key={p.month}>
                            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                              <Typography variant="body2" sx={{ fontWeight: 500, width: 40 }}>{p.month}</Typography>
                              <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600 }}>P: {formatINR(p.purchase)}</Typography>
                              <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600 }}>C: {formatINR(p.collection)}</Typography>
                              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, width: 50, textAlign: 'right' }}>{collectionPct}%</Typography>
                            </Stack>
                            <Box sx={{ position: 'relative', height: 22 }}>
                              <LinearProgress variant="determinate" value={purchasePct} sx={{ height: 10, borderRadius: 5, position: 'absolute', top: 0, left: 0, right: 0 }} />
                              <LinearProgress variant="determinate" value={collectionPct} color="success" sx={{ height: 10, borderRadius: 5, position: 'absolute', bottom: 0, left: 0, right: 0, bgcolor: 'transparent', '& .MuiLinearProgress-bar': { borderRadius: 5, bgcolor: 'success.main' } }} />
                            </Box>
                          </Box>
                        );
                      })}
                    </Stack>
                  </MainCard>
                </Grid>
              </Grid>
            )}

            {tabValue === 5 && (
              <MainCard title="Activity Timeline">
                <Stack sx={{ position: 'relative', pl: 2 }}>
                  <Box sx={{ position: 'absolute', left: 9, top: 8, bottom: 8, width: 2, bgcolor: 'divider' }} />
                  {timeline.map((item, i) => (
                    <Stack key={i} direction="row" sx={{ gap: 2, mb: i === timeline.length - 1 ? 0 : 3, position: 'relative' }}>
                      <Box sx={{
                        width: 20, height: 20, borderRadius: '50%',
                        bgcolor: `${item.color}.lighter`,
                        border: `3px solid`,
                        borderColor: `${item.color}.main`,
                        zIndex: 1, flexShrink: 0, mt: 0.5
                      }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{item.title}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>{item.desc}</Typography>
                        <Stack direction="row" alignItems="center" sx={{ gap: 0.5, mt: 0.5 }}>
                          <CalendarOutlined style={{ fontSize: 12, color: 'text.secondary' }} />
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{item.time}</Typography>
                        </Stack>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </MainCard>
            )}
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
}
