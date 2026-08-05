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
import CreditCardOutlined from '@ant-design/icons/CreditCardOutlined';
import ShopOutlined from '@ant-design/icons/ShopOutlined';
import WarningOutlined from '@ant-design/icons/WarningOutlined';
import RiseOutlined from '@ant-design/icons/RiseOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';

import { distributors, dealers, invoices, collections, employees, formatINR } from 'data/ccsMock';

const statusColor = (status) => {
  switch (status) {
    case 'Active': return 'success';
    case 'Paid':
    case 'Approved':
    case 'Cleared':
    case 'Received':
    case 'Deposited':
    case 'Completed': return 'success';
    case 'Inactive': return 'default';
    case 'Pending':
    case 'On Leave':
    case 'Suspended':
    case 'Prospect':
    case 'Partial':
    case 'Unpaid': return 'warning';
    case 'Rejected':
    case 'Overdue':
    case 'Bounced': return 'error';
    default: return 'default';
  }
};

const invoiceStatusColor = (s) => {
  if (s === 'Paid') return 'success';
  if (s === 'Partial') return 'warning';
  if (s === 'Overdue') return 'error';
  return 'default';
};

export default function DistributorDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const distributor = distributors.find(d => d.id === id) || distributors[0];
  const [tabValue, setTabValue] = useState(0);
  const [dealersPage, setDealersPage] = useState(1);
  const [invoicesPage, setInvoicesPage] = useState(1);
  const [paymentsPage, setPaymentsPage] = useState(1);
  const rowsPerPage = 5;

  const assignedDealers = useMemo(() => dealers.filter(d => d.distributorId === distributor.id) || [], [distributor.id]);
  const dealerRows = assignedDealers.slice((dealersPage - 1) * rowsPerPage, dealersPage * rowsPerPage);
  const dealerPageCount = Math.max(1, Math.ceil(assignedDealers.length / rowsPerPage));

  const distInvoices = useMemo(() => invoices.slice(0, 12).map((inv, i) => ({
    ...inv,
    distributorId: distributor.id,
    distributorName: distributor.name,
    status: ['Paid', 'Partial', 'Unpaid', 'Overdue'][i % 4]
  })), [distributor]);
  const invRows = distInvoices.slice((invoicesPage - 1) * rowsPerPage, invoicesPage * rowsPerPage);
  const invPageCount = Math.max(1, Math.ceil(distInvoices.length / rowsPerPage));

  const payments = useMemo(() => collections.slice(0, 10).map((c, _i) => ({
    ...c,
    distributorId: distributor.id,
    distributorName: distributor.name
  })), [distributor]);
  const payRows = payments.slice((paymentsPage - 1) * rowsPerPage, paymentsPage * rowsPerPage);
  const payPageCount = Math.max(1, Math.ceil(payments.length / rowsPerPage));

  const assignedEmp = employees.find(e => e.department === 'Sales' && e.status === 'Active');
  const creditUtilPct = distributor.creditLimit > 0 ? Math.round((distributor.outstanding / distributor.creditLimit) * 100) : 0;

  const timeline = [
    { time: '2025-07-25 14:30', title: 'Order Dispatched', desc: 'Order #ORD-9055 dispatched via VRL Logistics', color: 'primary' },
    { time: '2025-07-22 11:00', title: 'Payment Received', desc: 'RTGS ₹2,45,000 received - Invoice #INV-1015', color: 'success' },
    { time: '2025-07-18 09:45', title: 'Credit Limit Reviewed', desc: 'Limit increased from ₹30L to ₹40L by ZM', color: 'info' },
    { time: '2025-07-10 16:20', title: 'Dealer Onboarded', desc: '5 new dealers added under this distributor', color: 'warning' },
    { time: '2025-06-28 10:00', title: 'Support Ticket Resolved', desc: '#TK-2003 - product quality complaint closed', color: 'default' }
  ];

  const performanceData = [
    { month: 'Jan', target: 2500000, achieved: 2180000 },
    { month: 'Feb', target: 2800000, achieved: 2650000 },
    { month: 'Mar', target: 3200000, achieved: 3420000 },
    { month: 'Apr', target: 3000000, achieved: 2880000 },
    { month: 'May', target: 3500000, achieved: 3120000 },
    { month: 'Jun', target: 4000000, achieved: 4280000 },
    { month: 'Jul', target: 4200000, achieved: 3850000 }
  ];

  const totalPurchaseYTD = assignedDealers.reduce((s, d) => s + d.totalPurchases, 0);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item size={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" sx={{ gap: 2 }}>
          <Stack direction="row" alignItems="flex-start" sx={{ gap: 2 }}>
            <IconButton color="primary" onClick={() => navigate('/management/distributors')} sx={{ border: 1, borderColor: 'divider' }}>
              <ArrowLeftOutlined style={{ fontSize: 18 }} />
            </IconButton>
            <Stack direction="row" alignItems="center" sx={{ gap: 2.5 }} flexWrap="wrap">
              <Avatar sx={{ width: 64, height: 64, bgcolor: 'secondary.lighter', color: 'secondary.dark', fontWeight: 700, fontSize: '1.5rem' }}>
                {distributor.firmName?.split(' ').map(n => n[0]).slice(0, 2).join('') || distributor.name.charAt(0)}
              </Avatar>
              <Box>
                <Stack direction="row" alignItems="center" sx={{ gap: 1, flexWrap: 'wrap' }}>
                  <Typography variant="h5">{distributor.name}</Typography>
                  <Chip label={distributor.status} color={statusColor(distributor.status)} size="small" sx={{ fontWeight: 500 }} />
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                  {distributor.firmName} • {distributor.code} • Since {new Date(distributor.onboardingDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
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
        <AnalyticEcommerce title="Credit Limit" count={formatINR(distributor.creditLimit).replace('₹', '')} prefix="₹" icon={<CreditCardOutlined />} color="primary" extra={`${creditUtilPct}% utilized`} />
      </Grid>
      <Grid item size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Outstanding" count={formatINR(distributor.outstanding).replace('₹', '')} prefix="₹" icon={<WarningOutlined />} color="warning" extra={`${formatINR(distributor.creditLimit - distributor.outstanding)} available`} />
      </Grid>
      <Grid item size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Assigned Dealers" count={assignedDealers.length} icon={<ShopOutlined />} color="success" extra={`${assignedDealers.filter(d => d.status === 'Active').length} active`} />
      </Grid>
      <Grid item size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="YTD Business" count={formatINR(totalPurchaseYTD > 0 ? totalPurchaseYTD : 38500000).replace('₹', '')} prefix="₹" icon={<RiseOutlined />} color="info" extra="+12.5% vs LY" />
      </Grid>

      <Grid item size={12}>
        <MainCard contentSX={{ p: 0 }}>
          <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} variant="scrollable" scrollButtons sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
            {['Overview', 'Assigned Dealers', 'Invoices', 'Payments', 'Performance', 'Timeline'].map((t, i) => (
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
                            <Typography variant="subtitle2" sx={{ fontWeight: 500, fontFamily: 'monospace' }}>{distributor.mobile}</Typography>
                          </Box>
                        </Stack>
                      </Grid>
                      <Grid item size={{ xs: 12, sm: 6 }}>
                        <Stack direction="row" sx={{ gap: 1.5 }}>
                          <Avatar sx={{ width: 36, height: 36, bgcolor: 'success.lighter', color: 'success.main' }}><MailOutlined style={{ fontSize: 16 }} /></Avatar>
                          <Box>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Email</Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>{distributor.email}</Typography>
                          </Box>
                        </Stack>
                      </Grid>
                      <Grid item size={12}>
                        <Stack direction="row" sx={{ gap: 1.5 }}>
                          <Avatar sx={{ width: 36, height: 36, bgcolor: 'warning.lighter', color: 'warning.main' }}><EnvironmentOutlined style={{ fontSize: 16 }} /></Avatar>
                          <Box>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Address</Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                              {distributor.address}, {distributor.city}, {distributor.district} - {distributor.pincode}, {distributor.state}
                            </Typography>
                          </Box>
                        </Stack>
                      </Grid>
                      <Grid item size={{ xs: 12, sm: 6 }}>
                        <Stack direction="row" sx={{ gap: 1.5 }}>
                          <Avatar sx={{ width: 36, height: 36, bgcolor: 'info.lighter', color: 'info.main' }}><FileTextOutlined style={{ fontSize: 16 }} /></Avatar>
                          <Box>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>GSTIN</Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 500, fontFamily: 'monospace' }}>{distributor.gstin}</Typography>
                          </Box>
                        </Stack>
                      </Grid>
                      <Grid item size={{ xs: 12, sm: 6 }}>
                        <Stack direction="row" sx={{ gap: 1.5 }}>
                          <Avatar sx={{ width: 36, height: 36, bgcolor: 'secondary.lighter', color: 'secondary.main' }}><CreditCardOutlined style={{ fontSize: 16 }} /></Avatar>
                          <Box>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>PAN</Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 500, fontFamily: 'monospace' }}>{distributor.pan}</Typography>
                          </Box>
                        </Stack>
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>

                <Grid item size={{ xs: 12, lg: 6 }}>
                  <Stack sx={{ gap: 3 }}>
                    <MainCard title="Credit Utilization">
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Typography variant="body2">{formatINR(distributor.outstanding)} Outstanding</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{formatINR(distributor.creditLimit)} Limit</Typography>
                      </Stack>
                      <LinearProgress variant="determinate" value={creditUtilPct} color={creditUtilPct > 80 ? 'warning' : 'primary'} sx={{ height: 12, borderRadius: 6, mb: 2 }} />
                      <Grid container spacing={2}>
                        <Grid item size={6}>
                          <Card variant="outlined" sx={{ borderRadius: 2 }}>
                            <CardContent sx={{ py: 2 }}>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Available Credit</Typography>
                              <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>{formatINR(distributor.creditLimit - distributor.outstanding)}</Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid item size={6}>
                          <Card variant="outlined" sx={{ borderRadius: 2 }}>
                            <CardContent sx={{ py: 2 }}>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Utilization %</Typography>
                              <Typography variant="h6" sx={{ fontWeight: 700, color: creditUtilPct > 80 ? 'warning.main' : 'primary.main' }}>{creditUtilPct}%</Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    </MainCard>

                    <MainCard title="Assigned Sales Officer">
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
                          <Avatar sx={{ width: 52, height: 52, bgcolor: 'primary.lighter', color: 'primary.main', fontWeight: 700 }}>
                            {assignedEmp?.name.split(' ').map(n => n[0]).slice(0, 2).join('') || 'SO'}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{assignedEmp?.name}</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>{assignedEmp?.designation} • {assignedEmp?.territory}</Typography>
                            <Typography variant="caption" sx={{ display: 'block', mt: 0.25, fontFamily: 'monospace' }}>{assignedEmp?.mobile}</Typography>
                          </Box>
                        </Stack>
                        <IconButton color="primary"><UserOutlined /></IconButton>
                      </Stack>
                    </MainCard>
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
                        <TableCell sx={{ fontWeight: 600 }}>Code</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Shop</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Owner</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Village</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Total Purchase</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Outstanding</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dealerRows.map(row => (
                        <TableRow key={row.id} hover>
                          <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{row.code}</TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{row.shopName}</TableCell>
                          <TableCell>{row.ownerName}</TableCell>
                          <TableCell>{row.village}, {row.district}</TableCell>
                          <TableCell>{formatINR(row.totalPurchases)}</TableCell>
                          <TableCell sx={{ color: row.outstanding > 0 ? 'warning.main' : 'text.primary', fontWeight: 500 }}>{formatINR(row.outstanding)}</TableCell>
                          <TableCell><Chip label={row.status} color={statusColor(row.status)} size="small" sx={{ fontWeight: 500 }} /></TableCell>
                        </TableRow>
                      ))}
                      {dealerRows.length === 0 && (
                        <TableRow><TableCell colSpan={7} align="center" sx={{ py: 4 }}><Typography variant="body2" sx={{ color: 'text.secondary' }}>No dealers assigned</Typography></TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Stack direction="row" justifyContent="flex-end" sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                  <Pagination count={dealerPageCount} page={dealersPage} onChange={(_, p) => setDealersPage(p)} color="primary" size="small" />
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
                        <TableCell sx={{ fontWeight: 600 }}>Dealer</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
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
                          <TableCell>{row.dealerName}</TableCell>
                          <TableCell>{new Date(row.issueDate).toLocaleDateString('en-IN')}</TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{formatINR(row.grandTotal)}</TableCell>
                          <TableCell sx={{ color: 'success.main', fontWeight: 500 }}>{formatINR(row.paymentReceived)}</TableCell>
                          <TableCell>{new Date(row.dueDate).toLocaleDateString('en-IN')}</TableCell>
                          <TableCell><Chip label={row.status} color={invoiceStatusColor(row.status)} size="small" sx={{ fontWeight: 500 }} /></TableCell>
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
                        <TableCell sx={{ fontWeight: 600 }}>Receipt No</TableCell>
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
                          <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 500 }}>{row.receiptNo}</TableCell>
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
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>Current Month Target</Typography>
                      <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.5, mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>{formatINR(performanceData[6].target)}</Typography>
                        <Chip label={`${Math.round((performanceData[6].achieved / performanceData[6].target) * 100)}%`} color={performanceData[6].achieved >= performanceData[6].target ? 'success' : 'warning'} size="small" />
                      </Stack>
                      <LinearProgress variant="determinate" value={Math.min(Math.round((performanceData[6].achieved / performanceData[6].target) * 100), 100)} color="primary" sx={{ height: 10, borderRadius: 5 }} />
                      <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                        Achieved: {formatINR(performanceData[6].achieved)}
                      </Typography>
                    </MainCard>
                    <MainCard>
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Dealer Coverage</Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{assignedDealers.length} / {Math.round(assignedDealers.length * 1.4)}</Typography>
                      </Stack>
                      <LinearProgress variant="determinate" value={71} color="success" sx={{ height: 10, borderRadius: 5, mb: 2 }} />
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Active Dealer Ratio</Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'success.main' }}>
                          {Math.round((assignedDealers.filter(d => d.status === 'Active').length / Math.max(1, assignedDealers.length)) * 100)}%
                        </Typography>
                      </Stack>
                      <LinearProgress variant="determinate" value={92} color="warning" sx={{ height: 10, borderRadius: 5 }} />
                    </MainCard>
                  </Stack>
                </Grid>
                <Grid item size={{ xs: 12, md: 8 }}>
                  <MainCard title="Monthly Sales (Target vs Achieved)">
                    <Stack sx={{ gap: 2 }}>
                      {performanceData.map(p => {
                        const pct = Math.round((p.achieved / p.target) * 100);
                        return (
                          <Box key={p.month}>
                            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                              <Typography variant="body2" sx={{ fontWeight: 500, width: 40 }}>{p.month}</Typography>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>{formatINR(p.target)} target</Typography>
                              <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600 }}>{formatINR(p.achieved)}</Typography>
                              <Typography variant="caption" sx={{ color: pct >= 100 ? 'success.main' : 'warning.main', fontWeight: 600, width: 40, textAlign: 'right' }}>{pct}%</Typography>
                            </Stack>
                            <Box sx={{ position: 'relative', height: 16 }}>
                              <LinearProgress variant="determinate" value={100} sx={{ height: 16, borderRadius: 8, bgcolor: 'grey.100', '& .MuiLinearProgress-bar': { bgcolor: 'grey.200' } }} />
                              <LinearProgress
                                variant="determinate"
                                value={Math.min(pct, 100)}
                                color={pct >= 100 ? 'success' : pct >= 80 ? 'primary' : 'warning'}
                                sx={{ height: 16, borderRadius: 8, position: 'absolute', top: 0, left: 0, right: 0, bgcolor: 'transparent', '& .MuiLinearProgress-bar': { borderRadius: 8 } }}
                              />
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
                        <Stack direction="row" alignItems="center" sx={{ gap: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{item.title}</Typography>
                        </Stack>
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
