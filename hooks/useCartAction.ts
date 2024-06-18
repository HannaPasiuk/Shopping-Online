import { $currentProduct } from "@/context/goods";
import { useUnit } from "effector-react";
import { useState } from "react";
import { isItemLInList, isUserAuth } from "@/lib/utils/common";
import { addCartItemToLs } from "@/lib/utils/cart";
import { useGoodsByAuth } from "./useGoodsByAuth";
import { $cart, $cartFromLs } from "@/context/cart";

export const useCartAction = () => {
  const product = useUnit($currentProduct);
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs);
  const currentCartItems  = currentCartByAuth.filter(
    (item) => item.productId === product._id);
  const isPoductInCart = isItemLInList(currentCartByAuth, product?._id);
  const [addToCartSpinner, setAddToCartSpinner] = useState(false);
  const [count, setCount] = useState(0);

  const existingItem = currentCartByAuth.find(
    (item) => item.productId === product._id 
  )

  const handleAddToCart = (countFromCounter?: number) => {
    if (existingItem) {
      if (!isUserAuth()) {
        addCartItemToLs(product, countFromCounter || 1);
        return;
      }
    }
      const auth = JSON.parse(localStorage.getItem('auth') as string)
      addCartItemToLs(product, countFromCounter || 1)
      return
  };

  return {
    product,
    addToCartSpinner,
    currentCartItems,
    isPoductInCart,
    currentCartByAuth,
    setAddToCartSpinner,
    handleAddToCart,
    count,
    setCount,
  };
};
