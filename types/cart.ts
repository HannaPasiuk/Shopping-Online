import { IBaseEffectProps } from './common'
export interface ICartItem {
  _id: string
  clientId: number
  userId: string
  productId: number
  image: string
  name: string
  count:  number
  price: string
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