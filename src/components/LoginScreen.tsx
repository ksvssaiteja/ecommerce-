import React, { useState } from 'react';
import { LogIn, ShieldCheck, ShoppingBag } from 'lucide-react';
import { AuthUser } from '../types';

interface LoginScreenProps {
  onLogin: (user: AuthUser) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('user@sunitha.com');
  const [password, setPassword] = useState('user123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Unable to sign in');
      }
      onLogin(result.user as AuthUser);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Unable to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#f1f4f8] flex items-center justify-center p-4 text-[#191c1e]">
      <section className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#b80035] text-white flex items-center justify-center shadow-lg shadow-rose-200">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="font-display font-bold text-xl text-slate-900">Sunitha ShoeMart</p>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#b80035]">Welcome back</p>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-slate-900">Sign in to continue</h1>
          <p className="text-sm text-slate-500 mt-1">Shop new drops or manage your catalog.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-xs font-bold text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-rose-100"
              required
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-slate-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-rose-100"
              required
            />
          </label>

          {error && <p className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-[#b80035] py-3 text-sm font-bold text-white shadow-lg shadow-rose-200 transition hover:bg-[#920028] disabled:cursor-wait disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 rounded-2xl bg-slate-50 p-3.5 text-xs text-slate-600">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Demo accounts
          </div>
          <p className="mt-2">User: user@sunitha.com / user123</p>
          <p>Admin: admin@sunitha.com / admin123</p>
        </div>
      </section>
    </main>
  );
};
