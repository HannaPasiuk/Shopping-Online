import { addProductToCart, setCartFromLS } from "@/context/cart";
import { ICartItem } from "@/types/cart";
import { IProduct } from "@/types/common";
import toast from "react-hot-toast";
import { idGenerator, isUserAuth } from "./common";




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
  withToast?: boolean
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
    toast.success("Added to cart");
    return existingItem.clientId;
  }

  const cart = [
    ...cartFromLS,
    {
      clientId,
      productId: product._id,
      count,
      image: product.images[0],
      name: product.name,
      price: product.price,
      category: product.category,
    },
  ];
  localStorage.setItem("cart", JSON.stringify(cart));
  setCartFromLS(cart as ICartItem[]);
  withToast && toast.success("Added to cart");

  return clientId;
};
