import axios from 'axios';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface User {
  id: number;
  username: string;
  email: string;
  fitness_level: 'beginner' | 'intermediate' | 'advanced';
}

export interface LoginResponse {
  success: boolean;
  user: User;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  fitness_level: string;
}

export interface ContentItem {
  id: number;
  type: string;
  title: string;
  description: string;
  fitness_level: string;
  image_url: string;
  details: string;
}

export const authAPI = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await api.post('/api/login', { username, password });
    return response.data;
  },

  register: async (payload: RegisterPayload): Promise<{ success: boolean; message: string }> => {
    const response = await api.post('/api/register', payload);
    return response.data;
  },
};

export const contentAPI = {
  getContent: async (type: string, fitness_level: string) => {
    const response = await api.get(`/api/content/${type}`, {
      params: { fitness_level },
    });
    return response.data as {
      type: string;
      fitness_level: string;
      content: ContentItem[];
    };
  },
};

export default api;
