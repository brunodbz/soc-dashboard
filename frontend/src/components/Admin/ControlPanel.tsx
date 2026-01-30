import { useState, useEffect } from 'react';
import { ConfigForm } from './ConfigForm';
import { AuditLog } from './AuditLog';
import api from '../../services/api';
import { Config } from '../../types';

export function ControlPanel() {
  const [configs, setConfigs] = useState<Partial<Config>[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchConfigs = async () => {
    try {
      setLoading(true);
      const response = await api.get<Partial<Config>[]>('/configs');
      setConfigs(response.data);
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, [refreshKey]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir esta configuração?')) {
      return;
    }

    try {
      await api.delete(`/configs/${id}`);
      setRefreshKey((prev) => prev + 1);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erro ao excluir configuração');
    }
  };

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      await api.put(`/configs/${id}`, { is_active: !currentStatus });
      setRefreshKey((prev) => prev + 1);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erro ao atualizar configuração');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        Painel de Controle
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConfigForm onSuccess={() => setRefreshKey((prev) => prev + 1)} />

        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Configurações Existentes
          </h3>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : configs.length === 0 ? (
            <p className="text-slate-600 text-center py-8">
              Nenhuma configuração cadastrada
            </p>
          ) : (
            <div className="space-y-3">
              {configs.map((config) => (
                <div
                  key={config.id}
                  className="bg-white p-4 rounded border border-slate-200 hover:border-slate-300 transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800">
                        {config.service_name}
                      </h4>
                      <p className="text-sm text-slate-600">
                        Tipo: {config.service_type}
                      </p>
                      {config.url && (
                        <p className="text-xs text-slate-500 mt-1 truncate">
                          {config.url}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => config.id && handleToggleActive(config.id, config.is_active || false)}
                        className={`px-3 py-1 rounded text-xs font-semibold transition ${
                          config.is_active
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                      >
                        {config.is_active ? 'Ativo' : 'Inativo'}
                      </button>

                      <button
                        onClick={() => config.id && handleDelete(config.id)}
                        className="px-3 py-1 rounded text-xs font-semibold bg-red-100 text-red-800 hover:bg-red-200 transition"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AuditLog />
    </div>
  );
}
