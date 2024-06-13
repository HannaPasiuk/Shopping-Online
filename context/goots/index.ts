import { IProduct } from "@/types/common"
import { ILoadOneProductFx } from "@/types/goots"
import { createDomain, createEffect } from "effector"
import { createGate } from "effector-react"
import toast from "react-hot-toast"
import api from "@/api/apiInstants"

export const goods = createDomain()

export const MainPageGate = createGate()

export const setCurrentProduct = goods.createEvent<IProduct>()
export const loadOneProduct = goods.createEvent<ILoadOneProductFx>()



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