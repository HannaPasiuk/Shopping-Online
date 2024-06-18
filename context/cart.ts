
import { IAddProductToCartFx, IAddProductsFromLSToCartFx, ICartItem, IUpdateCartItemCountFx } from "@/types/cart";
import { createDomain, createEffect, sample } from "effector";
import api from "@/api/apiInstants";
import { handleJWTError } from "@/lib/utils/errors";
import toast from "react-hot-toast";


const cart = createDomain()

export const loadCartItems = cart.createEvent<{ jwt: string }>()
export const setCartFromLS = cart.createEvent<ICartItem[]>()
export const addProductToCart = cart.createEvent<IAddProductToCartFx>()
export const addProductsFromLSToCart = cart.createEvent<IAddProductsFromLSToCartFx>()
export const updateCartItemCount = cart.createEvent<IUpdateCartItemCountFx>()





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

      toast.success('Added to cart')
      return data
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }
)



export const addProductsFromLSToCartFx = createEffect(
  async ({ jwt, cartItems }: IAddProductsFromLSToCartFx) => {
    try {
      const { data } = await api.post(
        '/api/cart/add-many',
        { items: cartItems },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )

      if (data?.error) {
        const newData: { cartItems: ICartItem[] } = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'addProductsFromLSToCartFx',
            payload: { items: cartItems },
          }
        )
        return newData
      }

      loadCartItems({ jwt })
      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)




export const $cart = cart
  .createStore<ICartItem[]>([])
  .on(getCartItemsFx.done, (_, { result }) => result)
  .on(addProductsFromLSToCartFx.done, (_, { result }) => result.items)
  .on(addProductToCartFx.done, (cart, { result }) => [
    ...new Map(
      [...cart, result.newCartItem].map((item) => [item.clientId, item])
    ).values(),
  ])
  .on(updateCartItemCount, (cart, { id, count }) =>
    cart.map((item) =>
      item._id === id ? { ...item, count } : item
    )
  )
  
export const $cartFromLs = cart
.createStore<ICartItem[]>([])
.on(setCartFromLS, (_, cart) => cart)

sample({
  clock: addProductToCart,
  source: $cart,
  fn: (_, data) => data,
  target: addProductToCartFx,
})

sample({
  clock: addProductsFromLSToCart,
  source: $cart,
  fn: (_, data) => data,
  target: addProductsFromLSToCartFx,
})
sample({
  clock: updateCartItemCount,
  source: $cart,
  fn: (_, data) => data,
  target: updateCartItemCount,
})