import PropTypes from 'prop-types';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';

// ==============================|| REUSABLE DATA TABLE ||============================== //

export default function DataTable({ rows, columns, loading = false, ...props }) {
  return (
    <Box sx={{ width: '100%', overflowX: 'auto', bgcolor: 'background.paper' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        autoHeight
        sx={{
          border: 'none',
          '& .MuiDataGrid-cell': {
            borderColor: 'divider',
          },
          '& .MuiDataGrid-columnHeaders': {
            bgcolor: 'grey.50',
            borderBottom: 1,
            borderColor: 'divider',
          },
          '& .MuiDataGrid-toolbarContainer': {
            p: 2,
          }
        }}
        {...props}
      />
    </Box>
  );
}

DataTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  loading: PropTypes.bool
};
