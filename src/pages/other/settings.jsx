import { useState, useEffect } from 'react';
import { Grid, Typography, TextField, Button, Divider, Stack, Box } from '@mui/material';
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
    invoice_prefix: ''
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
        const res = await api.post('/company/', profile);
        setProfile(res.data);
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
        <Typography variant="h5">Company Settings</Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <MainCard title="General Profile">
          <Stack spacing={3}>
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
            <Divider />
            <Typography variant="subtitle1">Invoice Settings</Typography>
            <TextField 
              fullWidth 
              label="Invoice Prefix" 
              value={profile.invoice_prefix || ''} 
              onChange={(e) => setProfile({...profile, invoice_prefix: e.target.value})} 
              disabled={!isAdmin} 
              helperText="e.g. INV-2024-"
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
