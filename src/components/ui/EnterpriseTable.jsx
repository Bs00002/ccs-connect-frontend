import React, { useState } from 'react';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

export default function EnterpriseTable({
  rows,
  columns,
  loading = false,
  title,
  actions = [],
  rowActions = [],
  onRowClick,
  checkboxSelection = false,
  ...props
}) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const processedColumns = [...columns];
  if (rowActions.length > 0) {
    processedColumns.push({
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      getActions: (params) => {
        return rowActions.map((action, index) => (
          <GridActionsCellItem
            key={index}
            icon={action.icon}
            label={action.label}
            onClick={() => action.onClick(params.row)}
            showInMenu={action.showInMenu}
          />
        ));
      },
    });
  }

  return (
    <div className="flex flex-col w-full h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {title && (
        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-white">
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'text.primary', letterSpacing: '-0.01em' }}>
            {title}
          </Typography>
          <Box className="flex items-center gap-3">
            {actions}
          </Box>
        </div>
      )}
      <div className="flex-grow w-full min-h-[400px]">
        <DataGrid
          rows={rows}
          columns={processedColumns}
          loading={loading}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50, 100]}
          checkboxSelection={checkboxSelection}
          disableRowSelectionOnClick
          onRowClick={onRowClick}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              printOptions: { disableToolbarButton: true },
              csvOptions: { disableToolbarButton: true },
            },
          }}
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f8fafc', // slate-50
              borderBottom: '1px solid #e2e8f0', // slate-200
              color: '#475569', // slate-600
              fontSize: '0.8125rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.025em',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f1f5f9', // slate-100
              cursor: onRowClick ? 'pointer' : 'default',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f1f5f9',
              color: '#334155', // slate-700
              fontSize: '0.875rem',
            },
            '& .MuiDataGrid-toolbarContainer': {
              padding: '12px 20px',
              borderBottom: '1px solid #f1f5f9',
            },
            '& .MuiButton-root': {
              color: '#0f172a',
              fontWeight: 500,
            }
          }}
          {...props}
        />
      </div>
    </div>
  );
}
