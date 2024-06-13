import { handleCloseAuthPopup } from "@/lib/utils/common"


const AuthPopupClose = () => {
  const closePopup = () => {
    handleCloseAuthPopup()
  }
  return (
    <button type="button" className="btn-reset auth-popup__close" onClick={closePopup}/>
  )
}

export default AuthPopupClose