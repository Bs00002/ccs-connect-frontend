import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Stack, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Chip, Paper, TextField, InputAdornment, Button } from '@mui/material';
import MainCard from 'components/MainCard';
import { EnvironmentOutlined, ClockCircleOutlined, SyncOutlined, SearchOutlined } from '@ant-design/icons';
import { Navigation, MapPin, Gauge, ShieldCheck, CheckCircle2 } from 'lucide-react';

const initialStaff = [
  {
    id: 1,
    name: 'Rahul Sharma',
    code: 'EMP-102',
    role: 'Senior Sales Officer',
    depot: 'Central Gujarat Depot',
    lastUpdated: '10 seconds ago',
    speed: '42 km/h',
    distance: '42.8 KM',
    location: 'S G Highway, Ahmedabad',
    coords: '23.0315° N, 72.5255° E',
    status: 'Moving',
    visitedDealers: 3,
    totalDealersPlanned: 4,
    battery: '88%'
  },
  {
    id: 2,
    name: 'Vikram Singh',
    code: 'EMP-105',
    role: 'Area Sales Manager',
    depot: 'Surat Agritech Hub',
    lastUpdated: '2 mins ago',
    speed: '0 km/h (Stationary)',
    distance: '28.5 KM',
    location: 'Royal Agro Store, Surat',
    coords: '21.1702° N, 72.8311° E',
    status: 'In Visit',
    visitedDealers: 2,
    totalDealersPlanned: 3,
    battery: '64%'
  },
  {
    id: 3,
    name: 'Suresh Verma',
    code: 'EMP-112',
    role: 'Territory Executive',
    depot: 'Vadodara Regional Warehouse',
    lastUpdated: '1 min ago',
    speed: '35 km/h',
    distance: '36.2 KM',
    location: 'Alkapuri, Vadodara',
    coords: '22.3072° N, 73.1812° E',
    status: 'Moving',
    visitedDealers: 4,
    totalDealersPlanned: 5,
    battery: '92%'
  }
];

