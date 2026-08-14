import { useState } from 'react';
import {
  Grid, Box, Stack, Typography, Button, Chip, TextField, Avatar, Tooltip, IconButton, Paper, Divider
} from '@mui/material';

import MainCard from 'components/MainCard';
import {
  CameraOutlined, CheckCircleFilled, PhoneOutlined, MailOutlined, EnvironmentOutlined, EditOutlined, SafetyCertificateOutlined
} from '@ant-design/icons';
import useAuth from 'hooks/useAuth';

export default function ProfilePage() {
  const { user } = useAuth();
  const isDealer = user?.role === 'Dealer';

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    shopName: user?.company_name || 'Gujarat Agro Distributors Ltd',
    ownerName: user?.name || 'Rahul Mehta',
    mobile: user?.phone || '+91 98250 12345',
    email: user?.email || 'distributor@chitracropscience.com',
    gstNo: '24ABCDE1234F1Z5',
    panNo: 'ABCPM1234F',
    aadhaarNo: '1234 5678 9012',
    address: 'Depot 14, GIDC Industrial Estate, Palanpur, Banaskantha, Gujarat, 385001'
  });

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <Stack spacing={3}>
      {/* Header Profile Section */}
      <MainCard content={false} sx={{ position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ height: 140, background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)', borderRadius: '4px 4px 0 0' }} />
        
        <Box sx={{ px: { xs: 2, sm: 4 }, pb: 3 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mt: -5, alignItems: { xs: 'center', sm: 'flex-end' } }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar sx={{ width: 110, height: 110, border: '4px solid white', bgcolor: '#1b5e20', fontSize: '2.5rem', fontWeight: 800, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                {formData.ownerName.charAt(0)}
              </Avatar>
              <Tooltip title="Update photo">
                <IconButton size="small" sx={{ position: 'absolute', bottom: 4, right: 4, bgcolor: 'background.paper', boxShadow: 1 }}>
                  <CameraOutlined />
                </IconButton>
              </Tooltip>
            </Box>
            
            <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }}>
              <Stack direction="row" spacing={1} alignItems="center" justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                <Typography variant="h3" fontWeight={800} color="#101828">{formData.shopName}</Typography>
                <Chip label="Verified Partner" icon={<CheckCircleFilled />} color="success" size="small" sx={{ fontWeight: 700 }} />
              </Stack>
              <Typography variant="subtitle1" color="textSecondary" fontWeight={600} gutterBottom>
                Partner Role: <span style={{ color: '#2e7d32' }}>Authorized Distributor / Field Employee</span>
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.8, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                <EnvironmentOutlined style={{ color: '#2e7d32' }} /> {formData.address}
              </Typography>
            </Box>

            <Stack direction="row" spacing={2} sx={{ mt: { xs: 2, sm: 0 } }}>
              {isEditing ? (
                <Button variant="contained" color="success" onClick={handleSave} sx={{ fontWeight: 800 }}>Save Changes</Button>
              ) : (
                <Button variant="outlined" color="success" startIcon={<EditOutlined />} onClick={() => setIsEditing(true)} sx={{ fontWeight: 700 }}>
                  Edit Profile
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>
      </MainCard>

      {/* Account & Identification Details */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <MainCard title={<Typography variant="h5" fontWeight={700}>Account Details</Typography>}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" fontWeight={700} color="textSecondary">Business / Firm Name</Typography>
                {isEditing ? (
                  <TextField fullWidth size="small" value={formData.shopName} onChange={(e) => setFormData({ ...formData, shopName: e.target.value })} />
                ) : (
                  <Typography variant="body1" fontWeight={700} color="#101828">{formData.shopName}</Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="caption" fontWeight={700} color="textSecondary">Account Owner Name</Typography>
                {isEditing ? (
                  <TextField fullWidth size="small" value={formData.ownerName} onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })} />
                ) : (
                  <Typography variant="body1" fontWeight={700} color="#101828">{formData.ownerName}</Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="caption" fontWeight={700} color="textSecondary">Mobile Number</Typography>
                {isEditing ? (
                  <TextField fullWidth size="small" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} />
                ) : (
                  <Typography variant="body1" fontWeight={700} color="#101828">{formData.mobile}</Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="caption" fontWeight={700} color="textSecondary">Email Address</Typography>
                {isEditing ? (
                  <TextField fullWidth size="small" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                ) : (
                  <Typography variant="body1" fontWeight={700} color="#101828">{formData.email}</Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <Typography variant="caption" fontWeight={700} color="textSecondary">Registered Address</Typography>
                {isEditing ? (
                  <TextField fullWidth size="small" multiline rows={2} value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                ) : (
                  <Typography variant="body1" fontWeight={600} color="#101828">{formData.address}</Typography>
                )}
              </Grid>
            </Grid>
          </MainCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <MainCard title={<Typography variant="h5" fontWeight={700}>Legal & Statutory Info</Typography>}>
            <Stack spacing={2.5}>
              <Box>
                <Typography variant="caption" fontWeight={700} color="textSecondary">Assigned Regional Depot</Typography>
                <Typography variant="body1" fontWeight={700} color="#2e7d32">Palanpur Regional Hub (Gujarat Zone)</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="caption" fontWeight={700} color="textSecondary">GSTIN Number</Typography>
                <Typography variant="body1" fontWeight={700} color="#1a237e">{formData.gstNo}</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="caption" fontWeight={700} color="textSecondary">PAN Number</Typography>
                <Typography variant="body1" fontWeight={700} color="#101828">{formData.panNo}</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="caption" fontWeight={700} color="textSecondary">Aadhaar Verification Number</Typography>
                <Typography variant="body1" fontWeight={700} color="#101828">{formData.aadhaarNo}</Typography>
              </Box>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    </Stack>
  );
}

