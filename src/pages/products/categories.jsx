import { useState, useEffect, useMemo } from 'react';
import {
  Grid, Typography, Box, Stack, TextField, InputAdornment, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  IconButton, Tooltip, Avatar, Divider, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';

import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import api from 'api/client';

import {
  SearchOutlined, PlusOutlined, ExportOutlined, EditOutlined, DeleteOutlined,
  AppstoreOutlined, RiseOutlined
} from '@ant-design/icons';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/products/categories/');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async () => {
    try {
      if (editCategory.id) {
        await api.put(`/products/categories/${editCategory.id}/`, editCategory);
      } else {
        await api.post('/products/categories/', editCategory);
      }
      setOpenDialog(false);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await api.delete(`/products/categories/${id}/`);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const kpis = useMemo(() => ({
    total: categories.length,
  }), [categories]);

  const filtered = useMemo(() => {
    if (!search) return categories;
    const s = search.toLowerCase();
    return categories.filter(c => c.name.toLowerCase().includes(s) || (c.description || '').toLowerCase().includes(s));
  }, [search, categories]);

  const pagedData = useMemo(() => {
    const start = page * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  const openEdit = (cat = null) => {
    setEditCategory(cat || { name: '', description: '' });
    setOpenDialog(true);
  };

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5">Product Categories</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Group and classify crop protection products
            </Typography>
          </Box>
          <Stack direction="row" sx={{ gap: 1.25 }}>
            <Button size="small" variant="outlined" startIcon={<ExportOutlined />}>Export</Button>
            <Button size="small" variant="contained" startIcon={<PlusOutlined />} onClick={() => openEdit()}>New Category</Button>
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="Total Categories" count={kpis.total} icon={<AppstoreOutlined />} color="primary" />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="Active Categories" count={kpis.total} icon={<RiseOutlined />} color="success" />
      </Grid>

      <Grid item xs={12}>
        <MainCard content={false}>
          <Stack sx={{ gap: 2, p: 2 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} sx={{ gap: 2, justifyContent: 'space-between', alignItems: { md: 'center' } }}>
              <TextField
                size="small"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                sx={{ width: { xs: '100%', md: 360 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlined style={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                    </InputAdornment>
                  )
                }}
              />
            </Stack>

            <Divider />

            <TableContainer>
              <Table aria-label="categories table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: 60 }}></TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Category Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pagedData.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>
                        <Avatar sx={{ width: 42, height: 42, borderRadius: 1.5, bgcolor: `primary.lighter`, color: `primary.dark` }}>
                          <AppstoreOutlined />
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{row.name}</Typography>
                        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{row.id}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ maxWidth: 360, color: 'text.secondary' }}>{row.description}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" sx={{ justifyContent: 'flex-end', gap: 0.25 }}>
                          <Tooltip title="Edit">
                            <IconButton size="small" sx={{ color: 'text.secondary' }} onClick={() => openEdit(row)}>
                              <EditOutlined style={{ fontSize: '0.9rem' }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" sx={{ color: 'error.main' }} onClick={() => handleDelete(row.id)}>
                              <DeleteOutlined style={{ fontSize: '0.9rem' }} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                  {pagedData.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 3 }}>No categories found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            
            <Divider />
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={filtered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(_, p) => setPage(p)}
              onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
            />
          </Stack>
        </MainCard>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editCategory?.id ? 'Edit Category' : 'New Category'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField 
              fullWidth label="Category Name" 
              value={editCategory?.name || ''} 
              onChange={e => setEditCategory({...editCategory, name: e.target.value})} 
            />
            <TextField 
              fullWidth label="Description" multiline rows={3}
              value={editCategory?.description || ''} 
              onChange={e => setEditCategory({...editCategory, description: e.target.value})} 
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
