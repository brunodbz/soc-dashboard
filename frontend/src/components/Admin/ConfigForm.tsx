import { useState, FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import { Config } from '../../types';

interface ConfigFormProps {
  onSuccess?: () => void;
}

export function ConfigForm({ onSuccess }: ConfigFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Config>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const onSubmit = async (data: Config) => {
    setLoading(true);
    setMessage(null);

    try {
      await api.post('/configs', data);
      setMessage({ type: 'success', text: 'Configuração salva com sucesso!' });
      reset();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Erro ao salvar configuração',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-slate-50 p-6 rounded-lg border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Nova Configuração
      </h3>

      {message && (
        <div
          className={`px-4 py-3 rounded ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Serviço *
        </label>
        <select
          {...register('service_name', { required: 'Serviço é obrigatório' })}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Selecione um serviço</option>
          <option value="elastic">Elastic Search</option>
          <option value="defender">Microsoft Defender 365</option>
          <option value="opencti">OpenCTI</option>
          <option value="tenable">Tenable.io</option>
          <option value="rss">RSS Feed</option>
        </select>
        {errors.service_name && (
          <p className="text-red-600 text-sm mt-1">{errors.service_name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Tipo de Serviço *
        </label>
        <input
          {...register('service_type', { required: 'Tipo é obrigatório' })}
          type="text"
          placeholder="Ex: SIEM, EDR, TI, VM, NEWS"
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.service_type && (
          <p className="text-red-600 text-sm mt-1">{errors.service_type.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          URL
        </label>
        <input
          {...register('url')}
          type="url"
          placeholder="https://example.com"
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          API Key
        </label>
        <input
          {...register('api_key')}
          type="password"
          placeholder="Sua API Key"
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Token
        </label>
        <input
          {...register('token')}
          type="password"
          placeholder="Seu Token"
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-center">
        <input
          {...register('is_active')}
          type="checkbox"
          id="is_active"
          defaultChecked
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
        />
        <label htmlFor="is_active" className="ml-2 block text-sm text-slate-700">
          Configuração ativa
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Salvando...' : 'Salvar Configuração'}
      </button>
    </form>
  );
}
