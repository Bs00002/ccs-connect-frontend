import React, { useState } from 'react';
import {
  Drawer, Box, Stack, Typography, IconButton, Tabs, Tab, Divider, Chip, Avatar, Grid, Button, Paper, Tooltip
} from '@mui/material';
import MainCard from 'components/MainCard';
import DataTable from 'components/DataTable';
import ImageLightboxModal from 'components/ui/ImageLightboxModal';
import { formatINR } from 'data/ccsMock';

import {
  CloseOutlined, EnvironmentOutlined, ClockCircleOutlined, UserOutlined, FileTextOutlined,
  CheckCircleOutlined, ShopOutlined, EyeOutlined, CarOutlined, DownloadOutlined
} from '@ant-design/icons';
import { MapPin, Navigation, Compass, Phone, Mail, Award, Calendar, DollarSign } from 'lucide-react';

const mockTimeline = [
  { time: '09:15 AM', title: 'Login Recorded', type: 'login', location: 'Palanpur Office, Banaskantha', coords: '24.1724° N, 72.4346° E', distance: '0.0 KM' },
  { time: '09:45 AM', title: 'Dealer Visit: Kisan Agro Center', type: 'visit', location: 'Station Road, Palanpur', coords: '24.1740° N, 72.4360° E', distance: '3.2 KM', remarks: 'Collected order for 50 cases Chitra Zyme' },
  { time: '10:30 AM', title: 'Transit to Kheda Cluster', type: 'transit', location: 'NH-27 Highway, Kheda', coords: '22.7516° N, 72.6845° E', distance: '14.5 KM' },
  { time: '11:45 AM', title: 'Dealer Visit: Royal Agro Traders', type: 'visit', location: 'Market Yard, Anand', coords: '22.5645° N, 72.9289° E', distance: '28.1 KM', remarks: 'Payment collection cheque ₹45,000' },
  { time: '01:20 PM', title: 'Lunch Break & Halt', type: 'break', location: 'Highway Food Plaza, Anand', coords: '22.5680° N, 72.9310° E', distance: '30.0 KM' },
  { time: '03:40 PM', title: 'Dealer Visit: Jay Jawan Fertilizer Store', type: 'visit', location: 'GIDC Phase 2, Ahmedabad', coords: '23.0225° N, 72.5714° E', distance: '38.4 KM', remarks: 'New lead registration and sample demo' },
  { time: '05:55 PM', title: 'Return Transit to Depot', type: 'transit', location: 'S G Highway, Ahmedabad', coords: '23.0315° N, 72.5255° E', distance: '41.2 KM' },
  { time: '06:25 PM', title: 'Logout Recorded', type: 'logout', location: 'Ahmedabad Central Depot', coords: '23.0390° N, 72.5310° E', distance: '42.8 KM' }
];

