'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Link from 'next/link';

type User = {
  id: string;
  name: string;
  email: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, 'users'));
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as User[];

    setUsers(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Supprimer cet utilisateur ?')) {
      await deleteDoc(doc(db, 'users', id));
      fetchUsers(); // Refresh
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Utilisateurs</h1>
        <Link href="/dashboard/users/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          Ajouter
        </Link>
      </div>

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nom</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="text-center">
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border space-x-2">
                <Link href={`/dashboard/users/${user.id}`} className="text-blue-500 underline">
                  Modifier
                </Link>
                <button onClick={() => handleDelete(user.id)} className="text-red-500">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
