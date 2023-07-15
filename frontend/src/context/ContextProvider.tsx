// MyContext.js
import React, { ReactNode, useState } from "react";
import supabase from "../config/supabaseClient";

interface AuthProvider {
  children: ReactNode;
}

interface AuthContextType {
  handleLogout: () => void;
  isLoggedin: boolean;
  checkUser: () => void;
  Login: (email: string, password: string) => Promise<string>;
  error: string;
  checkRole: () => Promise<string>;
}


const defaultValue: AuthContextType = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleLogout: () => {},
  isLoggedin: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  checkUser: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Login: async () => "",
  error: "",
  checkRole: async() => "",
};

const AuthContext = React.createContext(defaultValue);

const AuthProvider = ({ children }: AuthProvider) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [error, setError] = useState("");

  const Login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return error.message;
    }

    if (data.user) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
    return "welcome back !!";
  };

  const checkUser = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (session?.user) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }

    if (error) {
      setError(error.message);
      setIsLoggedin(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedin(false);
  };

  const checkRole = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data  } = await supabase
        .from("peoples")
        .select()
        .eq("user_id", user.id);
      if (data && data[0].role === "admin") {
        return "admin";
      }
    }
    return "user";
  };

  const sharedData: AuthContextType = {
    isLoggedin,
    Login,
    checkUser,
    handleLogout,
    error,
    checkRole,
  };

  return (
    <AuthContext.Provider value={sharedData}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
