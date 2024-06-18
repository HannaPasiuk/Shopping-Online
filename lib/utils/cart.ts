import { addProductToCart, deleteAllFromCart, setCartFromLS } from "@/context/cart";
import { ICartItem } from "@/types/cart";
import { IProduct } from "@/types/common";
import { idGenerator, isUserAuth } from "./common";
import toast from "react-hot-toast";





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

  const clientId = addCartItemToLs(product, count)
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
) => {
  let cartFromLS: ICartItem[] = JSON.parse(
    localStorage.getItem("cart") as string
  );
  const clientId = idGenerator();

  if (!cartFromLS) {
    cartFromLS = [];
  }

  const existingItem = cartFromLS.find(
    (item) => item.productId === product._id
  );

  if (existingItem) {
    const updatedCount = existingItem.count !== count;

    const updatedCart = cartFromLS.map((item) =>
      item.productId === existingItem.productId
        ? {
            ...existingItem,
            count: updatedCount,
          }
        : item
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartFromLS(updatedCart as ICartItem[]);
    return existingItem.clientId;
  }
  
  const cart = [
    ...cartFromLS,
    {
      clientId,
      productId: product._id,
      image: product.images,
      name: product.name,
      count,
      price: product.price,
      category: product.category,
    },
  ];
  localStorage.setItem("cart", JSON.stringify(cart));
  toast.success("Added to cart");
  setCartFromLS(cart as ICartItem[]);
  return clientId;
};


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