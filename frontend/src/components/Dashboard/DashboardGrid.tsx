import { useSecurityData } from '../../hooks/useSecurityData';
import { SecurityCard } from './SecurityCard';

export function DashboardGrid() {
  const { data, loading, error } = useSecurityData();

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-slate-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg">
          <h3 className="font-semibold mb-2">Erro ao carregar dados</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-slate-600">Nenhum dado disponível</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard de Segurança
        </h1>
        <div className="text-sm text-slate-600">
          Atualização automática a cada 30 segundos
          {loading && (
            <span className="ml-2 inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SecurityCard
          title="Elastic Search"
          items={data.elastic}
          icon="🔍"
        />
        <SecurityCard
          title="Microsoft Defender 365"
          items={data.defender}
          icon="🛡️"
        />
        <SecurityCard
          title="OpenCTI"
          items={data.opencti}
          icon="🎯"
        />
        <SecurityCard
          title="Tenable.io"
          items={data.tenable}
          icon="🔐"
        />
        <SecurityCard
          title="RSS Feeds"
          items={data.rss}
          icon="📰"
        />
      </div>
    </div>
  );
}
