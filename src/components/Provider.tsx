"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface usersType {
  [x: string]: ReactNode;
}

interface ContextProps {
  users: usersType[];
  setUsers: Dispatch<SetStateAction<usersType[]>>;
}

const GlobalContext = createContext<ContextProps>({
  users: [],
  setUsers: (): usersType[] => [],
});

export const GlobalContextProvider = ({ children }: any) => {
  const [users, setUsers] = useState<[] | usersType[]>([]);

  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
    // const takeAllUsers = async () => {
    //   const data = await fetchData();
    //   setUsers(data);
    // };
    // takeAllUsers();
  }, []);

  return (
    <GlobalContext.Provider value={{ users, setUsers }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);












