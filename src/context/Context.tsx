import { createContext, ReactNode, useContext } from "react";

const Context = createContext({});

export default function ContextProvider(props: { children: ReactNode }) {
  return <Context.Provider value={{}}>{props.children}</Context.Provider>;
}

export const useContextProvider = () => useContext(Context);
