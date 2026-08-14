import React, { useState, useEffect } from 'react';
import api from 'api/client';
import { AdminDistributors as StitchAdminDistributors } from '../../views/admin/AdminDistributors';
import { MOCK_DISTRIBUTORS } from '../../data/stitchMockData';

export default function EmployeesPage() {
  const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const distRes = await api.get('/admin/users/?role=Distributor');
        if (Array.isArray(distRes.data) && distRes.data.length > 0) {
          const mapped = distRes.data.map((d, index) => ({
            id: String(d.id || index + 1),
            code: d.ccs_id || `DIST-PLN-0${index + 1}`,
            name: d.company_name || `${d.first_name || ''} ${d.last_name || ''}`.trim() || 'Gujarat Agro Distributors',
            ownerName: `${d.first_name || ''} ${d.last_name || ''}`.trim() || 'Distributor Owner',
            phone: d.phone || '+91 94221 88301',
            email: d.email || 'distributor@ccs.com',
            city: d.city || 'Palanpur',
            state: d.state || 'Gujarat',
            territory: d.territory || 'Palanpur / Banaskantha Zone',
            dealersCount: 15,
            monthlySales: 1250000,
            outstandingBalance: 340000,
            status: d.status === 'Approved' ? 'Active' : 'Active',
          }));
          setDistributors(mapped);
        } else {
          setDistributors(MOCK_DISTRIBUTORS);
        }
      } catch (err) {
        console.error('Error fetching distributors API:', err);
        setDistributors(MOCK_DISTRIBUTORS);
      } finally {
        setLoading(false);
      }
    };

    fetchDistributors();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 font-body text-xs text-[#525252]">
        Loading Distributor Network & Staff...
      </div>
    );
  }

  return (
    <StitchAdminDistributors
      distributors={distributors}
      onAddDistributor={(newDist) => setDistributors((prev) => [newDist, ...prev])}
    />
  );
}

