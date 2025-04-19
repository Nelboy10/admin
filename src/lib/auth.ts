// src/lib/auth.ts
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase/config';

/**
 * Connexion d'un utilisateur
 */
export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error('Email ou mot de passe incorrect');
  }
};

/**
 * Déconnexion de l'utilisateur
 */
export const logout = async () => {
  await signOut(auth);
};

/**
 * Vérifier si un utilisateur est connecté
 */
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // évite d'écouter en boucle
      resolve(user);
    });
  });
};
