import Link from 'next/link'


const ContactsListItems = () => {

  return (
    <>
     <li className="nav-menu__accordion__item ">
                    <a
                      href="tel:+7 (495) 999-99-99"
                      className="nav-menu__accordion__item__link nav-menu__accordion__item__title">
                      +7 (495) 999-99-99
                    </a>
                  </li>

                  <li className="nav-menu__accordion__item">
                    <a href="mailto:RZsN5@example.com" className="nav-menu__accordion__item__link">
                      Email
                    </a>
                  </li>

                  <li className="nav-menu__accordion__item">
                    <Link
                      href="https://web.telegram.org/a/"
                      className="nav-menu__accordion__item__link">
                      {"Telegram"}
                    </Link>
                  </li>
    </>
  )
}

export default ContactsListItems