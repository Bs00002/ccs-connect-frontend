import React from 'react';

interface KpiCardProps {
  label: string;
  value: string | number;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  subtext?: string;
  onClick?: () => void;
  accentBorder?: 'blue' | 'green' | 'red' | 'yellow' | 'none';
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  icon,
  trend,
  trendValue,
  subtext,
  onClick,
  accentBorder = 'green',
}) => {
  const getBorderColor = () => {
    switch (accentBorder) {
      case 'red':
        return 'border-l-4 border-l-[#C62828]';
      case 'yellow':
        return 'border-l-4 border-l-[#F57F17]';
      case 'blue':
      case 'green':
      default:
        return 'border-l-4 border-l-[#2E7D32]';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white p-5 rounded-2xl border border-[#e2e8f0] ${getBorderColor()} shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${
        onClick ? 'cursor-pointer hover:border-[#2E7D32]' : ''
      }`}
    >
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-[#525252] uppercase tracking-wider">
          {label}
        </span>
        {icon && (
          <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
            <span className="material-symbols-outlined text-[20px]">
              {icon}
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-bold text-[#1B5E20] tracking-tight">{value}</span>
        {trend && (
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
              trend === 'up'
                ? 'bg-[#E8F5E9] text-[#1B5E20]'
                : trend === 'down'
                ? 'bg-[#FFEBEE] text-[#C62828]'
                : 'bg-[#F4F4F4] text-[#525252]'
            }`}
          >
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue || '12%'}
          </span>
        )}
      </div>

      {subtext && <p className="text-xs text-[#64748b] mt-1.5 font-medium">{subtext}</p>}
    </div>
  );
};

