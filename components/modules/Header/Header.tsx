'use client'
import { openMenu, openSearchMenu } from "@/context/modals";
import { addOverFlowHiddenToBody, handleOpenAuthPopup, triggerLoginCheck } from "@/lib/utils/common";
import Link from "next/link";
import Logo from "@/components/elements/Logo/Logo";
import Menu from "./Menu";
import { useEffect } from "react";
import { $cart, $cartFromLs, addProductsFromLSToCart, setCartFromLS } from "@/context/cart";
import { $isAuth } from "@/context/auth";
import { useUnit } from "effector-react";
import { loginCheckFx } from "@/context/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ProductCountByCart from "../ProductListItem/ProductCountByCart";
import styles from '@/styles/product-cart-indicator/index.module.scss'
import { useGoodsByAuth } from "@/hooks/useGoodsByAuth";







const Header = () => {
    const isAuth = useUnit($isAuth)
    const loginCheckSpinner = useUnit(loginCheckFx.pending)
    const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs);
  console.log(currentCartByAuth);
 

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
           {currentCartByAuth.length > 0 ? 
           <span className={styles.count}>
              <ProductCountByCart products={currentCartByAuth}/>
              </span> : ''
              } 
           
          </li>

          <li className="header__links__item header__links__item--profile">
            {loginCheckSpinner ? (
              <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
            ) : (
              <button type="button"
                className=" btn-reset header__links__item__btn header__links__item__btn--profile"
                style={isAuth ? { WebkitMask: 'url(/img/profile-auth.svg) no-repeat 50% 50%', mask: 'url(/img/profile-auth.svg) no-repeat 50% 50%' }
                  : { WebkitMask: 'url(/img/profile.svg) no-repeat 50% 50%', mask: 'url(/img/profile.svg) no-repeat 50% 50%' }
                }
                onClick={handleOpenAuthPopup}
              />
            )}
          </li>
        </ul>

      </div>
    </header>
  );
};

export default Header;