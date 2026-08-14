import React, { useState, useEffect } from 'react';
import api from 'api/client';
import { AdminDealers as StitchAdminDealers } from '../../views/admin/AdminDealers';
import { MOCK_DEALERS } from '../../data/stitchMockData';

export default function DealersPage() {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const res = await api.get('/admin/users/?role=Dealer');
        if (Array.isArray(res.data) && res.data.length > 0) {
          const mappedDealers = res.data.map((d) => ({
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
      } catch (err) {
        console.error('Error fetching dealers from API:', err);
        setDealers(MOCK_DEALERS);
      } finally {
        setLoading(false);
      }
    };

    fetchDealers();
  }, []);

  const handleAddDealer = (newDealer) => {
    setDealers((prev) => [newDealer, ...prev]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 font-body text-xs text-[#525252]">
        Loading Dealers Network Directory...
      </div>
    );
  }

  return (
    <StitchAdminDealers
      dealers={dealers}
      onAddDealer={handleAddDealer}
    />
  );
}


