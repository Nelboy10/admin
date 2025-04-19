'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import StatsChart from '@/components/StatsChart';

export default function DashboardPage() {
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    setUserCount(usersSnapshot.size);
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <div className="p-4">Chargement des statistiques...</div>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard 📊</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-sm text-gray-500 mb-2">Nombre d'utilisateurs</h2>
          <p className="text-3xl font-bold text-blue-600">{userCount}</p>
        </div>

        {/* Tu pourras ajouter d'autres cartes ici plus tard */}
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-sm text-gray-500 mb-2">Autres infos</h2>
          <p className="text-3xl font-bold text-gray-400">--</p>
        </div>
        <StatsChart/>
      </div>
    </main>
  );
}
