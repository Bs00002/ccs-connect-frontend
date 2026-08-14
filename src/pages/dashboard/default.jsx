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

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token && token.startsWith('mock-')) {
          setData({ mock: true });
          return;
        }
        const res = await api.get('/dashboard/');
        setData(res.data);
      } catch (err) {
        console.error("Dashboard fetch error, using role default state:", err);
        setData({ mock: true });
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchDashboard();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
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

  // Default fallback to Dealer Dashboard if role is missing or generic
  return <DealerDashboard data={data} />;
}

