import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mandya_auth_user');
    return saved ? JSON.parse(saved) : { role: 'citizen', name: 'Public Citizen', hobliId: null };
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('mandya_auth_user', JSON.stringify(user));
  }, [user]);

  const login = (role, credentials = {}) => {
    let newUser = { role, name: 'Public Citizen', hobliId: null };

    if (role === 'admin') {
      newUser = {
        role: 'admin',
        name: 'Office of Ravikumar Gowda (MLA Admin)',
        email: 'admin@mandya.gov.in',
        hobliId: null
      };
    } else if (role === 'leader') {
      const hobliId = credentials.hobliId || 'kasaba';
      const names = {
        kasaba: 'Sri B. M. Suresh (Kasaba)',
        keragodu: 'Smt. R. Lakshmi Gowda (Keragodu)',
        basaralu: 'Sri K. Ramesh Gowda (Basaralu)',
        'mandya-city': 'Sri M. Jayaram (Mandya City)'
      };
      newUser = {
        role: 'leader',
        name: names[hobliId] || 'Hobli Representative',
        hobliId: hobliId
      };
    }

    setUser(newUser);
    setIsLoginModalOpen(false);
    return true;
  };

  const logout = () => {
    const citizenUser = { role: 'citizen', name: 'Public Citizen', hobliId: null };
    setUser(citizenUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user.role,
        isLoggedIn: user.role !== 'citizen',
        isAdmin: user.role === 'admin',
        isLeader: user.role === 'leader',
        login,
        logout,
        isLoginModalOpen,
        setIsLoginModalOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
