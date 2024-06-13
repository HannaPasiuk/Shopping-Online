'use client'


import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUnit } from "effector-react";
import { removeOverFlowHiddenFromBody } from "@/lib/utils/common";
import Logo from "@/components/elements/Logo/Logo";
import { $menuIsOpen, closeMenu } from "@/context/modals";
import { usePathname } from "next/navigation";
import MenuLinkItem from "./MenuLinkItem";
import Accordion from "../Accordion/Accordion";
import { useMediaQuery } from "@/hooks/useMeidaQuery";
import BuyersListItems from "./buyersListItems";
import ContactsListItems from "./contactsListItem";





const Menu = () => {
  const [showCatalogList, setShowCatalogList] = useState(false);
  const [showBuyersList, setShowBuyersList] = useState(false);
  const [showContactsList, setShowContactsList] = useState(false);
  const menuIsOpen = useUnit($menuIsOpen);
  const pathname = usePathname();
  const isMedia800 = useMediaQuery(800);
  const isMedia640 = useMediaQuery(640);


  const handleShowCatalogList = () => {
    setShowCatalogList(true)
    setShowBuyersList(false)
    setShowContactsList(false)
  }


  const handleCloseMenu = () => {
    removeOverFlowHiddenFromBody();
    closeMenu();
  }


  const handleRedirectToCatalog = (path: string) => {
    if (pathname.includes('/catalog')) {
      window.history.pushState({ path }, '', path)
      window.location.reload()
    }

    handleCloseMenu()
  }

  const handleShowBuyersList = () => {
    setShowCatalogList(false)
    setShowBuyersList(true)
    setShowContactsList(false)
  }

  const handleShowContactsList = () => {
    setShowCatalogList(false)
    setShowBuyersList(false)
    setShowContactsList(true)
  }

  const clothLinks = [
    {
      id: 1,
      text: 't-shirts',
      href: '/catalog/cloth?offset=0&type=t-shirts',
    },
    {
      id: 2,
      text: 'long-sleeves',
      href: '/catalog/cloth?offset=0&type=long-sleeves',
    },
    {
      id: 3,
      text: "hoodie",
      href: '/catalog/cloth?offset=0&type=hoodie',
    },
    {
      id: 4,
      text: "outerwear",
      href: '/catalog/cloth?offset=0&type=outerwear',
    },
  ]

  const accessoriesLinks = [
    {
      id: 1,
      text: "bags",
      href: '/catalog/accessories?offset=0&type=bags',
    },
    {
      id: 2,
      text: "headdress",
      href: '/catalog/accessories?offset=0&type=headdress',
    },
    {
      id: 3,
      text: "umbrella",
      href: '/catalog/accessories?offset=0&type=umbrella',
    },
  ]

  const souvenirsLinks = [
    {
      id: 1,
      text: 'business-souvenirs',
      href: '/catalog/souvenirs?offset=0&type=business-souvenirs',
    },
    {
      id: 2,
      text: 'promotional-souvenirs',
      href: '/catalog/souvenirs?offset=0&type=promotional-souvenirs',
    },
  ]

  const officeLinks = [
    {
      id: 1,
      text: "notebook",
      href: '/catalog/office?offset=0&type=notebook',
    },
    {
      id: 2,
      text: "comparison.pen",
      href: '/catalog/office?offset=0&type=pen',
    },
  ]




  return (

    <nav className={`nav-menu ${menuIsOpen ? 'open' : 'close'}`}>
      <div className=" nav-menu__conteiner">
        <div className={`nav-menu__logo ${menuIsOpen ? 'open' : ''}`}>
          <Logo />
        </div>

        <button
          type="button"
          className={`btn-reset nav-menu__close ${menuIsOpen ? 'open' : 'close'}`}
          onClick={handleCloseMenu}
        />

        <ul className={`list-reset nav-menu__list ${menuIsOpen ? 'open' : ''}`}>
          <li className="nav-menu__list__item">
            {!isMedia800 && (
              <button
              type="button"
               className="btn-reset nav-menu__list__item__btn"
                onMouseEnter={handleShowCatalogList}>
                {"Catalog"}
              </button>)}
            {!isMedia800 && (
              <AnimatePresence>
                {showCatalogList && (
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='list-reset nav-menu__accordion'
                  >
                    <li className="nav-menu__accordion__item">
                      <Accordion
                        title={"Cloth"}
                        titleClass='btn-reset nav-menu__accordion__item__title'
                      >
                        <ul className="list-reset nav-menu__accordion__item__list">
                          {clothLinks.map((item) => (
                            <MenuLinkItem
                              key={item.id}
                              item={item}
                              handleRedirectToCatalog={handleRedirectToCatalog}
                            />
                          ))}
                        </ul>
                      </Accordion>
                    </li>


                    <li className="nav-menu__accordion__item">
                      <Accordion
                        title={"accessories"}
                        titleClass='btn-reset nav-menu__accordion__item__title'
                      >
                        <ul className="list-reset nav-menu__accordion__item__list">
                          {accessoriesLinks.map((item) => (
                            <MenuLinkItem
                              key={item.id}
                              item={item}
                              handleRedirectToCatalog={handleRedirectToCatalog}

                            />
                          ))}
                        </ul>
                      </Accordion>
                    </li>


                    <li className="nav-menu__accordion__item">
                      <Accordion
                        title={"souvenirs"}
                        titleClass='btn-reset nav-menu__accordion__item__title'
                      >
                        <ul className="list-reset nav-menu__accordion__item__list">
                          {souvenirsLinks.map((item) => (
                            <MenuLinkItem
                              key={item.id}
                              item={item}
                              handleRedirectToCatalog={handleRedirectToCatalog}
                            />
                          ))}
                        </ul>
                      </Accordion>
                    </li>

                    <li className="nav-menu__accordion__item">
                      <Accordion
                        title={"office"}
                        titleClass='btn-reset nav-menu__accordion__item__title'
                      >
                        <ul className="list-reset nav-menu__accordion__item__list">
                          {officeLinks.map((item) => (
                            <MenuLinkItem
                              key={item.id}
                              item={item}
                              handleRedirectToCatalog={handleRedirectToCatalog}
                            />
                          ))}
                        </ul>
                      </Accordion>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            )}
          </li>


          <li className="nav-menu__list__item">
            {!isMedia640 && (
              <button
              type="button"
               className="btn-reset nav-menu__list__item__btn"
                onMouseEnter={handleShowBuyersList}>
                {"Buyers"}
              </button>)}
            {!isMedia640 && (<AnimatePresence>
              {showBuyersList && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='list-reset nav-menu__accordion'
                >
                  <BuyersListItems />
                </motion.ul>
              )}
            </AnimatePresence>)}

            {isMedia640 && (
              <Accordion
                title={"Buyers"}
                titleClass='btn-reset nav-menu__list__item__btn'
              >
                <ul className='list-reset nav-menu__accordion__item__list'>
                  <BuyersListItems />
                </ul>
              </Accordion>
            )}
          </li>



          <li className="nav-menu__list__item">
            {!isMedia640 &&
              (<button 
                type="button"
                className="btn-reset nav-menu__list__item__btn"
                onMouseEnter={handleShowContactsList}>
                {"Contacts"}
              </button>)}
            {!isMedia640 && (<AnimatePresence>
              {showContactsList && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='list-reset nav-menu__accordion'>
                  <ContactsListItems />
                </motion.ul>
              )}
            </AnimatePresence>)}

            {isMedia640 && (
              <Accordion
                title={"Contacts"}
                titleClass='btn-reset nav-menu__list__item__btn'
              >
                <ul className='list-reset nav-menu__accordion__item__list'>
                  <ContactsListItems />
                </ul>
              </Accordion>
            )}

          </li>

        </ul>
      </div>
    </nav>

  );
}

export default Menu