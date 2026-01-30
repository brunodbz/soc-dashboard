import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-slate-800">
              SOC Dashboard
            </h1>

            <nav className="flex space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive('/')
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                Dashboard
              </Link>

              <Link
                to="/admin"
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive('/admin')
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                Painel de Controle
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600">
              {user?.username}
            </span>

            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
