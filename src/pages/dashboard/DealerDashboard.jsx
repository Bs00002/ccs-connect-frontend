import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import api from 'api/client';
import { DealerDashboard as CanonicalDealerDashboard } from '../../views/dealer/DealerDashboard';
import { MOCK_ORDERS } from '../../data/stitchMockData';

export default function DealerDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = {
    id: user?.id || 'u-dealer-1',
    name: user?.name || 'Rahul Mehta',
    email: user?.email || 'dealer@ccsconnect.com',
    role: 'DEALER',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    phone: user?.phone || '+91 98250 12345',
    code: 'DLR-2026-042',
    businessName: user?.company_name || 'Kisan Agro Center',
    city: 'Palanpur',
  };

  useEffect(() => {
    const fetchDealerData = async () => {
      try {
        const ordersRes = await api.get('/orders/orders/').catch(() => ({ data: [] }));

        if (Array.isArray(ordersRes.data) && ordersRes.data.length > 0) {
          const mappedOrders = ordersRes.data.map((o) => ({
            id: String(o.id),
            orderNumber: o.order_number || `ORD-${o.id}`,
            date: new Date(o.created_at || Date.now()).toISOString().split('T')[0],
            dealerName: currentUser.businessName,
            dealerCode: currentUser.code,
            dealerCity: currentUser.city,
            distributorName: 'Gujarat Agro Distributors Ltd',
            status: o.status || 'Processing',
            paymentStatus: o.payment_status || 'Pending',
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
      } catch (err) {
        console.error('Error fetching dealer data:', err);
        setOrders(MOCK_ORDERS);
      } finally {
        setLoading(false);
      }
    };

    fetchDealerData();
  }, [currentUser.businessName, currentUser.city, currentUser.code]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 font-body text-xs text-[#525252]">
        Loading Dealer Portal...
      </div>
    );
  }

  return (
    <CanonicalDealerDashboard
      currentUser={currentUser}
      orders={orders}
      onCreateOrder={() => navigate('/dealer/orders')}
      onOpenInvoices={() => navigate('/dealer/invoices')}
      onSelectOrder={() => navigate('/dealer/orders')}
    />
  );
}
