'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface ShowContextType {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const defaultState: ShowContextType = {
  show: false,
  // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  setShow: () => {},
};

const ShowNavigationContext = createContext<ShowContextType>(defaultState);

export default function NavigationProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);
  return <ShowNavigationContext.Provider value={{ show, setShow }}>{children}</ShowNavigationContext.Provider>;
}

export const useShowNavigation = () => useContext(ShowNavigationContext);
