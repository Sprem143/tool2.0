import { createContext, useContext, useState } from 'react';

// Create context
const UserContext = createContext();

// Create provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // store user info here

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
