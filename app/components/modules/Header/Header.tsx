'use client'
import { openMenu, openSearchMenu } from "@/app/context/modals";
import { addOverFlowHiddenToBody } from "@/app/lib/utils/common";
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
          Menu
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

          <li className="header__links__item">
            <Link href='profile' className="header__links__item__btn header__links__item__btn--profile"></Link>
          </li>
        </ul>

      </div>
    </header>
  );
};

export default Header;