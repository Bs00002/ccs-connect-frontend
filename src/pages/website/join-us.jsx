import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, TextField, Button, Stack, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { TeamOutlined, CheckCircleFilled, UploadOutlined } from '@ant-design/icons';
import api from 'api/client';

export default function JoinUs() {
  const [formData, setFormData] = useState({
    role: 'Distributor',
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    pan: ''
  });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Mock API call
      // const submitData = new FormData();
      // ... append formData and resume
      // await api.post('/careers/apply/', submitData);
      await new Promise(r => setTimeout(r, 1000));
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Application failed. Please try again.');
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
            <Typography variant="h4" fontWeight="bold" gutterBottom>Application Submitted!</Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 4, lineHeight: 1.6 }}>
              Thank you for expressing your interest to join Chitra Crop Science as a <b>{formData.role}</b>. Your application is now under review by our HR team. We will get back to you soon.
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
        <title>Join Us | Chitra Crop Science</title>
        <meta name="description" content="Join Chitra Crop Science as a Distributor or Employee and grow your career with us." />
      </Helmet>

      {/* Header */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <TeamOutlined style={{ fontSize: 48, marginBottom: 16 }} />
          <Typography variant="h2" fontWeight="bold" gutterBottom>Join Our Team</Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9 }}>
            Whether you want to become a Distributor or join our internal team as an Employee, your journey starts here.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ mt: -4 }}>
        <Paper elevation={12} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={1}>Application Form</Typography>
          <Typography variant="body2" color="textSecondary" mb={4}>
            Please fill out the form below. Required fields are marked with an asterisk (*).
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>I want to join as</InputLabel>
                  <Select name="role" value={formData.role} label="I want to join as" onChange={handleChange}>
                    <MenuItem value="Distributor">Distributor</MenuItem>
                    <MenuItem value="Employee">Employee</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField required fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField required fullWidth label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField required fullWidth label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="PAN Number" name="pan" value={formData.pan} onChange={handleChange} helperText="Optional" />
              </Grid>

              <Grid item xs={12}>
                <TextField required fullWidth multiline rows={3} label="Address" name="address" value={formData.address} onChange={handleChange} />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" fontWeight="bold" mt={2} mb={1} color="textSecondary" textTransform="uppercase">Optional Documents</Typography>
                <Button variant="outlined" component="label" startIcon={<UploadOutlined />} fullWidth sx={{ py: 1.5, borderStyle: 'dashed', borderWidth: 2, justifyContent: 'flex-start' }}>
                  {resume ? resume.name : 'Upload Resume / Profile (PDF)'}
                  <input type="file" hidden accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                </Button>
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
