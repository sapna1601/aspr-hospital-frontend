import React, { createContext, useEffect, useState } from "react";
import toaster from "react-hot-toast";

import {
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface AuthContextData {
  login(
    hospitalEmail: string,
    password: string
  ): Promise<UserCredential | void>;
  logout(): Promise<void>;
  user: User | null;
  sessionUserLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({
  login: (_: string, __: string) => Promise.resolve(),
  logout: () => Promise.resolve(),
  user: null,
  sessionUserLoading: false,
});

interface IProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [sessionUserLoading, setSessionUserLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  /**
   * @description call whenever user login state change
   */
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user: User | null) => {
      setUser(user);
      setSessionUserLoading(false);
    });
  }, []);

  /**
   *
   * @param hospitalEmail
   * @param password
   * @returns
   */
  const login = async (
    hospitalEmail: string,
    password: string
  ): Promise<UserCredential | void> => {
    const auth = getAuth();
    return await signInWithEmailAndPassword(auth, hospitalEmail, password);
  };

  /**
   *
   */
  const logout = async () => {
    const auth = getAuth();
    toaster
      .promise(auth.signOut(), {
        loading: "logout...",
        error: "Unable to logout",
        success: "Logout successfully",
      })
      .then(() => {
        navigate("/login");
      });
  };

  const context = {
    login,
    logout,
    user,
    sessionUserLoading,
  } as AuthContextData;
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
