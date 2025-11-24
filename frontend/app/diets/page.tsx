'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './styles.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface ContentItem {
  id: number;
  title: string;
  description: string;
  details: string;
  fitness_level: string;
  image_url: string;
}

export default function DietsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [items, setItems] = useState<ContentItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(stored);
    setUser(userData);

    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    loadContent(userData.fitness_level);
  }, [router]);

  useEffect(() => {
    filterContent();
  }, [items, searchQuery, filterLevel]);

  const loadContent = async (fitnessLevel: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/content/diet?fitness_level=${fitnessLevel}`);
      const data = await response.json();
      setItems(data.content || []);
    } catch (error) {
      console.error('Error loading diets:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterContent = () => {
    let filtered = [...items];

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterLevel !== 'all') {
      filtered = filtered.filter(item => item.fitness_level === filterLevel);
    }

    setFilteredItems(filtered);
  };

  const toggleFavorite = (id: number) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];

    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  if (!user || loading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner diets-spinner" />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-content">
          <button onClick={() => router.push('/dashboard')} className="back-button">
            <span>←</span> Back
          </button>

          <div className="page-user-info">
            <p className="user-name">{user.username}</p>
            <p className="user-level">{user.fitness_level}</p>
          </div>
        </div>
      </div>

      <div className="page-main">
        <div className="page-hero">
          <h1 className="page-title diets-title">NUTRITION</h1>
          <p className="page-subtitle">
            Meal plans for <span className="highlight-level diets-highlight">{user.fitness_level}</span> level
          </p>
        </div>

        <div className="filters-container">
          <div className="filters-grid">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search diets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>

            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="results-counter">
            Showing <span className="counter-highlight diets-counter">{filteredItems.length}</span> of <span className="counter-total">{items.length}</span> diets
          </div>
        </div>

        <div className="content-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="content-card">
              <div className="card-image-wrapper">
                <img src={`/images/diets${item.fitness_level.charAt(0).toUpperCase() + item.fitness_level.slice(1)}.png`} alt={item.title} className="card-image" />
                <div className="card-image-overlay diets-overlay" />

                <div className="card-badges">
                  <span className="level-badge">{item.fitness_level}</span>
                  <button onClick={() => toggleFavorite(item.id)} className="favorite-button">
                    {favorites.includes(item.id) ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>

              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.description}</p>

                <button
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  className="details-button diets-button"
                >
                  {expandedId === item.id ? 'Hide Details ▲' : 'Show Details ▼'}
                </button>

                {expandedId === item.id && (
                  <div className="details-content diets-details">
                    {item.details.split('\n').filter(line => line.trim()).map((line, i) => (
                      <div key={i} className="detail-line">
                        <span className="detail-bullet diets-bullet">•</span>
                        <span className="detail-text">{line.trim()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p className="empty-text">No diets found</p>
          </div>
        )}
      </div>
    </div>
  );
}