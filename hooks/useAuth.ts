'use client';

import { useAuthContext } from '@/context/AuthContext';
import { login as apiLogin, register as apiRegister } from '@/lib/api';
import { useState } from 'react';

export function useAuth() {
    const { user, token, isAuthenticated, isLoading, login, logout, updateUser } = useAuthContext();
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleLogin = async (credentials: any) => {
        setError(null);
        setIsProcessing(true);
        try {
            const data = await apiLogin(credentials);
            console.log('Login response:', data); // Debug log
            if (!data.user) {
                throw new Error('Login response missing user data');
            }
            login(data.user, data.token);
        } catch (err: any) {
            setError(err.message || 'Login failed');
            throw err;
        } finally {
            setIsProcessing(false);
        }
    };

    const handleRegister = async (userData: any) => {
        setError(null);
        setIsProcessing(true);
        try {
            const data = await apiRegister(userData);
            login(data.user, data.token);
        } catch (err: any) {
            setError(err.message || 'Registration failed');
            throw err;
        } finally {
            setIsProcessing(false);
        }
    };

    return {
        user,
        token,
        isAuthenticated,
        isLoading,
        isProcessing,
        error,
        login: handleLogin,
        register: handleRegister,
        logout,
        updateUser,
    };
}
