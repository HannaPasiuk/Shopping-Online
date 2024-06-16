import { IProduct } from "@/types/common"
import { ILoadOneProductFx, ILoadProductsByFilterFx, ILoadWatchedProductsFx, IProducts } from "@/types/goots"
import { createDomain, createEffect, sample } from "effector"
import toast from "react-hot-toast"
import api from "@/api/apiInstants"



export const goods = createDomain()
export const setCurrentProduct = goods.createEvent<IProduct>()
export const loadOneProduct = goods.createEvent<ILoadOneProductFx>()
export const loadProductsByFilter = goods.createEvent<ILoadProductsByFilterFx>()
export const loadWatchedProducts = goods.createEvent<ILoadWatchedProductsFx>()








  export const loadOneProductFx = createEffect(
    async ({
      productId,
      category,
      setSpinner,
    }: ILoadOneProductFx) => {
      try {
        setSpinner && setSpinner(true)
        const { data } = await api.post('/api/goods/one', { productId, category })

  
        if (data?.message === 'Wrong product id') {
          return { productItem: { errorMessage: 'Wrong product id' } }
        }
  
        return data
      } catch (error) {
        toast.error((error as Error).message)
      } finally {
        setSpinner && setSpinner(false)
      }
    }
  )
  

  
  export const loadProductsByFilterFx = createEffect(
    async ({
      limit,
      offset,
      category,
      isCatalog,
      additionalParam,
    }: ILoadProductsByFilterFx) => {
      try {
        const { data } = await api.get(
          `/api/goods/filter?limit=${limit}&offset=${offset}&category=${category}&${additionalParam}${
            isCatalog ? '&catalog=true' : ''
          }`
        )
  
        return data
      } catch (error) {
        toast.error((error as Error).message)
      }
    }
  )
  
  export const loadWatchedProductsFx = createEffect(
    async ({ payload }: ILoadWatchedProductsFx) => {
      try {
        const { data } = await api.post('/api/goods/watched', { payload })
  
        return data
      } catch (error) {
        toast.error((error as Error).message)
      }
    }
  )
  


export const $currentProduct = goods
  .createStore<IProduct>({} as IProduct)
  .on(setCurrentProduct, (_, product) => product)
  .on(loadOneProductFx.done, (_, { result }) => result.productItem)

export const $products = goods
  .createStore<IProducts>({} as IProducts)
  .on(loadProductsByFilterFx.done, (_, { result }) => result)

export const $watchedProducts = goods
  .createStore<IProducts>({} as IProducts)
  .on(loadWatchedProductsFx.done, (_, { result }) => result)


  sample({
    clock: loadOneProduct,
    source: $currentProduct,
    fn: (_, data) => data,
    target: loadOneProductFx,
  })
  
  sample({
    clock: loadProductsByFilter,
    source: $products,
    fn: (_, data) => data,
    target: loadProductsByFilterFx,
  })
  
  sample({
    clock: loadWatchedProducts,
    source: $watchedProducts,
    fn: (_, data) => data,
    target: loadWatchedProductsFx,
  })