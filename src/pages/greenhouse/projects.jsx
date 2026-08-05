import { useState, useEffect } from 'react';
import { Grid, Typography, Box, Stack, Button, Chip } from '@mui/material';
import { PlusOutlined, ExperimentOutlined, BuildOutlined, CheckCircleOutlined } from '@ant-design/icons';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import api from 'api/client';
import ProjectDetailDrawer from './ProjectDetailDrawer';

const statusColors = {
  'New': 'info',
  'Site Visit': 'warning',
  'Quotation': 'primary',
  'Subsidy/Loan Approval': 'secondary',
  'Approved': 'success',
  'Designing': 'secondary',
  'Material Dispatch': 'warning',
  'Installation': 'info',
  'Completed': 'success',
  'Lost': 'error'
};

export default function GreenhouseProjects() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      // Mocking fetch or using actual API
      const res = await api.get('/greenhouse/leads/');
      setLeads(res.data);
    } catch (err) {
      console.error(err);
      // Fallback Mock Data for UI testing
      setLeads([
        { id: 1, farmer_name: 'Ramesh Bhai', village: 'Visnagar', land_area: '2 Acres', status: 'Site Visit', phone: '+91 9876543210' },
        { id: 2, farmer_name: 'Suresh Patel', village: 'Mehsana', land_area: '5 Acres', status: 'Completed', phone: '+91 9123456780' },
        { id: 3, farmer_name: 'Kamlesh Desai', village: 'Unjha', land_area: '1 Acre', status: 'Approved', phone: '+91 9988776655' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const columns = [
    { field: 'farmer_name', headerName: 'Farmer Name', flex: 1, minWidth: 150 },
    { field: 'phone', headerName: 'Contact', flex: 1, minWidth: 120 },
    { field: 'village', headerName: 'Village/Location', flex: 1, minWidth: 120 },
    { field: 'land_area', headerName: 'Land Area', flex: 0.8, minWidth: 100 },
    { 
      field: 'status', 
      headerName: 'Current Stage', 
      flex: 1, 
      minWidth: 150,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          color={statusColors[params.value] || 'default'} 
          size="small" 
          variant="outlined" 
        />
      )
    },
  ];

  const handleRowClick = (params) => {
    setSelectedProject(params.row);
    setDrawerOpen(true);
  };

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5">Greenhouse Projects Hub</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Manage full lifecycle from Lead and Subsidy to Construction and AMC.
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<PlusOutlined />}>
            New Lead
          </Button>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6} lg={4}>
        <AnalyticEcommerce title="Active Leads" count="12" icon={<ExperimentOutlined />} color="primary" />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <AnalyticEcommerce title="Under Construction" count="5" icon={<BuildOutlined />} color="warning" />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <AnalyticEcommerce title="Active AMCs" count="24" icon={<CheckCircleOutlined />} color="success" />
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ height: 600 }}>
          <EnterpriseTable 
            rows={leads}
            columns={columns}
            loading={loading}
            onRowClick={handleRowClick}
            title="Projects Portfolio"
          />
        </Box>
      </Grid>

      {/* Drawer for Project Details and Timeline */}
      <ProjectDetailDrawer 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        project={selectedProject}
      />
    </Grid>
  );
}
