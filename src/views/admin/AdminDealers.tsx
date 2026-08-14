import React, { useState } from 'react';
import type { Dealer } from '../../types/stitchTypes';
import { StatusBadge } from '../../components/common/StatusBadge';

interface AdminDealersProps {
  dealers?: Dealer[];
  onAddDealer?: (dealer: any) => void;
}

export const AdminDealers: React.FC<AdminDealersProps> = ({ dealers = [], onAddDealer }) => {
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [creditLimit, setCreditLimit] = useState('200000');

  const s = (search || '').toLowerCase();
  const filtered = (dealers || []).filter(
    (d) =>
      (d.name || '').toLowerCase().includes(s) ||
      (d.code || '').toLowerCase().includes(s) ||
      (d.city || '').toLowerCase().includes(s)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !ownerName || !city) return;

    if (onAddDealer) {
      onAddDealer({
        code: `DLR-${Math.floor(100 + Math.random() * 900)}`,
        name,
        ownerName,
        city,
        phone: phone || '+91 98000 00000',
        distributorName: 'Gujarat Agro Distributors Ltd',
        creditLimit: parseFloat(creditLimit) || 200000,
        outstandingBalance: 0,
        status: 'Active',
        totalOrdersCount: 0,
        totalSalesValue: 0,
        loyaltyPoints: 100,
      });
    }

    setName('');
    setOwnerName('');
    setCity('');
    setPhone('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 font-body text-xs bg-[#F5FBF6] p-2 md:p-4 rounded-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#A5D6A7]/30 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1B5E20] tracking-tight">Dealer Network Directory</h1>
          <p className="text-xs text-[#525252] mt-1 font-medium">
            Registered agriculture dealers, credit limit terms, outstanding balances, and order history
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2 text-xs font-bold bg-[#2E7D32] text-white hover:bg-[#1B5E20] rounded-lg transition-all shadow-md cursor-pointer"
        >
          + Add New Dealer
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] border-l-4 border-l-[#2E7D32] shadow-xs">
          <div className="text-xs text-[#525252] font-bold uppercase">Total Dealers</div>
          <div className="text-2xl font-bold text-[#1B5E20] mt-1">{dealers.length}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] border-l-4 border-l-[#4CAF50] shadow-xs">
          <div className="text-xs text-[#525252] font-bold uppercase">Active Network</div>
          <div className="text-2xl font-bold text-[#1B5E20] mt-1">
            {dealers.filter((d) => d.status === 'Active').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] border-l-4 border-l-[#C62828] shadow-xs">
          <div className="text-xs text-[#525252] font-bold uppercase">Total Outstanding</div>
          <div className="text-2xl font-bold text-[#C62828] mt-1">
            ₹
            {dealers
              .reduce((acc, curr) => acc + (curr.outstandingBalance || 0), 0)
              .toLocaleString('en-IN')}
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] border-l-4 border-l-[#81C784] shadow-xs">
          <div className="text-xs text-[#525252] font-bold uppercase">Avg Credit Limit</div>
          <div className="text-2xl font-bold text-[#2E7D32] mt-1">₹2.0 Lakhs</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search dealer name, dealer code, or city..."
          className="w-full px-4 py-2 bg-[#F5FBF6] border border-[#A5D6A7] rounded-lg text-xs font-semibold text-[#161616] focus:outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
        />
      </div>

      {/* Dealer Table */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-x-auto shadow-xs p-5">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-[#E8F5E9] text-[#1B5E20] border-b border-[#A5D6A7]">
            <tr>
              <th className="p-3 font-bold">Dealer Code</th>
              <th className="p-3 font-bold">Dealer Name</th>
              <th className="p-3 font-bold">Owner</th>
              <th className="p-3 font-bold">City</th>
              <th className="p-3 font-bold">Distributor</th>
              <th className="p-3 font-bold text-right">Credit Limit</th>
              <th className="p-3 font-bold text-right">Outstanding</th>
              <th className="p-3 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0]">
            {filtered.map((d) => (
              <tr key={d.id} className="hover:bg-[#F5FBF6] transition-colors">
                <td className="p-3 font-bold text-[#2E7D32]">{d.code}</td>
                <td className="p-3 font-bold text-[#161616]">{d.name}</td>
                <td className="p-3 text-[#525252] font-medium">{d.ownerName}</td>
                <td className="p-3 text-[#525252] font-medium">{d.city}</td>
                <td className="p-3 text-[#525252] font-medium">{d.distributorName}</td>
                <td className="p-3 text-right font-bold text-[#161616]">
                  ₹{(d.creditLimit || 0).toLocaleString('en-IN')}
                </td>
                <td className="p-3 text-right font-bold text-[#C62828]">
                  ₹{(d.outstandingBalance || 0).toLocaleString('en-IN')}
                </td>
                <td className="p-3">
                  <StatusBadge status={d.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Dealer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl border border-[#e2e8f0] w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-sm font-bold text-[#1B5E20] uppercase border-b border-[#e2e8f0] pb-3 mb-4">
              Add New Dealer Record
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#525252] mb-1">Business Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kisan Krushi Kendra"
                  className="w-full p-2.5 border border-[#A5D6A7] rounded-lg bg-[#F5FBF6] text-xs font-semibold focus:outline-none focus:border-[#2E7D32]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#525252] mb-1">Owner Name</label>
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="e.g. Ananda Patil"
                  className="w-full p-2.5 border border-[#A5D6A7] rounded-lg bg-[#F5FBF6] text-xs font-semibold focus:outline-none focus:border-[#2E7D32]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#525252] mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Palanpur"
                    className="w-full p-2.5 border border-[#A5D6A7] rounded-lg bg-[#F5FBF6] text-xs font-semibold focus:outline-none focus:border-[#2E7D32]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#525252] mb-1">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98220 00000"
                    className="w-full p-2.5 border border-[#A5D6A7] rounded-lg bg-[#F5FBF6] text-xs font-semibold focus:outline-none focus:border-[#2E7D32]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#525252] mb-1">Sanctioned Credit Limit (₹)</label>
                <input
                  type="number"
                  value={creditLimit}
                  onChange={(e) => setCreditLimit(e.target.value)}
                  className="w-full p-2.5 border border-[#A5D6A7] rounded-lg bg-[#F5FBF6] text-xs font-semibold focus:outline-none focus:border-[#2E7D32]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-[#e2e8f0] text-[#525252] font-semibold rounded-lg hover:bg-[#F4F4F4]"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold rounded-lg shadow-md">
                  Save Dealer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

