import React, { useState, useEffect } from 'react';
import api from 'api/client';
import { AdminProducts as StitchAdminProducts } from '../../views/admin/AdminProducts';
import { MOCK_PRODUCTS } from '../../data/stitchMockData';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products/products/');
        if (Array.isArray(res.data) && res.data.length > 0) {
          const mappedProducts = res.data.map((p) => ({
            id: String(p.id),
            name: p.name,
            code: `PRD-${p.id}`,
            category: p.category_name || 'Bio Products',
            technicalName: p.technical_name || 'Active Formulation',
            packSize: p.packing || '1 Ltr',
            mrp: parseFloat(p.mrp || 0),
            dealerPrice: parseFloat(p.dealer_price || p.mrp || 0),
            distributorPrice: parseFloat(p.distributor_price || p.dealer_price || 0),
            gstRate: 18,
            stockQuantity: p.stock || 100,
            status: p.status === 'Active' ? 'In Stock' : 'Low Stock',
          }));
          setProducts(mappedProducts);
        } else {
          setProducts(MOCK_PRODUCTS);
        }
      } catch (err) {
        console.error('Error fetching products API:', err);
        setProducts(MOCK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = (newProd) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 font-body text-xs text-[#525252]">
        Loading Product & Crop Protection Catalog...
      </div>
    );
  }

  return (
    <StitchAdminProducts
      products={products}
      onAddProduct={handleAddProduct}
    />
  );
}


