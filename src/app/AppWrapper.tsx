import { auth } from "../../firebase-config.js";
import { signOut } from "firebase/auth";

import Cookies from "universal-cookie";

const cookies = new Cookies();

interface AppWrapperProps {
  children: React.ReactNode; 
  isAuth: boolean; 
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>; 
  setIsInChat: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppWrapper = ({ children, isAuth, setIsAuth, setIsInChat }: AppWrapperProps) => {
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setIsInChat(false);
  };

  return (
    <div className="">
      <div className="">
        <h1> Chat App </h1>
      </div>

      <div className="">{children}</div>
      {isAuth && (
        <div className="">
          <button onClick={signUserOut}> Sign Out</button>
        </div>
      )}
    </div>
  );
};
