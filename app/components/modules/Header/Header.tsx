'use client'
import { openMenu, openSearchMenu } from "@/app/context/modals";
import { addOverFlowHiddenToBody, handleOpenAuthPopup } from "@/app/lib/utils/common";
import Link from "next/link";
import Logo from "../../elements/Logo/Logo";
import Menu from "./Menu";




const Header = () => {

  const handleOpenMenu = () => {
    addOverFlowHiddenToBody();
    openMenu();
  }

  const handleOpenSearchModal = () => {
    openSearchMenu();
    addOverFlowHiddenToBody();
  }

  return (
    <header className="header">
      <div className="conteiner header__conteiner">
        <button className="btn-reset header__burger" onClick={handleOpenMenu}>
          <span className="header__burger__line">Menu</span>
        </button>
        <Menu />
        <div className="header__logo">
          <Logo />
        </div>
        <ul className="header__links list-reset">
          <li className="header__links__item">
            <button title="search" className="btn-reset header__links__item__btn header__links__item__btn--search"
              onClick={handleOpenSearchModal} />
          </li>

          <li className="header__links__item">
            <Link href='favourites' className="header__links__item__btn header__links__item__btn--favorites"></Link>
          </li>

          <li className="header__links__item">
            <Link href='compare' className="header__links__item__btn header__links__item__btn--compare"></Link>
          </li>

          <li className="header__links__item">
            <Link href='card' className="header__links__item__btn header__links__item__btn--card"></Link>
          </li>

          <li className="header__links__item header__links__item--profile">
            <button type="button"
             className=" btn-reset header__links__item__btn header__links__item__btn--profile"
             onClick={handleOpenAuthPopup}
             >

            </button>
          </li>
        </ul>

      </div>
    </header>
  );
};

export default Header;