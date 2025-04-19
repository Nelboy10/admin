'use client';

import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUserPlus, FiLogIn } from 'react-icons/fi';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Reset error message when switching between login/signup
    setErrorMessage('');
  }, [isLogin]);

  const handleAuth = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/dashboard');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Compte créé avec succès! Vous pouvez maintenant vous connecter.');
        setIsLogin(true);
      }
    } catch (error: unknown) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthError = (error: unknown) => {
    let message = '';
    const firebaseError = error as { code?: string; message?: string };
    const errorCode = firebaseError?.code || '';
    
    switch (errorCode) {
      case 'auth/invalid-email': message = 'Adresse email invalide.'; break;
      case 'auth/user-not-found': message = 'Aucun compte associé à cette adresse email.'; break;
      case 'auth/wrong-password': message = 'Mot de passe incorrect.'; break;
      case 'auth/weak-password': message = 'Le mot de passe doit contenir au moins 6 caractères.'; break;
      case 'auth/email-already-in-use': message = 'Cette adresse email est déjà utilisée.'; break;
      case 'auth/network-request-failed': message = 'Problème de connexion réseau.'; break;
      case 'auth/invalid-credential': message = 'Identifiants invalides.'; break;
      case 'auth/too-many-requests': message = 'Trop de tentatives. Compte temporairement désactivé.'; break;
      default: message = `Erreur: ${firebaseError?.message || 'Erreur inconnue'}`;
    }
    
    setErrorMessage(message);
    console.error('Erreur d\'authentification:', error);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full">
            {isLogin ? (
              <FiLogIn className="text-blue-600 text-2xl" />
            ) : (
              <FiUserPlus className="text-blue-600 text-2xl" />
            )}
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          {isLogin ? 'Connexion' : 'Inscription'}
        </h1>
        <p className="text-center text-gray-500 mb-6">
          {isLogin ? 'Content de vous revoir !' : 'Créez votre compte en quelques secondes'}
        </p>
        
        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm"
          >
            {errorMessage}
          </motion.div>
        )}
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="email@exemple.com"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAuth} 
            disabled={isLoading}
            className={`w-full px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isLogin ? 'Connexion...' : 'Inscription...'}
              </>
            ) : (
              <>
                {isLogin ? <FiLogIn /> : <FiUserPlus />}
                {isLogin ? 'Se connecter' : 'S\'inscrire'}
              </>
            )}
          </motion.button>
          
          <div className="text-center mt-4">
            <button 
              onClick={toggleMode} 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
            >
              {isLogin ? 'Pas de compte ? Créer un compte' : 'Déjà un compte ? Se connecter'}
            </button>
          </div>
        </div>
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-500 text-sm mt-6 text-center"
      >
        © {new Date().getFullYear()}  Tous droits réservés.
      </motion.p>
    </main>
  );
}