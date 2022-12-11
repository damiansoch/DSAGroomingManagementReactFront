import { useState } from 'react';
import { createContext } from 'react';

const CurrentOwnerContext = createContext();

export function CurrentOwnerProvider({ children }) {
  const [currentOwner, setCurrentOwner] = useState(null);
  console.log(currentOwner);

  return (
    <CurrentOwnerContext.Provider value={{ currentOwner, setCurrentOwner }}>
      {children}
    </CurrentOwnerContext.Provider>
  );
}

export default CurrentOwnerContext;