export default function LiveTrackingAdmin() {
  const [activeStaff, setActiveStaff] = useState(initialStaff);
  const [selectedStaff, setSelectedStaff] = useState(initialStaff[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // Live simulation ticker for moving marker coordinates
  const [markerPos, setMarkerPos] = useState({ x: 380, y: 240 });

  useEffect(() => {
    const interval = setInterval(() => {
      setMarkerPos(prev => ({
        x: prev.x + (Math.random() > 0.5 ? 2 : -2),
        y: prev.y + (Math.random() > 0.5 ? 2 : -2)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredStaff = activeStaff.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mb={2} flexWrap="wrap" gap={2}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Live Field Tracking & GPS Monitoring</Typography>
          <Typography variant="body2" color="textSecondary">
            Monitor real-time field staff movement, speed, visited dealers, and travel route polylines.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Chip icon={<SyncOutlined spin />} label="Live Stream Active (Every 10s)" color="success" sx={{ fontWeight: 600 }} />
        </Stack>
      </Stack>

      <Grid container spacing={3} sx={{ flex: 1, minHeight: 0 }}>
        {/* Left Side: List of Active Staff */}
        <Grid item xs={12} md={4} lg={3.5} sx={{ height: '100%' }}>
          <MainCard content={false} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'grey.50' }}>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                Active Field Staff ({activeStaff.length})
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Search staff name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{ startAdornment: <SearchOutlined style={{ marginRight: 8, color: 'gray' }} /> }}
              />
            </Box>

            <List disablePadding sx={{ flex: 1, overflowY: 'auto' }}>
              {filteredStaff.map((staff, idx) => {
                const isSelected = selectedStaff.id === staff.id;
                return (
                  <React.Fragment key={staff.id}>
                    <ListItem
                      button
                      onClick={() => setSelectedStaff(staff)}
                      sx={{
                        py: 2,
                        px: 2,
                        bgcolor: isSelected ? 'primary.lighter' : 'transparent',
                        borderLeft: isSelected ? '4px solid #10b981' : 'none',
                        '&:hover': { bgcolor: 'primary.50' }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: isSelected ? 'primary.main' : 'grey.400', width: 42, height: 42 }}>
                          {staff.name.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="subtitle2" fontWeight={700}>{staff.name}</Typography>
                            <Chip
                              label={staff.status}
                              size="small"
                              color={staff.status === 'Moving' ? 'success' : staff.status === 'In Visit' ? 'warning' : 'default'}
                              sx={{ height: 20, fontSize: '0.7rem', fontWeight: 600 }}
                            />
                          </Stack>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                              <MapPin size={14} className="text-emerald-600" />
                              <Typography variant="caption" color="textPrimary" noWrap>{staff.location}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Typography variant="caption" color="primary.main" fontWeight={700}>
                                {staff.distance} | {staff.speed}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                {staff.lastUpdated}
                              </Typography>
                            </Stack>
                          </Box>
                        }
                      />
                    </ListItem>
                    {idx < filteredStaff.length - 1 && <Divider />}
                  </React.Fragment>
                );
              })}
            </List>
          </MainCard>
        </Grid>

        {/* Right Side: Map Area & Live Stats Overlay */}
        <Grid item xs={12} md={8} lg={8.5} sx={{ height: '100%' }}>
          <MainCard content={false} sx={{ height: '100%', overflow: 'hidden', position: 'relative' }}>
            {/* Overlay Info Header */}
            <Paper
              elevation={4}
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                right: 16,
                zIndex: 20,
                p: 2,
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                borderRadius: 2
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ bgcolor: 'primary.main' }}>{selectedStaff.name.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700}>{selectedStaff.name}</Typography>
                      <Typography variant="caption" color="textSecondary">{selectedStaff.code} | {selectedStaff.depot}</Typography>
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={6} sm={2}>
                  <Typography variant="caption" color="textSecondary">Current Speed</Typography>
                  <Typography variant="body1" fontWeight={700} color="primary.main">{selectedStaff.speed}</Typography>
                </Grid>

                <Grid item xs={6} sm={2}>
                  <Typography variant="caption" color="textSecondary">Distance Covered</Typography>
                  <Typography variant="body1" fontWeight={700} color="success.main">{selectedStaff.distance}</Typography>
                </Grid>

                <Grid item xs={6} sm={2}>
                  <Typography variant="caption" color="textSecondary">Dealer Visits</Typography>
                  <Typography variant="body1" fontWeight={700} color="warning.dark">
                    {selectedStaff.visitedDealers} / {selectedStaff.totalDealersPlanned} Completed
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={2}>
                  <Typography variant="caption" color="textSecondary">Phone Battery</Typography>
                  <Typography variant="body1" fontWeight={700} color="info.main">{selectedStaff.battery}</Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Map Canvas View */}
            <Box sx={{
              bgcolor: '#e2e8f0',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Map Background Pattern */}
              <Box sx={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 1.5px)',
                backgroundSize: '28px 28px',
                opacity: 0.5
              }} />

              {/* Dynamic Interactive Polyline Route */}
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
                {/* Green Route Line */}
                <path
                  d="M 120,120 L 220,180 L 300,160 L 380,240 L 520,320 L 680,280"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="8 8"
                />

                {/* Login Pin */}
                <circle cx="120" cy="120" r="10" fill="#10b981" />
                <text x="110" y="100" fill="#0f172a" fontSize="12" fontWeight="bold">Login (09:15 AM)</text>

                {/* Dealer Visit Pins */}
                <circle cx="220" cy="180" r="8" fill="#0ea5e9" />
                <text x="210" y="165" fill="#0369a1" fontSize="11" fontWeight="bold">Kisan Agro</text>

                <circle cx="300" cy="160" r="8" fill="#0ea5e9" />
                <text x="290" y="145" fill="#0369a1" fontSize="11" fontWeight="bold">Royal Agro</text>

                {/* Live Moving Marker Pin with Pulsing Ripple */}
                <circle cx={markerPos.x} cy={markerPos.y} r="22" fill="#10b981" fillOpacity="0.25">
                  <animate attributeName="r" from="14" to="28" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx={markerPos.x} cy={markerPos.y} r="10" fill="#10b981" stroke="#ffffff" strokeWidth="3" />
                <text x={markerPos.x - 45} y={markerPos.y - 18} fill="#15803d" fontSize="12" fontWeight="bold">
                  {selectedStaff.name} ({selectedStaff.speed})
                </text>
              </svg>

              {/* Center Map Tag */}
              <Box sx={{ zIndex: 10, textAlign: 'center', pointerEvents: 'none', mt: 10 }}>
                <Navigation size={48} className="text-emerald-600 mb-2 mx-auto animate-bounce" />
                <Typography variant="h6" color="textPrimary" fontWeight={600}>Live Interactive GPS Map Engine</Typography>
                <Typography variant="body2" color="textSecondary">Tracking {selectedStaff.name} on {selectedStaff.location}</Typography>
              </Box>
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
}
