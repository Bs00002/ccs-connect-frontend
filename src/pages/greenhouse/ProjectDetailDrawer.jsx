import React from 'react';
import { 
  Drawer, Box, Typography, Stack, IconButton, Divider, 
  Stepper, Step, StepLabel, StepContent, Button, Paper, Chip 
} from '@mui/material';
import { CloseOutlined, EnvironmentOutlined, PhoneOutlined, BankOutlined, ToolOutlined, ScheduleOutlined } from '@ant-design/icons';

const stages = [
  { label: 'Site Visit & Survey', icon: <EnvironmentOutlined />, description: 'Initial land survey and GPS mapping' },
  { label: 'Quotation Sent', icon: <PhoneOutlined />, description: 'Quotation amount generated and shared' },
  { label: 'Subsidy & Loan', icon: <BankOutlined />, description: 'Bank loan and Govt. subsidy processing' },
  { label: 'Material Dispatch & Installation', icon: <ToolOutlined />, description: 'Construction timeline and materials' },
  { label: 'Completion & AMC', icon: <ScheduleOutlined />, description: 'Service visits, crop advisory, and warranty' },
];

export default function ProjectDetailDrawer({ open, onClose, project }) {
  if (!project) return null;

  // Determine active step based on status
  let activeStep = 0;
  if (project.status === 'Quotation') activeStep = 1;
  if (project.status === 'Subsidy/Loan Approval' || project.status === 'Approved') activeStep = 2;
  if (['Designing', 'Material Dispatch', 'Installation'].includes(project.status)) activeStep = 3;
  if (project.status === 'Completed') activeStep = 4;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: '100%', sm: 600 }, p: 0 } }}
    >
      <Box sx={{ p: 3, bgcolor: 'primary.lighter', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h4" gutterBottom>
              {project.farmer_name}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <EnvironmentOutlined style={{ color: 'gray' }} />
              <Typography variant="body1" color="text.secondary">
                {project.village} • {project.land_area}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
              <PhoneOutlined style={{ color: 'gray' }} />
              <Typography variant="body2" color="text.secondary">
                {project.phone}
              </Typography>
            </Stack>
          </Box>
          <IconButton onClick={onClose}><CloseOutlined /></IconButton>
        </Stack>
      </Box>

      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Project Lifecycle Tracker</Typography>
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {stages.map((step, index) => (
              <Step key={step.label}>
                <StepLabel StepIconComponent={() => <Box sx={{ color: index <= activeStep ? 'primary.main' : 'text.disabled', fontSize: 24 }}>{step.icon}</Box>}>
                  <Typography variant="subtitle1" fontWeight={index === activeStep ? 600 : 400}>
                    {step.label}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {step.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {index === 0 && (
                      <Stack direction="row" spacing={1}>
                        <Button variant="outlined" size="small">Upload Survey</Button>
                        <Button variant="outlined" size="small" color="secondary">Add GPS Pin</Button>
                      </Stack>
                    )}
                    {index === 2 && (
                      <Stack direction="row" spacing={1}>
                        <Chip label="Loan: Pending" color="warning" size="small" />
                        <Chip label="Subsidy: Applied" color="info" size="small" />
                      </Stack>
                    )}
                    {index === 3 && (
                      <Stack spacing={1}>
                        <Typography variant="caption">Dispatch Date: Pending</Typography>
                        <Button variant="contained" size="small" sx={{ width: 'fit-content' }}>Mark Material Dispatched</Button>
                      </Stack>
                    )}
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Paper>
      </Box>
    </Drawer>
  );
}
