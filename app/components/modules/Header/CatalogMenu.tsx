'use client'
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react"
import { useStore } from "effector-react"
import { $cataogmenuIsOpen, closeCataogMenu } from "../../../context/madals"
import { useMenuAnimation } from "../../../hooks/useMenuAnimation"
import Header from "./Header"
import { removeOverFlowHiddenFromBody } from "@/app/lib/utils/common"



const CatalogMenu = () => {
  const catalogMenuIsOpen = useStore($cataogmenuIsOpen)
  const [showClothList, setShowClothList] = useState(false);
  const [showAccessoriesList, setShowAccessoriesList] = useState(false);
  const [showSouvenirsList, setShowSouvenirsList] = useState(false);
  const [showOfficeList, setShowOfficeList] = useState(false);
  const { itemVariants, sideVariants, popupZIndex } = useMenuAnimation(2, catalogMenuIsOpen)

  const handleShowClothList = () => {
    setShowClothList(true)
    setShowAccessoriesList(false)
    setShowSouvenirsList(false)
    setShowOfficeList(false)
  }


  const handleShowAccessoriesList = () => {
    setShowClothList(false)
    setShowAccessoriesList(true)
    setShowSouvenirsList(false)
    setShowOfficeList(false)
  }


  const handleShowSouvenirsList = () => {
    setShowClothList(false)
    setShowAccessoriesList(false)
    setShowSouvenirsList(true)
    setShowOfficeList(false)
  }


  const handleShowOfficeList = () => {
    setShowClothList(false)
    setShowAccessoriesList(false)
    setShowSouvenirsList(false)
    setShowOfficeList(true)
  }

  const handleCloseMenu = () => {
    removeOverFlowHiddenFromBody();
    closeCataogMenu();
    setShowClothList(false)
    setShowAccessoriesList(false)
    setShowSouvenirsList(false)
    setShowOfficeList(false)
  }

  const items = [
    {
      name: 'Catalog',
      id: 1,
      items: [
        't-shirts',
        'long-sleeves',
        'hoodie',
        'outerwear',
      ],
      handel: handleShowClothList,
    },
    {
      name: 'Accessories',
      id: 2,
      items: [
        'bags',
        'headdress',
        'umbrella',
      ],
      handel: handleShowAccessoriesList,
    },
    {
      name: 'Souvenirs',
      id: 3,
      items: [
        'business-souvenirs',
        'promotional-souvenirs',
      ],
      handel: handleShowSouvenirsList,
    },
    {
      name: 'Office',
      id: 4,
      items: [
        'notebook',
        'pen',
      ],
      handel: handleShowOfficeList,
    },
  ]

  return (
    <div className="catalog-menu" style={{ zIndex: popupZIndex }}>
      <AnimatePresence>
        {catalogMenuIsOpen && 
        <motion.aside
          initial={{ width: 0 }}
          animate={{
            width: 'calc(100% - 48px)',
          }}
          exit={{
            width: 0,
            transition: { delay: 0.7, duration: 0.3 }
          }}
          className="catalog-menu__aside"
        >
          <div className="catalog-menu__header">
            <Header />
          </div>
          <motion.div
            className="catalog-menu__inner"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sideVariants}
          />
          <motion.button
            className="btn-reset catalog-menu__close"
            variants={itemVariants}
            onClick={handleCloseMenu}
          />
          <motion.h2
            className="catalog-menu__title"
            variants={itemVariants}
          >
            Catalog
          </motion.h2>
        </motion.aside>}
      </AnimatePresence>
    </div>
  )
}

export default CatalogMenu