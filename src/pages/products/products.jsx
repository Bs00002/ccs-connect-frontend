import { useState, useEffect, useMemo } from 'react';
import {
  Grid, Typography, Box, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem, Drawer, IconButton
} from '@mui/material';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import StatusBadge from 'components/ui/StatusBadge';
import api from 'api/client';
import useAuth from 'hooks/useAuth';
import { formatINR } from 'data/ccsMock';
import { 
  ShoppingCart, CheckCircle2, AlertCircle, Ban, Edit2, Trash2, X, Plus, Activity, Droplets, Leaf
} from 'lucide-react';

export default function ProductsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Super Admin' || user?.role === 'Admin';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  
  // Slide-over Drawer State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products/products/');
      const mapped = res.data.map(p => ({
        ...p,
        id: p.id,
        name: p.name,
        category: p.category_name || p.category,
        technical_name: p.technical_name || '-',
        packing: p.packing || '-',
        dealer_price: p.dealer_price || 0,
        distributor_price: p.distributor_price || 0,
        mrp: p.mrp || 0,
        gst: p.gst || '18%',
        stock: p.stock || 0,
        benefits: p.benefits || '-',
        dosage: p.dosage || '-',
        crop: p.crop || '-',
        disease: p.disease || '-',
        status: p.status || 'Active'
      }));
      setProducts(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const catRes = await api.get('/products/categories/');
      setCategories(catRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const kpis = useMemo(() => ({
    total: products.length,
    active: products.filter(p => p.status === 'Active').length,
    lowStock: products.filter(p => p.stock > 0 && p.stock <= 50).length,
    discontinued: products.filter(p => p.status === 'Discontinued').length
  }), [products]);

  const columns = [
    { field: 'name', headerName: 'Product', flex: 1.5, minWidth: 200, renderCell: (params) => (
      <div className="flex flex-col">
        <span className="font-semibold text-slate-800">{params.value}</span>
        <span className="text-xs text-slate-500">{params.row.technical_name}</span>
      </div>
    )},
    { field: 'category', headerName: 'Category', flex: 1, minWidth: 120 },
    { field: 'packing', headerName: 'Packing', flex: 0.8, minWidth: 100 },
    { field: 'dealer_price', headerName: 'Price', flex: 1, minWidth: 120, renderCell: (params) => (
      <span className="font-medium text-slate-700">{formatINR(params.value)}</span>
    )},
    { 
      field: 'stock', 
      headerName: 'Stock', 
      flex: 1, 
      minWidth: 150,
      renderCell: (params) => {
        const percentage = Math.min(100, Math.max(0, (params.value / 500) * 100)); // Mocking 500 as max stock
        return (
          <div className="flex flex-col w-full gap-1">
            <div className="flex justify-between items-center text-xs">
              <span className={params.value <= 50 ? 'text-amber-600 font-bold' : 'text-slate-600'}>
                {params.value} units
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-full rounded-full ${params.value <= 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      }
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      flex: 1, 
      minWidth: 120,
      renderCell: (params) => <StatusBadge status={params.value} />
    }
  ];

  const rowActions = isAdmin ? [
    {
      label: 'Edit',
      icon: <Edit2 size={16} />,
      onClick: (row) => openEdit(row),
      showInMenu: true
    },
    {
      label: 'Delete',
      icon: <Trash2 size={16} className="text-rose-500" />,
      onClick: (row) => console.log('Delete', row),
      showInMenu: true
    }
  ] : [];

  const openEdit = (product = null) => {
    setEditProduct(product || {
      name: '', category: '', technical_name: '', packing: '',
      dealer_price: 0, distributor_price: 0, mrp: 0, gst: '18%', stock: 0,
      benefits: '', dosage: '', crop: '', disease: '', status: 'Active'
    });
    setOpenDialog(true);
  };

  const handleRowClick = (params) => {
    setSelectedProduct(params.row);
    setDrawerOpen(true);
  };

  const handleSaveProduct = async () => {
    try {
      if (editProduct.id) {
        await api.put(`/products/products/${editProduct.id}/`, editProduct);
      } else {
        await api.post('/products/products/', editProduct);
      }
      setOpenDialog(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Error saving product');
    }
  };

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
              Product Master
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Manage crop protection catalog, pricing, and active stock levels.
            </Typography>
          </Box>
          {isAdmin && (
            <button 
              onClick={() => openEdit()}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm shadow-emerald-600/20 transition-all active:scale-95"
            >
              <Plus size={16} />
              New Product
            </button>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="Total Products" count={kpis.total} icon={<ShoppingCart size={20} strokeWidth={2} />} color="primary" />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="Active Products" count={kpis.active} icon={<CheckCircle2 size={20} strokeWidth={2} />} color="success" />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="Low Stock" count={kpis.lowStock} icon={<AlertCircle size={20} strokeWidth={2} />} color="warning" />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="Discontinued" count={kpis.discontinued} icon={<Ban size={20} strokeWidth={2} />} color="error" />
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ height: 600 }}>
          <EnterpriseTable 
            rows={products}
            columns={columns}
            loading={loading}
            rowActions={rowActions}
            checkboxSelection
            onRowClick={handleRowClick}
          />
        </Box>
      </Grid>

      {/* Slide-Over Drawer for Product Details */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 400, md: 500 }, backgroundColor: '#F8FAFC' }
        }}
      >
        {selectedProduct && (
          <div className="flex flex-col h-full bg-slate-50">
            {/* Drawer Header */}
            <div className="relative px-6 py-8 bg-slate-900 border-b border-slate-800 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
              <div className="relative flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={selectedProduct.status} />
                    <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded-md text-xs font-semibold uppercase tracking-wider">
                      {selectedProduct.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mt-1">{selectedProduct.name}</h2>
                  <p className="text-sm text-slate-400 font-medium">{selectedProduct.technical_name}</p>
                </div>
                <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
                  <X size={20} />
                </IconButton>
              </div>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Pricing Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Distributor Price</span>
                  <div className="text-xl font-bold text-slate-900 mt-1">{formatINR(selectedProduct.distributor_price)}</div>
                  <div className="text-xs text-slate-400 mt-1">MRP: {formatINR(selectedProduct.mrp)}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Dealer Price</span>
                  <div className="text-xl font-bold text-slate-900 mt-1">{formatINR(selectedProduct.dealer_price)}</div>
                  <div className="text-xs text-slate-400 mt-1">Tax: {selectedProduct.gst}</div>
                </div>
              </div>

              {/* Inventory */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <Activity size={16} className="text-emerald-600" /> Inventory & Packaging
                </h3>
                <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Current Stock</span>
                  <span className="font-bold text-slate-900">{selectedProduct.stock} Units</span>
                </div>
                <div className="flex justify-between items-center text-sm pb-1">
                  <span className="text-slate-500">Packing Size</span>
                  <span className="font-bold text-slate-900">{selectedProduct.packing}</span>
                </div>
              </div>

              {/* Agritech Specs */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <Leaf size={16} className="text-emerald-600" /> Agritech Specifications
                </h3>
                
                <div>
                  <span className="text-xs text-slate-500 font-medium uppercase">Target Crops</span>
                  <p className="text-sm text-slate-800 mt-1 font-medium">{selectedProduct.crop}</p>
                </div>
                
                <div>
                  <span className="text-xs text-slate-500 font-medium uppercase">Pest / Disease Coverage</span>
                  <p className="text-sm text-slate-800 mt-1 font-medium">{selectedProduct.disease}</p>
                </div>

                <div>
                  <span className="text-xs text-slate-500 font-medium uppercase flex items-center gap-1">
                    <Droplets size={12} /> Recommended Dosage
                  </span>
                  <p className="text-sm text-slate-800 mt-1">{selectedProduct.dosage}</p>
                </div>

                <div>
                  <span className="text-xs text-slate-500 font-medium uppercase">Application Benefits</span>
                  <p className="text-sm text-slate-800 mt-1 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {selectedProduct.benefits}
                  </p>
                </div>
              </div>

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 bg-white border-t border-slate-200 flex gap-3">
              <button 
                onClick={() => { setDrawerOpen(false); openEdit(selectedProduct); }}
                className="flex-1 flex justify-center items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                <Edit2 size={16} /> Edit Product
              </button>
              <button 
                className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-semibold rounded-xl transition-colors border border-rose-200"
              >
                Archive
              </button>
            </div>
          </div>
        )}
      </Drawer>

      {/* Edit Product Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, borderBottom: '1px solid #e2e8f0', pb: 2 }}>
          {editProduct?.id ? 'Edit Product' : 'Create Product'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {editProduct && (
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Product Name" size="small" value={editProduct.name} onChange={e => setEditProduct({...editProduct, name: e.target.value})} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Technical Name" size="small" value={editProduct.technical_name} onChange={e => setEditProduct({...editProduct, technical_name: e.target.value})} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select value={editProduct.category} label="Category" onChange={e => setEditProduct({...editProduct, category: e.target.value})}>
                    {categories.map(c => <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>)}
                    {categories.length === 0 && <MenuItem value={editProduct.category}>{editProduct.category}</MenuItem>}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Packing (e.g. 1L, 500ml)" size="small" value={editProduct.packing} onChange={e => setEditProduct({...editProduct, packing: e.target.value})} />
              </Grid>
              
              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="MRP" type="number" size="small" value={editProduct.mrp} onChange={e => setEditProduct({...editProduct, mrp: e.target.value})} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Dealer Price" type="number" size="small" value={editProduct.dealer_price} onChange={e => setEditProduct({...editProduct, dealer_price: e.target.value})} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Distributor Price" type="number" size="small" value={editProduct.distributor_price} onChange={e => setEditProduct({...editProduct, distributor_price: e.target.value})} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="GST %" size="small" value={editProduct.gst} onChange={e => setEditProduct({...editProduct, gst: e.target.value})} />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Stock" type="number" size="small" value={editProduct.stock} onChange={e => setEditProduct({...editProduct, stock: e.target.value})} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select value={editProduct.status} label="Status" onChange={e => setEditProduct({...editProduct, status: e.target.value})}>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="Discontinued">Discontinued</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Crop Applicability" size="small" value={editProduct.crop} onChange={e => setEditProduct({...editProduct, crop: e.target.value})} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Disease Applicability" size="small" value={editProduct.disease} onChange={e => setEditProduct({...editProduct, disease: e.target.value})} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Dosage" size="small" value={editProduct.dosage} onChange={e => setEditProduct({...editProduct, dosage: e.target.value})} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Benefits" size="small" multiline rows={3} value={editProduct.benefits} onChange={e => setEditProduct({...editProduct, benefits: e.target.value})} />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0, borderTop: '1px solid #e2e8f0', mt: 2 }}>
          <Button onClick={() => setOpenDialog(false)} color="inherit">Cancel</Button>
          <Button variant="contained" onClick={handleSaveProduct} sx={{ bgcolor: '#059669', '&:hover': { bgcolor: '#047857' } }}>
            Save Product
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
