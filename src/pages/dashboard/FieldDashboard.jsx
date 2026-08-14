import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import api from 'api/client';
import { DistributorDashboard as StitchDistributorDashboard } from '../../views/distributor/DistributorDashboard';
import {
  MOCK_ORDERS,
  MOCK_DEALERS,
} from '../../data/stitchMockData';

export default function FieldDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = {
    id: user?.id || 'u-dist-1',
    name: user?.name || 'Sanjay Deshmukh',
    email: user?.email || 'distributor@chitracropscience.com',
    role: 'DISTRIBUTOR',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    phone: user?.phone || '+91 94221 88301',
    territory: 'Palanpur / Banaskantha Zone',
    code: 'DIST-PLN-01',
    businessName: user?.company_name || 'Gujarat Agro Distributors Ltd',
    city: 'Palanpur',
  };

  useEffect(() => {
    const fetchDistributorData = async () => {
      try {
        const [ordersRes, dealersRes] = await Promise.all([
          api.get('/orders/orders/').catch(() => ({ data: [] })),
          api.get('/admin/users/?role=Dealer').catch(() => ({ data: [] })),
        ]);

        if (Array.isArray(ordersRes.data) && ordersRes.data.length > 0) {
          const mappedOrders = ordersRes.data.map((o) => ({
            id: String(o.id),
            orderNumber: o.order_number || `ORD-${o.id}`,
            date: new Date(o.created_at || Date.now()).toISOString().split('T')[0],
            dealerName: o.dealer_name || 'Agri Store',
            dealerCode: `DLR-${o.dealer || '01'}`,
            dealerCity: 'Palanpur',
            distributorId: currentUser.id,
            distributorName: currentUser.businessName,
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
            distributorName: currentUser.businessName,
            territory: 'Palanpur / Banaskantha',
          }));
          setDealers(mappedDealers);
        } else {
          setDealers(MOCK_DEALERS);
        }
      } catch (err) {
        console.error('Error fetching distributor real data:', err);
        setOrders(MOCK_ORDERS);
        setDealers(MOCK_DEALERS);
      } finally {
        setLoading(false);
      }
    };

    fetchDistributorData();
  }, [currentUser.id, currentUser.businessName]);

  const handleSelectOrder = (order) => {
    navigate('/field/orders');
  };

  const handleCreateOrder = () => {
    navigate('/field/orders/create');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 font-body text-xs text-[#525252]">
        Loading Distributor Operations Hub...
      </div>
    );
  }

  return (
    <StitchDistributorDashboard
      currentUser={currentUser}
      orders={orders}
      dealers={dealers}
      onSelectOrder={handleSelectOrder}
      onCreateOrder={handleCreateOrder}
    />
  );
}




