'use client';

import { useEffect, useState } from 'react';
import { getStats } from '@/lib/getStats';
import StatCard from '@/components/StatCard';
import { Users, ShoppingCart, Box } from 'lucide-react';

export default function DashboardHome() {
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getStats();
      setStats(data);
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) return <div>Chargement des données...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard title="Utilisateurs" value={String(stats.users)} icon={<Users />} color="blue" />
      <StatCard title="Produits" value={String(stats.products)} icon={<Box />} color="yellow" />
      <StatCard title="Commandes" value={String(stats.orders)} icon={<ShoppingCart />} color="green" />
    </div>
  );
}
