import { useState, useEffect } from 'react';
import { Grid, Typography, Box, Stack, Button, Chip } from '@mui/material';
import { PlusOutlined, UserOutlined, EnvironmentOutlined } from '@ant-design/icons';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import api from 'api/client';

export default function FarmersDirectory() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFarmers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/farmers/profiles/');
      setFarmers(res.data);
    } catch (err) {
      console.error(err);
      // Fallback Mock Data for UI testing
      setFarmers([
        { id: 1, name: 'Ashok Patel', phone: '+91 9988776655', village: 'Visnagar', taluka: 'Mehsana', crop: 'Cotton', land_area: '5 Acres', greenhouse_interest: true },
        { id: 2, name: 'Sanjay Rajput', phone: '+91 9123456780', village: 'Unjha', taluka: 'Mehsana', crop: 'Cumin', land_area: '2 Acres', greenhouse_interest: false },
        { id: 3, name: 'Dinesh Thakor', phone: '+91 9876543210', village: 'Patan', taluka: 'Patan', crop: 'Wheat', land_area: '10 Acres', greenhouse_interest: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  const columns = [
    { field: 'name', headerName: 'Farmer Name', flex: 1, minWidth: 150 },
    { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 120 },
    { field: 'village', headerName: 'Village', flex: 1, minWidth: 100 },
    { field: 'taluka', headerName: 'Taluka', flex: 1, minWidth: 100 },
    { field: 'crop', headerName: 'Primary Crop', flex: 1, minWidth: 100 },
    { field: 'land_area', headerName: 'Land Area', flex: 1, minWidth: 100 },
    { 
      field: 'greenhouse_interest', 
      headerName: 'Greenhouse Interest', 
      flex: 1, 
      minWidth: 150,
      renderCell: (params) => (
        <Chip 
          label={params.value ? 'Interested' : 'Not Interested'} 
          color={params.value ? 'success' : 'default'} 
          size="small" 
          variant="outlined" 
        />
      )
    },
  ];

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5">Farmer CRM Directory</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Manage farmer profiles, land details, crop histories, and service visits.
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<PlusOutlined />}>
            Add Farmer
          </Button>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6} lg={4}>
        <AnalyticEcommerce title="Total Farmers" count="1,245" icon={<UserOutlined />} color="primary" />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <AnalyticEcommerce title="Villages Covered" count="34" icon={<EnvironmentOutlined />} color="warning" />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <AnalyticEcommerce title="Greenhouse Prospects" count="156" icon={<PlusOutlined />} color="success" />
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ height: 600 }}>
          <EnterpriseTable 
            rows={farmers}
            columns={columns}
            loading={loading}
            title="All Farmers"
          />
        </Box>
      </Grid>
    </Grid>
  );
}
