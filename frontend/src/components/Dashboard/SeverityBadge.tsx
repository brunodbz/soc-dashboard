import { Severity } from '../../types';

interface SeverityBadgeProps {
  severity: Severity;
}

const severityConfig = {
  critical: { bg: 'bg-critical', text: 'text-red-900', label: 'Crítico' },
  high: { bg: 'bg-high', text: 'text-orange-900', label: 'Alto' },
  medium: { bg: 'bg-medium', text: 'text-yellow-900', label: 'Médio' },
  low: { bg: 'bg-low', text: 'text-blue-900', label: 'Baixo' },
  info: { bg: 'bg-info', text: 'text-indigo-900', label: 'Info' },
};

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const config = severityConfig[severity] || severityConfig.info;

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}
