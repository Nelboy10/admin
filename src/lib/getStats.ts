import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export async function getStats() {
  const usersSnap = await getDocs(collection(db, 'users'));
  const productsSnap = await getDocs(collection(db, 'products'));
  const ordersSnap = await getDocs(collection(db, 'orders'));

  return {
    users: usersSnap.size,
    products: productsSnap.size,
    orders: ordersSnap.size,
  };
}
