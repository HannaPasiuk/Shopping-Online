/* eslint-disable indent */
import toast from 'react-hot-toast'
import { ICartItem } from '@/types/cart'
import { IProduct } from '@/types/common'
import { idGenerator, isUserAuth } from './common'
import {
  addProductToCart,
  deleteAllFromCart,
  setCartFromLS,
  setShouldShowEmpty,
} from '@/context/cart'


export const addItemToCart = (
  product: IProduct,
  setSpinner: (arg0: boolean) => void,
  count: number,
) => {
  if (!isUserAuth()) {
    addCartItemToLs(product, count)
    return
  }

  const auth = JSON.parse(localStorage.getItem('auth') as string)

  const clientId = addCartItemToLs(product, count, false)
  addProductToCart({
    jwt: auth.accessToken,
    setSpinner,
    productId: product._id,
    category: product.category,
    count,
    clientId,
  })
}

export const addCartItemToLs = (
  product: IProduct,
  count: number,
  withToast = true
) => {
  let cartFromLS: ICartItem[] = JSON.parse(
    localStorage.getItem('cart') as string
  )
  const clientId = idGenerator()

  if (!cartFromLS) {
    cartFromLS = []
  }

  setShouldShowEmpty(false)

  const existingItem = cartFromLS.find(
    (item) => item.productId === product._id 
  )

  if (existingItem) {

    const updatedCart = cartFromLS.map((item) =>
      item.productId === existingItem.productId 
        ? {
            ...existingItem,
            count: +existingItem.count + 1,
          }
        : item
    )

    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setCartFromLS(updatedCart)
    toast.success('Added to cart')
    return existingItem.clientId
  }

  const cart = [
    ...cartFromLS,
    {
      clientId,
      productId: product._id,
      count: 1,
      image: product.images,
      name: product.name,
      price: product.price,
      category: product.category,
      color: product.color,
    },
  ]
  localStorage.setItem('cart', JSON.stringify(cart))
  setCartFromLS(cart as ICartItem[])
  withToast && toast.success('Added to cart')

  return clientId
}


export const updateCartItemCountInLS = (cartItemId: string, count: number) => {
  let cart: ICartItem[] = JSON.parse(localStorage.getItem('cart') as string)

  if (!cart) {
    cart = []
  }

  const updatedCart = cart.map((item) =>
    item.clientId === cartItemId ? { ...item, count } : item
  )

  localStorage.setItem('cart', JSON.stringify(updatedCart))
  setCartFromLS(updatedCart as ICartItem[])
}

export const countWholeCartItemsAmount = (cart: ICartItem[]) =>
  cart.reduce((defaultCount, item) => defaultCount + +item.count, 0)

export const handleDeleteAllFromCart = (jwt: string) => {
  deleteAllFromCart({ jwt })

  localStorage.setItem('cart', JSON.stringify([]))
}