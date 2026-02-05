import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';

const Login: React.FC = () => {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 text-center space-y-6">
        <div className="w-20 h-20 bg-pink-100 dark:bg-pink-900/40 rounded-full flex items-center justify-center mx-auto animate-bounce-slow">
           <span className="text-4xl">👶</span>
        </div>
        <div>
           <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Welcome to NurtureTrack</h1>
           <p className="text-slate-500 dark:text-slate-400">Sync your baby's data in real-time with family.</p>
        </div>
        <button
          onClick={handleLogin}
          className="w-full py-3.5 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl flex items-center justify-center gap-3 transition-all shadow-sm group"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6 group-hover:scale-110 transition-transform" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
