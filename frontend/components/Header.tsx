'use client';

import { useRouter } from 'next/navigation';

interface HeaderProps {
  title?: string;
}

export default function Header({ title = 'GymBuddy' }: HeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
      <div className="container-responsive flex items-center justify-between py-4">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => router.push('/dashboard')}
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-black text-xs transform group-hover:rotate-12 transition-transform">
            GB
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">GymBuddy</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {title && (
            <span className="hidden md:block text-xs font-bold text-slate-500 uppercase tracking-widest border-r border-slate-800 pr-4">
              {title}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
