import toast from 'react-hot-toast'
import { useState } from 'react'
import { IProduct } from '@/types/common'
import { useGoodsByAuth } from './useGoodsByAuth'
import { addProductToFavorites, setIsAddToFavorites } from '@/context/favorites'
import { addFavoriteItemToLS } from '@/lib/utils/favorites'
import { $favorites, $favoritesFromLS } from '@/context/favorites'
import { isUserAuth } from '@/lib/utils/common'

export const useFavoritesAction = (product: IProduct) => {
  const [addToFavoritesSpinner, setAddToFavoritesSpinner] = useState(false)
  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)
  const existingItem = currentFavoritesByAuth.find(
    (item) => item.productId === product._id
  )

  const handleAddProductToFavorites = () => {

      if (existingItem) {
        toast.success('Added to favorites!')
        return
      }

      if (!isUserAuth()) {
        addFavoriteItemToLS(product)
        return
      }

      const auth = JSON.parse(localStorage.getItem('auth') as string)
      const clientId = addFavoriteItemToLS(product)

      addProductToFavorites({
        jwt: auth.accessToken,
        productId: product._id,
        setSpinner: setAddToFavoritesSpinner,
        category: product.category,
        clientId,
      })
      return
    }

    setIsAddToFavorites(true)

  

  return {
    handleAddProductToFavorites,
    addToFavoritesSpinner,
    setAddToFavoritesSpinner,
    isProductInFavorites: existingItem,
  }
}