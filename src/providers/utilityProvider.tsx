import React from "react";
import { createContext } from "react";
import { Toaster } from "react-hot-toast";

interface IProps {
  children: React.ReactNode;
}
interface UtilityContextModel {}

export const UtilityContext = createContext<UtilityContextModel>({});

const UtilityProvider: React.FC<IProps> = ({ children }) => {
  const context = {} as UtilityContextModel;
  return (
    <UtilityContext.Provider value={context}>
      {children}
      <Toaster position="top-right" />
    </UtilityContext.Provider>
  );
};

export default UtilityProvider;
