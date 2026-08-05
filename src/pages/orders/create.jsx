import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Grid, Typography, Box, Stack, TextField, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, Autocomplete, Paper, Divider, Avatar
} from '@mui/material';
import MainCard from 'components/MainCard';
import api from 'api/client';
import { DeleteOutlined, ArrowLeftOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import useAuth from 'hooks/useAuth';
import { addTimelineEvent } from 'utils/daily-working';

export default function OrderCreate() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const preselectedDealerId = searchParams.get('dealerId');
  
  const [dealers, setDealers] = useState([]);
  const [products, setProducts] = useState([]);
  
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [selectedProductToAdd, setSelectedProductToAdd] = useState(null);
  const [remarks, setRemarks] = useState('');
  
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user?.role === 'Dealer') {
      navigate('/app/dashboard/default', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [dealersRes, productsRes] = await Promise.all([
          api.get('/admin/users/?role=Dealer'),
          api.get('/products/products/')
        ]);
        
        const enhancedDealers = dealersRes.data.map(d => ({
          ...d,
          shopName: d.company_name || 'Agro Center',
          city: d.city || 'Ahmedabad',
          state: d.state || 'Gujarat',
        }));
        
        setDealers(enhancedDealers);
        setProducts(productsRes.data.filter(p => p.status === 'Active'));
        
        if (preselectedDealerId) {
          const found = enhancedDealers.find(d => d.id === preselectedDealerId);
          if (found) setSelectedDealer(found);
        }

      } catch (err) {
        console.error(err);
      }
    };
    fetchDropdowns();
  }, [preselectedDealerId]);

  const handleAddSelectedProduct = () => {
    if (!selectedProductToAdd) return;
    
    if (items.find(i => i.product.id === selectedProductToAdd.id)) {
      alert("Product already added. Increase cases instead.");
      return;
    }

    setItems([...items, { product: selectedProductToAdd, cases: 1 }]);
    setSelectedProductToAdd(null);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async () => {
    if (!selectedDealer) return alert("Select a dealer first");
    if (items.length === 0) return alert("Add at least one product");

    try {
      const payload = {
        dealer: selectedDealer.id,
        remarks: remarks,
        items: items.map(i => ({
          product: i.product.id,
          quantity: parseInt(i.cases || 1)
        }))
      };

      await api.post('/orders/orders/', payload);

      addTimelineEvent('Order Created', {
        dealer: selectedDealer.shopName,
        remarks: `${items.length} products ordered. Total Cases: ${items.reduce((s, i) => s + parseInt(i.cases || 0), 0)} | ${remarks}`
      });
      
      alert('Order submitted successfully!');
      navigate('/field/orders');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to submit order');
    }
  };

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" gap={2}>
          <IconButton onClick={() => navigate(-1)}><ArrowLeftOutlined /></IconButton>
          <Box>
            <Typography variant="h5">Create Order (Simple Flow)</Typography>
          </Box>
        </Stack>
      </Grid>

      <Grid item xs={12} lg={8}>
        <Stack spacing={3}>
          <MainCard title="1. Select Dealer">
            <Autocomplete
              options={dealers}
              getOptionLabel={(option) => `${option.shopName} - ${option.name || option.username} - ${option.city}`}
              value={selectedDealer}
              onChange={(e, newValue) => setSelectedDealer(newValue)}
              renderInput={(params) => <TextField {...params} label="Search Dealer by Name or City" variant="outlined" />}
            />
          </MainCard>

          <MainCard title="2. Add Products" sx={{ opacity: selectedDealer ? 1 : 0.5, pointerEvents: selectedDealer ? 'auto' : 'none' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" mb={3}>
              <Autocomplete
                sx={{ flex: 1 }}
                options={products}
                getOptionLabel={(option) => `${option.name} (${option.technical_name}) - Packing: ${option.packing}`}
                value={selectedProductToAdd}
                onChange={(e, newValue) => setSelectedProductToAdd(newValue)}
                renderInput={(params) => <TextField {...params} label="Search Product" variant="outlined" />}
              />
              <Button 
                variant="contained" 
                startIcon={<PlusOutlined />} 
                onClick={handleAddSelectedProduct}
                disabled={!selectedProductToAdd}
                sx={{ height: 53 }}
              >
                Add
              </Button>
            </Stack>

            {items.length > 0 && (
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead sx={{ bgcolor: 'grey.50' }}>
                    <TableRow>
                      <TableCell>Product Name</TableCell>
                      <TableCell width="150">Packing</TableCell>
                      <TableCell width="120">Cases</TableCell>
                      <TableCell width="50"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((item, index) => {
                      const p = item.product;
                      return (
                        <TableRow key={index}>
                          <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>{p.name}</Typography>
                          </TableCell>
                          <TableCell>
                            {p.packing}
                          </TableCell>
                          <TableCell>
                            <TextField 
                              size="small" type="number" 
                              value={item.cases} 
                              onChange={e => handleItemChange(index, 'cases', e.target.value)}
                              inputProps={{ style: { padding: '8px 4px' }, min: 1 }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <IconButton color="error" size="small" onClick={() => handleRemoveItem(index)}>
                              <DeleteOutlined />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </MainCard>
        </Stack>
      </Grid>

      <Grid item xs={12} lg={4}>
        <Stack spacing={3}>
          <MainCard title="3. Remarks & Submit" sx={{ opacity: selectedDealer && items.length > 0 ? 1 : 0.5, pointerEvents: selectedDealer && items.length > 0 ? 'auto' : 'none' }}>
            <Stack spacing={2}>
              <TextField 
                label="Remarks (Optional)" multiline rows={4} fullWidth 
                value={remarks} onChange={e => setRemarks(e.target.value)} 
              />
              
              <Button 
                variant="contained" 
                size="large" 
                fullWidth 
                sx={{ py: 1.5, fontSize: '1.1rem' }} 
                onClick={handleSubmit}
                startIcon={<ShoppingCartOutlined />}
              >
                Submit Order
              </Button>
            </Stack>
          </MainCard>
        </Stack>
      </Grid>
    </Grid>
  );
}
