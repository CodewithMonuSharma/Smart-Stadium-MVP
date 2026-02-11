import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
    user: any;
    login: (data: any) => Promise<boolean>;
    register: (data: any) => Promise<boolean>;
    loginWithSocial: (provider: 'google' | 'github') => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Configure axios base URL
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
axios.defaults.withCredentials = true; // IMPORTANT for cookies (session id)
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async () => {
        try {
            // First ensure we have a CSRF token
            await axios.get('/auth/csrf/');

            // Then check if the user is authenticated
            const res = await axios.get('/auth/user/');
            if (res.data.is_authenticated) {
                setUser(res.data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Auth check failed", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (credentials: any) => {
        try {
            const res = await axios.post('/auth/login/', credentials);
            if (res.data.success) {
                setUser(res.data.user);
                return true;
            }
        } catch (error) {
            console.error("Login failed", error);
        }
        return false;
    };

    const register = async (userData: any) => {
        try {
            const res = await axios.post('/auth/register/', userData);
            if (res.data.success) {
                setUser(res.data.user);
                return true;
            }
        } catch (error) {
            console.error("Registration failed", error);
        }
        return false;
    };

    const logout = async () => {
        try {
            await axios.post('/auth/logout/');
            setUser(null);
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    const loginWithSocial = async (provider: 'google' | 'github') => {
        setIsLoading(true);
        // In a real app, this would redirect to OAuth URL
        // Here we simulate a successful login for MVP purposes
        setTimeout(() => {
            setUser({
                username: provider === 'google' ? 'Google User' : 'Github User',
                email: `${provider}@example.com`
            });
            setIsLoading(false);
        }, 1500);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loginWithSocial, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
