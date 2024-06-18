import { IBaseEffectProps } from './common'
export interface ICartItem {
  _id: string
  clientId: string
  userId: string
  productId: string
  image: string
  name: string
  count:  number | string
  price: string
  color: string
  totalPrice: string
  category: string
}

export interface IAddProductToCartFx {
  productId: number | string
  category: string
  count: number
  jwt: string
  clientId: number | string
  setSpinner: (arg0: boolean) => void
}

export interface IAddProductsFromLSToCartFx {
  jwt: string
  cartItems: ICartItem[]
}
export interface IUpdateCartItemCountFx extends IBaseEffectProps {
  count: number
}
export interface IDeleteCartItemBtnProps {
  btnDisabled: boolean
  callback: VoidFunction
  className?: string
}