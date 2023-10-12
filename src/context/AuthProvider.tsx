import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

interface CurrentUser {
  userId: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  otpVerified: false;
}

interface CurrentUserContextType {
  currentUser: CurrentUser | undefined;
  setCurrentUser: Dispatch<SetStateAction<CurrentUser | undefined>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<CurrentUserContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>();
  console.log(currentUser);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
