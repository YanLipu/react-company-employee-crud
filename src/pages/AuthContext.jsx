import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider =  ({ children }) => {
  const [user, setUser] = useState(null);

  useState(() => {
    const userData = localStorage.getItem('user');

    console.log('userData local', userData)

    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null)
    }
  });

  const login = (userData) => {
    console.log('userData', userData)
    // Assuming the login response contains the user data
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };