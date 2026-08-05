import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Stack } from '@mui/material';
import EnterpriseTable from 'components/ui/EnterpriseTable';
import api from 'api/client';
import { formatINR } from 'data/ccsMock';

export default function DealerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products/products/');
      const mapped = res.data.map(p => ({
        id: p.id,
        image: p.image_url || '',
        name: p.name,
        category: p.category_name || p.category,
        type: p.formulation_type || '-',
        size: p.pack_size || '-',
        price: p.dealer_price || 0,
        uses: p.uses || '-'
      }));
      setProducts(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = [
    { field: 'image', headerName: 'Image', flex: 0.5, minWidth: 80, renderCell: (params) => (
      params.value ? <img src={params.value} alt={params.row.name} style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover' }} /> : <Box sx={{ width: 40, height: 40, bgcolor: 'grey.200', borderRadius: 1 }} />
    )},
    { field: 'name', headerName: 'Product Name', flex: 1.5, minWidth: 200, renderCell: (params) => (
      <span className="font-semibold text-slate-800">{params.value}</span>
    )},
    { field: 'category', headerName: 'Product Category', flex: 1, minWidth: 120 },
    { field: 'type', headerName: 'Product Type', flex: 1, minWidth: 120 },
    { field: 'size', headerName: 'Product Size', flex: 0.8, minWidth: 100 },
    { field: 'price', headerName: 'Price', flex: 1, minWidth: 120, renderCell: (params) => (
      <span className="font-medium text-slate-700">{formatINR(params.value)}</span>
    )},
    { field: 'uses', headerName: 'Uses', flex: 2, minWidth: 250 }
  ];

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
              Product Catalog
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              View our full range of crop protection products.
            </Typography>
          </Box>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ height: 600 }}>
          <EnterpriseTable 
            rows={products}
            columns={columns}
            loading={loading}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
