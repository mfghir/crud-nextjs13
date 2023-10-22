"use client";
// import { useMutation, useQuery, QueryCache } from "@tanstack/react-query";
import * as api from "./testApi";
import { useQuery, useMutation, queryCache } from "react-query"

// const queryCache = new QueryCache();

const useAllUsers = () => {
  return useQuery(["users"], api.getAllUsers);
};

const useUser = (id) => {
  return useQuery(["user", id], api.getUser);
};

const useDeleteUser = () => {
  return useMutation(api.deleteUser, {
    onSuccess: (_, id) => {
      const users = queryCache.getQueryData("users");
      const data = users.filter((item) => item.id !== id);
      queryCache.setQueryData("users", data);
    },
  });
};

const useUpdateUser = () => {
  return useMutation(api.updateUser, {
    onSuccess: (_, { id, ...variables }) => {
      queryCache.refetchQueries(["users"]);
      queryCache.refetchQueries(["user", id]);
    },
  });
};

export { useAllUsers, useDeleteUser, useUser, useUpdateUser };
