export interface ICartItem {
  _id: number
  clientId: number
  userId: string
  productId: number
  image: string
  name: string
  count: string | number
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