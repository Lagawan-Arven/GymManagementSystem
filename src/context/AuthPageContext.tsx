import React from "react";
import { createContext, useContext, useState } from "react";

interface AuthPageContextType {
  signinOpen: boolean;
  setSigninOpen: (open: boolean) => void;
  signupOpen: boolean;
  setSignupOpen: (open: boolean) => void;
  switchToSignin: () => void;
  switchToSignup: () => void;
}

const AuthPageContext = createContext<AuthPageContextType | null>(null);

export const AuthPageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [signinOpen, setSigninOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const switchToSignin = () => {
    setSignupOpen(false);
    setSigninOpen(true);
  };

  const switchToSignup = () => {
    setSigninOpen(false);
    setSignupOpen(true);
  };

  return (
    <AuthPageContext.Provider
      value={{
        signinOpen,
        setSigninOpen,
        signupOpen,
        setSignupOpen,
        switchToSignin,
        switchToSignup,
      }}
    >
      {children}
    </AuthPageContext.Provider>
  );
};

export const useAuthPage = () => {
  const context = useContext(AuthPageContext);
  if (!context)
    throw new Error("useAuthPage must be inside within authPageProvider!");
  return context;
};
