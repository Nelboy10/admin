'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleAuth = async () => {
    try {
      setErrorMessage('');
      if (isLogin) {
        // Connexion
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/dashboard');
      } else {
        // Inscription
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Compte créé avec succès! Vous pouvez maintenant vous connecter.');
        setIsLogin(true);
      }
    } catch (error: unknown) {
      // Gérer les erreurs spécifiques
      let message = '';
      const firebaseError = error as { code?: string; message?: string };
      
      // Firebase stocke le code d'erreur dans firebaseError.code
      const errorCode = firebaseError?.code || '';
      
      switch (errorCode) {
        case 'auth/invalid-email':
          message = 'Adresse email invalide.';
          break;
        case 'auth/user-not-found':
          message = 'Aucun compte associé à cette adresse email.';
          break;
        case 'auth/wrong-password':
          message = 'Mot de passe incorrect.';
          break;
        case 'auth/weak-password':
          message = 'Le mot de passe doit contenir au moins 6 caractères.';
          break;
        case 'auth/email-already-in-use':
          message = 'Cette adresse email est déjà utilisée.';
          break;
        case 'auth/network-request-failed':
          message = 'Problème de connexion réseau. Vérifiez votre connexion internet.';
          break;
        case 'auth/invalid-credential':
          message = 'Identifiants invalides. Vérifiez votre email et mot de passe.';
          break;
        case 'auth/too-many-requests':
          message = 'Trop de tentatives échouées. Compte temporairement désactivé.';
          break;
        default:
          message = `Erreur de connexion: ${firebaseError?.message || 'Erreur inconnue'}`;
      }
      setErrorMessage(message);
      console.error('Erreur d\'authentification:', error);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Connexion' : 'Inscription'}
        </h1>
        
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errorMessage}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Votre email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input
              type="password"
              placeholder="Votre mot de passe"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            onClick={handleAuth} 
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isLogin ? 'Se connecter' : 'S\'inscrire'}
          </button>
          
          <div className="text-center mt-4">
            <button 
              onClick={toggleMode} 
              className="text-blue-600 hover:underline"
            >
              {isLogin ? 'Créer un compte' : 'Déjà un compte? Se connecter'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}