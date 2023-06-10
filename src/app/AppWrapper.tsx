import { auth } from "../../firebase-config.js";
import { signOut } from "firebase/auth";
import Image from "next/image.js";
import Icon from "../../public/icon.png";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface AppWrapperProps {
  children: React.ReactNode;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInChat: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppWrapper = ({
  children,
  isAuth,
  setIsAuth,
  setIsInChat,
}: AppWrapperProps) => {
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setIsInChat(false);
  };

  return (
    <div className="max-w-s h-screen">
      <nav className="z-10 text-2xl flex px-4 py-2 bg-slate-800 justify-between items-center">
        <div className="z-10 flex items-center gap-2">
          <Image src={Icon} width={40} alt="Logo" />
          <h1> Chit Chat </h1>
        </div>
        <>
          {isAuth && (
            <div className="z-10">
              <button
                className="p-3 bg-slate-700 rounded text-xl sm:text-2xl"
                onClick={signUserOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </>
      </nav>

      <div className="">{children}</div>
    </div>
  );
};
