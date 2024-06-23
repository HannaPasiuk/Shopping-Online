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
  const [activeListId, setActiveListId] = useState(0);
  const menuIsOpen = useUnit($menuIsOpen);
  const pathname = usePathname();
  const isMedia800 = useMediaQuery(800);
  const isMedia640 = useMediaQuery(640);


 const handleShowContactsList = () => setActiveListId(3)
  const handleShowBuyersList = () => setActiveListId(2)
  const handleShowCatalogList = () => setActiveListId(1)
  const handleCloseMenu = () => {
    removeOverFlowHiddenFromBody();
    closeMenu()
    setActiveListId(0)
  }


  const handleRedirectToCatalog = (path: string) => {
    if (pathname.includes('/catalog')) {
      window.history.pushState({ path }, '', path)
      window.location.reload()
    }

    handleCloseMenu()
  }

  

 

  const clothLinks = [
    {
      id: 1,
      text: 'sweaters',
      href: '/catalog/cloth?offset=0&type=sweaters',
    },
    {
      id: 2,
      text: 'dresses',
      href: '/catalog/cloth?offset=0&type=dresses',
    },
    {
      id: 3,
      text: 'pants',
      href: '/catalog/cloth?offset=0&type=pants',
    },
    {
      id: 4,
      text: 'blouse',
      href: '/catalog/cloth?offset=0&type=blouse',
    },
    {
      id: 5,
      text: 'shirts',
      href: '/catalog/cloth?offset=0&type=shirts',
    },
    {
      id: 6,
      text: 'shorts',
      href: '/catalog/cloth?offset=0&type=shorts',
    },
  ]

  const accessoriesLinks = [
    {
      id: 1,
      text: "glasses",
      href: '/catalog/accessories?offset=0&type=glasses',
    }
  ]

  const shoesLinks = [
    {
      id: 1,
      text: 'sneakers',
      href: '/catalog/souvenirs?offset=0&type=sneakers',
    },
    {
      id: 2,
      text: 'flip-flops',
      href: '/catalog/souvenirs?offset=0&type=flip-flops',
    }
  ]

  const bagsLinks = [
    {
      id: 1,
      text: "small",
      href: '/catalog/office?offset=0&type=small',
    },
    {
      id: 2,
      text: "medium",
      href: '/catalog/office?offset=0&type=medium',
    }
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
                {activeListId === 1 && (
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='list-reset nav-menu__accordion'
                  >
                    <li className="nav-menu__accordion__item">
                      <Accordion
                        title={"cloth"}
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
                        title={"shoes"}
                        titleClass='btn-reset nav-menu__accordion__item__title'
                      >
                        <ul className="list-reset nav-menu__accordion__item__list">
                          {shoesLinks.map((item) => (
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
                        title={"bags"}
                        titleClass='btn-reset nav-menu__accordion__item__title'
                      >
                        <ul className="list-reset nav-menu__accordion__item__list">
                          {bagsLinks.map((item) => (
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
              {activeListId === 2 && (
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
              {activeListId === 3 &&(
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