import toast from 'react-hot-toast'
import { IProduct } from '@/types/common'
import { idGenerator } from './common'
import {
  setFavoritesFromLS,
  setShouldShowEmptyFavorites,
} from '@/context/favorites'
import { IFavoriteItem } from '@/types/favorites'


export const addFavoriteItemToLS = (
  product: IProduct,
  withToast = true
) => {
  let favoritesFromLS: IFavoriteItem[] = JSON.parse(
    localStorage.getItem('favorites') as string
  )

  const clientId = idGenerator()

  if (!favoritesFromLS) {
    favoritesFromLS = []
  }

  setShouldShowEmptyFavorites(false)

  const existingItem = favoritesFromLS.find(
    (item) => item.productId === product._id 
  )

  if (existingItem) {
    toast.success('Added to favorites')
    return existingItem.clientId
  }

  const favorites = [
    ...favoritesFromLS,
    {
      clientId,
      productId: product._id,
      image: product.images[0],
      name: product.name,
      price: product.price,
      category: product.category,
      color: product.color,
    },
  ]

  localStorage.setItem('favorites', JSON.stringify(favorites))
  setFavoritesFromLS(favorites as IFavoriteItem[])
  withToast && toast.success('Added to favorites')

  return clientId
}