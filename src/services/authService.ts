import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const loginWithGoogle = () => {
  window.open(`${BASE_URL}/auth/google`, "_self");
};

export const logout = () => {
  window.open(`${BASE_URL}/auth/logout`, "_self");
};

// delete User Account
export const deleteAccount = () =>
  axios.delete(`${BASE_URL}/auth/delete-account`, {
    withCredentials: true, // ensures cookies/session are included
  });
