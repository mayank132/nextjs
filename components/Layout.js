import Navbar from "./Navbar";
import { useEffect } from "react";
import { useRouter } from 'next/router'

export default function Layout({ children }) {


    const router = useRouter()

  useEffect(() => {
    console.log("in user ");

    const userToken = localStorage.getItem("userToken");


    if (userToken) {
        router.push('/')
    } else {
        router.push('/login')
    }
  }, []);

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