export default function AttendanceTimelineDrawer({ open, onClose, record }) {
  const [activeTab, setActiveTab] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);

  if (!record) return null;

  const defaultLoginSelfie = record.loginImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
  const defaultLogoutSelfie = record.logoutImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { width: { xs: '100%', sm: 650, md: 850 }, bgcolor: '#F8FAFC' } }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header Block */}
          <Box sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={record.photo} sx={{ width: 56, height: 56, border: '2px solid white' }}>
                  {record.employeeName?.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700}>{record.employeeName || 'Rahul Sharma'}</Typography>
                  <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                    <Chip label={record.employeeId || 'EMP-102'} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }} />
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>{record.distributor || 'Central Gujarat Depot'}</Typography>
                  </Stack>
                </Box>
              </Stack>
              <IconButton onClick={onClose} sx={{ color: 'white' }}><CloseOutlined /></IconButton>
            </Stack>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>Date</Typography>
                <Typography variant="body2" fontWeight={600}>{record.date || '2026-08-06'}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>Working Hours</Typography>
                <Typography variant="body2" fontWeight={600}>{record.hours || '9h 10m'}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>Distance Covered</Typography>
                <Typography variant="body2" fontWeight={600} color="warning.light">{record.distance || '42.8 KM'}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>Status</Typography>
                <Box mt={0.25}>
                  <Chip label={record.status || 'Present'} size="small" color={record.status === 'Present' ? 'success' : 'warning'} />
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Navigation Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white' }}>
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ px: 2 }}
            >
              <Tab label="Profile" icon={<UserOutlined />} iconPosition="start" />
              <Tab label="Attendance Logs" icon={<ClockCircleOutlined />} iconPosition="start" />
              <Tab label="Login / Logout Photos" icon={<EyeOutlined />} iconPosition="start" />
              <Tab label="GPS Timeline & Route Map" icon={<EnvironmentOutlined />} iconPosition="start" />
              <Tab label="Expenses" icon={<FileTextOutlined />} iconPosition="start" />
              <Tab label="Dealer Visits" icon={<ShopOutlined />} iconPosition="start" />
              <Tab label="Performance" icon={<CheckCircleOutlined />} iconPosition="start" />
            </Tabs>
          </Box>

          {/* Tab Contents */}
          <Box sx={{ p: 3, flex: 1, overflowY: 'auto' }}>
            {/* TAB 0: PROFILE */}
            {activeTab === 0 && (
              <Stack spacing={3}>
                <MainCard title="Employee Information">
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={4}>
                      <Typography variant="caption" color="textSecondary">Employee Code</Typography>
                      <Typography variant="body1" fontWeight={600}>{record.employeeId || 'EMP-102'}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Typography variant="caption" color="textSecondary">Full Name</Typography>
                      <Typography variant="body1" fontWeight={600}>{record.employeeName || 'Rahul Sharma'}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Typography variant="caption" color="textSecondary">Designation</Typography>
                      <Typography variant="body1" fontWeight={600}>Senior Sales Officer</Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Typography variant="caption" color="textSecondary">Distributor / Depot</Typography>
                      <Typography variant="body1" fontWeight={600}>{record.distributor || 'Central Gujarat Depot'}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Typography variant="caption" color="textSecondary">Mobile Number</Typography>
                      <Typography variant="body1" fontWeight={600}>+91 98765 43210</Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Typography variant="caption" color="textSecondary">Assigned Vehicle</Typography>
                      <Typography variant="body1" fontWeight={600}>Hero Splendor (GJ-02-AB-1234)</Typography>
                    </Grid>
                  </Grid>
                </MainCard>

                <MainCard title="Monthly Distance Statistics">
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.lighter' }}>
                        <Typography variant="caption" color="primary.main">Today's Distance</Typography>
                        <Typography variant="h5" fontWeight={700} color="primary.main" mt={0.5}>{record.distance || '42.8 KM'}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.lighter' }}>
                        <Typography variant="caption" color="success.main">Weekly Total</Typography>
                        <Typography variant="h5" fontWeight={700} color="success.main" mt={0.5}>245.5 KM</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.lighter' }}>
                        <Typography variant="caption" color="warning.main">Monthly Total</Typography>
                        <Typography variant="h5" fontWeight={700} color="warning.main" mt={0.5}>980.2 KM</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'info.lighter' }}>
                        <Typography variant="caption" color="info.main">Daily Average</Typography>
                        <Typography variant="h5" fontWeight={700} color="info.main" mt={0.5}>44.5 KM/day</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </MainCard>
              </Stack>
            )}

            {/* TAB 1: ATTENDANCE LOGS */}
            {activeTab === 1 && (
              <Stack spacing={3}>
                <MainCard title="Punch Summary">
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Paper sx={{ p: 2.5, bgcolor: 'success.lighter', border: '1px solid', borderColor: 'success.light' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Box>
                            <Typography variant="caption" color="success.dark" fontWeight={600}>LOGIN PUNCH</Typography>
                            <Typography variant="h4" color="success.dark" fontWeight={700} mt={0.5}>{record.loginTime || '09:15 AM'}</Typography>
                            <Typography variant="body2" color="textSecondary" mt={1}>{record.gps || '24.1724° N, 72.4346° E (Palanpur)'}</Typography>
                          </Box>
                          <Avatar sx={{ bgcolor: 'success.main', width: 44, height: 44 }}><ClockCircleOutlined /></Avatar>
                        </Stack>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Paper sx={{ p: 2.5, bgcolor: 'warning.lighter', border: '1px solid', borderColor: 'warning.light' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Box>
                            <Typography variant="caption" color="warning.dark" fontWeight={600}>LOGOUT PUNCH</Typography>
                            <Typography variant="h4" color="warning.dark" fontWeight={700} mt={0.5}>{record.logoutTime || '06:25 PM'}</Typography>
                            <Typography variant="body2" color="textSecondary" mt={1}>23.0390° N, 72.5310° E (Ahmedabad Depot)</Typography>
                          </Box>
                          <Avatar sx={{ bgcolor: 'warning.main', width: 44, height: 44 }}><ClockCircleOutlined /></Avatar>
                        </Stack>
                      </Paper>
                    </Grid>
                  </Grid>
                </MainCard>
              </Stack>
            )}

            {/* TAB 2: PHOTOS */}
            {activeTab === 2 && (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <MainCard title="Login Photo Verification">
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Box
                        component="img"
                        src={defaultLoginSelfie}
                        alt="Login Selfie"
                        sx={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 2, mb: 2, border: '2px solid #e2e8f0', cursor: 'pointer' }}
                        onClick={() => setPreviewImage({ title: 'Login Selfie Photo', src: defaultLoginSelfie })}
                      />
                      <Typography variant="subtitle2" fontWeight={600}>Captured at {record.loginTime || '09:15 AM'}</Typography>
                      <Typography variant="caption" color="textSecondary" display="block" mb={2}>GPS: {record.gps || '24.1724° N, 72.4346° E'}</Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<EyeOutlined />}
                        onClick={() => setPreviewImage({ title: 'Login Selfie Photo', src: defaultLoginSelfie })}
                      >
                        View Full Image & Zoom
                      </Button>
                    </Box>
                  </MainCard>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <MainCard title="Logout Photo Verification">
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Box
                        component="img"
                        src={defaultLogoutSelfie}
                        alt="Logout Selfie"
                        sx={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 2, mb: 2, border: '2px solid #e2e8f0', cursor: 'pointer' }}
                        onClick={() => setPreviewImage({ title: 'Logout Selfie Photo', src: defaultLogoutSelfie })}
                      />
                      <Typography variant="subtitle2" fontWeight={600}>Captured at {record.logoutTime || '06:25 PM'}</Typography>
                      <Typography variant="caption" color="textSecondary" display="block" mb={2}>GPS: 23.0390° N, 72.5310° E</Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<EyeOutlined />}
                        onClick={() => setPreviewImage({ title: 'Logout Selfie Photo', src: defaultLogoutSelfie })}
                      >
                        View Full Image & Zoom
                      </Button>
                    </Box>
                  </MainCard>
                </Grid>
              </Grid>
            )}

            {/* TAB 3: GPS TIMELINE & ROUTE MAP */}
            {activeTab === 3 && (
              <Grid container spacing={3}>
                {/* Timeline Tree */}
                <Grid item xs={12} md={6}>
                  <MainCard title="Chronological Activity Timeline">
                    <Stack spacing={2.5}>
                      {mockTimeline.map((item, idx) => (
                        <Box key={idx} sx={{ display: 'flex', gap: 2, position: 'relative' }}>
                          {idx < mockTimeline.length - 1 && (
                            <Box sx={{ position: 'absolute', left: 15, top: 32, bottom: -16, width: 2, bgcolor: 'primary.light', opacity: 0.4 }} />
                          )}
                          <Avatar sx={{ bgcolor: item.type === 'login' ? 'success.main' : item.type === 'logout' ? 'error.main' : 'primary.main', width: 32, height: 32 }}>
                            <MapPin size={16} />
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Typography variant="subtitle2" fontWeight={600}>{item.title}</Typography>
                              <Chip label={item.time} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem' }} />
                            </Stack>
                            <Typography variant="body2" color="textSecondary" mt={0.5}>{item.location}</Typography>
                            <Typography variant="caption" color="primary.main" fontFamily="monospace">{item.coords} | Cumulative: {item.distance}</Typography>
                            {item.remarks && (
                              <Paper sx={{ p: 1, bgcolor: 'grey.50', mt: 1, borderLeft: '3px solid #10b981' }}>
                                <Typography variant="caption" color="textPrimary"><strong>Note:</strong> {item.remarks}</Typography>
                              </Paper>
                            )}
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </MainCard>
                </Grid>

                {/* Map Polyline Route Visualization */}
                <Grid item xs={12} md={6}>
                  <MainCard title="Field Travel Route Map (42.8 KM Total)" sx={{ height: '100%', minHeight: 450 }}>
                    <Box sx={{
                      bgcolor: 'grey.100',
                      height: 400,
                      borderRadius: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <Box sx={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
                        backgroundSize: '24px 24px', opacity: 0.6
                      }} />

                      {/* Route Path SVG */}
                      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                        <path d="M 40,80 Q 120,40 180,140 T 260,220 T 320,120 T 380,320" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="6 6" />
                        <circle cx="40" cy="80" r="10" fill="#10b981" />
                        <circle cx="180" cy="140" r="8" fill="#0ea5e9" />
                        <circle cx="260" cy="220" r="8" fill="#0ea5e9" />
                        <circle cx="320" cy="120" r="8" fill="#f59e0b" />
                        <circle cx="380" cy="320" r="10" fill="#ef4444" />
                      </svg>

                      <Navigation size={40} className="text-emerald-600 mb-2 z-10" />
                      <Typography variant="subtitle1" fontWeight={600} sx={{ zIndex: 10 }}>Palanpur ➔ Anand ➔ Ahmedabad Route</Typography>
                      <Typography variant="caption" color="textSecondary" sx={{ zIndex: 10, mt: 0.5 }}>Green Line = Field Path Travelled | Pins = Dealer Visits</Typography>
                    </Box>
                  </MainCard>
                </Grid>
              </Grid>
            )}

            {/* TAB 4: EXPENSES */}
            {activeTab === 4 && (
              <MainCard title="Today's Claimed Expenses">
                <DataTable
                  rows={[
                    { id: 1, mode: 'Bike', category: 'Fuel', description: '65 KM Field Travel @ ₹4/KM', amount: 260, status: 'Approved' },
                    { id: 2, mode: 'Food', category: 'Food', description: 'Highway Plaza Lunch', amount: 180, status: 'Approved' },
                    { id: 3, mode: 'Toll', category: 'Toll', description: 'NH-27 Express Toll', amount: 95, status: 'Pending' }
                  ]}
                  columns={[
                    { field: 'mode', headerName: 'Travel Mode', flex: 1 },
                    { field: 'category', headerName: 'Category', flex: 1 },
                    { field: 'description', headerName: 'Details', flex: 2 },
                    { field: 'amount', headerName: 'Amount', flex: 1, renderCell: (params) => formatINR(params.value) },
                    { field: 'status', headerName: 'Status', flex: 1, renderCell: (params) => (
                      <Chip label={params.value} color={params.value === 'Approved' ? 'success' : 'warning'} size="small" />
                    )}
                  ]}
                  hideFooter
                />
              </MainCard>
            )}

            {/* TAB 5: DEALER VISITS */}
            {activeTab === 5 && (
              <MainCard title="Verified Dealer Visits Today (3 Visits)">
                <DataTable
                  rows={[
                    { id: 1, name: 'Kisan Agro Center', arrival: '09:45 AM', departure: '10:15 AM', location: 'Palanpur', remarks: 'Order placed: ₹65,000' },
                    { id: 2, name: 'Royal Agro Traders', arrival: '11:45 AM', departure: '12:30 PM', location: 'Anand', remarks: 'Cheque collected ₹45,000' },
                    { id: 3, name: 'Jay Jawan Fertilizer', arrival: '03:40 PM', departure: '04:30 PM', location: 'Ahmedabad', remarks: 'Sample demo completed' }
                  ]}
                  columns={[
                    { field: 'name', headerName: 'Dealer Name', flex: 1.5, renderCell: (params) => <Typography fontWeight={600}>{params.value}</Typography> },
                    { field: 'arrival', headerName: 'Arrival', flex: 1 },
                    { field: 'departure', headerName: 'Departure', flex: 1 },
                    { field: 'location', headerName: 'Location', flex: 1 },
                    { field: 'remarks', headerName: 'Outcome', flex: 2 }
                  ]}
                  hideFooter
                />
              </MainCard>
            )}

            {/* TAB 6: PERFORMANCE */}
            {activeTab === 6 && (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.lighter' }}>
                    <Typography variant="caption" color="textSecondary" textTransform="uppercase">Target vs Achieved</Typography>
                    <Typography variant="h4" fontWeight={700} color="primary.main" mt={1}>₹3.2 L / ₹4.0 L</Typography>
                    <Chip label="80% Achieved" color="primary" size="small" sx={{ mt: 1.5 }} />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'success.lighter' }}>
                    <Typography variant="caption" color="textSecondary" textTransform="uppercase">Monthly Dealer Visits</Typography>
                    <Typography variant="h4" fontWeight={700} color="success.main" mt={1}>48 Visits</Typography>
                    <Chip label="+12% vs last month" color="success" size="small" sx={{ mt: 1.5 }} />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'info.lighter' }}>
                    <Typography variant="caption" color="textSecondary" textTransform="uppercase">Punctuality Score</Typography>
                    <Typography variant="h4" fontWeight={700} color="info.main" mt={1}>96.4%</Typography>
                    <Chip label="Top Performer" color="info" size="small" sx={{ mt: 1.5 }} />
                  </Paper>
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
      </Drawer>

      {/* Lightbox Modal for Photo Previews */}
      <ImageLightboxModal
        open={Boolean(previewImage)}
        onClose={() => setPreviewImage(null)}
        title={previewImage?.title}
        imageSrc={previewImage?.src}
      />
    </>
  );
}
