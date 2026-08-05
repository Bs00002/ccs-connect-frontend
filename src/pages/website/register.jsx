import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Paper, Tabs, Tab, Divider, Alert, CircularProgress, Link as MuiLink } from '@mui/material';
import { EnvironmentOutlined, UploadOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import api from 'api/client';
import { useNavigate, Link } from 'react-router-dom';

function DealerForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', shop_name: '',
    gst_number: '', pan_number: '', aadhaar_number: '', address: '',
    district: '', state: '', pincode: '', bank_name: '', account_number: '', ifsc: ''
  });
  const [location, setLocation] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => alert("Please allow location access to capture your shop's GPS coordinates.")
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post('/auth/register/dealer/', { ...formData, location });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) return <Alert severity="success" sx={{ mt: 2 }}>Dealer Registration submitted successfully! Pending Admin Approval. Redirecting to login...</Alert>;

  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      <Grid container spacing={3}>
        <Grid item xs={12}><Typography variant="h6" color="primary">1. Personal & Login Details</Typography></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="Owner Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="Mobile Number" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} /></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="Email Address" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="Password" type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} /></Grid>
        
        <Grid item xs={12}><Divider sx={{ my: 1 }} /><Typography variant="h6" color="primary">2. Business & KYC Details</Typography></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="Shop Name" required value={formData.shop_name} onChange={e => setFormData({...formData, shop_name: e.target.value})} /></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="GST Number" value={formData.gst_number} onChange={e => setFormData({...formData, gst_number: e.target.value})} /></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="PAN Number" required value={formData.pan_number} onChange={e => setFormData({...formData, pan_number: e.target.value})} /></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="Aadhaar Number" required value={formData.aadhaar_number} onChange={e => setFormData({...formData, aadhaar_number: e.target.value})} /></Grid>
        <Grid item xs={12}><TextField fullWidth label="Full Shop Address" multiline rows={2} required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} /></Grid>
        <Grid item xs={12} md={4}><TextField fullWidth label="District" required value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} /></Grid>
        <Grid item xs={12} md={4}><TextField fullWidth label="State" required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} /></Grid>
        <Grid item xs={12} md={4}><TextField fullWidth label="Pincode" required value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} /></Grid>
        
        <Grid item xs={12}><Divider sx={{ my: 1 }} /><Typography variant="h6" color="primary">3. Bank Details</Typography></Grid>
        <Grid item xs={12} md={4}><TextField fullWidth label="Bank Name" required value={formData.bank_name} onChange={e => setFormData({...formData, bank_name: e.target.value})} /></Grid>
        <Grid item xs={12} md={4}><TextField fullWidth label="Account Number" required value={formData.account_number} onChange={e => setFormData({...formData, account_number: e.target.value})} /></Grid>
        <Grid item xs={12} md={4}><TextField fullWidth label="IFSC Code" required value={formData.ifsc} onChange={e => setFormData({...formData, ifsc: e.target.value})} /></Grid>
        
        <Grid item xs={12}><Divider sx={{ my: 1 }} /><Typography variant="h6" color="primary">4. Location & Documents</Typography></Grid>
        <Grid item xs={12} md={6}>
          <Button variant={location ? "contained" : "outlined"} color={location ? "success" : "primary"} onClick={getGPS} startIcon={<EnvironmentOutlined />} fullWidth sx={{ height: '56px' }}>
            {location ? `GPS Captured (${location.lat.toFixed(4)}, ${location.lng.toFixed(4)})` : 'Capture Shop GPS Location (Required)'}
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="outlined" component="label" startIcon={<UploadOutlined />} fullWidth sx={{ height: '56px' }}>
            Upload Shop Photo
            <input type="file" hidden accept="image/*" />
          </Button>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" size="large" fullWidth disabled={loading || !location} sx={{ py: 1.5, fontSize: '1.1rem' }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Dealer Application'}
          </Button>
          {!location && <Typography variant="caption" color="error" display="block" textAlign="center" mt={1}>You must capture GPS location before submitting.</Typography>}
        </Grid>
      </Grid>
    </form>
  );
}

function DistributorForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', district: '', state: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post('/auth/register/employee/', { ...formData, role: 'Distributor' });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) return <Alert severity="success" sx={{ mt: 2 }}>Distributor Application submitted! Pending Admin Approval. Redirecting...</Alert>;

  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      <Grid container spacing={3}>
        <Grid item xs={12}><Typography variant="h6" color="primary">1. Personal & Login Details</Typography></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="Mobile Number" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} /></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="Email Address" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="Password" type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} /></Grid>
        
        <Grid item xs={12}><Divider sx={{ my: 1 }} /><Typography variant="h6" color="primary">2. Operational Area</Typography></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="Operating District" required value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} /></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="State" required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} /></Grid>
        
        <Grid item xs={12}><Divider sx={{ my: 1 }} /><Typography variant="h6" color="primary">3. Documents</Typography></Grid>
        <Grid item xs={12}>
          <Button variant="outlined" component="label" startIcon={<UploadOutlined />} fullWidth sx={{ height: '56px' }}>
            Upload Resume / Cover Letter (Optional)
            <input type="file" hidden accept=".pdf,.doc,.docx" />
          </Button>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ py: 1.5, fontSize: '1.1rem' }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Distributor Application'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default function Register() {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default', 
      py: 8,
      backgroundImage: 'url(https://images.unsplash.com/photo-1592982537447-6f23f81eb5d5?auto=format&fit=crop&w=1920&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Helmet>
        <title>Partner With Us | Chitra Crop Science</title>
        <meta name="description" content="Register as a Dealer or Distributor and join the Chitra Crop Science network." />
      </Helmet>
      <Container maxWidth="md">
        <Paper elevation={24} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, bgcolor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}>
          <Box textAlign="center" mb={4}>
            <img src="/logo.png" alt="CCS Logo" style={{ height: 60, marginBottom: 16 }} onError={(e) => (e.currentTarget.style.display = 'none')} />
            <Typography variant="h3" fontWeight="bold" color="textPrimary" gutterBottom>Partner With Us</Typography>
            <Typography variant="body1" color="textSecondary">Join the CCS Connect network as a Dealer or Distributor</Typography>
          </Box>
          
          <Tabs 
            value={tab} 
            onChange={(e, v) => setTab(v)} 
            centered 
            sx={{ mb: 4, '& .MuiTab-root': { fontSize: '1.1rem', fontWeight: 'bold' } }}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Become a Dealer" />
            <Tab label="Become a Distributor" />
          </Tabs>
          
          {tab === 0 ? <DealerForm /> : <DistributorForm />}

          <Box textAlign="center" mt={4}>
            <Typography variant="body2" color="textSecondary">
              Already have an account?{' '}
              <MuiLink component={Link} to="/login" sx={{ color: 'primary.main', fontWeight: 'bold', textDecoration: 'none' }}>
                Sign In
              </MuiLink>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
