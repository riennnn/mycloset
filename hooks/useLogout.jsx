import { signOut } from "firebase/auth";
import { auth } from "../libs/firebase";
import { useRouter } from 'next/router';

const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    router.push("/signin/");
  }
  return logout;
}

export default useLogout;

