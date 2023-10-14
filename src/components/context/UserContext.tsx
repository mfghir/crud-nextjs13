"use client";


import { useEffect, useMemo, useReducer, createContext, ReactNode } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type UserAction =
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: number }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'SET_TOTAL_PAGES'; payload: number };

type UserState = {
  users: User[];
  currentPage: number;
  totalPages: number;
};

type UserContextType = {
  state: UserState;
  dispatch: (action: UserAction) => void;
  currentPageUsers: User[];
  handlePageChange: (pageNumber: number) => void;
};

const initialUserState: UserState = {
  users: [],
  currentPage: 1,
  totalPages: 0,
};

export const UserContext = createContext<UserContextType>({
  state: initialUserState,
  dispatch: () => {},
  currentPageUsers: [],
  handlePageChange: () => {},
});

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    case 'SET_TOTAL_PAGES':
      return {
        ...state,
        totalPages: action.payload,
      };
    default:
      return state;
  }
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'SET_TOTAL_PAGES', payload: data.length });
        dispatch({ type: 'ADD_USER', payload: data });
      })
      .catch((error) => {
        console.log('Error fetching user data:', error);
      });
  }, []);

  const currentPageUsers = useMemo(() => {
    const start = (state.currentPage - 1) * 5;
    const end = start + 5;
    return state.users.slice(start, end);
  }, [state.currentPage, state.users]);

  const handlePageChange = (pageNumber: number) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: pageNumber });
  };

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
        currentPageUsers,
        handlePageChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};