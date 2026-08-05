import PropTypes from 'prop-types';

// project imports
import { TrendingUp, TrendingDown } from 'lucide-react';
import clsx from 'clsx';

export default function AnalyticEcommerce({
  color = 'primary',
  title,
  count,
  percentage,
  isLoss,
  extra = '',
  footer,
  prefix = '',
  suffix = '',
  icon
}) {
  // Map our generic color string to specific Tailwind color variants
  const colorMap = {
    primary: {
      border: 'border-emerald-500/20 hover:border-emerald-500/50',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      trendBg: 'bg-emerald-100/50',
      trendColor: 'text-emerald-700',
      textAccent: 'text-emerald-600'
    },
    warning: {
      border: 'border-amber-500/20 hover:border-amber-500/50',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      trendBg: 'bg-amber-100/50',
      trendColor: 'text-amber-700',
      textAccent: 'text-amber-600'
    },
    error: {
      border: 'border-rose-500/20 hover:border-rose-500/50',
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-600',
      trendBg: 'bg-rose-100/50',
      trendColor: 'text-rose-700',
      textAccent: 'text-rose-600'
    },
    info: {
      border: 'border-cyan-500/20 hover:border-cyan-500/50',
      iconBg: 'bg-cyan-50',
      iconColor: 'text-cyan-600',
      trendBg: 'bg-cyan-100/50',
      trendColor: 'text-cyan-700',
      textAccent: 'text-cyan-600'
    },
    secondary: {
      border: 'border-indigo-500/20 hover:border-indigo-500/50',
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      trendBg: 'bg-indigo-100/50',
      trendColor: 'text-indigo-700',
      textAccent: 'text-indigo-600'
    }
  };

  const theme = colorMap[color] || colorMap.primary;

  return (
    <div className={clsx(
      "group relative overflow-hidden bg-white/80 backdrop-blur-md rounded-2xl p-6",
      "border shadow-sm hover:shadow-md transition-all duration-300 ease-in-out",
      theme.border
    )}>
      {/* Soft top gradient accent */}
      <div className={clsx("absolute top-0 left-0 w-full h-1 bg-gradient-to-r", color === 'primary' ? 'from-emerald-400 to-teal-500' : `from-${color}-400 to-${color}-500`)} opacity="0.8" />

      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-500 tracking-wide">
            {title}
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <h4 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {prefix}{count}{suffix}
            </h4>
            {percentage !== undefined && percentage !== null && (
              <div className={clsx(
                "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold",
                isLoss ? colorMap.error.trendBg : theme.trendBg,
                isLoss ? colorMap.error.trendColor : theme.trendColor
              )}>
                {isLoss ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                <span>{Math.abs(percentage)}%</span>
              </div>
            )}
          </div>
        </div>

        {icon && (
          <div className={clsx(
            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110",
            theme.iconBg,
            theme.iconColor
          )}>
            {icon}
          </div>
        )}
      </div>

      {(footer || extra) && (
        <div className="pt-4 mt-2 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            {footer || (
              <>
                <span className="mr-1">Extra:</span>
                <span className={clsx("font-semibold", theme.textAccent)}>
                  {extra}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.string,
  footer: PropTypes.node,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  icon: PropTypes.node
};
