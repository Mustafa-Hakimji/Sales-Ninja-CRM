import {createContext, useContext, useState} from 'react';

const Provider = createContext<null | any>(null);

const ContextProvider = ({children}: any) => {
  const [profile, setProfile] = useState<{} | any>({});
  const [lastSync, setLastSync] = useState<{} | any>({});
  const [recPath, setRecPath] = useState('');

  const contextValue: null | any = {
    profile,
    setProfile,
    setLastSync,
    lastSync,
    recPath,
    setRecPath,
  };
  return (
    <>
      <Provider.Provider value={contextValue}>{children}</Provider.Provider>
    </>
  );
};

export const useContextHook = () => useContext(Provider);

export default ContextProvider;
