'use client'

import { useMediaQuery } from "@/hooks/useMeidaQuery";
import Header from "../modules/Header/Header";
import MobileNavbar from "../modules/MobileNavbar/MobileNavbar";
import { AnimatePresence, motion } from "framer-motion";
import SearchModal from "../modules/Header/SearchModal";
import { useUnit } from "effector-react";
import { $searchModal } from "@/context/modals";
import { handleCloseSearchModal } from "@/lib/utils/common";
import Footer from "../modules/Footer/Footer";
import { $openAuthPopup } from "@/api/auth";
import AuthPopup from "../modules/AuthPopup/Authpopup";
import { MutableRefObject, useRef } from "react";
import { handleCloseAuthPopup } from "@/lib/utils/common";


const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMedia800 = useMediaQuery(800);
  const searchModal = useUnit($searchModal)
  const openAuthPopup = useUnit($openAuthPopup)
  const authWrapperRef = useRef() as MutableRefObject<HTMLDivElement>;

  const handleCloseAuthPopupByTarget = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as Element
    if (target === authWrapperRef.current) {
      handleCloseAuthPopup()
    }
  }

  return (
    <>
      <Header />
      {children}
      {isMedia800 && <MobileNavbar />}
      <AnimatePresence>
      {openAuthPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className='auth-popup-wrapper'
            onClick={handleCloseAuthPopupByTarget}
            ref={authWrapperRef}
          >
            <AuthPopup/>
          </motion.div>
        )}

        {searchModal && (
          <motion.div
            initial={{ opacity: 0, zIndex: 102 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <SearchModal />
          </motion.div>
        )}
      </AnimatePresence>
      <div className={`header__search-overlay 
      ${searchModal ? 'overlay-active' : ''}`}
        onClick={handleCloseSearchModal} />



        <Footer/>
    </>
  );
};

export default Layout