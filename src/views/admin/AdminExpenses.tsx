import React from 'react';
import type { Expense } from '../../types/stitchTypes';
import { StatusBadge } from '../../components/common/StatusBadge';

interface AdminExpensesProps {
  expenses?: Expense[];
  onApproveExpense?: (expenseId: string) => void;
  onRejectExpense?: (expenseId: string) => void;
}

export const AdminExpenses: React.FC<AdminExpensesProps> = ({
  expenses = [],
  onApproveExpense,
  onRejectExpense,
}) => {
  return (
    <div className="space-y-6 font-body text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e0e0e0] pb-4">
        <div>
          <h1 className="text-2xl font-light text-[#161616]">Expense Claims & Approvals</h1>
          <p className="text-xs text-[#525252] mt-0.5">
            Field officer fuel claims, hotel stays, travel KM validation, and receipt voucher audits
          </p>
        </div>
      </div>

      {/* Expense Table */}
      <div className="bg-white border border-[#e0e0e0] overflow-x-auto shadow-xs">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-[#f4f4f4] text-[#525252] border-b border-[#e0e0e0] uppercase text-[11px] tracking-wider">
            <tr>
              <th className="p-3 font-semibold">Claim ID</th>
              <th className="p-3 font-semibold">Submitted By</th>
              <th className="p-3 font-semibold">Date</th>
              <th className="p-3 font-semibold">Expense Type</th>
              <th className="p-3 font-semibold text-right">Ride KM</th>
              <th className="p-3 font-semibold text-right">Amount Claimed</th>
              <th className="p-3 font-semibold">Remarks / Dealer</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold text-center">Audit Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e0e0e0]">
            {(expenses || []).map((exp) => (
              <tr key={exp.id} className="hover:bg-[#f4f4f4]">
                <td className="p-3 font-bold text-[#0f62fe]">{exp.id}</td>
                <td className="p-3 font-bold text-[#161616]">{exp.employeeName}</td>
                <td className="p-3 text-[#525252]">{exp.date}</td>
                <td className="p-3 font-semibold text-[#161616]">{exp.type}</td>
                <td className="p-3 text-right text-[#525252]">
                  {exp.rideKm ? `${exp.rideKm} KM` : '-'}
                </td>
                <td className="p-3 text-right font-bold text-[#161616]">
                  ₹{(exp.amount || 0).toLocaleString('en-IN')}
                </td>
                <td className="p-3 text-[#525252] max-w-xs truncate">{exp.remarks}</td>
                <td className="p-3">
                  <StatusBadge status={exp.status} />
                </td>
                <td className="p-3 text-center">
                  {exp.status === 'Pending' ? (
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => onApproveExpense && onApproveExpense(exp.id)}
                        className="px-2 py-0.5 bg-[#defbe6] text-[#0e6027] border border-[#a7f0ba] font-bold cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onRejectExpense && onRejectExpense(exp.id)}
                        className="px-2 py-0.5 bg-[#fff1f1] text-[#750e13] border border-[#ffb3b8] font-bold cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-[10px] text-[#525252] font-medium">Audited</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
