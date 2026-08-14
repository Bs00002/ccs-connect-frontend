import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Stack, Chip, TextField, InputAdornment, Avatar } from '@mui/material';
import DataTable from 'components/DataTable';
import MainCard from 'components/MainCard';
import { SearchOutlined } from '@ant-design/icons';
import api from 'api/client';
import { formatINR } from 'data/ccsMock';

const mockCatalog = [
  { id: 1, image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=150&q=80', name: 'Chitra Zyme', category: 'Bio-Stimulants', type: 'Liquid', size: '500 ml', price: 650, usage: 'Crop growth, flowering & root development' },
  { id: 2, image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=150&q=80', name: 'Chitra Gold', category: 'Plant Growth Regulators', type: 'Powder', size: '1 kg', price: 320, usage: 'Soil health & nutrient uptake' },
  { id: 3, image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=150&q=80', name: 'Chitra King', category: 'Insecticides', type: 'Liquid', size: '1 Ltr', price: 950, usage: 'Bollworm & sucking pest control' },
  { id: 4, image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=150&q=80', name: 'C-Mida', category: 'Insecticides', type: 'Liquid', size: '250 ml', price: 480, usage: 'Whitefly, Jassids & Aphids' },
  { id: 5, image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=150&q=80', name: 'C-Monco', category: 'Fungicides', type: 'Powder', size: '500 gm', price: 250, usage: 'Blight, Rust & Leaf Spot control' },
  { id: 6, image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=150&q=80', name: 'Root-X', category: 'Bio Products', type: 'Granules', size: '4 kg', price: 380, usage: 'Mycorrhiza root development' }
];

export default function DealerProducts() {
  const [products, setProducts] = useState(mockCatalog);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products/products/');
      if (Array.isArray(res.data) && res.data.length > 0) {
        const mapped = res.data.map(p => ({
          id: p.id,
          image: p.image_url || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=150&q=80',
          name: p.name,
          category: p.category_name || p.category || 'General',
          type: p.formulation_type || 'Liquid',
          size: p.pack_size || p.packing || '1 Ltr',
          price: parseFloat(p.dealer_price || p.mrp || 0),
          usage: p.uses || p.technical_name || 'Crop protection'
        }));
        setProducts(mapped);
      }
    } catch (err) {
      console.error('Failed to fetch dealer products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      field: 'image',
      headerName: 'Product Image',
      width: 110,
      align: 'center',
      renderCell: (params) => (
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
          <Avatar src={params.value} variant="rounded" sx={{ width: 44, height: 44, border: '1px solid #cbd5e1' }} />
        </Stack>
      )
    },
    {
      field: 'name',
      headerName: 'Product Name',
      flex: 1.5,
      minWidth: 180,
      renderCell: (params) => (
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <Typography fontWeight={600} color="primary">{params.value}</Typography>
        </Box>
      )
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1.2,
      minWidth: 140,
      renderCell: (params) => (
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <Chip label={params.value} size="small" variant="outlined" color="primary" />
        </Box>
      )
    },
    {
      field: 'type',
      headerName: 'Product Type',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <Chip
            label={params.value}
            size="small"
            color={params.value === 'Liquid' ? 'info' : params.value === 'Powder' ? 'warning' : 'success'}
          />
        </Box>
      )
    },
    { field: 'size', headerName: 'Product Size', flex: 1, minWidth: 110 },
    { field: 'usage', headerName: 'Product Usage / Benefits', flex: 2, minWidth: 240 },
    {
      field: 'price',
      headerName: 'Product Price',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <Typography fontWeight={700} color="success.main">{formatINR(params.value)}</Typography>
        </Box>
      )
    }
  ];

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
              Browse Product Catalog
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Read-only price list and product specifications for Chitra Crop Science range.
            </Typography>
          </Box>
        </Stack>
      </Grid>

      {/* Search Toolbar */}
      <Grid item xs={12}>
        <MainCard content={false} sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search product name or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchOutlined /></InputAdornment> }}
              />
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      {/* Product Catalog Table */}
      <Grid item xs={12}>
        <MainCard content={false}>
          <DataTable
            rows={filteredProducts}
            columns={columns}
            loading={loading}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
}
