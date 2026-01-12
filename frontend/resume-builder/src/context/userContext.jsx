import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/axiosInstance';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await authAPI.getProfile();
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (error) {
        console.error('Failed to fetch user:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const clearUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setError(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser, isLoading, error, isAuthenticated: !!user }}>
      {children}
    </UserContext.Provider>
  );
};

// Export UserContext for direct usage
export { UserContext };