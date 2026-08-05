import { Box, Container, Typography, Grid, Paper, TextField, Button, Stack, Alert } from '@mui/material';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, SendOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import api from 'api/client';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', department: 'Sales', message: '' });
  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/support/enquiries/', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', department: 'Sales', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', pb: 10 }}>
      <Helmet>
        <title>Contact Us | Chitra Crop Science</title>
        <meta name="description" content="Get in touch with Chitra Crop Science for inquiries, support, or partnership opportunities." />
      </Helmet>

      {/* Header */}
      <Box sx={{ bgcolor: 'primary.dark', color: 'white', py: { xs: 8, md: 10 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight="bold" gutterBottom>Get in Touch</Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9 }}>
            Whether you have a question about our products, want to become a partner, or need agronomic advice, our team is ready to help.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -6 }}>
        <Grid container spacing={4}>
          {/* Contact Details */}
          <Grid item xs={12} md={5}>
            <Paper elevation={12} sx={{ p: 4, height: '100%', borderRadius: 4, bgcolor: '#1e293b', color: 'white' }}>
              <Typography variant="h4" fontWeight="bold" mb={4}>Contact Information</Typography>
              
              <Stack spacing={4}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <EnvironmentOutlined style={{ fontSize: 24, color: '#4ade80', mt: 1 }} />
                  <Box>
                    <Typography variant="h6" fontWeight="bold">Head Office</Typography>
                    <Typography variant="body1" color="rgba(255,255,255,0.7)">Block-D, 404, Signature 2,<br/>Near Sanand Cross Road, S.G. Highway,<br/>Makarba, Sarkhej-Okaf, Ahmedabad, Gujarat – 382210</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <PhoneOutlined style={{ fontSize: 24, color: '#4ade80' }} />
                  <Box>
                    <Typography variant="h6" fontWeight="bold">Phone / WhatsApp</Typography>
                    <Typography variant="body1" color="rgba(255,255,255,0.7)">Direct: +91 80004 50380<br/>IndiaMART: +91 79471 53592</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <MailOutlined style={{ fontSize: 24, color: '#4ade80' }} />
                  <Box>
                    <Typography variant="h6" fontWeight="bold">Email Addresses</Typography>
                    <Typography variant="body1" color="rgba(255,255,255,0.7)">Sales: chitracropscience22@gmail.com<br/>Support: info@chitracropscience.in</Typography>
                  </Box>
                </Stack>
              </Stack>
              
              <Typography variant="subtitle1" fontWeight="bold" mt={6} mb={2}>Working Hours</Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.7)">Monday - Saturday: 9:00 AM to 6:00 PM<br/>Sunday: Closed</Typography>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={12} sx={{ p: { xs: 3, md: 5 }, height: '100%', borderRadius: 4 }}>
              <Typography variant="h4" fontWeight="bold" mb={1}>Send a Message</Typography>
              <Typography variant="body1" color="textSecondary" mb={4}>Fill out the form below and we will get back to you within 24 hours.</Typography>
              
              {success && <Alert severity="success" sx={{ mb: 3 }}>Thank you! Your message has been sent successfully.</Alert>}
              {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Your Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Your Email" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Phone Number" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth select SelectProps={{ native: true }} label="Department" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}>
                      {['Sales', 'Dealer Support', 'Technical Agronomy', 'General Enquiry'].map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Your Message" multiline rows={4} required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" disabled={loading} variant="contained" size="large" endIcon={<SendOutlined />} sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}>
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
      {/* Map (Real Google Maps Embed) */}
      <Box sx={{ mt: 10, height: 400, bgcolor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <iframe 
          src="https://maps.google.com/maps?q=Signature%202,%20Makarba,%20Ahmedabad&t=&z=13&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="400" 
          frameBorder="0" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          aria-hidden="false" 
          tabIndex="0"
          title="Chitra Crop Science Location"
        ></iframe>
      </Box>
    </Box>
  );
}
