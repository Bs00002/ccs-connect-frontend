import { useState } from 'react';
import {
  Grid, Typography, Box, Stack, Button, TextField
} from '@mui/material';
import MainCard from 'components/MainCard';
import { checkOut } from 'utils/daily-working';

import { CarryOutOutlined } from '@ant-design/icons';

export default function DailyWorkingDashboard() {
  const [remarks, setRemarks] = useState('');
  const [tomorrowPlan, setTomorrowPlan] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);
  
  const handleSubmit = async () => {
    if (!remarks || !tomorrowPlan) {
      return alert('Please fill out your remarks and tomorrow\'s plan.');
    }
    
    try {
      checkOut(remarks, tomorrowPlan);
      setReportSubmitted(true);
    } catch (err) {
      alert('Failed to submit daily report');
    }
  };

  if (reportSubmitted) {
    return (
      <Grid container justifyContent="center" mt={4}>
        <Grid item xs={12} md={6}>
          <MainCard sx={{ textAlign: 'center', p: 4, bgcolor: 'success.lighter', borderColor: 'success.main', borderStyle: 'solid', borderWidth: 2 }}>
            <CarryOutOutlined style={{ fontSize: '4rem', color: 'green' }} />
            <Typography variant="h4" color="success.dark" mt={2} mb={1}>Daily Report Submitted!</Typography>
            <Typography variant="body1">Your activities for the day have been logged and you have been checked out.</Typography>
            <Typography variant="body2" color="textSecondary" mt={2}>Great job today! Rest well and see you tomorrow.</Typography>
          </MainCard>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75} justifyContent="center" mt={2}>
      <Grid item xs={12} md={8} lg={6}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h5">End of Day Report</Typography>
            <Typography variant="body2" color="textSecondary">Submit your daily report to check out.</Typography>
          </Box>
        </Stack>

        <MainCard>
          <Stack spacing={4}>
            <TextField 
              label="What did I do today?" multiline rows={4} fullWidth
              value={remarks} onChange={e => setRemarks(e.target.value)}
              placeholder="Summary of today's activities..."
            />
            
            <TextField 
              label="What is the plan for tomorrow?" multiline rows={4} fullWidth
              value={tomorrowPlan} onChange={e => setTomorrowPlan(e.target.value)}
              placeholder="Tomorrow's route and objectives..."
            />
            
            <Box textAlign="center">
              <Button 
                variant="contained" size="large" color="primary" 
                startIcon={<CarryOutOutlined />} onClick={handleSubmit}
                sx={{ px: 5, py: 1.5, fontSize: '1.1rem' }}
                fullWidth
              >
                End Day (Check Out)
              </Button>
            </Box>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
}
