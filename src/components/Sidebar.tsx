'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Settings } from 'lucide-react';

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: <Home size={20} /> },
  { name: 'Utilisateurs', href: '/dashboard/users', icon: <Users size={20} /> },
  { name: 'Paramètres', href: '/dashboard/settings', icon: <Settings size={20} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-gray-900 text-white w-64 h-screen p-6 hidden md:block">
      <h2 className="text-xl font-bold mb-6">Admin</h2>
      <nav className="space-y-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-800 transition ${
              pathname === link.href ? 'bg-gray-800' : ''
            }`}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
