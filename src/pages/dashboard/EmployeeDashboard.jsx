import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Box, Stack, Button, Card, CardContent } from '@mui/material';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import { formatINR } from 'data/ccsMock';
import { checkIn as checkInUtil, checkOut as checkOutUtil, isCheckedIn as isCheckedInUtil, getDaySummary } from 'utils/daily-working';

import { 
  EnvironmentOutlined,
  ShoppingCartOutlined, 
  WalletOutlined,
  CheckCircleOutlined,
  LogoutOutlined,
  CarryOutOutlined,
  CompassOutlined
} from '@ant-design/icons';

export default function EmployeeDashboard({ data }) {
  const navigate = useNavigate();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [location, setLocation] = useState('');
  
  useEffect(() => {
    const status = isCheckedInUtil();
    setIsCheckedIn(status);
  }, []);

  const handleCheckInOut = () => {
    if (!isCheckedIn) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          pos => {
            const loc = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
            setLocation(loc);
            setIsCheckedIn(true);
            checkInUtil(loc, 'selfie_url_mock.jpg', '85%', 'Starting day early');
            alert('Checked In successfully!');
          },
          () => {
            // fallback for local testing without https
            const loc = `23.0225, 72.5714`; // Ahmedabad mock
            setLocation(loc);
            setIsCheckedIn(true);
            checkInUtil(loc, 'selfie_url_mock.jpg', '85%', 'Starting day early');
            alert('Checked In successfully! (Mock Location)');
          }
        );
      }
    } else {
      setIsCheckedIn(false);
      checkOutUtil('End of day', 'Visit remaining dealers tomorrow');
      alert('Checked Out successfully!');
    }
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* Check In / Out Hero Banner */}
      <Grid item xs={12}>
        <MainCard sx={{ bgcolor: isCheckedIn ? 'success.lighter' : 'primary.lighter', borderColor: isCheckedIn ? 'success.main' : 'primary.main', borderStyle: 'solid', borderWidth: 2 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
            <Box>
              <Typography variant="h4" color={isCheckedIn ? 'success.dark' : 'primary.dark'}>
                {isCheckedIn ? "Checked In (On Field)" : "Ready to start?"}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" mt={0.5}>
                {isCheckedIn ? `Location: ${location}` : "Check in to start logging visits."}
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              color={isCheckedIn ? "error" : "primary"}
              size="large"
              onClick={handleCheckInOut}
              startIcon={isCheckedIn ? <LogoutOutlined /> : <CheckCircleOutlined />}
              sx={{ px: 4, py: 1.5, fontSize: '1.1rem', borderRadius: 2 }}
            >
              {isCheckedIn ? "GPS Check Out" : "GPS Check In"}
            </Button>
          </Stack>
        </MainCard>
      </Grid>
      
      {/* Metrics Row */}
      <Grid item xs={12} sm={4}>
        <AnalyticEcommerce title="Today's Dealer Visits" count={getDaySummary().visits.toString()} icon={<EnvironmentOutlined />} color="primary" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <AnalyticEcommerce title="Today's Orders" count={getDaySummary().orders.toString()} icon={<ShoppingCartOutlined />} color="success" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <AnalyticEcommerce title="Today's Collections" count={formatINR(getDaySummary().collections)} icon={<WalletOutlined />} color="info" />
      </Grid>

      <Grid item xs={12} md={6}>
        <MainCard title="Quick Actions">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button fullWidth variant="outlined" startIcon={<EnvironmentOutlined />} onClick={() => navigate('/app/operations/dealer-visits')} sx={{ py: 2 }}>
                Dealer Visit
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="outlined" color="success" startIcon={<ShoppingCartOutlined />} onClick={() => navigate('/app/orders/create')} sx={{ py: 2 }}>
                New Order
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="outlined" color="info" startIcon={<WalletOutlined />} onClick={() => navigate('/app/operations/collections')} sx={{ py: 2 }}>
                Collection
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="contained" color="primary" startIcon={<CarryOutOutlined />} onClick={() => navigate('/app/operations/daily-report')} sx={{ py: 2 }}>
                Daily Report
              </Button>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      <Grid item xs={12} md={6}>
        <MainCard title="Today's Route Plan">
          <Stack spacing={2}>
            <Card variant="outlined" sx={{ bgcolor: 'success.lighter', borderColor: 'success.light' }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Stack direction="row" alignItems="center" gap={1}>
                  <CheckCircleOutlined style={{ color: 'green' }} />
                  <Typography variant="subtitle1">Shree Krishna Agro Center (Visited)</Typography>
                </Stack>
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Stack direction="row" alignItems="center" gap={1}>
                  <CompassOutlined style={{ color: '#1890ff' }} />
                  <Typography variant="subtitle1">Patel Krishi Bhandar (Pending)</Typography>
                </Stack>
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Stack direction="row" alignItems="center" gap={1}>
                  <CompassOutlined style={{ color: '#1890ff' }} />
                  <Typography variant="subtitle1">Kisan Seva Kendra (Pending)</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
}
