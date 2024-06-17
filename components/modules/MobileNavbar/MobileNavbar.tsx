import Link from "next/link"
import {
  closeCataogMenu,
  closeMenu,
  openCataogMenu,
  openMenu
} from "@/context/modals"
import { addOverFlowHiddenToBody } from "@/lib/utils/common"
import CatalogMenu from "../Header/CatalogMenu"
import ProductCountByCart from "../ProductListItem/ProductCountByCart"
import styles from '@/styles/product-cart-indicator/index.module.scss'
import { useGoodsByAuth } from "@/hooks/useGoodsByAuth"
import { $cart, $cartFromLs } from "@/context/cart"

const MobileNavbar = () => {
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs);

const handleOpenMenu = () => {
  addOverFlowHiddenToBody()
  openMenu()
  closeCataogMenu()
}

const handleOpenCatalogMenu = () => {
  addOverFlowHiddenToBody('0')
  openCataogMenu()
  closeMenu()
}
  return(
    <>
    <CatalogMenu/>
    <div className="mobile-navbar">
 <Link href="/" className="mobile-navbar__btn">
  {'Main'}
 </Link>
 <button className="btn-reset mobile-navbar__btn"
 onClick={handleOpenCatalogMenu}>
  {'Catalog'}</button>
 <Link href="/favorites" className=" btn-reset mobile-navbar__btn">
  {'Favorites'}
 </Link>
 <Link href="/Card" className='mobile-navbar__btn'> 
 {currentCartByAuth.length > 0 ?  <span className={styles.mobileNavbar}>
    <ProductCountByCart products={currentCartByAuth}/>  
   </span> : ''
   }

 
  {'Card'}
 </Link>
 <button className="btn-reset mobile-navbar__btn"
 onClick={handleOpenMenu}>
  {'More'}
 </button>
    </div>
    </>
  )
}

export default MobileNavbar