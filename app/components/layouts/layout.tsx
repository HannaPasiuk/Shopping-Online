'use client'

import { useMediaQuery } from "@/app/hooks/useMeidaQuery";
import Header from "../modules/Header/Header";
import MobileNavbar from "../modules/MobileNavbar/MobileNavbar";
import { AnimatePresence, motion } from "framer-motion";
import SearchModal from "../modules/Header/SearchModal";
import { useUnit } from "effector-react";
import { $searchModal } from "@/app/context/modals";
import { handleCloseSearchModal } from "@/app/lib/utils/common";
import Footer from "../modules/Footer/Footer";


const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMedia800 = useMediaQuery(800);
  const searchModal = useUnit($searchModal)

  return (
    <>
      <Header />
      {children}
      {isMedia800 && <MobileNavbar />}
      <AnimatePresence>
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