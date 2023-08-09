import { createContext, PropsWithChildren, useContext } from 'react';

export const ApiContext = createContext<{ url: string | null }>({
  url: `${process.env.REACT_APP_API_URL}`,
});

export const ApiProvider = ({ children }: PropsWithChildren) => {
  const url = `${process.env.REACT_APP_API_URL}`;

  return <ApiContext.Provider value={{ url }}>{children}</ApiContext.Provider>;
};

export default function useApi() {
  return useContext(ApiContext);
}
