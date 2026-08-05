import React, { useState, useEffect, useMemo } from 'react';
import {
  Grid, Typography, Box, Stack, Drawer, Tabs, Tab, IconButton
} from '@mui/material';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import StatusBadge from 'components/ui/StatusBadge';
import api from 'api/client';
import { formatINR } from 'data/ccsMock';
import {
  Store, CheckCircle2, AlertTriangle, UserPlus, X, Phone, MapPin, 
  Map, FileText, CreditCard, Activity, CalendarClock
} from 'lucide-react';

export default function DealersPage() {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const fetchDealers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/users/?role=Dealer');
      const mapped = res.data.map(d => ({
        id: d.id,
        code: d.ccs_id || '-',
        shopName: d.dealer_profile?.company_name || 'No Shop Name',
        ownerName: `${d.first_name} ${d.last_name}`.trim() || 'Unknown',
        mobile: d.phone || '-',
        email: d.email,
        distributor: d.dealer_profile?.assigned_distributor_name || '-',
        address: d.dealer_profile?.address || '-',
        city: d.dealer_profile?.city || '-',
        district: d.dealer_profile?.district || '-',
        state: d.dealer_profile?.state || '-',
        gst: d.dealer_profile?.gst || '-',
        creditLimit: d.dealer_profile?.credit_limit || 500000,
        outstanding: d.dealer_profile?.outstanding || Math.floor(Math.random() * 200000), // Mock data
        lastVisit: '2 days ago', // Mock
        status: d.status === 'Approved' ? 'Active' : (d.status === 'Pending' ? 'Prospect' : 'Inactive')
      }));
      setDealers(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDealers();
  }, []);

  const kpis = useMemo(() => ({
    total: dealers.length,
    active: dealers.filter(d => d.status === 'Active').length,
    outstanding: dealers.reduce((acc, curr) => acc + (curr.outstanding || 0), 0),
    prospects: dealers.filter(d => d.status === 'Prospect').length
  }), [dealers]);

  const columns = [
    { 
      field: 'shopName', 
      headerName: 'Dealer', 
      flex: 1.5, 
      minWidth: 200,
      renderCell: (params) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0">
            {params.value.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-800">{params.value}</span>
            <span className="text-xs text-slate-500">{params.row.code}</span>
          </div>
        </div>
      )
    },
    { field: 'ownerName', headerName: 'Owner', flex: 1, minWidth: 150 },
    { field: 'mobile', headerName: 'Mobile', flex: 1, minWidth: 120 },
    { field: 'district', headerName: 'Area', flex: 1, minWidth: 120 },
    { field: 'outstanding', headerName: 'Outstanding', flex: 1, minWidth: 120, renderCell: (params) => (
      <span className={`font-semibold ${params.value > (params.row.creditLimit * 0.8) ? 'text-rose-600' : 'text-slate-700'}`}>
        {formatINR(params.value)}
      </span>
    )},
    { field: 'distributor', headerName: 'Distributor', flex: 1.2, minWidth: 150 },
    { 
      field: 'status', 
      headerName: 'Status', 
      flex: 1, 
      minWidth: 120,
      renderCell: (params) => <StatusBadge status={params.value} />
    }
  ];

  const rowActions = [
    {
      label: 'View Profile',
      icon: <CheckCircle2 size={16} />,
      onClick: (row) => openDealerProfile(row),
      showInMenu: true
    }
  ];

  const openDealerProfile = (dealer) => {
    setSelectedDealer(dealer);
    setTabValue(0);
    setDrawerOpen(true);
  };

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
              Dealer Network
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Manage retailer network, view outstanding balances, and track orders.
            </Typography>
          </Box>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm shadow-emerald-600/20 transition-all active:scale-95">
            <UserPlus size={16} />
            Register Dealer
          </button>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="Total Dealers" count={kpis.total} icon={<Store size={20} strokeWidth={2} />} color="primary" />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="Active Dealers" count={kpis.active} icon={<CheckCircle2 size={20} strokeWidth={2} />} color="success" />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="Total Outstanding" count={formatINR(kpis.outstanding)} icon={<AlertTriangle size={20} strokeWidth={2} />} color="warning" />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="Prospects" count={kpis.prospects} icon={<UserPlus size={20} strokeWidth={2} />} color="info" />
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ height: 600 }}>
          <EnterpriseTable 
            rows={dealers}
            columns={columns}
            loading={loading}
            rowActions={rowActions}
            onRowClick={(params) => openDealerProfile(params.row)}
          />
        </Box>
      </Grid>

      {/* Dealer Detail Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: { xs: '100%', sm: 600, md: 700 }, backgroundColor: '#F8FAFC' } }}
      >
        {selectedDealer && (
          <div className="flex flex-col h-full bg-slate-50">
            {/* Drawer Header (Glassmorphic) */}
            <div className="relative px-6 py-8 bg-slate-900 border-b border-slate-800 overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl -ml-10 -mb-10" />
              
              <div className="relative flex justify-between items-start">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-2xl font-bold text-emerald-400">
                    {selectedDealer.shopName.charAt(0)}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={selectedDealer.status} />
                      <span className="text-xs text-slate-400 font-medium">#{selectedDealer.code}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">{selectedDealer.shopName}</h2>
                    <p className="text-sm text-slate-400 font-medium flex items-center gap-1">
                      <MapPin size={14} /> {selectedDealer.district}, {selectedDealer.state}
                    </p>
                  </div>
                </div>
                <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
                  <X size={20} />
                </IconButton>
              </div>

              {/* Quick Contact Chips */}
              <div className="relative mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm">
                  <Phone size={14} className="text-emerald-400" /> {selectedDealer.mobile}
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm">
                  <Store size={14} className="text-indigo-400" /> {selectedDealer.ownerName}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white', px: 2 }}>
              <Tabs 
                value={tabValue} 
                onChange={(e, v) => setTabValue(v)} 
                variant="scrollable"
                sx={{
                  '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '0.875rem', minHeight: 48 },
                  '& .Mui-selected': { color: '#059669' },
                  '& .MuiTabs-indicator': { backgroundColor: '#059669' }
                }}
              >
                <Tab label="Overview" />
                <Tab label="Financials" />
                <Tab label="Orders" />
                <Tab label="Visits" />
              </Tabs>
            </Box>

            {/* Tab Panels */}
            <div className="flex-1 overflow-y-auto p-6">
              
              {tabValue === 0 && (
                <div className="space-y-6">
                  {/* Distributor Assignment */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide flex items-center gap-1 mb-1">
                        <Activity size={14} className="text-emerald-600" /> Assigned Distributor
                      </span>
                      <p className="text-slate-900 font-bold">{selectedDealer.distributor}</p>
                    </div>
                    <button className="text-emerald-600 text-sm font-semibold hover:underline">Change</button>
                  </div>

                  {/* Address Box */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide flex items-center gap-1 mb-3">
                      <Map size={14} className="text-indigo-600" /> Location Details
                    </span>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                      <div className="col-span-2">
                        <p className="text-xs text-slate-500 mb-1">Complete Address</p>
                        <p className="text-sm font-medium text-slate-800">{selectedDealer.address}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">City / Town</p>
                        <p className="text-sm font-medium text-slate-800">{selectedDealer.city}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">District</p>
                        <p className="text-sm font-medium text-slate-800">{selectedDealer.district}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">State</p>
                        <p className="text-sm font-medium text-slate-800">{selectedDealer.state}</p>
                      </div>
                    </div>
                  </div>

                  {/* Legal/KYC */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide flex items-center gap-1 mb-3">
                      <FileText size={14} className="text-rose-600" /> Legal & KYC
                    </span>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">GST Number</p>
                      <p className="text-sm font-medium text-slate-800 font-mono">{selectedDealer.gst}</p>
                    </div>
                  </div>
                </div>
              )}

              {tabValue === 1 && (
                <div className="space-y-6">
                  {/* Financial KPI Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-rose-200 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-rose-50 rounded-bl-full -mr-2 -mt-2" />
                      <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Outstanding</span>
                      <div className="text-2xl font-bold text-rose-600 mt-2">{formatINR(selectedDealer.outstanding)}</div>
                      <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5">
                        <div 
                          className={`h-full rounded-full ${selectedDealer.outstanding > selectedDealer.creditLimit * 0.8 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                          style={{ width: `${Math.min(100, (selectedDealer.outstanding / selectedDealer.creditLimit) * 100)}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full -mr-2 -mt-2" />
                      <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Credit Limit</span>
                      <div className="text-2xl font-bold text-slate-800 mt-2">{formatINR(selectedDealer.creditLimit)}</div>
                      <p className="text-xs text-slate-400 mt-2 flex items-center gap-1"><CreditCard size={12}/> Approved limit</p>
                    </div>
                  </div>

                  {/* Placeholder for Ledger */}
                  <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                      <FileText size={24} className="text-slate-400" />
                    </div>
                    <h3 className="text-slate-800 font-semibold">Ledger & Invoices</h3>
                    <p className="text-sm text-slate-500 mt-1 max-w-xs">Detailed statement of account will be displayed here.</p>
                  </div>
                </div>
              )}

              {tabValue === 2 && (
                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                    <Store size={24} className="text-slate-400" />
                  </div>
                  <h3 className="text-slate-800 font-semibold">Recent Orders</h3>
                  <p className="text-sm text-slate-500 mt-1 max-w-xs">Order history and status tracking will appear here.</p>
                </div>
              )}

              {tabValue === 3 && (
                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                    <CalendarClock size={24} className="text-slate-400" />
                  </div>
                  <h3 className="text-slate-800 font-semibold">Visit History</h3>
                  <p className="text-sm text-slate-500 mt-1 max-w-xs">Logs of visits made by Field Executives.</p>
                </div>
              )}

            </div>
          </div>
        )}
      </Drawer>
    </Grid>
  );
}
