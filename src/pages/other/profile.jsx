import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

import CameraOutlined from '@ant-design/icons/CameraOutlined';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import PhoneOutlined from '@ant-design/icons/PhoneOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import EnvironmentOutlined from '@ant-design/icons/EnvironmentOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import BankOutlined from '@ant-design/icons/BankOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import LockOutlined from '@ant-design/icons/LockOutlined';
import HistoryOutlined from '@ant-design/icons/HistoryOutlined';
import SafetyOutlined from '@ant-design/icons/SafetyOutlined';
import DesktopOutlined from '@ant-design/icons/DesktopOutlined';
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';
import WalletOutlined from '@ant-design/icons/WalletOutlined';
import FundOutlined from '@ant-design/icons/FundOutlined';
import IdcardOutlined from '@ant-design/icons/IdcardOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import RiseOutlined from '@ant-design/icons/RiseOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import useAuth from 'hooks/useAuth';

const PROFILE = {
  name: 'Rahul Mehta',
  role: 'Admin / Operations Head',
  company: 'Chitra Crop Science Pvt. Ltd.',
  territory: 'Ahmedabad (HQ) + Gujarat & Maharashtra',
  email: 'rahul.mehta@chitracropscience.in',
  phone: '+91 98250 12345',
  altPhone: '+91 79 4004 1234',
  whatsapp: '+91 98250 12345',
  dob: '1989-03-14',
  gender: 'Male',
  bloodGroup: 'O+ve',
  doj: '2018-06-04',
  empCode: 'CCS/EMP/2024/1001',
  address: '402, Green Heights, Bodakdev, Ahmedabad, Gujarat, 380054',
  permanentAddr: 'Plot 24, Shastrinagar, Mehsana, Gujarat, 384002',
  bankName: 'HDFC Bank Ltd.',
  bankAccount: '502000 12345 6789',
  bankIfsc: 'HDFC0000123',
  bankBranch: 'Ahmedabad - Satellite Road',
  pan: 'ABCPM1234F',
  aadhaar: '1234 5678 9012',
  documents: [
    { name: 'Aadhaar Card', t: 'Identity', date: '2024-01-15', v: true },
    { name: 'PAN Card', t: 'Identity', date: '2024-01-15', v: true },
    { name: 'Driving Licence', t: 'License', date: '2024-02-20', v: true },
    { name: 'Latest Degree', t: 'Education', date: '2022-11-03', v: true },
    { name: 'Appointment Letter', t: 'HR', date: '2018-06-04', v: true },
    { name: 'Previous Employment Relieving', t: 'HR', date: '2018-05-15', v: false }
  ]
};

const DEALER_PROFILE = {
  ownerName: 'Amit Patel',
  shopName: 'Shreeji Krishi Seva Kendra',
  mobileNumber: '+91 98765 43210',
  email: 'shreejikrishi@example.com',
  gst: '24AAAAA0000A1Z5',
  pan: 'AAAAA0000A',
  aadhaar: '1234 5678 9012',
  shopAddress: '12, Market Yard, Gunj Bazar, Patan, Gujarat - 384265',
};

