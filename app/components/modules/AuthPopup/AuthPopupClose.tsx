import { closeAuthPopup } from "@/app/context/auth"



const AuthPopupClose = () => {

  const closePopup = () => {
    closeAuthPopup()
  }

  return (
    <button type="button" className="btn-reset auth-popup__close" onClick={closePopup}/>
  )
}

export default AuthPopupClose