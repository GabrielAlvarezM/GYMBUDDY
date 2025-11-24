'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './styles.css';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(stored));
  }, [router]);

  if (!user) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner" />
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const categories = [
    {
      id: 'workouts',
      title: 'WORKOUTS',
      image: '/images/workouts.jpg',
      path: '/workouts',
    },
    {
      id: 'diets',
      title: 'DIETS',
      image: '/images/diets.jpg',
      path: '/diets',
    },
    {
      id: 'supplements',
      title: 'SUPPS',
      image: '/images/supplements.jpg',
      path: '/supplements',
    },
  ];

  return (
    <div className="dashboard-container">
 
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <h1 className="dashboard-logo">
            GYM<span className="logo-highlight">BUDDY</span>
          </h1>

          <div className="dashboard-user-section">
            <div className="dashboard-user-info">
              <p className="user-name">{user.username}</p>
              <p className="user-level">{user.fitness_level}</p>
            </div>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </div>


      <div className="dashboard-columns">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`dashboard-column ${hoveredCategory === category.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
            onClick={() => router.push(category.path)}
          >

            <img
              src={category.image}
              alt={category.title}
              className="column-image"
            />

            
            <div className={`column-overlay overlay-${category.id}`} />

           
            <div className="column-content">
              <div className="column-text">
                <h2 className="column-title">{category.title}</h2>

                <div className="column-explore">
                  <span>EXPLORE</span>
                  <span className="explore-arrow">→</span>
                </div>
              </div>
            </div>

           
            <div className="column-border" />
          </div>
        ))}
      </div>
    </div>
  );
}