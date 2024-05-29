

import Link from "next/link"


 const BuyersListItems = () => {
  return (
    <>
    <li className="nav-menu__accordion__item nav-menu__accordion__item__title">
                    <Link
                      href="/about"
                      className="nav-menu__accordion__item__link nav-menu__accordion__item__title">
                      {"About"}
                    </Link>
                  </li>
                  <li className="nav-menu__accordion__item">
                    <Link
                      href="/blog"
                      className="nav-menu__accordion__item__link">
                      {"Blog"}
                    </Link>
                  </li>
                  <li className="nav-menu__accordion__item">
                    <Link
                      href="/shopping-and-payment"
                      className="nav-menu__accordion__item__link">
                      {"Shopping"}
                    </Link>
                  </li>
                  <li className="nav-menu__accordion__item">
                    <Link
                      href="/purchase-returns"
                      className="nav-menu__accordion__item__link">
                      {"Returns"}
                    </Link>
                  </li>
    </>
  )
}

export default BuyersListItems