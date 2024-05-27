'use client'

import { $menuIsOpen, closeMenu } from "@/app/context/madals";
import { useState } from "react";
import { useUnit } from "effector-react";
import { removeOverFlowHiddenFromBody } from "@/app/lib/utils/common";
import Logo from "../../elements/Logo/Logo";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import MenuLinkItem from "./MenuLinkItem";
import words from "../../../../public/words/words.json";
import Accordion from "../Accordion/Accordion";





const Menu = () => {
  const [showcatalogList, setShowcatalogList] = useState(false);
  const [showBurgerList, setShowBurgerList] = useState(false);
  const [showContactsList, setShowContactsList] = useState(false);


  const menuIsOpen = useUnit($menuIsOpen);
  const pathname = usePathname();


const handleShowCatalogList = () => {
  setShowcatalogList(true)
  setShowBurgerList(false)
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
const clothLinks = [
    {
      id: 1,
      text: words.comparison['t-shirts'],
      href: '/catalog/cloth?offset=0&type=t-shirts',
    },
    {
      id: 2,
      text:   words.comparison['long-sleeves'],
      href: '/catalog/cloth?offset=0&type=long-sleeves',
    },
    {
      id: 3,
      text: words.comparison.hoodie,
      href: '/catalog/cloth?offset=0&type=hoodie',
    },
    {
      id: 4,
      text: words.comparison.outerwear,
      href: '/catalog/cloth?offset=0&type=outerwear',
    },
  ]

  const accessoriesLinks = [
    {
      id: 1,
      text: words.comparison.bags,
      href: '/catalog/accessories?offset=0&type=bags',
    },
    {
      id: 2,
      text: words.comparison.headdress,
      href: '/catalog/accessories?offset=0&type=headdress',
    },
    {
      id: 3,
      text: words.comparison.umbrella,
      href: '/catalog/accessories?offset=0&type=umbrella',
    },
  ]

  const souvenirsLinks = [
    {
      id: 1,
      text: words.comparison['business-souvenirs'],
      href: '/catalog/souvenirs?offset=0&type=business-souvenirs',
    },
    {
      id: 2,
      text: words.comparison['promotional-souvenirs'],
      href: '/catalog/souvenirs?offset=0&type=promotional-souvenirs',
    },
  ]

  const officeLinks = [
    {
      id: 1,
      text: words.comparison.notebook,
      href: '/catalog/office?offset=0&type=notebook',
    },
    {
      id: 2,
      text: words.comparison.pen,
      href: '/catalog/office?offset=0&type=pen',
    },
  ]
 

  

  return (
    <nav className={`nav-menu ${menuIsOpen ? 'open' : 'close'}`}>
      <div className="conteiner nav-menu__conteiner">
        <div className={`nav-menu__logo ${menuIsOpen ? 'open' : ''}`}>
          <Logo />
        </div>

        <button
          className={`btn-reset nav-menu__close ${menuIsOpen ? 'open' : 'close'}`}
          onClick={handleCloseMenu}
        />

        <ul className={`list-reset nav-menu__list ${menuIsOpen ? 'open' : ''}`}>
          <li className="nav-menu__list__item">
            <button className="btn-reset nav-menu__list__item__btn"
            onMouseEnter={handleShowCatalogList}>
              {words.main_menu.catalog}
            </button>

            <AnimatePresence>
              {showcatalogList && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='list-reset nav-menu__accordion'
                >
                  <li className="nav-menu__accordion__item">
                    <Accordion
                      title={words.main_menu.cloth}
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
                      title={words.main_menu.accessories}
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
                      title={words.main_menu.souvenirs}
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
                      title={words.main_menu.office}
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
          </li>
          <li className="nav-menu__list__item"></li>
          <li className="nav-menu__list__item"></li>
        </ul>
      </div>
    </nav>

  );
}

export default Menu