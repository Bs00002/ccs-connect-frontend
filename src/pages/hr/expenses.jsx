import React, { useState, useEffect } from 'react';
import api from 'api/client';
import { AdminExpenses as StitchAdminExpenses } from '../../views/admin/AdminExpenses';
import { MOCK_EXPENSES } from '../../data/stitchMockData';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await api.get('/hr/expenses/');
        if (Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data.map((e) => ({
            id: String(e.id),
            employeeName: e.employee_name || 'Rahul Sharma',
            employeeCode: e.employee_code || `EMP-${e.employee || '102'}`,
            category: e.category || e.expense_type || 'Fuel Claim',
            amount: parseFloat(e.amount || 0),
            date: e.date || new Date().toISOString().split('T')[0],
            receiptUrl: e.receipt || e.bill_image || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=150',
            status: e.status || 'Pending',
            remarks: e.remarks || e.details || '65 KM Field Visit',
          }));
          setExpenses(mapped);
        } else {
          setExpenses(MOCK_EXPENSES);
        }
      } catch (err) {
        console.error('Error fetching expenses API:', err);
        setExpenses(MOCK_EXPENSES);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleApproveExpense = async (id, approved) => {
    const newStatus = approved ? 'Approved' : 'Rejected';
    try {
      await api.patch(`/hr/expenses/${id}/`, { status: newStatus }).catch((err) => {
        console.warn('API expense status fallback:', err);
      });
      setExpenses((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
    } catch (err) {
      console.error('Error updating expense status:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 font-body text-xs text-[#525252]">
        Loading Expense Claims & Approvals Desk...
      </div>
    );
  }

  return (
    <StitchAdminExpenses
      expenses={expenses}
      onApproveExpense={handleApproveExpense}
    />
  );
}


