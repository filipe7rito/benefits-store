import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import api from '../api';
import { User } from '../api/user';
import useLocalStorage from './useLocalStorage';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
};

const defaultContext = {
  user: null,
  isAuthenticated: false,
  loading: false,
  login: async () => {},
  logout: () => {},
  fetchUser: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContext);

const AuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userIdInStorage, setUserIdInStorage] = useLocalStorage('userId', null);
  const [loading, setLoading] = useState<boolean>(false);
  const isAuthenticated = !!userIdInStorage;
  const navigate = useNavigate();

  // Fetch the user
  const fetchUser = async () => {
    try {
      setLoading(true);

      const user = await api.user.get(userIdInStorage);

      setUser(user);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fetch the user on mount if we have a user id in storage
  useEffect(() => {
    // If we have a user id in storage, fetch the user
    if (userIdInStorage) {
      fetchUser();
    }
  }, []);

  const login = async (username: string) => {
    try {
      const user = await api.user.get(username);

      setUserIdInStorage(username);
      setUser(user);
      navigate(`/products`);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.clear();
    setUserIdInStorage(null);
    setUser(null);
    navigate(`/login`);
  };

  const value = useMemo(
    () => ({ user, isAuthenticated, loading, login, logout, fetchUser }),
    [user, loading, isAuthenticated, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      <Outlet />
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
