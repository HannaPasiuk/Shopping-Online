
import { IAddProductToCartFx, ICartItem } from "@/types/cart";
import { createDomain, createEffect, sample } from "effector";
import api from "@/api/apiInstants";
import { handleJWTError } from "@/lib/utils/errors";
import toast from "react-hot-toast";


const cart = createDomain()

export const loadCartItems = cart.createEvent<{ jwt: string }>()
export const setCartFromLS = cart.createEvent<ICartItem[]>()
export const addProductToCart = cart.createEvent<IAddProductToCartFx>()





export const loadCartItemsFx = createEffect(async ({jwt} : {jwt: string}) => {
  try{
    const {data} = await api.get('/api/cart/all', {
      headers: { Authorization: `Bearer ${jwt}`},
    })
    if(data?.error){
      const newData: ICartItem[] = await handleJWTError(data.error.name, {
        repeatRequestMethodName: 'getCartItemsFx',
      })
      return newData
    }
    return data
}catch(error){
  toast.error((error as Error).message)
}

})


export const getCartItemsFx = createEffect(async ({ jwt }: { jwt: string }) => {
  try {
    const { data } = await api.get("/api/cart/all", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (data?.error) {
      const newData: ICartItem[] = await handleJWTError(data.error.name, {
        repeatRequestMethodName: "getCartItemsFx",
      });
      return newData;
    }

    return data;
  } catch (error) {
    toast.error((error as Error).message);
  }
});




export const addProductToCartFx = createEffect(
  async ({ jwt, setSpinner, ...dataFields }: IAddProductToCartFx) => {
    try {
      setSpinner(true)
      const { data } = await api.post('/api/cart/add', dataFields, {
        headers: { Authorization: `Bearer ${jwt}` },
      })

      if (data?.error) {
        const newData: { newCartItem: ICartItem } = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'addProductToCartFx',
            payload: { ...dataFields, setSpinner },
          }
        )
        return newData
      }

      toast.success('Product added to cart')
      return data
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }
)






export const $cart = cart.createStore<ICartItem[]>([])
export const $cartFromLs = cart
.createStore<ICartItem[]>([])
.on(setCartFromLS, (_, cart) => cart)

sample({
  clock: addProductToCart,
  source: $cart,
  fn: (_, data) => data,
  target: addProductToCartFx,
})