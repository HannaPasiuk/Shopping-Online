import Link from "next/link"
import {
  closeCataogMenu,
  closeMenu,
  openCataogMenu,
  openMenu
} from "@/app/context/madals"
import { addOverFlowHiddenToBody } from "@/app/lib/utils/common"
import CatalogMenu from "../Header/CatalogMenu"

const MobileNavbar = () => {

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
 <Link href="/Card" className=" btn-reset mobile-navbar__btn">
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