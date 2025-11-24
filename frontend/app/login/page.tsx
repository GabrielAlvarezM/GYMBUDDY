'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '../../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await authAPI.login(username, password);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err: any) {
      setError('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-background">
      <div className="auth-shell">

        <div className="auth-hero">
          <div>
            <div className="auth-hero-badge">
              <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
              <span>Personalized Fitness Platform</span>
            </div>
            <h1 className="auth-hero-title">GymBuddy</h1>
            <p className="auth-hero-text">
              Your digital companion for workouts, nutrition, and supplements.
              Everything in one place, tailored to your level and goals.
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <p className="font-semibold">What you get with GymBuddy:</p>
            <ul className="space-y-1 text-blue-50/90">
              <li>• Workouts based on your level</li>
              <li>• Diets aligned with your goals</li>
              <li>• Recommended supplements</li>
              <li>• Centralized progress dashboard</li>
            </ul>
          </div>
        </div>


        <div className="auth-form-container">
          <div className="mb-6">
            <p className="text-xs font-semibold text-blue-400 mb-2 tracking-wide uppercase">
              Welcome Back
            </p>
            <h2 className="auth-title">Sign In</h2>
            <p className="auth-subtitle">
              Access your personalized workouts, diets, and supplements.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="auth-label">Username</label>
              <input
                type="text"
                autoComplete="username"
                className="auth-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="auth-label">Password</label>
              <input
                type="password"
                autoComplete="current-password"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="auth-primary-button"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-5 space-y-3">
            <button
              onClick={() => router.push('/register')}
              className="auth-secondary-button"
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
