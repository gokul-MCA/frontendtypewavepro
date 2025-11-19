import axios from "axios";
import React, { createContext, SetStateAction, useContext, useEffect, useState } from "react";
import { GoogleUser } from "../types";

interface AuthContextType {
  user: GoogleUser | null;
  loading: boolean;
  isFirstLogin: boolean | null;
  setUser: React.Dispatch<React.SetStateAction<GoogleUser | null >>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFirstLogin, setIsFirstLogin] = useState<boolean | null>(null);

  const API_BASE_URL = import.meta.env.VITE_MODE === "development" ? "http://localhost:5555" : import.meta.env.VITE_BACKEND_URL  
 
  const checkAuth = async () => {
    try {
      const url = `${API_BASE_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user); // No `_json`, use `data.user`
      setIsFirstLogin(data.user.isFirstLogin); 
    } catch (err) {
      // console.error("Auth check failed:", err);
      setUser(null);
      setIsFirstLogin(null); 
    } finally {
      setLoading(false); // auth check complete
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading)
    return (
      <h2
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </h2>
    );

  return (
    <AuthContext.Provider value={{ user, setUser, loading, isFirstLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if(context === undefined){
    throw new Error("useAuth must be used within an AuthProvider");
    
  }

  return context;
}