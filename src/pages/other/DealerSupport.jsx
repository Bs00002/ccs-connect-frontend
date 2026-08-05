import React from 'react';
import { Grid, Typography, Box, Stack, Card, CardContent, Button } from '@mui/material';
import { PhoneOutlined, MessageOutlined, WhatsAppOutlined } from '@ant-design/icons';

export default function DealerSupport() {
  const companyPhone = "+919876543210"; // Placeholder

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Dealer Support</Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          We are here to help. Reach out to us through any of the channels below.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
            <CardContent>
              <Avatar sx={{ bgcolor: 'success.light', color: 'success.main', width: 64, height: 64, mx: 'auto', mb: 2 }}>
                <WhatsAppOutlined style={{ fontSize: '2rem' }} />
              </Avatar>
              <Typography variant="h6" gutterBottom>WhatsApp</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Get quick responses to your queries via WhatsApp.
              </Typography>
              <Button 
                variant="contained" 
                color="success" 
                fullWidth
                onClick={() => window.open(`https://wa.me/${companyPhone}`, '_blank')}
              >
                Chat on WhatsApp
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
            <CardContent>
              <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 64, height: 64, mx: 'auto', mb: 2 }}>
                <PhoneOutlined style={{ fontSize: '2rem' }} />
              </Avatar>
              <Typography variant="h6" gutterBottom>Call Us</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Speak directly with our support representatives.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                onClick={() => window.location.href = `tel:${companyPhone}`}
              >
                Call Now
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
            <CardContent>
              <Avatar sx={{ bgcolor: 'info.light', color: 'info.main', width: 64, height: 64, mx: 'auto', mb: 2 }}>
                <MessageOutlined style={{ fontSize: '2rem' }} />
              </Avatar>
              <Typography variant="h6" gutterBottom>Send Message</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Send us a message and we'll get back to you shortly.
              </Typography>
              <Button 
                variant="contained" 
                color="info" 
                fullWidth
                onClick={() => window.location.href = `mailto:support@example.com`}
              >
                Send Email
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

// Ensure Avatar is imported if not already, or we can use Box for the circle
import { Avatar } from '@mui/material';
