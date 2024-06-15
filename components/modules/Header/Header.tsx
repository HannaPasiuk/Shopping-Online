'use client'
import { openMenu, openSearchMenu } from "@/context/modals";
import { addOverFlowHiddenToBody, handleOpenAuthPopup, triggerLoginCheck } from "@/lib/utils/common";
import Link from "next/link";
import Logo from "@/components/elements/Logo/Logo";
import Menu from "./Menu";
import { useEffect } from "react";
import { useCartByAuth } from "@/hooks/useCartByAuth";
import { addProductsFromLSToCart, setCartFromLS } from "@/context/cart";
import { $isAuth } from "@/context/auth";
import { useUnit } from "effector-react";







const Header = () => {
   
  const currentCartByAuth = useCartByAuth();
  console.log(currentCartByAuth);
  const isAuth = useUnit($isAuth)

  const handleOpenMenu = () => {
    addOverFlowHiddenToBody();
    openMenu();
  }

  const handleOpenSearchModal = () => {
    openSearchMenu();
    addOverFlowHiddenToBody();
  }

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') as string)
    triggerLoginCheck()

    if(cart){
      setCartFromLS(cart)
    }

  }, [])

  useEffect(() => {
    if(isAuth){
      const auth = JSON.parse(localStorage.getItem('auth') as string)
      const cartFromLs = JSON.parse(localStorage.getItem('cart') as string)

      if(cartFromLs && Array.isArray(cartFromLs)){
        addProductsFromLSToCart({
          jwt: auth.accessToken,
          cartItems: cartFromLs
        })
      }
    }
  }, [isAuth])

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
              />
             
          </li>
        </ul>

      </div>
    </header>
  );
};

export default Header;