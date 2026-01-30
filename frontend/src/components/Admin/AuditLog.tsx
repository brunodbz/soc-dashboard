import { useState, useEffect } from 'react';
import api from '../../services/api';
import { AuditLogEntry } from '../../types';

export function AuditLog() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await api.get<AuditLogEntry[]>('/audit-log');
      setLogs(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Histórico de Auditoria
        </h2>
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Histórico de Auditoria
        </h2>
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800">
          Histórico de Auditoria
        </h2>
        <button
          onClick={fetchLogs}
          className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-200 transition"
        >
          Atualizar
        </button>
      </div>

      {logs.length === 0 ? (
        <p className="text-slate-600 text-center py-8">
          Nenhum registro de auditoria encontrado
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-slate-300">
                <th className="text-left p-3 font-semibold text-slate-700">Data/Hora</th>
                <th className="text-left p-3 font-semibold text-slate-700">Usuário</th>
                <th className="text-left p-3 font-semibold text-slate-700">Ação</th>
                <th className="text-left p-3 font-semibold text-slate-700">Entidade</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-slate-200 hover:bg-slate-100 transition">
                  <td className="p-3 text-slate-700">
                    {new Date(log.timestamp).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="p-3 text-slate-700">{log.user_username}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        log.action === 'CREATE'
                          ? 'bg-green-100 text-green-800'
                          : log.action === 'UPDATE'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3 text-slate-700">{log.entity_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
