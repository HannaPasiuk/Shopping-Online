import { useMediaQuery } from "@/hooks/useMeidaQuery";



const Footer = () => {
  const isMedia950 = useMediaQuery(950);
  const isMedia640 = useMediaQuery(640);

  return (
 
    <footer className="footer">

        <div className="footer__conteiner">
     
        
          <ul className='list-reset footer__socials'>
            <li className='footer__socials__item'>
              <a href=" https://www.vk.com"
                className='footer__socials__item__link'/>
            </li>
            <li className='footer__socials__item'>
              <a href="https://www.youtube.com"
                className='footer__socials__item__link'
                 />
            </li>
            <li className='footer__socials__item'>
              <a href="https://www.telegram.com"
                className='footer__socials__item__link'
                 />
            </li>
          </ul>
      
      <div className="footer__copyright">
        <span>© 2021 Shopping Online</span>
      </div>

        </div>
    </footer>
  )
}

export default Footer