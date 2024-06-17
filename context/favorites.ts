import { handleJWTError } from "@/lib/utils/errors"
import { IAddProductToCartFx } from "@/types/cart"
import { IFavoriteItem } from "@/types/favorites"
import { createDomain, createEffect, sample } from "effector"
import toast from "react-hot-toast"
import api from "@/api/apiInstants"


  export const favorites = createDomain()
  export const addProductToFavorites =
  favorites.createEvent<Omit<IAddProductToCartFx, 'count'>>()
  export const loadFavoriteItems = favorites.createEvent<{ jwt: string }>()
  export const setFavoritesFromLS = favorites.createEvent<IFavoriteItem[]>()
  export const setShouldShowEmptyFavorites = favorites.createEvent<boolean>()
  export const setIsAddToFavorites = favorites.createEvent<boolean>()


  export const getFavoriteItemsFx = createEffect(
    async ({ jwt }: { jwt: string }) => {
      try {
        const { data } = await api.get('/api/favorites/all', {
          headers: { Authorization: `Bearer ${jwt}` },
        })
  
        if (data?.error) {
          const newData: IFavoriteItem[] = await handleJWTError(data.error.name, {
            repeatRequestMethodName: 'getFavoriteItemsFx',
          })
          return newData
        }
  
        return data
      } catch (error) {
        toast.error((error as Error).message)
      }
    }
  )



export const addProductToFavoriteFx = createEffect(
  async ({
    jwt,
    setSpinner,
    ...dataFields
  }: Omit<IAddProductToCartFx, 'count'>) => {
    try {
      setSpinner(true)
      const { data } = await api.post('/api/favorites/add', dataFields, {
        headers: { Authorization: `Bearer ${jwt}` },
      })

      if (data?.error) {
        const newData: { newFavoriteItem: IFavoriteItem } =
          await handleJWTError(data.error.name, {
            repeatRequestMethodName: 'addProductToFavoriteFx',
            payload: { ...dataFields, setSpinner },
          })
        return newData
      }

      toast.success('Added')
      return data
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }
)


export const $favorites = favorites
  .createStore<IFavoriteItem[]>([])
  .on(addProductToFavoriteFx.done, (cart, { result }) => [
    ...new Map(
      [...cart, result.newFavoriteItem].map((item) => [item.clientId, item])
    ).values(),
  ])
  .on(getFavoriteItemsFx.done, (_, { result }) => result)


  export const $favoritesFromLS = favorites
  .createStore<IFavoriteItem[]>([])
  .on(setFavoritesFromLS, (_, favorites) => favorites)


  export const $isAddToFavorites = favorites
  .createStore(false)
  .on(setIsAddToFavorites, (_, value) => value)

  export const $shouldShowEmptyFavorites = favorites
  .createStore(false)
  .on(setShouldShowEmptyFavorites, (_, value) => value)


  sample({
    clock: addProductToFavorites,
    source: $favorites,
    fn: (_, data) => data,
    target: addProductToFavoriteFx,
  })
  sample({
    clock: loadFavoriteItems,
    source: $favorites,
    fn: (_, data) => data,
    target: getFavoriteItemsFx,
  })
  