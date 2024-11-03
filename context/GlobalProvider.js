import { createContext, useState, useEffect, useContext } from "react";

import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext({
   isLoggedIn: false,
   setIsLoggedIn: () => {},
   user: null,
   setUser: () => {},
   isLoading: false,
});
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [user, setUser] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      const fetchCurrentUser = async () => {
         try {
            setIsLoading(true);
            const res = await getCurrentUser();
            if (res) {
               setIsLoggedIn(true);
               setUser(res);
            } else {
               setIsLoggedIn(false);
               setUser(null);
            }
         } catch (error) {
            console.log(error);
         } finally {
            setIsLoading(false);
         }
      };

      fetchCurrentUser();
   }, []);

   return (
      <GlobalContext.Provider
         value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading,
         }}
      >
         {children}
      </GlobalContext.Provider>
   );
};
