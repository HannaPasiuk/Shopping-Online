import Link from "next/link";
import '../../../glonalStyles/header.css'


const Logo = () => (
  <div className="logo__conteiner ">
  <Link className="logo" href="/">
    <img
    className="logo__img"
      src="/img/logo.svg"
      alt="logo"
      width={30}
      height={30}
    />
    
  </Link>
  <span className="logo__text" color="#D7BDE2 ">Shopping Online</span>
  </div>
)

export default Logo