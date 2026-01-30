import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main className="max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
