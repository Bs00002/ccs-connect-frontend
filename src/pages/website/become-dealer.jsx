import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, TextField, Button, Stack, Alert } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { ShopOutlined, CheckCircleFilled } from '@ant-design/icons';
import api from 'api/client';

export default function BecomeDealer() {
  const [formData, setFormData] = useState({
    ownerName: '',
    shopName: '',
    mobile: '',
    email: '',
    address: '',
    gst: '',
    pan: '',
    aadhaar: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Mock API call
      // await api.post('/dealers/register/', formData);
      await new Promise(r => setTimeout(r, 1000));
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Box sx={{ bgcolor: 'background.default', minHeight: '80vh', display: 'flex', alignItems: 'center', py: 10 }}>
        <Container maxWidth="sm">
          <Paper elevation={0} sx={{ p: 5, textAlign: 'center', borderRadius: 4, border: '1px solid rgba(46, 125, 50, 0.2)' }}>
            <CheckCircleFilled style={{ fontSize: 64, color: '#2e7d32', marginBottom: 24 }} />
            <Typography variant="h4" fontWeight="bold" gutterBottom>Registration Successful!</Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 4, lineHeight: 1.6 }}>
              Thank you for registering to become a Chitra Crop Science dealer. Your application is now <b>Pending Approval</b>. Our administrative team will review your details and contact you shortly.
            </Typography>
            <Button variant="contained" href="/" size="large">Return to Home</Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 10 }}>
      <Helmet>
        <title>Become a Dealer | Chitra Crop Science</title>
        <meta name="description" content="Register to become a certified dealer for Chitra Crop Science." />
      </Helmet>

      {/* Header */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <ShopOutlined style={{ fontSize: 48, marginBottom: 16 }} />
          <Typography variant="h2" fontWeight="bold" gutterBottom>Partner With Us</Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9 }}>
            Join our fast-growing network of certified dealers and provide world-class agricultural solutions to farmers.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ mt: -4 }}>
        <Paper elevation={12} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={1}>Dealer Registration Form</Typography>
          <Typography variant="body2" color="textSecondary" mb={4}>
            Please fill out the form below. Required fields are marked with an asterisk (*).
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField required fullWidth label="Owner Name" name="ownerName" value={formData.ownerName} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField required fullWidth label="Shop / Company Name" name="shopName" value={formData.shopName} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField required fullWidth label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField required fullWidth label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth multiline rows={3} label="Shop Address" name="address" value={formData.address} onChange={handleChange} />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" fontWeight="bold" mt={2} mb={-1} color="textSecondary" textTransform="uppercase">Optional KYC Documents</Typography>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="GST Number" name="gst" value={formData.gst} onChange={handleChange} helperText="If applicable" />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="PAN Number" name="pan" value={formData.pan} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Aadhaar Number" name="aadhaar" value={formData.aadhaar} onChange={handleChange} />
              </Grid>
              
              <Grid item xs={12} mt={2}>
                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                  <Button variant="outlined" href="/" size="large">Cancel</Button>
                  <Button type="submit" variant="contained" size="large" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
