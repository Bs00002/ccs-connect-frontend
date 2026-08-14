import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from 'api/client';
import { AdminDashboard as StitchAdminDashboard } from '../../views/admin/AdminDashboard';
import {
  MOCK_ORDERS,
  MOCK_DEALERS,
  MOCK_PRODUCTS,
  MOCK_FIELD_ACTIVITIES,
  MOCK_DISTRIBUTORS,
  MOCK_EXPENSES,
} from '../../data/stitchMockData';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [ordersRes, dealersRes, productsRes] = await Promise.all([
          api.get('/orders/orders/').catch(() => ({ data: [] })),
          api.get('/admin/users/?role=Dealer').catch(() => ({ data: [] })),
          api.get('/products/products/').catch(() => ({ data: [] })),
        ]);

        if (Array.isArray(ordersRes.data) && ordersRes.data.length > 0) {
          const mappedOrders = ordersRes.data.map((o) => ({
            id: String(o.id),
            orderNumber: o.order_number || `ORD-${o.id}`,
            date: new Date(o.created_at || Date.now()).toISOString().split('T')[0],
            dealerName: o.dealer_name || 'Agri Store',
            dealerCode: `DLR-${o.dealer || '01'}`,
            dealerCity: 'Palanpur',
            distributorName: o.created_by_name || 'CCS Depot',
            status: o.status || 'Pending Approval',
            paymentStatus: 'Pending',
            subtotal: parseFloat(o.subtotal || o.total_amount || 0),
            discount: 0,
            tax: Math.round(parseFloat(o.total_amount || 0) * 0.18),
            grandTotal: parseFloat(o.total_amount || 0),
            items: (o.items || []).map((i) => ({
              id: String(i.id || Math.random()),
              productId: String(i.product),
              productName: i.product_name || 'Crop Product',
              productCode: 'PRD-01',
              packSize: '1 Ltr',
              quantity: i.quantity || 1,
              dealerPrice: parseFloat(i.rate || 0),
              mrp: parseFloat(i.rate || 0) * 1.2,
              subtotal: parseFloat(i.total || 0),
            })),
          }));
          setOrders(mappedOrders);
        } else {
          setOrders(MOCK_ORDERS);
        }

        if (Array.isArray(dealersRes.data) && dealersRes.data.length > 0) {
          const mappedDealers = dealersRes.data.map((d) => ({
            id: String(d.id),
            name: d.company_name || `${d.first_name || ''} ${d.last_name || ''}`.trim() || 'Kisan Agro',
            code: d.ccs_id || `DLR-${d.id}`,
            ownerName: `${d.first_name || ''} ${d.last_name || ''}`.trim() || 'Owner',
            city: d.city || 'Palanpur',
            state: d.state || 'Gujarat',
            phone: d.phone || '+91 98250 12345',
            email: d.email || 'dealer@ccs.com',
            gstin: '27AABCA1234F1Z1',
            creditLimit: 500000,
            outstandingBalance: 120000,
            status: d.status === 'Approved' ? 'Active' : 'Pending Verification',
            distributorName: 'Gujarat Agro Distributors Ltd',
            territory: 'Palanpur / Banaskantha',
          }));
          setDealers(mappedDealers);
        } else {
          setDealers(MOCK_DEALERS);
        }

        if (Array.isArray(productsRes.data) && productsRes.data.length > 0) {
          const mappedProducts = productsRes.data.map((p) => ({
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
        console.error('Error fetching admin dashboard real data:', err);
        setOrders(MOCK_ORDERS);
        setDealers(MOCK_DEALERS);
        setProducts(MOCK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleNavigate = (view) => {
    switch (view) {
      case 'products':
        navigate('/admin/products');
        break;
      case 'dealers':
        navigate('/admin/dealers');
        break;
      case 'distributors':
        navigate('/admin/employees');
        break;
      case 'orders':
        navigate('/admin/orders');
        break;
      case 'inventory':
        navigate('/admin/products');
        break;
      case 'field-ops':
        navigate('/admin/tracking');
        break;
      case 'attendance':
        navigate('/admin/attendance');
        break;
      case 'expenses':
        navigate('/admin/expenses');
        break;
      default:
        navigate('/admin/dashboard');
        break;
    }
  };

  const handleSelectOrder = (order) => {
    navigate('/admin/orders');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 font-body text-xs text-[#525252]">
        Loading ERP Admin Command Dashboard...
      </div>
    );
  }

  return (
    <StitchAdminDashboard
      orders={orders}
      dealers={dealers}
      products={products}
      fieldActivities={MOCK_FIELD_ACTIVITIES}
      distributors={MOCK_DISTRIBUTORS}
      expenses={MOCK_EXPENSES}
      onNavigate={handleNavigate}
      onSelectOrder={handleSelectOrder}
    />
  );
}


