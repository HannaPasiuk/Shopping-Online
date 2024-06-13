'use client'
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react"
import { $cataogmenuIsOpen, closeCataogMenu } from "@/context/modals"
import { useMenuAnimation } from "@/hooks/useMenuAnimation"
import Header from "./Header"
import { removeOverFlowHiddenFromBody } from "@/lib/utils/common"
import { useMediaQuery } from "@/hooks/useMeidaQuery";
import CatalogMenuButton from "./CatalogMenuButton";
import CatalogMenuList from "./CatalogMenuList";
import Accordion from "../Accordion/Accordion";
import Link from "next/link";
import { useUnit } from "effector-react";



const CatalogMenu = () => {
  const catalogMenuIsOpen = useUnit($cataogmenuIsOpen)
  const [showClothList, setShowClothList] = useState(false);
  const [showAccessoriesList, setShowAccessoriesList] = useState(false);
  const [showSouvenirsList, setShowSouvenirsList] = useState(false);
  const [showOfficeList, setShowOfficeList] = useState(false);
  const { itemVariants, sideVariants, popupZIndex } = useMenuAnimation(2, catalogMenuIsOpen)

  const isMedia450 = useMediaQuery(450);

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
      name: 'Cloth',
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

            <ul className="list-reset catalog-menu__list">
              {items.map(({ id, name, items, handel }) => {
                const buttonProps = (isActive: boolean) => ({
                  handel: handel as VoidFunction,
                  name,
                  isActive,
                })

                const isCurrentList = (
                  showList: boolean,
                  currentId: number
                ) => showList && id === currentId

                return (<motion.li
                  key={id}
                  variants={itemVariants}
                  className="catalog-menu__list__item"
                >
                  {!isMedia450 && (
                     <>

                      {id === 1 && <CatalogMenuButton
                        {...buttonProps(showClothList)} />}

                      {id === 2 && <CatalogMenuButton
                        {...buttonProps(showAccessoriesList)} />}

                      {id === 3 && <CatalogMenuButton
                        {...buttonProps(showSouvenirsList)} />}

                      {id === 4 && <CatalogMenuButton
                        {...buttonProps(showOfficeList)} />}
                        </>)
                 
                    }

                  {!isMedia450 && ( <AnimatePresence>
                      {isCurrentList(showClothList, 1) && (
                        <CatalogMenuList items={items} />
                      )}
                      {isCurrentList(showAccessoriesList, 2) && (
                        <CatalogMenuList items={items} />
                      )}
                      {isCurrentList(showSouvenirsList, 3) && (
                        <CatalogMenuList items={items} />
                      )}
                      {isCurrentList(showOfficeList, 4) && (
                        <CatalogMenuList items={items} />
                      )}
                    </AnimatePresence>)

                   
                  }

                  {isMedia450 && (
                    <Accordion
                    title={name}
                    titleClass='btn-reset nav-menu__accordion__item__title'
                  >
                    <ul className='list-reset catalog__accordion__list'>
                      {items.map((title, i) => (
                        <li
                          key={i}
                          className='catalog__accordion__list__item'
                        >
                          <Link
                            href='/catalog'
                            className='nav-menu__accordion__item__list__item__link'
                          >
                            {title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Accordion>
                  )
                  }



                </motion.li>
                )
              }
              )}
            </ul>

          </motion.aside>}
      </AnimatePresence>
    </div>
  )
}

export default CatalogMenu