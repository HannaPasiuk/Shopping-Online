
import { closeAuthPopup, openAuthPopup, setIsAuth } from "@/context/auth";
import { closeSearchMenu } from "@/context/modals";
import { loginCheck } from "@/context/user";
import { ICartItem } from "@/types/cart";
import { EventCallable } from "effector";
import toast from "react-hot-toast";


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
) => cartItems.reduce((acc, item) => acc + +item.count, 0)




export const showCountMessage = (count: string) => {
  if (count == '11' || count == '12' || count == '13' || count == '14') {
      'items'
  }

  if (count.endsWith('1')) {
    'item'
  }

  if (count.endsWith('2') || count.endsWith('3') || count.endsWith('4')) {
     'items'
  }

  return  'items'
}

export const deleteProductFromLS = <T>(
  id: string,
  key: string,
  event: EventCallable<T>,
  setShouldShowEmpty: (arg0: boolean) => void,
  message: string,
  withToast = true
) => {
  let items = JSON.parse(localStorage.getItem(key) as string)

  if (!items) {
    items = []
  }

  const updatedItems = items.filter(
    (item: { clientId: string }) => item.clientId !== id
  )

  localStorage.setItem(key, JSON.stringify(updatedItems))
  event(updatedItems)
  withToast && toast.success(message)

  if (!updatedItems.length) {
    setShouldShowEmpty(true)
  }
}

export const checkOffsetParam = (offset: string | string[] | undefined) =>
  offset && !isNaN(+offset) && +offset >= 0


export const getSearchParamsUrl = () => {
  const paramsString = window.location.search
  const urlParams = new URLSearchParams(paramsString)

  return urlParams
}



export const updateSearchParam = (
  key: string,
  value: string | number,
  pathname: string
) => {
  const urlParams = getSearchParamsUrl()
  urlParams.set(key, `${value}`)
  const newPath = `${pathname}?${urlParams.toString()}`
  window.history.pushState({ path: newPath }, '', newPath)
}

export const getCheckedArrayParam = (param: string) => {
  try {
    const sizesArr = JSON.parse(decodeURIComponent(param))

    if (Array.isArray(sizesArr) && sizesArr.length) {
      return sizesArr
    }
  } catch (error) {
    return false
  }
}