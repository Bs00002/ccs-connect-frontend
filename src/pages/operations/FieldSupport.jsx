import React from 'react';
import { Grid, Typography, Box, Button, Avatar, Stack } from '@mui/material';
import { PhoneOutlined, MailOutlined, WhatsAppOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';

export default function FieldSupport() {
  const companyPhone = "+919876543210";

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Field Support</Typography>
          <Typography variant="body2" color="textSecondary">
            Need assistance on the field? Contact Chitra Crop Science partner support team.
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} sm={4}>
        <MainCard sx={{ height: '100%', textAlign: 'center' }}>
          <Stack spacing={2} alignItems="center" py={1}>
            <Avatar sx={{ bgcolor: 'success.lighter', color: 'success.main', width: 64, height: 64 }}>
              <WhatsAppOutlined style={{ fontSize: '2rem' }} />
            </Avatar>
            <Typography variant="h6" fontWeight={700}>WhatsApp Support</Typography>
            <Typography variant="body2" color="textSecondary">
              Get instant responses to your field queries via WhatsApp messaging.
            </Typography>
            <Button 
              variant="contained" 
              color="success" 
              fullWidth
              sx={{ fontWeight: 700, mt: 1 }}
              onClick={() => window.open(`https://wa.me/${companyPhone}`, '_blank')}
            >
              Chat on WhatsApp
            </Button>
          </Stack>
        </MainCard>
      </Grid>

      <Grid item xs={12} sm={4}>
        <MainCard sx={{ height: '100%', textAlign: 'center' }}>
          <Stack spacing={2} alignItems="center" py={1}>
            <Avatar sx={{ bgcolor: 'primary.lighter', color: 'primary.main', width: 64, height: 64 }}>
              <PhoneOutlined style={{ fontSize: '2rem' }} />
            </Avatar>
            <Typography variant="h6" fontWeight={700}>Direct Helpline</Typography>
            <Typography variant="body2" color="textSecondary">
              Speak directly with our regional territory manager or support executive.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth
              sx={{ fontWeight: 700, mt: 1 }}
              onClick={() => window.location.href = `tel:${companyPhone}`}
            >
              Call Now
            </Button>
          </Stack>
        </MainCard>
      </Grid>

      <Grid item xs={12} sm={4}>
        <MainCard sx={{ height: '100%', textAlign: 'center' }}>
          <Stack spacing={2} alignItems="center" py={1}>
            <Avatar sx={{ bgcolor: 'info.lighter', color: 'info.main', width: 64, height: 64 }}>
              <MailOutlined style={{ fontSize: '2rem' }} />
            </Avatar>
            <Typography variant="h6" fontWeight={700}>Email Desk</Typography>
            <Typography variant="body2" color="textSecondary">
              Send formal requests, order queries, or official documents to support.
            </Typography>
            <Button 
              variant="contained" 
              color="info" 
              fullWidth
              sx={{ fontWeight: 700, mt: 1 }}
              onClick={() => window.location.href = `mailto:support@chitracropscience.com`}
            >
              Send Email
            </Button>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
}

