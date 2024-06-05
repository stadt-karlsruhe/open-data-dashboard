'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface ShowSearchbarContextType {
  showSearchbar: boolean;
  setShowSearchbar: Dispatch<SetStateAction<boolean>>;
}

const defaultState: ShowSearchbarContextType = {
  showSearchbar: true,
  // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  setShowSearchbar: () => {},
};

const ShowSearchbarContext = createContext<ShowSearchbarContextType>(defaultState);

export default function HeaderProvider({ children }: { children: ReactNode }) {
  const [showSearchbar, setShowSearchbar] = useState(true);
  return (
    <ShowSearchbarContext.Provider value={{ showSearchbar, setShowSearchbar }}>
      {children}
    </ShowSearchbarContext.Provider>
  );
}

export const useShowSearchbar = () => useContext(ShowSearchbarContext);