export default function ProfilePage() {
  const { user } = useAuth();
  const [tab, setTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  
  // Dealer specific state for edit mode
  const [dealerData, setDealerData] = useState(DEALER_PROFILE);

  const isDealer = user?.role === 'Dealer';
  const isDistributor = user?.role === 'Distributor';
  const isExternalPartner = isDealer || isDistributor;

  if (isExternalPartner) {
    const roleLabel = isDealer ? 'Dealer' : 'Distributor';
    const idLabel = isDealer ? 'Dealer ID' : 'Distributor ID';
    
    return (
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" fontWeight="bold">My Profile</Typography>
          {!editMode ? (
            <Button variant="contained" startIcon={<EditOutlined />} onClick={() => setEditMode(true)}>Edit Profile</Button>
          ) : (
            <Stack direction="row" gap={1}>
              <Button variant="outlined" onClick={() => { setEditMode(false); setDealerData(DEALER_PROFILE); }}>Cancel</Button>
              <Button variant="contained" color="success" onClick={() => setEditMode(false)}>Save Changes</Button>
            </Stack>
          )}
        </Stack>
        
        {editMode && (
          <Box mb={2}>
            <Typography variant="body2" color="warning.main">
              * Note: You can only edit basic information. To update verification details (GST, PAN, Aadhaar) please contact support.
            </Typography>
          </Box>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <MainCard>
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'primary.light', fontSize: '2rem' }}>
                    {dealerData.ownerName.charAt(0)}
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold">{dealerData.ownerName}</Typography>
                  <Typography variant="body2" color="textSecondary" mb={1}>{dealerData.shopName}</Typography>
                  <Chip label={roleLabel} color="primary" size="small" />
                </Box>
              </MainCard>
              
              {isDistributor && (
                <MainCard title={
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                    <SafetyOutlined />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Verification</Typography>
                  </Stack>
                }>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="textSecondary">{idLabel}</Typography>
                      <Typography variant="body2" fontWeight="bold">{dealerData.dealerId}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="textSecondary">Status</Typography>
                      <Box mt={0.5}><Chip label={dealerData.status} size="small" color="success" /></Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="caption" color="textSecondary">Registration Date</Typography>
                      <Typography variant="body2" fontWeight="bold">{dealerData.registrationDate}</Typography>
                    </Grid>
                  </Grid>
                </MainCard>
              )}
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <MainCard title={
                <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                  <UserOutlined />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Personal Information</Typography>
                </Stack>
              }>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      fullWidth 
                      label={isDistributor ? "Name" : "Owner Name"} 
                      value={dealerData.ownerName} 
                      disabled={!editMode}
                      onChange={(e) => setDealerData({...dealerData, ownerName: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      fullWidth 
                      label="Mobile Number" 
                      value={dealerData.mobileNumber} 
                      disabled={!editMode}
                      onChange={(e) => setDealerData({...dealerData, mobileNumber: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      fullWidth 
                      label="Email Address" 
                      value={dealerData.email} 
                      disabled={!editMode}
                      onChange={(e) => setDealerData({...dealerData, email: e.target.value})}
                    />
                  </Grid>
                </Grid>
              </MainCard>

              <MainCard title={
                <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                  <BankOutlined />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Business Information</Typography>
                </Stack>
              }>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      fullWidth 
                      label={isDistributor ? "Company Name" : "Shop Name"} 
                      value={dealerData.shopName} 
                      disabled={true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      fullWidth 
                      label="GST Number" 
                      value={dealerData.gst} 
                      disabled={true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      fullWidth 
                      label="PAN Number" 
                      value={dealerData.pan} 
                      disabled={true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      fullWidth 
                      label="Aadhaar Number" 
                      value={dealerData.aadhaar} 
                      disabled={true}
                    />
                  </Grid>
                </Grid>
              </MainCard>

              <MainCard title={
                <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                  <EnvironmentOutlined />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Address</Typography>
                </Stack>
              }>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField 
                      fullWidth 
                      label="Address" 
                      value={dealerData.shopAddress} 
                      disabled={!editMode}
                      onChange={(e) => setDealerData({...dealerData, shopAddress: e.target.value})}
                    />
                  </Grid>
                </Grid>
              </MainCard>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    );
  }

  // Original Admin Profile Rendering...
  return (
    <Stack spacing={2.75}>
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={12}>
          <Stack direction="row" justifyContent="space-between" sx={{ flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>User Profile</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Personal profile, credentials, security and activity
              </Typography>
            </Box>
            <Stack direction="row" sx={{ gap: 1 }}>
              <Button variant="outlined" startIcon={<DownloadOutlined />}>Download Resume</Button>
              <Button variant="contained" startIcon={<EditOutlined />}>Edit Profile</Button>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} lg={3}>
          <Stack spacing={2}>
            <MainCard>
              <Box sx={{ textAlign: 'center', py: 1 }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Avatar
                    sx={{
                      width: 132,
                      height: 132,
                      fontSize: '2.5rem',
                      fontWeight: 700,
                      mx: 'auto',
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                      border: '4px solid',
                      borderColor: 'primary.100'
                    }}
                  >
                    RM
                  </Avatar>
                  <Tooltip title="Update photo">
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        right: 2,
                        bottom: 2,
                        bgcolor: 'background.paper',
                        border: 2,
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        '&:hover': { bgcolor: 'primary.main', color: '#fff' }
                      }}
                    >
                      <CameraOutlined style={{ fontSize: 14 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Typography variant="h5" sx={{ mt: 1.75, fontWeight: 700 }}>{PROFILE.name}</Typography>
                <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center', gap: 1, mt: 0.25, flexWrap: 'wrap' }}>
                  <Chip label={PROFILE.role} color="primary" size="small" variant="light" />
                  <Chip
                    label="Verified"
                    icon={<CheckCircleFilled style={{ fontSize: 12 }} />}
                    color="success"
                    size="small"
                    variant="combined"
                  />
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.75, fontWeight: 500 }}>{PROFILE.company}</Typography>
                <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                  <EnvironmentOutlined style={{ fontSize: 12, color: 'text.secondary' }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>{PROFILE.territory}</Typography>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Stack direction="row" sx={{ justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <Button variant="outlined" size="small" startIcon={<MailOutlined />}>Email</Button>
                  <Button variant="outlined" size="small" startIcon={<PhoneOutlined />}>Call</Button>
                  <Button variant="contained" size="small" startIcon={<CameraOutlined />}>Change Photo</Button>
                </Stack>
              </Box>
            </MainCard>

            <MainCard title="Personal KPIs">
              <Grid container spacing={1.5}>
                <Grid item xs={12}><AnalyticEcommerce title="Orders Handled" count="284" color="primary" prefix="" icon={<ShoppingCartOutlined />} extra="30 day window" /></Grid>
                <Grid item xs={12}><AnalyticEcommerce title="Invoices Reviewed" count="72" color="success" icon={<FileTextOutlined />} percentage={12} /></Grid>
                <Grid item xs={12}><AnalyticEcommerce title="Collections (₹)" count="58,42,000" prefix="₹" color="warning" icon={<WalletOutlined />} extra="₹58.42 Lakh MTD" /></Grid>
                <Grid item xs={12}><AnalyticEcommerce title="Expense Claims" count="4" color="secondary" icon={<FundOutlined />} extra="2 approved / 2 pending" /></Grid>
              </Grid>
            </MainCard>
          </Stack>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Stack spacing={2.5}>
            <MainCard
              title={
                <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                  <UserOutlined />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Personal Information</Typography>
                </Stack>
              }
              secondary={<Button size="small" variant="text" startIcon={<EditOutlined />}>Edit</Button>}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Full Name</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{PROFILE.name}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Employee Code</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>{PROFILE.empCode}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Gender</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{PROFILE.gender}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Date of Birth</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{PROFILE.dob}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Blood Group</Typography>
                    <Chip label={PROFILE.bloodGroup} size="small" color="error" variant="light" />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Date of Joining</Typography>
                    <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
                      <CalendarOutlined style={{ fontSize: 12, color: 'text.secondary' }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{PROFILE.doj}</Typography>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </MainCard>

            <MainCard
              title={
                <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                  <PhoneOutlined />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Contact Information</Typography>
                </Stack>
              }
              secondary={<Button size="small" variant="text" startIcon={<EditOutlined />}>Edit</Button>}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                    <MailOutlined style={{ color: 'primary.main' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Work Email</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{PROFILE.email}</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                    <PhoneOutlined style={{ color: 'success.main' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Mobile</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{PROFILE.phone}</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                    <PhoneOutlined style={{ color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Alternate / Office</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{PROFILE.altPhone}</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                    <IdcardOutlined style={{ color: 'success.main' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Aadhaar</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>{PROFILE.aadhaar}</Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>

            <MainCard
              title={
                <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                  <EnvironmentOutlined />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Address</Typography>
                </Stack>
              }
              secondary={<Button size="small" variant="text" startIcon={<EditOutlined />}>Edit</Button>}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Chip label="Current Address" color="primary" size="small" variant="light" sx={{ mb: 0.75 }} />
                  <Typography variant="body2">{PROFILE.address}</Typography>
                </Grid>
                <Divider sx={{ width: '100%', my: 0.5 }} />
                <Grid item xs={12}>
                  <Chip label="Permanent Address" size="small" variant="outlined" sx={{ mb: 0.75 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>{PROFILE.permanentAddr}</Typography>
                </Grid>
              </Grid>
            </MainCard>

            <MainCard
              title={
                <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                  <BankOutlined />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Bank Details</Typography>
                </Stack>
              }
              secondary={<Button size="small" variant="text" startIcon={<EditOutlined />}>Edit</Button>}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Bank</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{PROFILE.bankName}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Branch</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{PROFILE.bankBranch}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Account No.</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>{PROFILE.bankAccount}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>IFSC</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>{PROFILE.bankIfsc}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>PAN</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>{PROFILE.pan}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </MainCard>

            <MainCard
              title={
                <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                  <FileTextOutlined />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Documents</Typography>
                </Stack>
              }
              secondary={<Button size="small" variant="outlined" startIcon={<UploadOutlined />}>Upload</Button>}
            >
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Document</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Uploaded</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {PROFILE.documents.map((d) => (
                      <TableRow key={d.name}>
                        <TableCell sx={{ fontWeight: 500 }}>{d.name}</TableCell>
                        <TableCell><Chip label={d.t} size="small" variant="outlined" /></TableCell>
                        <TableCell sx={{ color: 'text.secondary' }}>{d.date}</TableCell>
                        <TableCell>
                          {d.v ? (
                            <Chip label="Verified" icon={<CheckCircleFilled style={{ fontSize: 12 }} />} size="small" color="success" variant="light" />
                          ) : (
                            <Chip label="Pending" size="small" color="warning" variant="light" />
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" sx={{ justifyContent: 'flex-end', gap: 0.25 }}>
                            <Tooltip title="View"><IconButton size="small"><FileTextOutlined /></IconButton></Tooltip>
                            <Tooltip title="Download"><IconButton size="small"><DownloadOutlined /></IconButton></Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </MainCard>
          </Stack>
        </Grid>

        <Grid item xs={12} lg={4}>
          <MainCard>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              orientation="vertical"
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                borderRight: 1,
                borderColor: 'grey.200',
                '& .MuiTabs-flexContainer': { gap: 0.5 }
              }}
            >
              <Tab icon={<LockOutlined />} iconPosition="start" label="Change Password" sx={{ justifyContent: 'flex-start' }} />
              <Tab icon={<HistoryOutlined />} iconPosition="start" label="Activity Log" sx={{ justifyContent: 'flex-start' }} />
              <Tab icon={<SafetyOutlined />} iconPosition="start" label="Roles & Permissions" sx={{ justifyContent: 'flex-start' }} />
              <Tab icon={<DesktopOutlined />} iconPosition="start" label="Active Sessions" sx={{ justifyContent: 'flex-start' }} />
            </Tabs>
          </MainCard>

          <Box sx={{ mt: 2.5 }}>
            {tab === 0 && (
              <MainCard
                title={
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                    <LockOutlined />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Change Password</Typography>
                  </Stack>
                }
              >
                <Stack spacing={2}>
                  <TextField fullWidth size="small" type="password" label="Current Password" placeholder="••••••••" />
                  <TextField fullWidth size="small" type="password" label="New Password" placeholder="Min 8 chars, 1 uppercase, 1 number" />
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}>Strength</Typography>
                    <LinearProgress variant="determinate" value={65} sx={{ height: 8, borderRadius: 4 }} />
                    <Chip label="Strong" color="success" size="small" variant="light" sx={{ mt: 0.75 }} />
                  </Box>
                  <TextField fullWidth size="small" type="password" label="Confirm New Password" />
                  <FormGroup>
                    <FormControlLabel control={<Switch />} label="Sign out all other sessions after change" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Email me confirmation of this change" />
                  </FormGroup>
                  <Button variant="contained" startIcon={<LockOutlined />} sx={{ alignSelf: 'flex-start' }}>Update Password</Button>
                </Stack>
              </MainCard>
            )}

            {tab === 1 && (
              <MainCard
                title={
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                    <HistoryOutlined />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Recent Activity</Typography>
                  </Stack>
                }
                secondary={<Chip label="Last 48 hours" size="small" variant="outlined" />}
              >
                <List sx={{ py: 0 }}>
                  {[
                    { t: '2 min ago', a: 'Updated Profile', d: 'Changed phone number +91 98250 12345', i: <EditOutlined />, c: 'primary' },
                    { t: '38 min ago', a: 'Invoice Approved', d: 'INV-1041 for ₹2,85,000', i: <FileTextOutlined />, c: 'success' },
                    { t: '2 hours ago', a: 'Generated Report', d: 'Outstanding Report Q3 FY 25-26 exported as PDF', i: <FileTextOutlined />, c: 'info' },
                    { t: 'Yesterday 19:42', a: 'Assigned Targets', d: 'Monthly targets for 8 Gujarat sales officers', i: <RiseOutlined />, c: 'warning' },
                    { t: 'Yesterday 15:08', a: 'Dealer Onboarded', d: 'DLR-5157 - Shreeji Krishi Seva Kendra, Patan', i: <UserOutlined />, c: 'success' },
                    { t: 'Yesterday 11:15', a: 'Support Resolved', d: 'TK-2011 - Product complaint for dealer in Rajkot', i: <CheckCircleFilled />, c: 'success' },
                    { t: '2 days ago', a: 'Logged in', d: 'Browser: Chrome 126 on Windows 11 (AHM-RMH-PC12)', i: <DesktopOutlined />, c: 'primary' }
                  ].map((r, idx) => (
                    <Box key={idx}>
                      <ListItem sx={{ px: 0, py: 1 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ width: 34, height: 34, fontSize: '0.9rem', bgcolor: `${r.c}.lighter`, color: `${r.c}.main` }}>
                            {r.i}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Typography variant="body2" sx={{ fontWeight: 600 }}>{r.a}</Typography>}
                          secondary={
                            <>
                              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{r.d}</Typography>
                              <Typography variant="caption" sx={{ color: 'text.disabled' }}>{r.t}</Typography>
                            </>
                          }
                        />
                      </ListItem>
                      {idx < 6 && <Divider component="li" />}
                    </Box>
                  ))}
                </List>
              </MainCard>
            )}

            {tab === 2 && (
              <MainCard
                title={
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                    <SafetyOutlined />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Assigned Roles</Typography>
                  </Stack>
                }
              >
                <Stack spacing={1} sx={{ mb: 2 }}>
                  {[
                    { n: 'Super Admin', d: 'Full platform access', col: 'primary' },
                    { n: 'Finance Manager', d: 'Invoice, Collection, GST modules', col: 'success' },
                    { n: 'Territory Owner', d: 'Gujarat + Maharashtra region data', col: 'warning' }
                  ].map((r) => (
                    <MainCard key={r.n} sx={{ p: 1 }} border>
                      <Stack direction="row" justifyContent="space-between" sx={{ alignItems: 'center' }}>
                        <Box>
                          <Chip label={r.n} color={r.col} variant="light" sx={{ fontWeight: 600 }} />
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>{r.d}</Typography>
                        </Box>
                      </Stack>
                    </MainCard>
                  ))}
                </Stack>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>Module Access Summary</Typography>
                <Box>
                  {[
                    { m: 'Orders, Approval & Invoicing', p: 100 },
                    { m: 'Collections & Bank Reconcile', p: 100 },
                    { m: 'Inventory & Warehouse', p: 85 },
                    { m: 'HR, Payroll & Attendance', p: 70 },
                    { m: 'Settings & Security', p: 100 }
                  ].map((m) => (
                    <Box key={m.m} sx={{ mb: 1.25 }}>
                      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 0.25 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>{m.m}</Typography>
                        <Chip label={`${m.p}%`} size="small" variant="outlined" sx={{ height: 18, fontSize: '0.65rem' }} />
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={m.p}
                        sx={{
                          height: 6, borderRadius: 3, bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': { bgcolor: m.p === 100 ? 'success.main' : 'primary.main' }
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </MainCard>
            )}

            {tab === 3 && (
              <MainCard
                title={
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                    <DesktopOutlined />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Active Sessions</Typography>
                  </Stack>
                }
                secondary={<Button variant="text" size="small" color="error" endIcon={<DeleteOutlined />}>Terminate others</Button>}
              >
                <Stack spacing={1.25}>
                  {[
                    { d: 'AHM-RMH-PC12', b: 'Chrome 126 · Windows 11', loc: 'Ahmedabad, Gujarat', ip: '103.56.12.18', cur: true, when: 'Active now' },
                    { d: 'RM-Mobile-S23', b: 'CCS Connect App · Android 14', loc: 'Ahmedabad, Gujarat', ip: '10.18.0.35 · Wi-Fi', cur: false, when: '18 min ago' },
                    { d: 'RM-Home-MacBook', b: 'Safari 17 · macOS Sonoma', loc: 'Ahmedabad, Gujarat', ip: '103.56.12.18', cur: false, when: 'Yesterday' }
                  ].map((s) => (
                    <MainCard key={s.ip} sx={{ p: 1.5 }} border>
                      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Stack direction="row" sx={{ gap: 1.25, minWidth: 0, flex: 1 }}>
                          <Avatar sx={{ bgcolor: s.cur ? 'success.lighter' : 'grey.100', color: s.cur ? 'success.main' : 'text.secondary', width: 36, height: 36, fontSize: '0.9rem' }}>
                            <DesktopOutlined />
                          </Avatar>
                          <Box sx={{ minWidth: 0 }}>
                            <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
                              <Typography variant="body2" sx={{ fontWeight: 700 }}>{s.d}</Typography>
                              {s.cur && <Chip label="Current" color="success" size="small" variant="combined" />}
                            </Stack>
                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{s.b}</Typography>
                            <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mt: 0.25, flexWrap: 'wrap' }}>
                              <Typography variant="caption" sx={{ color: 'text.disabled' }}><EnvironmentOutlined style={{ fontSize: 11 }} /> {s.loc}</Typography>
                              <Typography variant="caption" sx={{ color: 'text.disabled' }}>· {s.ip}</Typography>
                            </Stack>
                            <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 0.25 }}>{s.when}</Typography>
                          </Box>
                        </Stack>
                        {!s.cur && (
                          <Tooltip title="Terminate session">
                            <IconButton size="small" color="error"><DeleteOutlined /></IconButton>
                          </Tooltip>
                        )}
                      </Stack>
                    </MainCard>
                  ))}
                </Stack>
              </MainCard>
            )}
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
}
