'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth, onAuthStateChange } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  userType: 'individual' | 'company' | null;
  setAuthUserType: (type: 'individual' | 'company' | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<'individual' | 'company' | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChange((user) => {
        setUser(user);
        setLoading(false);
      });

      return () => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      };
    } catch (error) {
      console.warn('Firebase auth not available, using demo mode');
      setLoading(false);
    }
  }, []);

  const isAuthenticated = !!user || !!userType; // Demo mode için userType da kontrol et

  const setAuthUserType = (type: 'individual' | 'company' | null) => {
    setUserType(type);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    userType,
    setAuthUserType,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  // Demo kullanıcı desteği - sadece client-side
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (isClient && !context.user && !context.userType) {
    // Sadece URL'de ?demo=1 varsa demo kullanıcı döndür
    if (typeof window !== 'undefined' && window.location.search.includes('demo=1')) {
      return {
        ...context,
        user: { uid: 'demo', displayName: 'Demo User', email: 'demo@trailie.com' } as any,
        userType: 'individual',
        isAuthenticated: true,
      };
    }
  }
  
  return context;
} 