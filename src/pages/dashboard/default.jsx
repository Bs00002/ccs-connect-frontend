import { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import useAuth from 'hooks/useAuth';
import api from 'api/client';

import AdminDashboard from './AdminDashboard';
import FieldDashboard from './FieldDashboard';
import DealerDashboard from './DealerDashboard';

export default function DashboardDefault() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/dashboard/');
        setData(res.data);
      } catch (err) {
        console.error("Dashboard fetch error", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchDashboard();
    }
  }, [user]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  // Route to the specific role dashboard
  const role = user?.role;
  
  if (role === 'Super Admin' || role === 'Admin') {
    return <AdminDashboard data={data} />;
  } else if (role === 'Distributor' || role === 'Employee' || role === 'Sales Manager') {
    return <FieldDashboard data={data} />;
  } else if (role === 'Dealer') {
    return <DealerDashboard data={data} />;
  }

  return <Typography>Unknown Role</Typography>;
}
