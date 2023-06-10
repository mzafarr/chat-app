import { auth, provider } from "../../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import googleIcon from "../../public/google.png";
import Image from "next/image.js";
const cookies = new Cookies();

const Auth = ({ setIsAuth }: any) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="text-3xl bg-slate-600 h-[95vh] flex flex-col -pt-10 justify-center items-center">
      <p> Sign In to continue </p>
      <button className="flex bg-slate-700 px-6 py-4 m-4 gap-4" onClick={signInWithGoogle}>
        <Image src={googleIcon} width={40} alt="Google Icon" />
        <div> Sign In With Google</div>
      </button>
    </div>
  );
};
export default Auth;
