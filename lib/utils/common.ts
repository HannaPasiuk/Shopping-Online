
import { closeAuthPopup, openAuthPopup, setIsAuth } from "@/context/auth";
import { closeSearchMenu } from "@/context/modals";
import { loginCheck } from "@/context/user";
import { ICartItem } from "@/types/cart";


export const removeOverFlowHiddenFromBody = () => {
  const body = document.querySelector("body") as HTMLElement;
  body.classList.remove("overflow-hidden");
};

export const addOverFlowHiddenToBody = (paddingRight = "") => {
  const body = document.querySelector("body") as HTMLElement;
  body.classList.add("overflow-hidden");
  paddingRight && (body.style.paddingRight = paddingRight);
};

export const getWindowWidth = () => {
  const { innerWidth: windowWidth } =
    typeof window !== "undefined" ? window : { innerWidth: 0 };

  return { windowWidth };
};

export const handleCloseSearchModal = () => {
  closeSearchMenu();
  removeOverFlowHiddenFromBody();
};

export const handleOpenAuthPopup = () => {
  addOverFlowHiddenToBody();
  openAuthPopup();
};

export const handleCloseAuthPopup = () => {
  removeOverFlowHiddenFromBody();
  closeAuthPopup();
};

export const idGenerator = () => {
  const S4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}



export const isUserAuth = () => {
  const auth = JSON.parse(localStorage.getItem('auth') as string)

  if (!auth?.accessToken) {
    setIsAuth(false)
    return false
  }

  return true
}

export const triggerLoginCheck = () => {
    if(!isUserAuth()){
      return
    }
    const auth = JSON.parse(localStorage.getItem('auth') as string)
    loginCheck({ jwt: auth.accessToken })
}



export const isItemLInList = (array: ICartItem[], productId: string | number) => 
  array.some((item) => item.productId === productId)

export const getCartCount = (
  cartItems: ICartItem[]
) => cartItems.reduce((acc, item) => acc + item.count, 0)