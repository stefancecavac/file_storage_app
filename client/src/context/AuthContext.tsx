import React, { createContext, useContext } from "react";
import { userData } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetCurrentUser,
  LoginUser,
  LogoutUser,
  RegisterUser,
} from "../api/AuthApi";

type AuthContext = {
  user: userData;
  isLoading: boolean;
  register: (data: userData) => void;
  login: (data: userData) => void;
  logout: () => void;
  loginError: Error | null;
};

export const AuthContext = createContext<AuthContext | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: GetCurrentUser,
    retry: false,
  });

  const { mutate: register } = useMutation({
    mutationKey: ["auth"],
    mutationFn: RegisterUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
    },
  });

  const { mutate: login, error: loginError } = useMutation({
    mutationKey: ["auth"],
    mutationFn: LoginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
    },
  });

  const { mutate: logout } = useMutation({
    mutationKey: ["auth"],
    mutationFn: LogoutUser,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["auth"],
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{ user, isLoading, register, login, logout, loginError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context as AuthContext;
};
