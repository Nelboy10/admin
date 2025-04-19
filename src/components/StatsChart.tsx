'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import dayjs from 'dayjs';

type UserData = {
  createdAt: Timestamp;
};

type ChartData = {
  name: string;  // Mois
  users: number; // Nombre d'inscrits
};

const MONTH_ORDER = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function StatsChart() {
  const [data, setData] = useState<ChartData[]>([]);

  const fetchData = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'users'));
      const users = snapshot.docs.map(doc => doc.data() as UserData);

      const monthCounts: Record<string, number> = {};

      users.forEach(user => {
        const ts = user.createdAt;
        if (ts instanceof Timestamp) {
          const month = dayjs(ts.toDate()).format('MMM'); // Ex: Jan, Feb, Mar
          monthCounts[month] = (monthCounts[month] || 0) + 1;
        }
      });

      const chartData: ChartData[] = MONTH_ORDER.map(month => ({
        name: month,
        users: monthCounts[month] || 0,
      }));

      setData(chartData);
    } catch (err) {
      console.error("Erreur lors du chargement des données du graphique :", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-8">
      <h2 className="text-lg font-semibold mb-4">Utilisateurs créés par mois</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="users" fill="#3B82F6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
