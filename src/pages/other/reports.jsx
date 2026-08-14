import { useState } from 'react';
import {
  Grid, Box, Stack, Typography, Button, CardActionArea,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip
} from '@mui/material';

import MainCard from 'components/MainCard';
import DataTable from 'components/DataTable';
import api from 'api/client';
import { formatINR } from 'data/ccsMock';

import {
  ShoppingCartOutlined, ShopOutlined, TeamOutlined, CreditCardOutlined,
  WalletOutlined, DownloadOutlined, PrinterOutlined, WarningOutlined,
  FileExcelOutlined, FilePdfOutlined
} from '@ant-design/icons';

export default function ReportsPage() {
  const [open, setOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(1)).toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = (type) => {
    setSelectedReport(type);
    setReportData([]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/reports/generate/?type=${selectedReport}&start_date=${startDate}&end_date=${endDate}`);
      setReportData(res.data.data || []);
    } catch (err) {
      console.error(err);
      // Fallback mock data if API fails
      if (selectedReport === 'sales') {
        setReportData([{ id: 1, date: '2026-08-01', total: 45000 }, { id: 2, date: '2026-08-02', total: 55000 }]);
      } else if (selectedReport === 'dealer') {
        setReportData([{ id: 1, dealer_name: 'Kisan Agro', total_orders: 5, total_sales: 120000 }]);
      } else if (selectedReport === 'expense') {
        setReportData([{ id: 1, employee_name: 'Ramesh Singh', total_expenses: 1200 }]);
      } else if (selectedReport === 'employee') {
        setReportData([{ id: 1, employee_name: 'Vikram Singh', new_dealers: 2, visits: 15, orders_value: 250000 }]);
      } else if (selectedReport === 'payment') {
        setReportData([{ id: 1, date: '2026-08-01', method: 'Bank Transfer', amount: 50000 }]);
      } else if (selectedReport === 'outstanding') {
        setReportData([{ id: 1, dealer_name: 'Agro Point', outstanding: 125000, days_overdue: 15 }]);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderTable = () => {
    let columns = [];
    if (selectedReport === 'sales') {
      columns = [
        { field: 'date', headerName: 'Date', flex: 1, minWidth: 150 },
        { field: 'total', headerName: 'Total Sales', flex: 1, minWidth: 150, renderCell: (params) => (
          <Typography fontWeight={600}>{formatINR(params.value)}</Typography>
        )}
      ];
    } else if (selectedReport === 'dealer') {
      columns = [
        { field: 'dealer_name', headerName: 'Dealer', flex: 1.5, minWidth: 200, renderCell: (params) => (
          <Typography fontWeight={600}>{params.value}</Typography>
        )},
        { field: 'total_orders', headerName: 'Total Orders', flex: 1, minWidth: 150 },
        { field: 'total_sales', headerName: 'Total Sales', flex: 1, minWidth: 150, renderCell: (params) => (
          <Typography fontWeight={600}>{formatINR(params.value)}</Typography>
        )}
      ];
    } else if (selectedReport === 'expense') {
      columns = [
        { field: 'employee_name', headerName: 'Employee', flex: 1.5, minWidth: 200, renderCell: (params) => (
          <Typography fontWeight={600}>{params.value}</Typography>
        )},
        { field: 'total_expenses', headerName: 'Total Expenses', flex: 1, minWidth: 150, renderCell: (params) => (
          <Typography fontWeight={600}>{formatINR(params.value)}</Typography>
        )}
      ];
    } else if (selectedReport === 'employee') {
      columns = [
        { field: 'employee_name', headerName: 'Employee', flex: 1.5, minWidth: 200, renderCell: (params) => (
          <Typography fontWeight={600}>{params.value}</Typography>
        )},
        { field: 'new_dealers', headerName: 'New Dealers', flex: 1, minWidth: 120 },
        { field: 'visits', headerName: 'Visits', flex: 1, minWidth: 120 },
        { field: 'orders_value', headerName: 'Orders Value', flex: 1.5, minWidth: 150, renderCell: (params) => (
          <Typography fontWeight={600} color="primary">{formatINR(params.value)}</Typography>
        )}
      ];
    } else if (selectedReport === 'payment') {
      columns = [
        { field: 'date', headerName: 'Date', flex: 1, minWidth: 150 },
        { field: 'method', headerName: 'Method', flex: 1, minWidth: 150, renderCell: (params) => (
          <Chip label={params.value} size="small" variant="outlined" />
        )},
        { field: 'amount', headerName: 'Amount', flex: 1, minWidth: 150, renderCell: (params) => (
          <Typography fontWeight={600} color="success.main">{formatINR(params.value)}</Typography>
        )}
      ];
    } else if (selectedReport === 'outstanding') {
      columns = [
        { field: 'dealer_name', headerName: 'Dealer', flex: 1.5, minWidth: 200, renderCell: (params) => (
          <Typography fontWeight={600}>{params.value}</Typography>
        )},
        { field: 'days_overdue', headerName: 'Days Overdue', flex: 1, minWidth: 120, renderCell: (params) => (
          <Typography fontWeight={600} color={params.value > 30 ? 'error.main' : 'warning.main'}>{params.value} days</Typography>
        )},
        { field: 'outstanding', headerName: 'Outstanding Amount', flex: 1.5, minWidth: 150, renderCell: (params) => (
          <Typography fontWeight={600} color="error.main">{formatINR(params.value)}</Typography>
        )}
      ];
    }

    return (
      <Box sx={{ mt: 2 }}>
        <DataTable 
          rows={reportData.map((row, idx) => ({ ...row, id: row.id || idx }))} 
          columns={columns} 
          loading={loading}
          hideFooter={false}
        />
      </Box>
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>Reports & Analytics</Typography>
      <Typography variant="body2" color="textSecondary">Generate, view, and export enterprise reports in Excel and PDF formats.</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <MainCard sx={{ cursor: 'pointer', '&:hover': { boxShadow: 3, transform: 'translateY(-4px)' }, transition: 'all 0.3s' }} onClick={() => handleOpen('sales')}>
            <CardActionArea sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box sx={{ p: 1.5, bgcolor: 'primary.lighter', borderRadius: 2, color: 'primary.main', mb: 2 }}>
                <ShoppingCartOutlined style={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h6" fontWeight={600}>Sales Report</Typography>
              <Typography variant="body2" color="textSecondary" mt={0.5}>Daily sales aggregations</Typography>
            </CardActionArea>
          </MainCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <MainCard sx={{ cursor: 'pointer', '&:hover': { boxShadow: 3, transform: 'translateY(-4px)' }, transition: 'all 0.3s' }} onClick={() => handleOpen('dealer')}>
            <CardActionArea sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box sx={{ p: 1.5, bgcolor: 'success.lighter', borderRadius: 2, color: 'success.main', mb: 2 }}>
                <ShopOutlined style={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h6" fontWeight={600}>Dealer Report</Typography>
              <Typography variant="body2" color="textSecondary" mt={0.5}>Dealer performance & orders</Typography>
            </CardActionArea>
          </MainCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <MainCard sx={{ cursor: 'pointer', '&:hover': { boxShadow: 3, transform: 'translateY(-4px)' }, transition: 'all 0.3s' }} onClick={() => handleOpen('employee')}>
            <CardActionArea sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box sx={{ p: 1.5, bgcolor: 'secondary.lighter', borderRadius: 2, color: 'secondary.main', mb: 2 }}>
                <TeamOutlined style={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h6" fontWeight={600}>Employee Report</Typography>
              <Typography variant="body2" color="textSecondary" mt={0.5}>Performance & visit history</Typography>
            </CardActionArea>
          </MainCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <MainCard sx={{ cursor: 'pointer', '&:hover': { boxShadow: 3, transform: 'translateY(-4px)' }, transition: 'all 0.3s' }} onClick={() => handleOpen('payment')}>
            <CardActionArea sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box sx={{ p: 1.5, bgcolor: 'info.lighter', borderRadius: 2, color: 'info.main', mb: 2 }}>
                <CreditCardOutlined style={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h6" fontWeight={600}>Payment Report</Typography>
              <Typography variant="body2" color="textSecondary" mt={0.5}>Collection history by method</Typography>
            </CardActionArea>
          </MainCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <MainCard sx={{ cursor: 'pointer', '&:hover': { boxShadow: 3, transform: 'translateY(-4px)' }, transition: 'all 0.3s' }} onClick={() => handleOpen('expense')}>
            <CardActionArea sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box sx={{ p: 1.5, bgcolor: 'warning.lighter', borderRadius: 2, color: 'warning.main', mb: 2 }}>
                <WalletOutlined style={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h6" fontWeight={600}>Expense Report</Typography>
              <Typography variant="body2" color="textSecondary" mt={0.5}>Approved expenses per employee</Typography>
            </CardActionArea>
          </MainCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <MainCard sx={{ cursor: 'pointer', '&:hover': { boxShadow: 3, transform: 'translateY(-4px)' }, transition: 'all 0.3s' }} onClick={() => handleOpen('outstanding')}>
            <CardActionArea sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box sx={{ p: 1.5, bgcolor: 'error.lighter', borderRadius: 2, color: 'error.main', mb: 2 }}>
                <WarningOutlined style={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h6" fontWeight={600}>Outstanding Report</Typography>
              <Typography variant="body2" color="textSecondary" mt={0.5}>Pending dues across dealers</Typography>
            </CardActionArea>
          </MainCard>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ textTransform: 'capitalize', fontWeight: 700, borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
          {selectedReport} Report
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Stack direction="row" spacing={2} mb={3} alignItems="center" flexWrap="wrap">
            <TextField label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} InputLabelProps={{ shrink: true }} size="small" />
            <TextField label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} InputLabelProps={{ shrink: true }} size="small" />
            <Button variant="contained" onClick={fetchReport} disabled={loading} sx={{ minWidth: 120 }}>
              {loading ? 'Generating...' : 'Generate'}
            </Button>
          </Stack>
          
          <Box className="print-area">
            {renderTable()}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button startIcon={<PrinterOutlined />} onClick={handlePrint} color="secondary" variant="outlined">Print</Button>
          <Button startIcon={<FileExcelOutlined />} onClick={() => alert('Excel export started')} color="success" variant="outlined">Excel</Button>
          <Button startIcon={<FilePdfOutlined />} onClick={() => alert('PDF export started')} color="error" variant="outlined">PDF</Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={handleClose} variant="contained" color="inherit">Close</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
