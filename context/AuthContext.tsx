'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, getMe } from '@/lib/api';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
    updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUser(null);
        setToken(null);
        setIsLoading(false);
        if (pathname !== '/login' && pathname !== '/register') {
            router.push('/login');
        }
    }, [router, pathname]);

    const login = useCallback((userData: User, token: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userData.id.toString());
        setUser(userData);
        setToken(token);
        setIsLoading(false);
        router.push('/');
    }, [router]);

    const updateUser = useCallback((userData: User) => {
        setUser(userData);
    }, []);

    useEffect(() => {
        async function initAuth() {
            const savedToken = localStorage.getItem('token');
            if (!savedToken) {
                setIsLoading(false);
                return;
            }

            try {
                const userData = await getMe(savedToken);
                setToken(savedToken);
                setUser(userData);
            } catch (error) {
                console.error('Session initialization failed:', error);
                logout();
            } finally {
                setIsLoading(false);
            }
        }

        initAuth();
    }, [logout]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token,
                isLoading,
                login,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}
