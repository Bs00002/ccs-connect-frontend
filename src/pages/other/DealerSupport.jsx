import React, { useState } from 'react';
import { Grid, Typography, Box, Stack, Card, CardContent, Button, TextField, Paper, Alert } from '@mui/material';
import { PhoneOutlined, MessageOutlined, WhatsAppOutlined, CustomerServiceOutlined, SendOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';

export default function DealerSupport() {
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDesc, setTicketDesc] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!ticketTitle || !ticketDesc) {
      alert('Please fill out the ticket title and details.');
      return;
    }
    setSubmitted(true);
    setTicketTitle('');
    setTicketDesc('');
  };

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      {/* Header */}
      <Grid item xs={12}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Dealer Support & Assistance</Typography>
          <Typography variant="body2" color="textSecondary">
            Need help with your account, order status, or product queries? Reach out directly via WhatsApp, Call, or Support Ticket.
          </Typography>
        </Box>
      </Grid>

      {/* Direct Quick Action Cards */}
      <Grid item xs={12} md={4}>
        <Card sx={{ height: '100%', bgcolor: 'success.lighter', border: '1px solid', borderColor: 'success.light' }}>
          <CardContent>
            <Stack spacing={2} alignItems="center" textAlign="center">
              <Box sx={{ p: 2, bgcolor: 'success.main', color: 'white', borderRadius: '50%' }}>
                <WhatsAppOutlined style={{ fontSize: 32 }} />
              </Box>
              <Typography variant="h5" fontWeight={700} color="success.dark">WhatsApp Support</Typography>
              <Typography variant="body2" color="textSecondary">
                Instant help from our Chitra Crop Science dealer helpdesk.
              </Typography>
              <Button
                variant="contained"
                color="success"
                startIcon={<WhatsAppOutlined />}
                fullWidth
                href="https://wa.me/919876543210"
                target="_blank"
                sx={{ mt: 1, fontWeight: 700 }}
              >
                Chat on WhatsApp (+91 98765 43210)
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ height: '100%', bgcolor: 'primary.lighter', border: '1px solid', borderColor: 'primary.light' }}>
          <CardContent>
            <Stack spacing={2} alignItems="center" textAlign="center">
              <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', borderRadius: '50%' }}>
                <PhoneOutlined style={{ fontSize: 32 }} />
              </Box>
              <Typography variant="h5" fontWeight={700} color="primary.main">Toll-Free Helpline</Typography>
              <Typography variant="body2" color="textSecondary">
                Speak directly with your assigned Sales Manager.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PhoneOutlined />}
                fullWidth
                href="tel:18001234567"
                sx={{ mt: 1, fontWeight: 700 }}
              >
                Call 1800-123-4567
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ height: '100%', bgcolor: 'warning.lighter', border: '1px solid', borderColor: 'warning.light' }}>
          <CardContent>
            <Stack spacing={2} alignItems="center" textAlign="center">
              <Box sx={{ p: 2, bgcolor: 'warning.main', color: 'white', borderRadius: '50%' }}>
                <MessageOutlined style={{ fontSize: 32 }} />
              </Box>
              <Typography variant="h5" fontWeight={700} color="warning.dark">Email Depot Support</Typography>
              <Typography variant="body2" color="textSecondary">
                Send official emails regarding ledger verification & billing.
              </Typography>
              <Button
                variant="contained"
                color="warning"
                startIcon={<MessageOutlined />}
                fullWidth
                href="mailto:support@chitracropscience.com"
                sx={{ mt: 1, fontWeight: 700 }}
              >
                Send Message
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Raise Support Ticket Form */}
      <Grid item xs={12}>
        <MainCard title="Raise a Support Ticket">
          {submitted && (
            <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSubmitted(false)}>
              Your support ticket has been registered successfully! Ticket ID #TCK-2026-984. Our support representative will contact you shortly.
            </Alert>
          )}

          <form onSubmit={handleCreateTicket}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Ticket Subject / Issue Title"
                placeholder="e.g. Inquiry regarding order delivery status or billing credit"
                value={ticketTitle}
                onChange={(e) => setTicketTitle(e.target.value)}
                required
              />

              <TextField
                fullWidth
                label="Detailed Description"
                multiline
                rows={4}
                placeholder="Explain your query or issue in detail..."
                value={ticketDesc}
                onChange={(e) => setTicketDesc(e.target.value)}
                required
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SendOutlined />}
                sx={{ width: { xs: '100%', sm: 220 }, py: 1.2, fontWeight: 700 }}
              >
                Submit Support Ticket
              </Button>
            </Stack>
          </form>
        </MainCard>
      </Grid>
    </Grid>
  );
}
