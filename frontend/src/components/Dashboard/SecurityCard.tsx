import { SecurityItem } from '../../types';
import { SeverityBadge } from './SeverityBadge';

interface SecurityCardProps {
  title: string;
  items: SecurityItem[] | { error: string };
  icon: string;
}

export function SecurityCard({ title, items, icon }: SecurityCardProps) {
  if ('error' in items) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
          <span className="mr-2">{icon}</span>
          {title}
        </h3>
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded text-sm">
          <span className="font-semibold">Erro:</span> {items.error}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
          <span className="mr-2">{icon}</span>
          {title}
        </h3>
        <div className="text-slate-500 text-sm text-center py-4">
          Nenhum item encontrado
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
        <span className="mr-2">{icon}</span>
        {title}
      </h3>
      <div className="space-y-2">
        {items.slice(0, 5).map((item) => (
          <div
            key={item.id}
            className="bg-white p-3 rounded border border-slate-100 hover:border-slate-300 transition"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-slate-700 flex-1 mr-2">
                {item.title}
              </span>
              <SeverityBadge severity={item.severity} />
            </div>
            
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>
                {new Date(item.timestamp).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              
              {item.source && (
                <span className="ml-2 text-slate-600">
                  {item.source}
                </span>
              )}
              
              {item.category && (
                <span className="ml-2 text-slate-600">
                  {item.category}
                </span>
              )}
              
              {item.asset && (
                <span className="ml-2 text-slate-600">
                  {item.asset}
                </span>
              )}
              
              {item.type && (
                <span className="ml-2 text-slate-600">
                  {item.type}
                </span>
              )}
            </div>
            
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-600 hover:text-indigo-800 mt-1 inline-block"
              >
                Ver mais →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
