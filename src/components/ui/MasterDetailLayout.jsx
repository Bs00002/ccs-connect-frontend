import React from 'react';
import { Box, Paper } from '@mui/material';

export default function MasterDetailLayout({
  masterContent,
  detailContent,
  masterWidth = 350
}) {
  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 120px)', width: '100%', overflow: 'hidden', borderRadius: 2, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}>
      {/* Master / List Pane */}
      <Paper
        elevation={0}
        sx={{
          width: masterWidth,
          flexShrink: 0,
          bgcolor: '#F3F4F6', // Light gray like CRM
          borderRight: '1px solid',
          borderColor: 'divider',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          borderRadius: 0
        }}
      >
        {masterContent}
      </Paper>

      {/* Detail Pane */}
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          bgcolor: '#FFFFFF',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          borderRadius: 0
        }}
      >
        {detailContent}
      </Paper>
    </Box>
  );
}
