import { useState, useEffect } from 'react';
import { Grid, Typography, TextField, Button, Divider, Stack, Box, Avatar, IconButton } from '@mui/material';
import { UploadOutlined, BuildOutlined, FileTextOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import api from 'api/client';
import useAuth from 'hooks/useAuth';

export default function SettingsPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    gst_number: '',
    address: '',
    bank_details: '',
    invoice_prefix: '',
    terms_conditions: '',
    logo: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/company/');
      if (res.data.length > 0) {
        setProfile(res.data[0]);
      } else {
        setProfile({
          name: 'CCS Connect',
          gst_number: '24AAACC1206D1Z0',
          address: 'Surat, Gujarat, India',
          bank_details: 'HDFC Bank, A/C: 1234567890',
          invoice_prefix: 'CCS-26-',
          terms_conditions: '1. Goods once sold will not be taken back.\n2. Interest @ 18% p.a. will be charged if payment is delayed beyond 30 days.\n3. Subject to Surat jurisdiction only.',
          logo: null
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (profile.id) {
        await api.put(`/company/${profile.id}/`, profile);
      } else {
        await api.post('/company/', profile);
      }
      alert('Settings saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save settings.');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  const isAdmin = user?.role === 'Super Admin';

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
          <Box>
            <Typography variant="h5">Settings</Typography>
            <Typography variant="body2" color="textSecondary">Manage company profile, GST, Bank Details, and Invoice Settings.</Typography>
          </Box>
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <MainCard title={<Stack direction="row" spacing={1} alignItems="center"><BuildOutlined /> <Typography variant="h6">Company Profile</Typography></Stack>}>
          <Stack spacing={3}>
            
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.lighter', color: 'primary.main', fontSize: '2rem' }}>
                {profile.name ? profile.name.charAt(0) : 'C'}
              </Avatar>
              {isAdmin && (
                <Button variant="outlined" startIcon={<UploadOutlined />} component="label">
                  Upload Logo
                  <input type="file" hidden accept="image/*" />
                </Button>
              )}
            </Stack>

            <TextField 
              fullWidth 
              label="Company Name" 
              value={profile.name} 
              onChange={(e) => setProfile({...profile, name: e.target.value})} 
              disabled={!isAdmin} 
            />
            <TextField 
              fullWidth 
              label="GST Number" 
              value={profile.gst_number || ''} 
              onChange={(e) => setProfile({...profile, gst_number: e.target.value})} 
              disabled={!isAdmin} 
            />
            <TextField 
              fullWidth 
              multiline 
              rows={3} 
              label="Address" 
              value={profile.address || ''} 
              onChange={(e) => setProfile({...profile, address: e.target.value})} 
              disabled={!isAdmin} 
            />
            <TextField 
              fullWidth 
              multiline 
              rows={3} 
              label="Bank Details" 
              value={profile.bank_details || ''} 
              onChange={(e) => setProfile({...profile, bank_details: e.target.value})} 
              disabled={!isAdmin} 
            />
          </Stack>
        </MainCard>
      </Grid>

      <Grid item xs={12} md={8}>
        <MainCard title={<Stack direction="row" spacing={1} alignItems="center"><FileTextOutlined /> <Typography variant="h6">General Settings</Typography></Stack>}>
          <Stack spacing={3}>
            <TextField 
              fullWidth 
              label="Invoice Prefix" 
              value={profile.invoice_prefix || ''} 
              onChange={(e) => setProfile({...profile, invoice_prefix: e.target.value})} 
              disabled={!isAdmin} 
              helperText="e.g. INV-2026-"
            />
            <TextField 
              fullWidth 
              multiline 
              rows={4} 
              label="T&C for Invoices" 
              value={profile.terms_conditions || ''} 
              onChange={(e) => setProfile({...profile, terms_conditions: e.target.value})} 
              disabled={!isAdmin} 
              helperText="These terms will be printed at the bottom of every generated invoice."
            />
            
            {isAdmin && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
                <Button variant="contained" onClick={handleSave}>Save Settings</Button>
              </Box>
            )}
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
}
