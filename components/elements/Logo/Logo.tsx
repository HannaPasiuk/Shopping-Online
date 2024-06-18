import Link from "next/link";
import '@/app/glonalStyles/header.css'
import Image from "next/image";


const Logo = () => (
  <div className="logo__conteiner ">
    <Link className="logo" href="/">
      <Image
        className="logo__img"
        src="/img/logo.svg"
        alt="logo"
        width={30}
        height={30}
      />
      <span className="logo__text" color="#D7BDE2 ">Shopping Online</span>
    </Link>

  </div>
)

export default Logo