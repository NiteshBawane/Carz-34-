
import React, { createContext, useContext, useState, useCallback } from 'react';

interface AuthContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('carz34_admin') === 'true';
    } catch {
      return false;
    }
  });

  const login = useCallback((password: string) => {
    // Standard access passcode
    if (password === 'admin34') {
      setIsAdmin(true);
      localStorage.setItem('carz34_admin', 'true');
      console.log('Admin login successful');
      return true;
    }
    console.warn('Admin login attempt failed');
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAdmin(false);
    localStorage.removeItem('carz34_admin');
    // Using window.location.hash is okay for a simple HashRouter setup, 
    // but in App.tsx we'll ensure we handle logout navigation cleanly.
    window.location.hash = '#/'; 
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
