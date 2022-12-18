import { useState } from 'react';
import { createContext } from 'react';

const CurrentPetContext = createContext();

export function CurrentPetProvider({ children }) {
  const [currentPet, setCurrentPet] = useState(null);
  // console.log(currentPet);

  return (
    <CurrentPetContext.Provider value={{ currentPet, setCurrentPet }}>
      {children}
    </CurrentPetContext.Provider>
  );
}

export default CurrentPetContext;
