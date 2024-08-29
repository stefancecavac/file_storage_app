import { userData } from "../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const GetCurrentUser = async () => {
  const response = await fetch(`${BASE_URL}api/user`, {
    credentials: "include",
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const RegisterUser = async (data: userData) => {
  const response = await fetch(`${BASE_URL}api/user/register`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const LoginUser = async (data: userData) => {
  const response = await fetch(`${BASE_URL}api/user/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "Application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const LogoutUser = async () => {
  const response = await fetch(`${BASE_URL}api/user/logout`, {
    method: "POST",
    credentials: "include",
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};
