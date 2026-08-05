import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

export default function StatusBadge({ status, size = 'md' }) {
  const normalized = (status || '').toLowerCase();
  
  let colorClass = 'bg-slate-50 text-slate-700 border-slate-200';
  let dotClass = 'bg-slate-400';
  
  // Emerald / Green
  if (['approved', 'active', 'in stock', 'delivered', 'paid', 'present'].includes(normalized)) {
    colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    dotClass = 'bg-emerald-500';
  } 
  // Amber / Yellow
  else if (['pending', 'pending approval', 'low stock', 'pending dispatch', 'draft'].includes(normalized)) {
    colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
    dotClass = 'bg-amber-500';
  }
  // Indigo / Blue
  else if (['dispatched', 'in transit', 'packed'].includes(normalized)) {
    colorClass = 'bg-blue-50 text-blue-700 border-blue-200';
    dotClass = 'bg-blue-500';
  }
  // Rose / Red
  else if (['overdue', 'overdue payment', 'rejected', 'discontinued', 'out of stock', 'cancelled'].includes(normalized)) {
    colorClass = 'bg-rose-50 text-rose-700 border-rose-200';
    dotClass = 'bg-rose-500';
  }

  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span className={clsx("inline-flex items-center gap-1.5 rounded-full border font-medium whitespace-nowrap", colorClass, sizeClass)}>
      <span className={clsx("h-1.5 w-1.5 rounded-full", dotClass)} />
      {status}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md'])
};
