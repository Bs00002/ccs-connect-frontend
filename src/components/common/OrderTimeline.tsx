import React from 'react';
import type { OrderStatus } from '../../types/stitchTypes';

interface OrderTimelineProps {
  currentStatus: OrderStatus;
}

const TIMELINE_STEPS: OrderStatus[] = [
  'Submitted',
  'Approved',
  'Processing',
  'Dispatched',
  'Delivered',
];

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ currentStatus }) => {
  const isCancelled = currentStatus === 'Cancelled' || currentStatus === 'Rejected';

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'Draft':
      case 'Submitted':
        return 0;
      case 'Pending Approval':
      case 'Approved':
        return 1;
      case 'Processing':
        return 2;
      case 'Dispatched':
      case 'In Transit':
        return 3;
      case 'Delivered':
        return 4;
      default:
        return 0;
    }
  };

  const currentIndex = getStepIndex(currentStatus);

  if (isCancelled) {
    return (
      <div className="bg-[#FFEBEE] p-4 rounded-xl border border-[#EF9A9A] flex items-center justify-between text-[#C62828]">
        <div className="flex items-center gap-2 font-bold text-sm">
          <span className="material-symbols-outlined text-[20px]">cancel</span>
          Order has been {currentStatus.toLowerCase()}
        </div>
        <span className="text-xs text-[#525252]">Contact Admin for details</span>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs">
      <h4 className="text-xs font-bold text-[#1B5E20] uppercase tracking-wider mb-4">
        Order Status Progress Timeline
      </h4>
      <div className="relative flex items-center justify-between max-w-2xl mx-auto px-4">
        <div className="absolute top-1/2 left-8 right-8 h-1 bg-[#e0e0e0] -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-8 h-1 bg-[#2E7D32] -translate-y-1/2 z-0 transition-all duration-300"
          style={{ width: `${(currentIndex / (TIMELINE_STEPS.length - 1)) * 90}%` }}
        />

        {TIMELINE_STEPS.map((step, idx) => {
          const isDone = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                  isDone
                    ? 'bg-[#2E7D32] text-white border-[#2E7D32]'
                    : 'bg-white text-[#525252] border-[#e0e0e0]'
                } ${isCurrent ? 'ring-4 ring-[#E8F5E9]' : ''}`}
              >
                {isDone ? '✓' : idx + 1}
              </div>
              <span
                className={`text-xs mt-2 font-bold ${
                  isCurrent ? 'text-[#2E7D32]' : isDone ? 'text-[#161616]' : 'text-[#8d8d8d]'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

