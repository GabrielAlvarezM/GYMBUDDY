'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '../../lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    fitness_level: 'beginner',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const res = await authAPI.register(form);
      setSuccess(res.message || 'Account created successfully');
      setTimeout(() => router.push('/login'), 1500);
    } catch (err: any) {
      setError('Registration failed. Username or email may already exist.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-background">
      <div className="auth-shell">
        {/* Hero Column */}
        <div className="auth-hero">
          <div>
            <div className="auth-hero-badge">
              <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
              <span>Start Your Fitness Journey</span>
            </div>
            <h1 className="auth-hero-title">Create Account</h1>
            <p className="auth-hero-text">
              We'll design workouts, diets, and supplements according to your
              level and goals. We just need some basic information.
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <p className="font-semibold">Quick tips:</p>
            <ul className="space-y-1 text-blue-50/90">
              <li>• Use a valid email address</li>
              <li>• Choose your current level, not aspirational</li>
              <li>• You can update your profile later</li>
            </ul>
          </div>
        </div>

        {/* Form Column */}
        <div className="auth-form-container">
          <div className="mb-6">
            <p className="text-xs font-semibold text-blue-400 mb-2 tracking-wide uppercase">
              Create Account
            </p>
            <h2 className="auth-title">Join GymBuddy</h2>
            <p className="auth-subtitle">
              Get access to your personalized dashboard in under a minute.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="auth-label">Username</label>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="auth-input"
                  placeholder="Your username"
                />
              </div>
              <div>
                <label className="auth-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="auth-input"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="auth-label">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="auth-input"
                placeholder="Minimum 8 characters recommended"
              />
            </div>

            <div>
              <label className="auth-label">Fitness Level</label>
              <select
                name="fitness_level"
                value={form.fitness_level}
                onChange={handleChange}
                className="auth-input"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
            {success && (
              <p className="text-emerald-400 text-sm text-center">{success}</p>
            )}

            <button
              type="submit"
              className="auth-primary-button"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-5 space-y-3">
            <button
              onClick={() => router.push('/login')}
              className="auth-secondary-button"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
