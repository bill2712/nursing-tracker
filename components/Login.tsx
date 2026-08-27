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
    <div className="login-page min-h-screen flex flex-col items-center justify-center p-4">
      <div className="login-card animate-soft-pop max-w-md w-full rounded-[2rem] p-8 sm:p-10 text-center space-y-7">
        <div className="login-mark w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto -rotate-3">
           <span className="text-5xl rotate-3">👶</span>
        </div>
        <div>
           <p className="page-eyebrow mb-2">NurtureTrack</p>
           <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100 mb-3">寶寶照顧，輕鬆記錄</h1>
           <p className="mx-auto max-w-xs leading-relaxed text-slate-500 dark:text-slate-400">即時與家人同步餵奶、換片、副食及成長紀錄。</p>
        </div>
        <button
          onClick={handleLogin}
          className="w-full min-h-14 py-3.5 px-4 bg-white/90 dark:bg-slate-800 border border-white dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-slate-200/70 dark:shadow-none group active:scale-[0.99]"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6 group-hover:scale-110 transition-transform" />
          使用 Google 帳號登入
        </button>
      </div>
    </div>
  );
};

export default Login;
