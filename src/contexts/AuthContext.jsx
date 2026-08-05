import PropTypes from 'prop-types';
import { createContext, useMemo, useState, useEffect } from 'react';

// ==============================|| AUTH CONTEXT ||============================== //

export const AuthContext = createContext(undefined);

// ==============================|| AUTH PROVIDER ||============================== //

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we have a stored user on mount
    try {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('access_token');
      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error('Failed to parse user from local storage', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData, accessToken) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('access_token', accessToken);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    // Note: HttpOnly refresh cookie needs an API call to clear or rely on expiration.
  };

  const memoizedValue = useMemo(
    () => ({ user, isAuthenticated, loading, login, logout }),
    [user, isAuthenticated, loading]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = { children: PropTypes.node };
