'use client'

import { useMediaQuery } from "@/app/hooks/useMeidaQuery";
import Header from "../modules/Header/Header";
import MobileNavbar from "../modules/MobileNavbar/MobileNavbar";


const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMedia800 = useMediaQuery(800);
  return (
    <>
    <Header/>
      {children}
      {isMedia800 && <MobileNavbar/>}
    </>
  );
};

export default Layout