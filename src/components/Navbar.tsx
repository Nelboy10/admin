'use client';

import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const logout = async () => {
    const confirm = window.confirm('Voulez-vous vraiment vous déconnecter ?');
    if (!confirm) return;

    await signOut(auth);
    router.push('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
        <svg
          className="w-6 h-6 text-blue-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h18v18H3V3z"
          />
        </svg>
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>

      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-md text-sm font-medium"
      >
        Déconnexion
      </button>
    </nav>
  );
}
